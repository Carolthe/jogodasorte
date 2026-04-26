import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/src/components/Header";
import VoltarHome from "@/src/components/VoltarHome";

const INSTAGRAM_URL = "https://instagram.com/seu_perfil"; // ← substitua
const WHATSAPP_URL  = "https://wa.me/5511999999999";       // ← substitua

type ItemProps = {
  numero: number;
  icon: keyof typeof Ionicons.glyphMap;
  cor?: string;
  children: string;
};

function Item({ numero, icon, cor = "#a855f7", children }: ItemProps) {
  return (
    <View style={styles.item}>
      <View style={[styles.iconBox, { borderColor: cor }]}>
        <Ionicons name={icon} size={18} color={cor} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemNumero}>#{numero}</Text>
        <Text style={styles.itemTexto}>{children}</Text>
      </View>
    </View>
  );
}

export default function InfoRifa() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Header />
      <VoltarHome />

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerIconBox}>
            <Ionicons name="information-circle" size={32} color="#a855f7" />
          </View>
          <Text style={styles.titulo}>Regulamento da Rifa</Text>
          <Text style={styles.subtitulo}>
            Tire suas duvidas
          </Text>
        </View>

        {/* SEÇÃO — PRÊMIOS */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="trophy" size={16} color="#d8b4fe" />
            <Text style={styles.secaoTitulo}>Duvidas Sobre Prêmios</Text>
          </View>

          <Item numero={1} icon="gift" cor="#d8b4fe">
            Ao participar da rifa, você concorre automaticamente a dois prêmios sorteados no mesmo dia, um logo após o outro.
          </Item>

          <View style={styles.premioCard}>
            <View style={styles.premioHeader}>
              <Ionicons name="trophy" size={14} color="#d8b4fe" />
              <Text style={styles.premioLabel}>1º Prêmio</Text>
            </View>
            <Text style={styles.premioValor}>R$ 15.000</Text>
            <Text style={styles.premioDesc}>
              Enviado diretamente para a chave PIX cadastrada no momento da compra.
            </Text>
          </View>

          <View style={[styles.premioCard, { borderColor: "#7c3aed" }]}>
            <View style={styles.premioHeader}>
              <Ionicons name="medal" size={14} color="#a855f7" />
              <Text style={[styles.premioLabel, { color: "#a855f7" }]}>2º Prêmio</Text>
            </View>
            <Text style={[styles.premioValor, { color: "#a855f7" }]}>Viagem + R$ 2.000</Text>
            <Text style={styles.premioDesc}>
              Duas passagens aéreas para o Rio de Janeiro, hotel pago por 2 dias com café da manhã incluso para duas pessoas, mais R$ 2.000 em dinheiro enviados via PIX.
            </Text>
          </View>
        </View>

        {/* SEÇÃO — SORTEIO */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="videocam" size={16} color="#d8b4fe" />
            <Text style={styles.secaoTitulo}>Sorteio</Text>
          </View>

          <Item numero={2} icon="logo-tiktok" cor="#d8b4fe">
            O sorteio será realizado ao vivo na plataforma TikTok.
          </Item>
          <Item numero={3} icon="link" cor="#a855f7">
            O link da transmissão será publicado aqui na plataforma e no instagram.
          </Item>
          <Item numero={4} icon="time" cor="#a855f7">
            O sorteio ocorrerá o mais breve possível, assim que todos os números forem vendidos.
          </Item>
          <Item numero={5} icon="notifications" cor="#a855f7">
            Fique atento a plataforma para não perder nenhuma novidade, acesse  também o nosso instagram.
          </Item>
        </View>

        {/* SEÇÃO — GANHADORES */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="call" size={16} color="#d8b4fe" />
            <Text style={styles.secaoTitulo}>Contato com os Ganhadores</Text>
          </View>

          <Item numero={6} icon="phone-portrait" cor="#22c55e">
            Os ganhadores serão contatados pelo número de telefone cadastrado. Certifique-se de que o número está correto.
          </Item>
        </View>

        {/* SEÇÃO — REDES SOCIAIS */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="share-social" size={16} color="#d8b4fe" />
            <Text style={styles.secaoTitulo}>Redes Sociais e Suporte</Text>
          </View>

          <Item numero={7} icon="logo-instagram" cor="#e1306c">
            Siga-nos no Instagram para ter mais facilidade de acompanhar o sorteio.
          </Item>
          <Item numero={8} icon="notifications" cor="#e1306c">
            Para qualquer outra questão, nos envie mensagem pelo instagram.
          </Item>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => Linking.openURL(INSTAGRAM_URL)}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-instagram" size={18} color="#fff" />
            <Text style={styles.linkBtnTexto}>Acessar Instagram</Text>
          </TouchableOpacity>

          {/* <Item numero={8} icon="chatbubble-ellipses" cor="#a855f7">
            Tem alguma dúvida? Não hesite em nos enviar uma mensagem. Estamos aqui para ajudar!
          </Item>

          <TouchableOpacity
            style={[styles.linkBtn, { backgroundColor: "#25D366" }]}
            onPress={() => Linking.openURL(WHATSAPP_URL)}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.linkBtnTexto}>Falar no WhatsApp</Text>
          </TouchableOpacity> */}
        </View>

        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
          <Text style={styles.rodapeTexto}>
            Rifa segura e transparente. Boa sorte a todos os participantes!
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0e0e0e",
  },
  container: {
    paddingHorizontal: 20,
    gap: 20,
  },

  // HEADER
  header: {
    alignItems: "center",
  },
  headerIconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitulo: {
    color: "#a0a0b8",
    fontSize: 14,
  },

  // SEÇÃO
  secao: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    gap: 12,
  },
  secaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2e2e50",
  },
  secaoTitulo: {
    color: "#d8b4fe",
    fontSize: 15,
    fontWeight: "600",
  },

  // ITEM
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#12122a",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  itemNumero: {
    color: "#a0a0b8",
    fontSize: 11,
    fontWeight: "500",
  },
  itemTexto: {
    color: "#e2e2f0",
    fontSize: 14,
    lineHeight: 20,
  },

  // CARDS DE PRÊMIO
  premioCard: {
    backgroundColor: "#12122a",
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#2e1a5e",
    gap: 4,
  },
  premioHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  premioLabel: {
    color: "#d8b4fe",
    fontSize: 13,
    fontWeight: "600",
  },
  premioValor: {
    color: "#d8b4fe",
    fontSize: 22,
    fontWeight: "bold",
  },
  premioDesc: {
    color: "#a0a0b8",
    fontSize: 13,
    lineHeight: 19,
  },

  // BOTÕES DE LINK
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#7c3aed",
    paddingVertical: 12,
    borderRadius: 10,
  },
  linkBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  // RODAPÉ
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(34,197,94,0.08)",
    borderWidth: 0.5,
    borderColor: "#22c55e",
    borderRadius: 10,
    padding: 12,
  },
  rodapeTexto: {
    color: "#a0a0b8",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});