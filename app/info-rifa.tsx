import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/src/components/Header";
import VoltarHome from "@/src/components/VoltarHome";

// LINKS WEB (fallback)
const INSTAGRAM_WEB = "https://www.instagram.com/sorte_winner/";
const WHATSAPP_WEB = "https://chat.whatsapp.com/Hf8uR2zqibu82E1tTn0bgc";
const YOUTUBE_WEB = "https://youtube.com/@1palpitesxandejb";

// DEEP LINKS (apps)
const INSTAGRAM_APP = "instagram://user?username=sorte_winner";
const YOUTUBE_APP = "vnd.youtube://channel/"; // se tiver ID do canal, melhor ainda

// 🔥 FUNÇÃO UNIVERSAL
const openLink = async (appUrl: string, webUrl: string) => {
  try {
    const supported = await Linking.canOpenURL(appUrl);

    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    console.log("Erro ao abrir link:", error);
    await Linking.openURL(webUrl);
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
          <Text style={styles.subtitulo}>
            Tire suas duvidas
          </Text>
        </View>

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
            <Text
              style={styles.youtubelink}
              onPress={() => openLink(YOUTUBE_APP, YOUTUBE_WEB)}
            >
              Acesse pelo YouTube, Clique aqui.
            </Text>
          </Item>

          <Item numero={3} icon="time" cor="#7a9dd1">
            O sorteio ocorrerá assim que a banca for fechada.
          </Item>
        </View>

        {/* REDES SOCIAIS */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name="share-social" size={16} color="#7a9dd1" />
            <Text style={styles.secaoTitulo}>Redes Sociais e Suporte</Text>
          </View>

          <Item numero={5} icon="logo-instagram" cor="#7a9dd1">
            Siga-nos no Instagram.
          </Item>

          <Item numero={7} icon="logo-whatsapp" cor="#7a9dd1">
            Entre no grupo do WhatsApp.
          </Item>

          {/* INSTAGRAM */}
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => openLink(INSTAGRAM_APP, INSTAGRAM_WEB)}
          >
            <Ionicons name="logo-instagram" size={18} color="#fff" />
            <Text style={styles.linkBtnTexto}>Acessar Instagram</Text>
          </TouchableOpacity>

          {/* WHATSAPP */}
          <TouchableOpacity
            style={[styles.linkBtn, { backgroundColor: "#25D366" }]}
            onPress={() => openLink(WHATSAPP_WEB, WHATSAPP_WEB)}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.linkBtnTexto}>Entrar no WhatsApp</Text>
          </TouchableOpacity>

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
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2e2e50",
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
    borderWidth: 0.5,
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

  youtubelink: {
    color: "#1b64d2",
    textDecorationLine: "underline",
  },

  linkBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#007ACC",
    paddingVertical: 12,
    borderRadius: 10,
  },
  linkBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});