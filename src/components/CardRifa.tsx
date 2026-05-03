import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  titulo: string;
  descricao: string;
  textoExtra?: string;
  textoBotao: string;
  totalNumeros?: number;
  numerosVendidos?: number;
  onPress?: () => void;
};

export default function CardRifa({
  titulo,
  textoExtra,
  textoBotao,
  totalNumeros = 2000,
  numerosVendidos = 1000,
  onPress,
}: Props) {
   Math.round((numerosVendidos / totalNumeros) * 100);

  return (
    <View style={styles.container}>

      {/* BADGE TOPO */}
      <View style={styles.badge}>
        <Ionicons name="trophy" size={12} color="#1b64d2" />
        <Text style={styles.badgeText}>Rifa ativa</Text>
      </View>

      {/* TÍTULO E DESCRIÇÃO */}
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.divider} />

      {/* PRÊMIO */}
      {textoExtra && (
        <View style={styles.premioBox}>
          <Text style={styles.premioValor}>{textoExtra}</Text>
        </View>
      )}

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Ionicons name="ticket-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.botaoTexto}>{textoBotao}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#1a1a2e",
    borderRadius: 18,
    padding: 20,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    elevation: 8,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(50, 50, 138, 0.15)",
    borderWidth: 0.5,
    borderColor: "#416ca9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
    marginBottom: 14,
  },
  badgeText: {
    color: "#1b64d2",
    fontSize: 11,
    fontWeight: "500",
  },

  titulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  descricao: {
    color: "#a0a0b8",
    fontSize: 14,
    lineHeight: 20,
  },

  divider: {
    height: 0.5,
    backgroundColor: "#2e2e50",
    marginVertical: 16,
  },

  premioBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 123, 0.1)",
    borderWidth: 0.5,
    borderColor: "#003480",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  premioLabel: {
    color: "#1b64d2",
    fontSize: 13,
  },
  premioValor: {
    color: "#003480",
    fontSize: 20,
    fontWeight: "bold",
  },

  progressoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressoLabel: {
    color: "#a0a0b8",
    fontSize: 12,
  },
  progressoPercent: {
    color: "#003480",
    fontSize: 12,
    fontWeight: "500",
  },
  progressoBar: {
    height: 6,
    backgroundColor: "#2e2e50",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressoFill: {
    height: "100%",
    backgroundColor: "#003480",
    borderRadius: 99,
  },
  progressoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 16,
  },
  progressoSub: {
    color: "#a0a0b8",
    fontSize: 11,
  },

  botao: {
    backgroundColor: "#003480",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});