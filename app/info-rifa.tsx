import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/src/components/Header";
import VoltarHome from "@/src/components/VoltarHome";

const INSTAGRAM_URL = "https://www.instagram.com/sorte_winner/";
const WHATSAPP_URL = "https://chat.whatsapp.com/Hf8uR2zqibu82E1tTn0bgc";
const YOUTUBE_URL = "https://youtube.com/@1palpitesxandejb?si=0nNAxn2Tq316r8vK";

// 🔥 MOBILE ONLY (web usa <a>)
const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};

type ItemProps = {
  numero: number;
  icon: keyof typeof Ionicons.glyphMap;
  cor?: string;
  children: React.ReactNode;
};

function Item({ numero, icon, cor = "#5558f7", children }: ItemProps) {
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

// 🔥 COMPONENTE LINK UNIVERSAL (resolve 100% o about:blank)
const ExternalLink = ({ url, children }: { url: string; children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {children}
      </a>
    );
  }

  return <TouchableOpacity onPress={() => openLink(url)}>{children}</TouchableOpacity>;
};

export default function InfoRifa() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Header />
      <VoltarHome />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerIconBox}>
            <Ionicons name="information-circle" size={32} color="#1b64d2" />
          </View>
          <Text style={styles.titulo}>Regulamento dos Jogos</Text>
          <Text style={styles.subtitulo}>Tire suas duvidas</Text>
        </View>
        {/* SEÇÃO — PRÊMIOS */}
        {/* <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="trophy" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Duvidas Sobre Prêmios</Text>
          </View>

          <Item numero={1} icon="gift" cor="#7a9dd1">
            Ao comprar um número, você concorre automaticamente aos 5 prêmios.
          </Item>
          <Item numero={2} icon="gift" cor="#7a9dd1">
            O primeiro número concorre a 500 reais, os demais 4 números concorrem a 50 reais cada.
          </Item>
        </View> */}
        {/* SORTEIO */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="videocam" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Sorteio</Text>
          </View>

          <Item numero={1} icon="logo-youtube" cor="#7a9dd1">
            O sorteio será realizado pelo canal Paltites Xande JB.
          </Item>

          <Item numero={2} icon="link" cor="#7a9dd1">
            <ExternalLink url={YOUTUBE_URL}>
              <Text style={styles.linkTexto}>Acesse pelo YouTube, clique aqui</Text>
            </ExternalLink>
          </Item>

          <Item numero={3} icon="time" cor="#7a9dd1">
            O sorteio ocorrerá assim que a banca for fechada.
          </Item>
        </View>

        {/* CONTATO */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="call" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Contato com os Ganhadores</Text>
          </View>

          <Item numero={4} icon="phone-portrait" cor="#22c55e">
            Os ganhadores serão contatados pelo número cadastrado.
          </Item>
        </View>

        {/* REDES SOCIAIS */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="share-social" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Redes Sociais e Suporte</Text>
          </View>

          <Item numero={5} icon="logo-instagram" cor="#7a9dd1">
            Siga-nos no Instagram para ter mais facilidade de acompanhar o sorteio.
          </Item>
          <Item numero={6} icon="notifications" cor="#7a9dd1">
            Para qualquer outra questão, nos envie mensagem pelo instagram.
          </Item>
          <Item numero={7} icon="logo-whatsapp" cor="#7a9dd1">
            Entre no grupo do WhatsApp para receber mensagens sobre o sorteio.
          </Item>
          <View style={styles.secaoHeader}>
            <Ionicons name="share-social" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Redes Sociais</Text>
          </View>

          {/* Instagram */}
          <ExternalLink url={INSTAGRAM_URL}>
            <View style={styles.linkBtn}>
              <Ionicons name="logo-instagram" size={18} color="#fff" />
              <Text style={styles.linkBtnTexto}>Acessar Instagram</Text>
            </View>
          </ExternalLink>

          {/* WhatsApp */}
          <ExternalLink url={WHATSAPP_URL}>
            <View style={[styles.linkBtn, { backgroundColor: "#25D366" }]}>
              <Ionicons name="logo-whatsapp" size={18} color="#fff" />
              <Text style={styles.linkBtnTexto}>Entrar no WhatsApp</Text>
            </View>
          </ExternalLink>
        </View>

        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
          <Text style={styles.rodapeTexto}>
            Sorteio seguro e transparente. Boa sorte!
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

  header: {
    alignItems: "center",
  },
  headerIconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#1b64d2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#a0a0b8",
    fontSize: 14,
  },

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
    borderBottomWidth: 0.5,
    borderBottomColor: "#2e2e50",
    paddingBottom: 10,
  },

  secaoTitulo: {
    color: "#7a9dd1",
    fontSize: 15,
    fontWeight: "600",
  },

  item: {
    flexDirection: "row",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#12122a",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemNumero: {
    color: "#a0a0b8",
    fontSize: 11,
  },
  itemTexto: {
    color: "#e2e2f0",
    fontSize: 14,
  },

  // 🔥 FIX REAL
  linkTexto: {
    color: "#254aee",
    textDecorationLine: "underline",
  },

  linkBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#007ACC",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  linkBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  rodape: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },

  rodapeTexto: {
    color: "#a0a0b8",
    flex: 1,
  },
});