import { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import api from "@/src/services/api";

type Props = {
  numeros: string;
  valor: string;
  modalidade: "rifa" | "grupo";

  id_usuario: number;

  onGerar: (id_compra: string) => void;
};

export default function CardFormularioPix({
  numeros,
  valor,
  modalidade,
  id_usuario,
  onGerar,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const numerosArray = JSON.parse(numeros);

      const valorTotal = Number(valor);

      let response;

      // RIFA
      if (modalidade === "rifa") {
        response = await api.post("/rifa/compras", {
          id_usuario,
          total_numeros: numerosArray.length,
          valor_total: valorTotal,
          numeros: numerosArray,
        });
      }

      // GRUPO
      if (modalidade === "grupo") {
        response = await api.post("/grupo/compras", {
          id_usuario,
          quantidade: numerosArray.length,
          valor: valorTotal,
          grupos: numerosArray,
        });
      }

      if (!response?.data?.id_compra) {
        throw new Error("Compra não criada");
      }

      onGerar(String(response.data.id_compra));
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Erro",
        error?.response?.data?.erro ||
          "Erro ao gerar QR Code PIX"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Finalizar Compra
      </Text>

      <Text style={styles.subtitle}>
        Clique no botão abaixo para gerar o QR Code PIX e efetuar o pagamento no seu banco.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Gerando PIX..."
            : "Gerar QR Code PIX"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a2e",
    padding: 15,
    borderRadius: 16,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#2c2c7d",
    paddingBottom: 30,
    marginTop: 15,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    color: "#a0a0b8",
    marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007ACC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#1f287a",
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});