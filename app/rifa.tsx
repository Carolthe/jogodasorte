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

export default function Rifa() {
  const router = useRouter();

  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [pagina, setPagina] = useState(0);
  const [busca, setBusca] = useState("");

  const numeros = Array.from({ length: 2000 }, (_, i) => i + 1);

  const itensPorPagina = 70;
  const inicio = pagina * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const numerosPagina = numeros.slice(inicio, fim);

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
        <Text style={styles.title}>
          Não perca a chance de ganhar até 20 Mil Reais
        </Text>

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

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite um número (ex: 0001)"
            placeholderTextColor="#a0a0b8"
            keyboardType="numeric"
            value={busca}
            onChangeText={setBusca}
          />
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

        {/* PAGINAÇÃO */}
        <View style={styles.paginacao}>
          <Pressable
            onPress={paginaAnterior}
            style={[styles.botao, pagina === 0 && styles.botaoDisabled]}
            disabled={pagina === 0}
          >
            <Text style={styles.botaoTexto}>Anterior</Text>
          </Pressable>

          <Text style={styles.paginaTexto}>Página {pagina + 1}</Text>

          <Pressable
            onPress={proximaPagina}
            style={[styles.botao, fim >= numeros.length && styles.botaoDisabled]}
            disabled={fim >= numeros.length}
          >
            <Text style={styles.botaoTexto}>Próximo</Text>
          </Pressable>
        </View>
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
          style={[styles.botaoComprar, selecionados.length === 0 && styles.botaoComprarDisabled]}
          onPress={handleComprar}
          disabled={selecionados.length === 0}
        >
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
  title: {
    fontSize: 20,
    paddingHorizontal: 40,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
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
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },
  input: {
    color: "#fff",
    height: 45,
    fontSize: 15,
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
  paginacao: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
    padding: 15,
  },
  botao: {
    backgroundColor: "#7c3aed",
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  botaoDisabled: {
    backgroundColor: "#2e2e50",
    opacity: 0.5,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginaTexto: {
    color: "#a0a0b8",
    fontSize: 14,
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
    color: "#d8b4fe",
    fontSize: 20,
    fontWeight: "bold",
  },
  botaoComprar: {
    backgroundColor: "#7c3aed",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
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