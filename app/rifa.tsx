import Header from "@/src/components/Header";
import {
  View, Text, StyleSheet, Pressable,
  ScrollView, TextInput, Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import VoltarHome from "@/src/components/VoltarHome";
import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/AuthContext";
import { Platform } from "react-native";

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
  // const [pagina, setPagina] = useState(0);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  useEffect(() => {
    fetchNumeros();
  }, []);

  async function fetchNumeros() {
    try {
      const response = await api.get("/rifa/numeros");
      console.log("RESPOSTA API:", response.data); // ✅ veja o que chega
      console.log("É array?", Array.isArray(response.data));
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

  // ── Filtros ────────────────────────────────────────────────────────────────
  function formatNumero(n: number | string) {
    return String(n).padStart(2, "0");
  }


  const numerosFiltrados = numeros.filter((n) => {
    const matchBusca = busca.trim()
      ? formatNumero(n.numero).includes(busca.trim())
      : true;

    const matchFiltro = filtro === "todos" ? true : n.status === filtro;
    return matchBusca && matchFiltro;
  });

  // const itensPorPagina = 70;
  // const inicio = pagina * itensPorPagina;
  // const fim = inicio + itensPorPagina;
  // const numerosPagina = busca || filtro !== "todos"
  //   ? numerosFiltrados
  //   : numerosFiltrados.slice(inicio, fim);

  const numerosPagina = numerosFiltrados;

  const precoPorNumero = 10;
  const total = selecionados.length * precoPorNumero;

  // contagens para os boxes
  const qtdDisponivel = numeros.filter((n) => n.status === "disponivel").length;
  const qtdReservado = numeros.filter((n) => n.status === "reservado").length;
  const qtdVendido = numeros.filter((n) => n.status === "vendido").length;

  function toggleNumero(n: Numero) {
    if (n.status !== "disponivel") return; // bloqueia reservado/vendido
    setSelecionados((prev) =>
      prev.includes(n.numero)
        ? prev.filter((x) => x !== n.numero)
        : [...prev, n.numero]
    );
  }

  // function proximaPagina() {
  //   if (fim < numerosFiltrados.length) setPagina((p) => p + 1);
  // }
  // function paginaAnterior() {
  //   if (pagina > 0) setPagina((p) => p - 1);
  // }

  async function handleComprar() {
    if (carregando) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (selecionados.length === 0) return;

    try {
      const response = await api.post("/rifa/compras", {
        total_numeros: selecionados.length,
        valor_total: total,
        numeros: selecionados,
      });

      const compra = response.data;

      router.push({
        pathname: "/pagamento-pix",
        params: {
          valor: total.toFixed(2),
          id_compra: compra.id_compra,
          placar: selecionados.map((n) => String(n).padStart(4, "0")).join(", "),
        },
      });
    } catch (error: any) {
      const msg = error.response?.data?.erro || "Não foi possível realizar a compra.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Erro", msg);
      }
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
        <VoltarHome />

        {/* <View style={styles.hero}>
          <Text style={styles.title}>
            
          </Text>
        </View> */}

        {/* STATUS — clicável para filtrar */}
        <View style={styles.containerNumeros}>
          {(
            [
              { label: "Disponível", status: "disponivel" as Filtro, cor:"#ffffff", qtd: qtdDisponivel },
              { label: "Reservado", status: "reservado" as Filtro, cor:'#ffffff' , qtd: qtdReservado },
              { label: "Vendido", status: "vendido" as Filtro, cor: "#ffffff", qtd: qtdVendido },
            ]
          ).map((item) => (
            <Pressable
              key={item.status}
              style={[
                styles.box,
                filtro === item.status && { borderColor: item.cor, borderWidth: 1.5 },
              ]}
              onPress={() => {
                setFiltro((prev) => prev === item.status ? "todos" : item.status);
              }}
            >
              <Text style={[styles.label, { color: item.cor }]}>{item.label}</Text>
              <Text style={[styles.value, { color: item.cor }]}>{item.qtd}</Text>
            </Pressable>
          ))}
        </View>

        {/* BUSCA */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#a0a0b8" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Buscar número"
              placeholderTextColor="#a0a0b8"
              keyboardType="numeric"
              value={busca}
              onChangeText={setBusca}
            // onChangeText={(t) => { setBusca(t); setPagina(0); }}
            />
            {busca.length > 0 && (
              <Pressable onPress={() => setBusca("")} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={18} color="#a0a0b8" />
              </Pressable>
            )}
          </View>
          {(busca.length > 0 || filtro !== "todos") && (
            <Text style={styles.searchResult}>

            </Text>
          )}
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
                  // X para vendido
                  <Ionicons name="close" size={16} color="#2135a8" />
                ) : (
                  <Text
                    style={[
                      styles.numeroTexto,
                      isSelected && styles.numeroTextoSelected,
                      isReservado && styles.numeroTextoReservado,
                    ]}
                  >
                    {formatNumero(n.numero)}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* PAGINAÇÃO — só quando não há busca/filtro */}
        {/* {!busca && filtro === "todos" && (
          <View style={styles.paginacao}>
            <Pressable
              onPress={paginaAnterior}
              style={[styles.botao, pagina === 0 && styles.botaoDisabled]}
              disabled={pagina === 0}
            >
              <Ionicons name="chevron-back" size={16} color="#fff" />
              <Text style={styles.botaoTexto}>Anterior</Text>
            </Pressable>

            <View style={styles.paginaInfo}>
              <Text style={styles.paginaTexto}>Página</Text>
              <Text style={styles.paginaNumero}>{pagina + 1}</Text>
            </View>

            <Pressable
              onPress={proximaPagina}
              style={[styles.botao, fim >= numerosFiltrados.length && styles.botaoDisabled]}
              disabled={fim >= numerosFiltrados.length}
            >
              <Text style={styles.botaoTexto}>Próximo</Text>
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </Pressable>
          </View>
        )} */}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalTexto}>{selecionados.length} número(s)</Text>
          <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
        </View>

        <Pressable
          style={[
            styles.botaoComprar,
            selecionados.length === 0 && !!user && styles.botaoComprarDisabled,
          ]}
          onPress={handleComprar}
          disabled={carregando}
        >
          <Ionicons name="ticket-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.botaoComprarTexto}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e0e0e" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0e0e0e" },
  loadingText: { color: "#a0a0b8", fontSize: 15 },

  hero: { paddingHorizontal: 24, paddingBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 8, textAlign: "center", marginHorizontal: 10 },

  containerNumeros: { flexDirection: "row", gap: 10, justifyContent: "center", paddingHorizontal: 20, marginBottom: 20 },
  box: {
    alignItems: "center", backgroundColor: "#1a1a2e", padding: 10,
    borderRadius: 10, width: "30%", borderWidth: 0.5, borderColor: "#2e2e50", gap: 4,
  },
  label: { fontSize: 11 },
  value: { fontSize: 18, fontWeight: "bold" },

  searchWrapper: { marginBottom: 16, justifyContent: "center", flexDirection: "row" },
  searchContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#1a1a2e",
    borderRadius: 12, borderWidth: 0.5, borderColor: "#2e2e50",
    paddingHorizontal: 14, height: 48, width: "87%",
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, color: "#fff", fontSize: 15, height: "100%" },
  clearBtn: { padding: 4 },
  searchResult: { color: "#a0a0b8", fontSize: 12, marginTop: 8, marginLeft: 4 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginHorizontal: 5 },

  numeroBox: {
    margin: 3, backgroundColor: "#1a1a2e", borderRadius: 8,
    paddingHorizontal: 6, width: "16.66%", paddingVertical: 10,
    alignItems: "center", borderWidth: 0.5, borderColor: "#2e2e50",
  },
  numeroSelecionado: { backgroundColor: "#195ec7", borderColor: "#5560f7" },
  numeroReservado: { backgroundColor: "#1a1a2e", opacity: 0.4 },       // opaco
  numeroVendido: { backgroundColor: "#1a0a2e", borderColor: "#4c1d95" }, // mais escuro com X

  numeroTexto: { color: "#a0a0b8", fontWeight: "bold", fontSize: 13 },
  numeroTextoSelected: { color: "#fff" },
  numeroTextoReservado: { color: "#555" },

  paginacao: { flexDirection: "row", justifyContent: "center", gap: 20, alignItems: "center", padding: 20 },
  botao: { backgroundColor: "#195ec7", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 4 },
  botaoDisabled: { backgroundColor: "#2e2e50", opacity: 0.5 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  paginaInfo: { alignItems: "center" },
  paginaTexto: { color: "#a0a0b8", fontSize: 11 },
  paginaNumero: { color: "#b5b4fe", fontSize: 14, fontWeight: "bold" },

  footer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: 15, backgroundColor: "#0e0e0e", borderTopWidth: 0.5, borderTopColor: "#2e2e50",
  },
  totalTexto: { color: "#a0a0b8", fontSize: 12 },
  totalValor: { color: "#7a9dd1", fontSize: 20, fontWeight: "bold" },
  botaoComprar: { backgroundColor: "#195ec7", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, flexDirection: "row", alignItems: "center" },
  botaoComprarDisabled: { backgroundColor: "#2e2e50", opacity: 0.5 },
  botaoComprarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});