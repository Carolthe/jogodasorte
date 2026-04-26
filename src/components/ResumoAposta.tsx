import { View, Text, StyleSheet} from "react-native";

type Props = {
  placar?: string;
  valor?: string;
};

export default function ResumoAposta({ placar, valor }: Props) {
  if (!valor || !placar) return null;

  const numeros = placar.split(",").map((n) => n.trim()).filter(Boolean);

  const valorFormatado = Number(valor).toFixed(2);


  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIconBox}>
          <Text style={styles.headerIcon}>🎟</Text>
        </View>
        <View>
          <Text style={styles.title}>Resumo:</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* NÚMEROS */}
      <Text style={styles.label}>Números escolhidos</Text>
      <View style={styles.numerosContainer}>
        {numeros.map((n) => (
          <View key={n} style={styles.numeroBadge}>
            <Text style={styles.numeroTexto}>{n}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* TOTAIS */}
      <View style={styles.row}>
        <Text style={styles.label}>Quantidade</Text>
        <Text style={styles.value}>{numeros.length} número(s)</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Valor total</Text>
        <Text style={styles.value}>R$ {valorFormatado}</Text>
      </View>
        
          {/* <View style={styles.divider} /> */}
          <Text style={styles.tituloPremio}>Concorrendo:</Text>
          <View style={styles.premioRow}>
            <Text style={styles.premioLabel}>1º Prêmio</Text>
            <Text style={styles.premioValor}>R$ 15.000</Text>
          </View>
          <View style={styles.premioRow}>
            <Text style={styles.premioLabel}>2º Prêmio</Text>
            <Text style={styles.premioValor}>R$ 5.000</Text>
          </View>
        
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
    gap: 12,
  },
  headerIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#2e1a5e",
    borderWidth: 0.5,
    borderColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  subtitle: {
    color: "#a0a0b8",
    fontSize: 13,
    marginTop: 2,
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
    backgroundColor: "#2e1a5e",
    borderWidth: 0.5,
    borderColor: "#7c3aed",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  numeroTexto: {
    color: "#d8b4fe",
    fontSize: 13,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  value: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  premioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    borderWidth: 0.5,
    borderColor: "#7c3aed",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  premioLabel: {
    color: "#a855f7",
    fontSize: 14,
  },
  tituloPremio: {
    color: '#d9d9df',
    paddingBottom: 10,
    fontWeight: 'bold',
  },

  premioValor: {
    color: "#d8b4fe",
    fontSize: 20,
    fontWeight: "bold",
  },
});