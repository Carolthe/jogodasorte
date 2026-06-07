import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardResultadoSorteio() {
  const ganhadores = [
    {
      premio: "1º Prêmio",
      nome: "Alex",
      descricao: "Cliente do Epifanio",
      numero: "22",
    },
    { premio: "2º Prêmio", nome: "Ana", descricao: "", numero: "61" },
    { premio: "3º Prêmio", nome: "Demily", descricao: "", numero: "07" },
    { premio: "4º Prêmio", nome: "Lucas", descricao: "", numero: "57" },
    { premio: "5º Prêmio", nome: "Carlos", descricao: "", numero: "85" },
  ];

  return (
    <View style={styles.container}>
      {/* BADGE */}
      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={13} color="#22c55e" />
        <Text style={styles.badgeText}>Sorteio #102 encerrado</Text>
      </View>

      {/* TÍTULO */}
      <Text style={styles.titulo}>Resultado Oficial</Text>

      <Text style={styles.subtitulo}>
        Confira abaixo os vencedores dos 5 prêmios sorteados.
      </Text>

      <View style={styles.divider} />

      {/* LISTA DE PREMIADOS */}
      <View style={styles.premiadosContainer}>
        {ganhadores.map((item, index) => {
          if (index === 0) {
            return (
              <View key={index} style={styles.premiadoCardDestaque}>
                <View style={styles.premiadoHeader}>
                  <Ionicons name="trophy" size={24} color="#FFD700" />
                  <Text style={styles.premioTituloDestaque}>
                    {item.premio}
                  </Text>
                </View>

                <View style={styles.premiadoInfoDestaque}>
                  <View>
                    <Text style={styles.nomeDestaque}>
                      {item.nome}
                    </Text>

                    {item.descricao ? (
                      <Text style={styles.subNomeDestaque}>
                        {item.descricao}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.numeroDestaque}>
                    <Text style={styles.numeroDestaqueTexto}>
                      {item.numero}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }

          return (
            <View key={index} style={styles.premiadoCard}>
              <View style={styles.premiadoHeader}>
                <Ionicons name="ribbon" size={18} color="#2375ef" />
                <Text style={styles.premioTitulo}>
                  {item.premio}
                </Text>
              </View>

              <View style={styles.premiadoInfo}>
                <Text style={styles.nomePremiado}>
                  {item.nome}
                </Text>

                <View style={styles.numeroMini}>
                  <Text style={styles.numeroMiniTexto}>
                    {item.numero}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* FOOTER */}
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
    width: "100%",
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
    shadowOffset: { width: 0, height: 5 },
  },

  /* BADGE */
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

  premiadosContainer: {
    gap: 12,
    marginBottom: 24,
  },

  /* =========================
     1º PRÊMIO (DESTAQUE)
  ========================= */
  premiadoCardDestaque: {
    backgroundColor: "rgba(255,215,0,0.08)",
    borderWidth: 2,
    borderColor: "rgba(255,215,0,0.5)",
    borderRadius: 20,
    padding: 18,
  },

  premiadoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  premioTituloDestaque: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "800",
  },

  premiadoInfoDestaque: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nomeDestaque: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },

  subNomeDestaque: {
    color: "rgba(255,215,0,0.8)",
    fontSize: 13,
    marginTop: 2,
    fontWeight: "500",
  },

  numeroDestaque: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,215,0,0.15)",
    borderWidth: 2,
    borderColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
  },

  numeroDestaqueTexto: {
    color: "#FFD700",
    fontSize: 26,
    fontWeight: "900",
  },

  /* =========================
     DEMAIS PRÊMIOS
  ========================= */
  premiadoCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 16,
  },

  premioTitulo: {
    color: "#c0c0c0",
    fontSize: 13,
    fontWeight: "700",
  },

  premiadoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nomePremiado: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  numeroMini: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(35,117,239,0.12)",
    borderWidth: 1,
    borderColor: "#2375ef",
    alignItems: "center",
    justifyContent: "center",
  },

  numeroMiniTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* FOOTER */
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