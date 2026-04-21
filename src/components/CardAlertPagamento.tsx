import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardAlertPagamento() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={22} color="#22c55e" />
        </View>
        <Text style={styles.title}>Pagamento em análise</Text>
      </View>

      <Text style={styles.text}>
        Seu pagamento será analisado. Caso você seja o vencedor,
        o valor será enviado para a chave Pix cadastrada.
      </Text>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={18} color="#a855f7" />
        <Text style={styles.infoText}>Processamento seguro</Text>
      </View>

      <Text style={styles.footer}>
        A Mundial dos Jogos te deseja boa sorte!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#2e2e50",
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  text: {
    color: "#a0a0b8",
    fontSize: 15,
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124, 58, 237, 0.12)",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },
  infoText: {
    color: "#d8b4fe",
    fontSize: 13,
    marginLeft: 6,
  },
  footer: {
    color: "#a0a0b8",
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
});