import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import api from "@/src/services/api";

type Props = {
  id_compra: string;
  onGerar: () => void;
};

export default function CardFormularioPix({ id_compra, onGerar }: Props) {
  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");

  const isFormValid = pixKey.trim() !== "" && name.trim() !== "";

  const handleGenerate = async () => {
    if (!isFormValid) return;

      console.log("ENVIANDO:", {   // ✅ adicione isto
    id_compra: id_compra,
    chavepix_dono: pixKey,
    nome_titular: name,
  });

    try {
      await api.post("/apostas/pagar", {
        id_compra: id_compra,
        chavepix_dono: pixKey,
        nome_titular: name,
      });

      onGerar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados para Pagamento</Text>
      <Text style={styles.subtitle}>
        Informe seus dados para gerar o código PIX
      </Text>

      <Text style={styles.label}>Chave PIX</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF, Email, Telefone ou chave aleatória"
        placeholderTextColor="#aaa"
        value={pixKey}
        onChangeText={setPixKey}
      />
      <Text style={styles.helper}>Chave PIX da conta que fará o pagamento</Text>

      <Text style={styles.label}>Nome do Titular</Text>
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
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleGenerate}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Gerar QR Code PIX</Text>
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
    borderColor: "#2e2e50",
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
    backgroundColor: "#003480",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#3d1f7a",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});