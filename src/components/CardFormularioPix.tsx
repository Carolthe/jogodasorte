import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import api from "@/src/services/api";

type Props = {
  numeros: string;
  valor: string;

  // retorna o id da compra criada
  onGerar: (id_compra: string) => void;
};

export default function CardFormularioPix({
  numeros,
  valor,
  onGerar,
}: Props) {

  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const isFormValid =
    pixKey.trim() !== "" &&
    name.trim() !== "";

  // AGORA A COMPRA É CRIADA AQUI
  // SOMENTE AO GERAR QR CODE PIX
  const handleGenerate = async () => {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      // transforma string em array
      const numerosArray = JSON.parse(numeros);

      // calcula valor total
      const valorTotal = Number(valor);

      // cria compra SOMENTE AGORA
      // aqui os números serão reservados
      const response = await api.post(
        "/rifa/compras",
        {
          total_numeros: numerosArray.length,

          valor_total: valorTotal,

          numeros: numerosArray,

          chavepix_dono: pixKey,

          nome_titular: name,
        }
      );

      const compra = response.data;

      // abre QR CODE
      onGerar(compra.id_compra);

    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Erro",
        error?.response?.data?.erro ||
          "Erro ao gerar PIX"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dados para Pagamento
      </Text>

      <Text style={styles.subtitle}>
        Informe seus dados para gerar o código PIX
      </Text>

      <Text style={styles.label}>
        Chave PIX
      </Text>

      <TextInput
        style={styles.input}
        placeholder="CPF, Email, Telefone ou chave aleatória"
        placeholderTextColor="#aaa"
        value={pixKey}
        onChangeText={setPixKey}
      />

      <Text style={styles.helper}>
        Chave PIX da conta que fará o pagamento
      </Text>

      <Text style={styles.label}>
        Nome do Titular
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome como consta no cartão/conta"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.helper}>
        Nome que consta no cartão/conta que fará o pagamento
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          (!isFormValid || loading) &&
            styles.buttonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!isFormValid || loading}
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
    paddingBottom: 40,
    marginTop: 15,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    color: "#a0a0b8",
    marginBottom: 10,
    fontSize: 15,
  },

  label: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 10,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#12122a",
    color: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 8,
    fontSize: 15,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },

  helper: {
    color: "#a0a0b8",
    fontSize: 13,
    marginTop: 4,
  },

  button: {
    backgroundColor: "#007ACC",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
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