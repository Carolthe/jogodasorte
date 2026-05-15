import Header from "@/src/components/Header";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import VoltarHome from "@/src/components/VoltarHome";
import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/AuthContext";

type Numero = {
  id_numero: number;
  numero: number;
  status: "disponivel" | "reservado" | "vendido";
};

type Filtro = "todos" | "disponivel" | "reservado" | "vendido";

export default function Rifa() {
  const router = useRouter();
  const { user, carregando } = useAuth();

  const [numeros, setNumeros] = useState<Numero[]>([]);
  const [loadingNumeros, setLoadingNumeros] = useState(true);

  const [selecionados, setSelecionados] = useState<number[]>([]);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  useEffect(() => {
    fetchNumeros();
  }, []);

  async function fetchNumeros() {
    try {
      const response = await api.get("/rifa/numeros");
      setNumeros(response.data);
    } catch (error) {
      console.error("Erro ao buscar números:", error);
    } finally {
      setLoadingNumeros(false);
    }
  }

  if (loadingNumeros || carregando) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  function formatNumero(n: number | string) {
    return String(n).padStart(2, "0");
  }

  const numerosFiltrados = numeros.filter((n) => {
    const matchBusca = busca.trim()
      ? formatNumero(n.numero).includes(busca.trim())
      : true;

    const matchFiltro =
      filtro === "todos" ? true : n.status === filtro;

    return matchBusca && matchFiltro;
  });

  const numerosPagina = numerosFiltrados;

  const precoPorNumero = 10;
  const total = selecionados.length * precoPorNumero;

  const qtdDisponivel = numeros.filter(
    (n) => n.status === "disponivel"
  ).length;

  const qtdReservado = numeros.filter(
    (n) => n.status === "reservado"
  ).length;

  const qtdVendido = numeros.filter(
    (n) => n.status === "vendido"
  ).length;

  function toggleNumero(n: Numero) {
    if (n.status !== "disponivel") return;

    setSelecionados((prev) =>
      prev.includes(n.numero)
        ? prev.filter((x) => x !== n.numero)
        : [...prev, n.numero]
    );
  }

  async function handleComprar() {
    if (carregando) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (selecionados.length === 0) return;

    router.push({
      pathname: "/pagamento-pix",
      params: {
        valor: total.toFixed(2),

        numeros: JSON.stringify(selecionados),

        placar: selecionados
          .map((n) => String(n).padStart(2, "0"))
          .join(", "),
      },
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER AGORA ROLA JUNTO */}
        <Header />

        <VoltarHome />

        {/* STATUS */}
        <View style={styles.containerNumeros}>
          {[
            {
              label: "Disponível",
              status: "disponivel" as Filtro,
              cor: "#ffffff",
              qtd: qtdDisponivel,
            },
            {
              label: "Reservado",
              status: "reservado" as Filtro,
              cor: "#ffffff",
              qtd: qtdReservado,
            },
            {
              label: "Vendido",
              status: "vendido" as Filtro,
              cor: "#ffffff",
              qtd: qtdVendido,
            },
          ].map((item) => (
            <Pressable
              key={item.status}
              style={[
                styles.box,
                filtro === item.status && {
                  borderColor: item.cor,
                  borderWidth: 1.5,
                },
              ]}
              onPress={() => {
                setFiltro((prev) =>
                  prev === item.status ? "todos" : item.status
                );
              }}
            >
              <Text style={[styles.label, { color: item.cor }]}>
                {item.label}
              </Text>

              <Text style={[styles.value, { color: item.cor }]}>
                {item.qtd}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* BUSCA */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#a0a0b8"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Buscar número"
              placeholderTextColor="#a0a0b8"
              keyboardType="numeric"
              value={busca}
              onChangeText={setBusca}
            />

            {busca.length > 0 && (
              <Pressable
                onPress={() => setBusca("")}
                style={styles.clearBtn}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="#a0a0b8"
                />
              </Pressable>
            )}
          </View>
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {numerosPagina.map((n) => {
            const isSelected = selecionados.includes(n.numero);

            const isReservado = n.status === "reservado";

            const isVendido = n.status === "vendido";

            return (
              <Pressable
                key={n.id_numero}
                onPress={() => toggleNumero(n)}
                disabled={isReservado || isVendido}
                style={[
                  styles.numeroBox,
                  isSelected && styles.numeroSelecionado,
                  isReservado && styles.numeroReservado,
                  isVendido && styles.numeroVendido,
                ]}
              >
                {isVendido ? (
                  <Ionicons
                    name="close"
                    size={16}
                    color="#66261d"
                  />
                ) : (
                  <Text
                    style={[
                      styles.numeroTexto,
                      isSelected &&
                        styles.numeroTextoSelected,
                      isReservado &&
                        styles.numeroTextoReservado,
                    ]}
                  >
                    {formatNumero(n.numero)}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* FOOTER FIXO */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalTexto}>
            {selecionados.length} número(s)
          </Text>

          <Text style={styles.totalValor}>
            R$ {total.toFixed(2)}
          </Text>
        </View>

        <Pressable
          style={[
            styles.botaoComprar,
            selecionados.length === 0 &&
              !!user &&
              styles.botaoComprarDisabled,
          ]}
          onPress={handleComprar}
          disabled={carregando}
        >
          <Ionicons
            name="ticket-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />

          <Text style={styles.botaoComprarTexto}>
            Comprar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e0e",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e0e0e",
  },

  loadingText: {
    color: "#a0a0b8",
    fontSize: 15,
  },

  containerNumeros: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  box: {
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    gap: 4,
  },

  label: {
    fontSize: 11,
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
  },

  searchWrapper: {
    marginBottom: 16,
    justifyContent: "center",
    flexDirection: "row",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    paddingHorizontal: 14,
    height: 48,
    width: "87%",
  },

  searchIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    height: "100%",
  },

  clearBtn: {
    padding: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  numeroBox: {
    margin: 3,
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    paddingHorizontal: 6,
    width: "16.66%",
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },

  numeroSelecionado: {
    backgroundColor: "#007ACC",
    borderColor: "#5560f7",
  },

  numeroReservado: {
    backgroundColor: "#1a1a2e",
    opacity: 0.4,
  },

  numeroVendido: {
    backgroundColor: "#161622",
    borderColor: "#1f2333",
  },

  numeroTexto: {
    color: "#a0a0b8",
    fontWeight: "bold",
    fontSize: 13,
  },

  numeroTextoSelected: {
    color: "#fff",
  },

  numeroTextoReservado: {
    color: "#555",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0e0e0e",
    borderTopWidth: 0.5,
    borderTopColor: "#2e2e50",
  },

  totalTexto: {
    color: "#a0a0b8",
    fontSize: 12,
  },

  totalValor: {
    color: "#7a9dd1",
    fontSize: 20,
    fontWeight: "bold",
  },

  botaoComprar: {
    backgroundColor: "#007ACC",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  botaoComprarDisabled: {
    backgroundColor: "#2e2e50",
    opacity: 0.5,
  },

  botaoComprarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});