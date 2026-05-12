import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardResultadoSorteio() {
  return (
    <View style={styles.container}>
      
      {/* BADGE */}
      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={13} color="#22c55e" />
        <Text style={styles.badgeText}>Sorteio #101 encerrado</Text>
      </View>

      {/* TÍTULO */}
      <Text style={styles.titulo}>Resultado Oficial</Text>

      <Text style={styles.subtitulo}>
        Confira abaixo o número sorteado e o grande ganhador(a).
      </Text>

      <View style={styles.divider} />

      {/* NÚMERO GANHADOR */}
      <View style={styles.numeroBox}>
        <Text style={styles.numeroLabel}>Número sorteado</Text>

        <View style={styles.numeroCircle}>
          <Text style={styles.numero}>95</Text>
        </View>
      </View>

      {/* GANHADOR DESTAQUE */}
      <View style={styles.ganhadorContainer}>
        <View style={styles.ganhadorHeader}>
          <Ionicons name="trophy" size={18} color="#FFD700" />
          <Text style={styles.ganhadorLabel}>GANHADOR(A)</Text>
        </View>

        <Text style={styles.ganhadorNome}>Gilvan</Text>

        <View style={styles.linhaGlow} />
      </View>

      {/* MENSAGEM */}
      <View style={styles.footerBox}>
        <Ionicons
          name="heart"
          size={16}
          color="#2375ef"
          style={{ marginBottom: 8 }}
        />

        <Text style={styles.footerTexto}>
          Obrigada a todos que participaram! {"\n"}
          Em breve lançaremos o Próximo Sorteio.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#121223",
    borderRadius: 24,
    padding: 22,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#232342",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    marginBottom: 18,
  },

  badgeText: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "700",
  },

  titulo: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitulo: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#232342",
    marginVertical: 22,
  },

  numeroBox: {
    alignItems: "center",
    marginBottom: 28,
  },

  numeroLabel: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  numeroCircle: {
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(35,117,239,0.12)",
    borderWidth: 2,
    borderColor: "#2375ef",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2375ef",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  numero: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
  },

  ganhadorContainer: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },

  ganhadorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },

  ganhadorLabel: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  ganhadorNome: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 16,
  },

  linhaGlow: {
    width: "55%",
    height: 4,
    borderRadius: 99,
    backgroundColor: "#2375ef",
    shadowColor: "#2375ef",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  footerBox: {
    alignItems: "center",
    paddingTop: 6,
  },

  footerTexto: {
    color: "#dadadb",
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
   
  },
});