import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import Header from "@/src/components/Header";
import CardAnimal from "@/src/components/CardAnimal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import VoltarHome from "@/src/components/VoltarHome";
import api from "@/src/services/api";

export default function Grupo() {
  const router = useRouter();
  const { user, carregando } = useAuth();

  const [animais, setAnimais] = useState<any[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);

  useEffect(() => {
    carregarGrupos();
  }, []);

  async function carregarGrupos() {
    try {
      const response = await api.get("/grupo");

      const gruposFormatados = response.data.map((grupo: any) => ({
        numero: grupo.id_numeros_grupo,
        nome: grupo.animal,
        status: grupo.status,
        imagem: { uri: grupo.imagem },
        dezenas: grupo.numeros
          ? grupo.numeros.split(",").map((n: string) => Number(n))
          : [],
      }));

      setAnimais(gruposFormatados);
    } catch (error) {
      console.log(error);
    }
  }

  // 🔥 TOGGLE SELEÇÃO (AGORA RESPEITA STATUS)
  const toggleAnimal = (grupo: any) => {
    if (grupo.status !== "disponivel") return;

    setSelecionados((prev) =>
      prev.includes(grupo.numero)
        ? prev.filter((n) => n !== grupo.numero)
        : [...prev, grupo.numero]
    );
  };

  const total = selecionados.length * 10;

  // 🟡 RESERVAR NO BANCO AO GERAR PIX
  const handleComprar = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (selecionados.length === 0) return;

    router.push({
      pathname: "/pagamento-pix",
      params: {
        modalidade: "grupo",

        valor: total.toFixed(2),

        numeros: JSON.stringify(selecionados),

        placar: selecionados
          .map((n) => {
            const animal = animais.find(
              (a) => a.numero === n
            );

            return animal
              ? `${animal.numero} - ${animal.nome}`
              : `${n}`;
          })
          .join(", "),
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <VoltarHome />

        <Image
          source={{
            uri: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780939604/gru_zhkmzn.png",
          }}
          style={styles.image}
        />

        <View style={styles.cardsContainer}>
          {animais.map((animal) => {
            const isReserved = animal.status === "reservado";
            const isSold = animal.status === "vendido";
            const isSelected = selecionados.includes(animal.numero);

            return (
              <CardAnimal
                key={animal.numero}
                numero={animal.numero}
                nome={animal.nome}
                imagem={animal.imagem}
                dezenas={animal.dezenas}
                selected={isSelected}
                disabled={isReserved}
                sold={isSold}
                onPress={() => toggleAnimal(animal)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalTexto}>
            {selecionados.length} número(s)
          </Text>

          <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
        </View>

        <Pressable
          style={[
            styles.botaoComprar,
            selecionados.length === 0 && styles.botaoComprarDisabled,
          ]}
          onPress={handleComprar}
          disabled={selecionados.length === 0 || carregando}
        >
          <Ionicons name="ticket-outline" size={18} color="#fff" />
          <Text style={styles.botaoComprarTexto}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e0e0e" },
  scrollContent: { paddingBottom: 120 },
  image: { width: "100%", height: 220, marginTop: 10 },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 20,
    rowGap: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalTexto: { color: "#aaa", fontSize: 12 },
  totalValor: { color: "#7a9dd1", fontSize: 18, fontWeight: "bold" },

  botaoComprar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007ACC",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  botaoComprarDisabled: {
    backgroundColor: "#2e2e50",
    opacity: 0.5,
  },

  botaoComprarTexto: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 16,
  },
});