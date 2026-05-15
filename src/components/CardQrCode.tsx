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
  id_compra: string;
  onRedirecionar: () => void;
};

type QrCodeData = {
  chave_pix?: string;
  qr_code?: string;
};

const TEMPO_TOTAL = 5 * 60; // 5 minutos (troque para 15 * 60 se quiser 15 min)

export default function CardQrCode({ valor, id_compra, onRedirecionar }: Props) {
  const [copiado, setCopiado]         = useState(false);
  const [pixKey, setPixKey]           = useState("");
  const [qrCodeImage, setQrCodeImage] = useState<{ uri: string } | null>(null);
  const [loading, setLoading]         = useState(true);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [confirmado, setConfirmado]   = useState(false);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_TOTAL);

  const fadeAnim = useState(new Animated.Value(0))[0];

  // ── Carrega PIX ────────────────────────────────────────────────────────────
  useEffect(() => {
    async function carregarPix() {
      try {
        const response = await api.get<QrCodeData>(`/apostas/qrcode-pix?id_compra=${id_compra}`);
        const data = response.data;
        if (data?.chave_pix) setPixKey(data.chave_pix);
        if (data?.qr_code)   setQrCodeImage({ uri: data.qr_code.trim() });
      } catch (error) {
        console.log("Erro ao buscar PIX:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPix();
  }, []);

  // ── Timer countdown ────────────────────────────────────────────────────────
  useEffect(() => {
    if (confirmado) return; // para o timer se já confirmou

    const intervalo = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          // ✅ tempo esgotado → redireciona imediatamente
          onRedirecionar();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [confirmado]);

  // ── Confirmar pagamento → redireciona após 1 minuto ───────────────────────
  const handleConfirm = () => {
    if (tempoRestante === 0 || confirmado) return;
    setProcessando(true);

    setTimeout(() => {
      setProcessando(false);
      setMostrarAlerta(true);
      setConfirmado(true);

      // ✅ redireciona após 60 segundos
      setTimeout(() => {
        onRedirecionar();
      }, 20 * 1000);
    }, 5000);
  };

  // ── Copy PIX ───────────────────────────────────────────────────────────────
  const handleCopy = async () => {
    await Clipboard.setStringAsync(pixKey);
    setCopiado(true);

    Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
      setCopiado(false);
    }, 1800);
  };

  // ── Formata tempo ──────────────────────────────────────────────────────────
  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };
  const expirado = tempoRestante === 0;

 

  if (loading) {
    return (
      <View style={styles.card}>
        <Text style={{ color: "#fff" }}>Carregando PIX...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>

      {/* QR CODE */}
      <View style={styles.qrContainer}>
        {qrCodeImage ? (
          <Image source={qrCodeImage} style={styles.qrImage} />
        ) : (
          <Text style={{ color: "#a0a0b8" }}>QR Code não encontrado</Text>
        )}
      </View>

      {/* VALOR */}
      <Text style={styles.labelCenter}>Valor a pagar</Text>
      <Text style={styles.valor}>R$ {valor}</Text>

      {/* CHAVE PIX */}
      <Text style={styles.copyLabel}>Copie o código PIX e cole no seu Banco para fazer o pagamento:</Text>
      <View style={styles.copyContainer}>
        <Text style={styles.pixKey} numberOfLines={1}>{pixKey}</Text>
        <TouchableOpacity
          style={[styles.copyButton, copiado && styles.copyButtonActive]}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Ionicons name={copiado ? "checkmark" : "copy-outline"} size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.copiadoText}>Código copiado</Text>
      </Animated.View>

      {/* TIMER */}
      <View >
        <Text style={styles.timerContagem}>
          Tempo para efetuar o pix: {formatarTempo(tempoRestante)}
        </Text>

       
      </View>

      {/* BOTÃO CONFIRMAR */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          (expirado || confirmado) && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        activeOpacity={0.8}
        disabled={expirado || confirmado}
      >
        <Text style={styles.confirmText}>
          {expirado   ? "Tempo expirado"
          : confirmado ? "Obrigada"
          : processando ? "Processando..."
          : "Confirmar Pagamento"}
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
    backgroundColor: "#171724",
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
    color: "#A8C7FA",
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
    marginTop: 5,
    fontSize: 13,
    textAlign: "center",
  },

  // TIMER
 
  timerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  timerContagem: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: 'white'
  },
  progressoBar: {
    height: 4,
    backgroundColor: "#2e2e50",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressoFill: {
    height: "100%",
    borderRadius: 99,
  },
  timerAviso: {
    color: "#f87171",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  timerAviso2: {
    color: "#22c55e",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },

  // BOTÃO
  confirmButton: {
    backgroundColor: "#007ACC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: "#2e2e50",
    opacity: 0.6,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});