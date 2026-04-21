import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import api from "@/src/services/api";
import CardAlertPagamento from "./CardAlertPagamento";

type Props = {
  valor: string;
};

type QrCodeData = {
  pix_pagamento?: string;
  imagem?: string;
};

export default function CardQrCode({ valor }: Props) {
  const [copiado, setCopiado] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState<{ uri: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function carregarPix() {
      try {
        const response = await api.get<QrCodeData>("/apostas/qrcode-pix");
        const data = response.data;

        if (data?.pix_pagamento) {
          setPixKey(data.pix_pagamento);
        }

        if (data?.imagem && typeof data.imagem === "string") {
          setQrCodeImage({ uri: data.imagem.trim() });
        }
      } catch (error) {
        console.log("Erro ao buscar PIX:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarPix();
  }, []);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(pixKey);
    setCopiado(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setCopiado(false);
    }, 1800);
  };

  const handleConfirm = () => {
    setProcessando(true);
    setTimeout(() => {
      setProcessando(false);
      setMostrarAlerta(true);
      setConfirmado(true);
    }, 5000);
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <Text style={{ color: "#fff" }}>Carregando PIX...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.qrContainer}>
        {qrCodeImage ? (
          <Image source={qrCodeImage} style={styles.qrImage} />
        ) : (
          <Text style={{ color: "#000" }}>QR Code não encontrado</Text>
        )}
      </View>

      <Text style={styles.labelCenter}>Valor a pagar</Text>
      <Text style={styles.valor}>R$ {valor}</Text>

      <Text style={styles.copyLabel}>Copie o código PIX</Text>

      <View style={styles.copyContainer}>
        <Text style={styles.pixKey} numberOfLines={1}>
          {pixKey}
        </Text>
        <TouchableOpacity
          style={[styles.copyButton, copiado && styles.copyButtonActive]}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Ionicons
            name={copiado ? "checkmark" : "copy-outline"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.copiadoText}>Código copiado</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}
        activeOpacity={0.8}
      >
        <Text style={styles.confirmText}>
          {confirmado ? "Obrigado!" : processando ? "Processando..." : "Confirmar Pagamento"}
        </Text>
      </TouchableOpacity>

      {mostrarAlerta && <CardAlertPagamento />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    margin: 5,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2e2e50",
  },
  qrContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 16,
    marginBottom: 20,
  },
  qrImage: {
    width: 180,
    height: 180,
  },
  labelCenter: {
    color: "#a0a0b8",
    textAlign: "center",
    fontSize: 14,
  },
  valor: {
    color: "#d8b4fe",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 4,
  },
  copyLabel: {
    color: "#e5e7eb",
    marginBottom: 8,
    fontSize: 14,
  },
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12122a",
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },
  pixKey: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
  },
  copyButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#2e2e50",
    borderRadius: 8,
  },
  copyButtonActive: {
    backgroundColor: "#22c55e",
  },
  copiadoText: {
    color: "#22c55e",
    marginTop: 10,
    fontSize: 13,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#7c3aed",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});