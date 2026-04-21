import { useState } from "react";
import {
  Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/src/services/api";

export default function Registro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pix, setPix] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleRegister = async () => {
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("Senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      await api.post("/usuarios/registro", {
        nome, email, telefone, pix_receber: pix, senha,
      });
      router.replace("/login");
    } catch {
      setErro("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {(["Nome", "Email", "Telefone", "PIX"] as const).map((label, i) => (
        <TextInput
          key={label}
          placeholder={label}
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={[setNome, setEmail, setTelefone, setPix][i]}
        />
      ))}

      <TextInput placeholder="Senha" placeholderTextColor="#666" secureTextEntry onChangeText={setSenha} style={styles.input} />
      <TextInput placeholder="Confirmar senha" placeholderTextColor="#666" secureTextEntry onChangeText={setConfirmarSenha} style={styles.input} />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Criar Conta</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#0e0e0e", flexGrow: 1, gap: 16 },
  title: { color: "#fff", fontSize: 24, marginBottom: 10 },
     input: {
    backgroundColor: "#0d161f",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  button: { backgroundColor: '#7c3aed', padding: 15, marginTop: 20, borderRadius: 6, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  erro: { color: "red", marginTop: 10 },
  link: { color: "#aaa", marginTop: 20, textAlign: "center" },
});