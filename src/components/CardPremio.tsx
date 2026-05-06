import { Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  titulo?: string;
  valor?: string;
  imagem?: ImageSourcePropType;
  tipo?: "primeiro" | "outros";
};

const config: Record<string, { icon: keyof typeof Ionicons.glyphMap; cor: string; corFundo: string; corBorda: string }> = {
  "1º Lugar": {
    icon: "trophy",
    cor: "#007ACC",
    corFundo: "#231a5e",
    corBorda: " ",
  },
  "outros": {
    icon: "trophy",
    cor: "#1b64d2",
    corFundo: "#1e1a3a",
    corBorda: "#007ACC",
  }
};

export default function CardPremio({
  titulo = "1º Prêmio",
  valor = "R$ 15.000",
  tipo = "outros",
}: Props) {
  const tema = config[tipo];

  return (
    <View style={[styles.card]}>

      <View style={[styles.iconBox, { backgroundColor: tema.corFundo, borderColor: tema.corBorda }]}>
        <Ionicons name={tema.icon} size={22} color={tema.cor} />
      </View>

      <View style={styles.info}>
        <Text style={[styles.titulo, { color: tema.cor }]}>{titulo}</Text>
        <Text style={[styles.valor, { color: tema.cor }]}>{valor}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    gap: 8,
    backgroundColor: "#1a1a2e",
    padding: 14,
    borderRadius: 14,
    borderWidth: 0.5,
    width: '44%',
    marginBottom: 5,
    elevation: 4,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flexDirection: "column",
    gap: 4,
  },
  titulo: {
    fontSize: 13,
    fontWeight: "500",
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
  },
});