import Header from "@/src/components/Header";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Rifa() {
  const router = useRouter();

  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [pagina, setPagina] = useState(0);
  const [busca, setBusca] = useState("");

  const numeros = Array.from({ length: 2000 }, (_, i) => i + 1);

  const numerosFiltrados = busca.trim()
    ? numeros.filter((n) => String(n).padStart(4, "0").includes(busca.trim()))
    : null;

  const itensPorPagina = 70;
  const inicio = pagina * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const numerosPagina = numerosFiltrados ?? numeros.slice(inicio, fim);

  const precoPorNumero = 20;
  const total = selecionados.length * precoPorNumero;

  function toggleNumero(numero: number) {
    setSelecionados((prev) =>
      prev.includes(numero)
        ? prev.filter((n) => n !== numero)
        : [...prev, numero]
    );
  }

  function proximaPagina() {
    if (fim < numeros.length) setPagina((p) => p + 1);
  }

  function paginaAnterior() {
    if (pagina > 0) setPagina((p) => p - 1);
  }

  function handleComprar() {
    if (selecionados.length === 0) return;
    router.push({
      pathname: "/pagamento-pix",
      params: {
        valor: total.toFixed(2),
        premio: "15000",
        jogo: "Rifa Mundial",
        placar: selecionados.map((n) => String(n).padStart(4, "0")).join(", "),
      },
    });
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.title}> Escolha seus números da sorte e concorra ao prêmio</Text>
        </View>

        {/* STATUS */}
        <View style={styles.containerNumeros}>
          <View style={styles.box}>
            <Text style={[styles.label, { color: "#22c55e" }]}>Disponível</Text>
            <Text style={[styles.value, { color: "#22c55e" }]}>2000</Text>
          </View>
          <View style={styles.box}>
            <Text style={[styles.label, { color: "#a855f7" }]}>Reservado</Text>
            <Text style={[styles.value, { color: "#a855f7" }]}>0</Text>
          </View>
          <View style={styles.box}>
            <Text style={[styles.label, { color: "#7c3aed" }]}>Vendido</Text>
            <Text style={[styles.value, { color: "#7c3aed" }]}>1000</Text>
          </View>
        </View>

        {/* BARRA DE BUSCA */}
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
              placeholder="Buscar número (ex: 0042)"
              placeholderTextColor="#a0a0b8"
              keyboardType="numeric"
              value={busca}
              onChangeText={(t) => {
                setBusca(t);
                setPagina(0);
              }}
            />
            {busca.length > 0 && (
              <Pressable onPress={() => setBusca("")} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={18} color="#a0a0b8" />
              </Pressable>
            )}
          </View>

          {busca.length > 0 && (
            <Text style={styles.searchResult}>
              {numerosFiltrados?.length ?? 0} resultado(s) encontrado(s)
            </Text>
          )}
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {numerosPagina.map((numero) => {
            const isSelected = selecionados.includes(numero);
            return (
              <Pressable
                key={numero}
                onPress={() => toggleNumero(numero)}
                style={[styles.numeroBox, isSelected && styles.numeroSelecionado]}
              >
                <Text style={[styles.numeroTexto, isSelected && styles.numeroTextoSelected]}>
                  {String(numero).padStart(4, "0")}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* PAGINAÇÃO — só aparece quando não há busca ativa */}
        {!busca && (
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
              style={[styles.botao, fim >= numeros.length && styles.botaoDisabled]}
              disabled={fim >= numeros.length}
            >
              <Text style={styles.botaoTexto}>Próximo</Text>
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* FOOTER FIXO */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalTexto}>
            {selecionados.length} número(s) selecionado(s)
          </Text>
          <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
        </View>

        <Pressable
          style={[
            styles.botaoComprar,
            selecionados.length === 0 && styles.botaoComprarDisabled,
          ]}
          onPress={handleComprar}
          disabled={selecionados.length === 0}
        >
          <Ionicons name="ticket-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.botaoComprarTexto}>Comprar</Text>
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

  // HERO
  hero: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(124,58,237,0.15)",
    borderWidth: 0.5,
    borderColor: "#7c3aed",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#d8b4fe",
    fontSize: 11,
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#a0a0b8",
    lineHeight: 20,
  },

  // STATUS
  containerNumeros: {
    flexDirection: "row",
    gap: 10,
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

  // BUSCA
  searchWrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
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
  searchResult: {
    color: "#a0a0b8",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },

  // GRID
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
    backgroundColor: "#7c3aed",
    borderColor: "#a855f7",
  },
  numeroTexto: {
    color: "#a0a0b8",
    fontWeight: "bold",
    fontSize: 13,
  },
  numeroTextoSelected: {
    color: "#fff",
  },

  // PAGINAÇÃO
  paginacao: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
  botao: {
    backgroundColor: "#7c3aed",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  botaoDisabled: {
    backgroundColor: "#2e2e50",
    opacity: 0.5,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  paginaInfo: {
    alignItems: "center",
  },
  paginaTexto: {
    color: "#a0a0b8",
    fontSize: 11,
  },
  paginaNumero: {
    color: "#d8b4fe",
    fontSize: 20,
    fontWeight: "bold",
  },

  // FOOTER
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
    color: "#d8b4fe",
    fontSize: 20,
    fontWeight: "bold",
  },
  botaoComprar: {
    backgroundColor: "#7c3aed",
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