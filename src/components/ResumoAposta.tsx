import { View, Text, StyleSheet } from "react-native";

type Props = {
  placar?: string;
  valor?: string;
  modalidade: "rifa" | "grupo";
};

export default function ResumoAposta({ placar, valor, modalidade }: Props) {
  if (!valor || !placar) return null;

  const itens = placar
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  const valorFormatado = Number(valor).toFixed(2);

  const titulo =
    modalidade === "rifa"
      ? "Números escolhidos"
      : "Grupos escolhidos";

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Resumo do Sorteio:</Text>
      </View>

      <View style={styles.divider} />

      {/* ITENS */}
      <Text style={styles.label}>{titulo}</Text>

      <View style={styles.numerosContainer}>
        {itens.map((item) => (
          <View key={item} style={styles.numeroBadge}>
            <Text style={styles.numeroTexto}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* TOTAIS */}
      <View style={styles.row}>
        <Text style={styles.label}>Quantidade</Text>
        <Text style={styles.value}>{itens.length} item(s)</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Valor total</Text>
        <Text style={styles.value}>R$ {valorFormatado}</Text>
      </View>

      <View  />

      {/* PRÊMIOS */}
      {/* <Text style={styles.tituloPremio}>Concorrendo:</Text>

      <View style={styles.premioRow}>
        <Text style={styles.premioLabel}>1º Prêmio</Text>
        <Text style={styles.premioValor}>R$ 500,00</Text>
      </View>

      <View style={styles.premioRow}>
        <Text style={styles.premioLabel}>2º ao 5º Prêmio</Text>
        <Text style={styles.premioValor2}>R$ 50,00</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    padding: 20,
    borderRadius: 16,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#2e2e50",
    marginVertical: 14,
  },
  label: {
    color: "#a0a0b8",
    fontSize: 13,
    marginBottom: 8,
  },
  numerosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  numeroBadge: {
    backgroundColor: "#252e67aa",
    borderWidth: 0.5,
    borderColor: "#007ACC",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  numeroTexto: {
    color: "#1b64d2",
    fontSize: 13,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  value: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  tituloPremio: {
    color: "#d9d9df",
    fontWeight: "bold",
    marginBottom: 10,
  },
  premioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(58, 79, 237, 0.1)",
    borderWidth: 0.5,
    borderColor: "#007ACC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  premioLabel: {
    color: "#1b64d2",
  },
  premioValor: {
    color: "#1b64d2",
    fontSize: 20,
    fontWeight: "bold",
  },
  premioValor2: {
    color: "#1b64d2",
    fontSize: 16,
    fontWeight: "bold",
  },
});