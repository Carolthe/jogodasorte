import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async () => {
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/usuarios/login", { email, senha });
      const data = response.data;

      login(data.usuario, data.token);

      router.replace("/");
    } catch (error: any) {
      const mensagem = error.response?.data?.error?.toLowerCase() ?? "";

      if (mensagem.includes("email")) {
        setErro("Email incorreto");
      } else if (mensagem.includes("senha")) {
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

      {/* VOLTAR */}
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.replace("/")}>
        <Ionicons name="arrow-back" size={20} color="#3d3aed" />
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="person-circle-outline" size={32} color="#3d3aed" />
        </View>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>
          Digite suas credenciais para acessar sua conta
        </Text>
      </View>

      {/* ERRO */}
      {erro ? (
        <View style={styles.erroBox}>
          <Ionicons name="alert-circle-outline" size={16} color="#f87171" />
          <Text style={styles.erroText}>{erro}</Text>
        </View>
      ) : null}

      {/* CAMPO NOME */}
      <View style={styles.fieldWrapper}>
        <View style={styles.labelRow}>
          <Ionicons name="person-outline" size={14} color="#3d3aed" style={{ marginRight: 5 }} />
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          placeholderTextColor="#a0a0b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* CAMPO SENHA */}
      <View style={styles.fieldWrapper}>
        <View style={styles.labelRow}>
          <Ionicons name="lock-closed-outline" size={14} color="#3d3aed" style={{ marginRight: 5 }} />
          <Text style={styles.label}>Senha</Text>
        </View>
        <View style={styles.senhaRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Digite sua senha"
            placeholderTextColor="#a0a0b8"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setMostrarSenha((v) => !v)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#a0a0b8"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTÃO ENTRAR */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Entrar</Text>
          </>
        )}
      </TouchableOpacity>

      {/* CRIAR CONTA */}
      <TouchableOpacity style={styles.registerLink} onPress={() => router.push("/registro")}>
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.registerHighlight}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.recuperarSenha} onPress={() => router.push("/recuperar-senha")}>
        <Text style={styles.recuperarText}>Recuperar senha </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    padding: 20,
    paddingTop: 20,
  },

  // VOLTAR
  voltarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    marginBottom: 20,
  },
  voltarText: {
    color: "#3d3aed",
    fontSize: 14,
    fontWeight: "500",
  },

  // HEADER
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#3d3aed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#a0a0b8",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },

  // ERRO
  erroBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(248,113,113,0.1)",
    borderWidth: 0.5,
    borderColor: "#f87171",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  erroText: {
    color: "#f87171",
    fontSize: 14,
    flex: 1,
  },

  // CAMPOS
  fieldWrapper: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1a1a2e",
    padding: 14,
    borderRadius: 10,
    color: "#fff",
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    fontSize: 15,
  },
  senhaRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    paddingRight: 12,
  },
  eyeBtn: {
    padding: 4,
  },

  // BOTÃO
  button: {
    backgroundColor: "#3d3aed",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // CRIAR CONTA
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  recuperarSenha: {
    marginTop: 10,
    alignItems: "center",
  },
  registerText: {
    color: "#a0a0b8",
    fontSize: 15,
  },
   recuperarText: {
    color: "#a0a0b8",
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  registerHighlight: {
    color: "#3d3aed",
    fontWeight: "bold",
  },
});