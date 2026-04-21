import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/AuthContext"; // ✅ corrigido

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    setErro("");

    if (!nome || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/usuarios/login", { nome, senha });
      const data = response.data;
      login(data.usuario, data.token);
      router.replace("/");
    } catch (error: any) {
      const mensagem = error.response?.data?.error ?? "";
      if (mensagem.toLowerCase().includes("nome")) {
        setErro("Nome incorreto");
      } else if (mensagem.toLowerCase().includes("senha")) {
        setErro("Senha incorreta");
      } else {
        setErro("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Entrar</Text> // ✅ texto com estilo
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/registro")}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, padding: 20, backgroundColor: "#0e0e0e" },
  title: { color: "#fff", fontSize: 28, textAlign: "center", marginBottom: 20 },
    input: {
    backgroundColor: "#12122a",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  button: { backgroundColor: '#7c3aed', marginTop: 20, padding: 15, borderRadius: 6, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  erro: { color: "red", marginTop: 10, textAlign: "center" },
  link: { color: "#aaa", marginTop: 20, textAlign: "center" },
});