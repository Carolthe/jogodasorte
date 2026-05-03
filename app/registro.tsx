import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "@/src/services/api";

export default function Registro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pix_receber, setPix_receber] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleRegister = async () => {
    setErro("");

    if (!nome || !email || !telefone || !pix_receber || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      setErro("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);

      await api.post("/usuarios/registro", {
        nome,
        email,
        telefone,
        pix_receber,
        senha,
      });

      router.replace("/login");
    } catch (error: any) {
      const mensagem = error.response?.data?.error?.toLowerCase() ?? "";

      if (mensagem.includes("email")) {
        setErro("Email inválido ou já cadastrado");
      } else if (mensagem.includes("senha")) {
        setErro("Senha inválida");
      } else if (mensagem.includes("telefone")) {
        setErro("Telefone inválido");
      } else if (mensagem.includes("nome")) {
        setErro("Nome inválido");
      } else {
        setErro(error.response?.data?.error || "Erro ao criar conta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* VOLTAR */}
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.replace("/login")}>
        <Ionicons name="arrow-back" size={20} color="#003480" />
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="person-add" size={28} color="#003480" />
        </View>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados para se cadastrar</Text>
      </View>

      {/* ERRO */}
      {erro ? (
        <View style={styles.erroBox}>
          <Ionicons name="alert-circle-outline" size={16} color="#f87171" />
          <Text style={styles.erroText}>{erro}</Text>
        </View>
      ) : null}

      {/* CAMPOS */}
      <View style={styles.form}>

        <Field label="Nome" icon="person-outline">
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#a0a0b8"
            value={nome}
            onChangeText={setNome}
          />
        </Field>

        <Field label="Email" icon="mail-outline">
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#a0a0b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Field>

        <Field label="Telefone" icon="call-outline">
          <TextInput
            style={styles.input}
            placeholder="(11) 99999-9999"
            placeholderTextColor="#a0a0b8"
            keyboardType="numeric"
            value={telefone}
            onChangeText={(t) => setTelefone(t.replace(/[^0-9]/g, ""))}
          />
        </Field>

        <Field label="Chave PIX para receber prêmios" icon="wallet-outline">
          <TextInput
            style={styles.input}
            placeholder="CPF, Email, Telefone ou Aleatória"
            placeholderTextColor="#a0a0b8"
            value={pix_receber}
            onChangeText={setPix_receber}
            autoCapitalize="none"
          />
        </Field>

        <Field label="Senha" icon="lock-closed-outline">
          <View style={styles.senhaRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mínimo 6 caracteres"
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
        </Field>

        <Field label="Confirmar Senha" icon="shield-checkmark-outline">
          <View style={styles.senhaRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Digite a senha novamente"
              placeholderTextColor="#a0a0b8"
              secureTextEntry={!mostrarConfirmar}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setMostrarConfirmar((v) => !v)}
            >
              <Ionicons
                name={mostrarConfirmar ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#a0a0b8"
              />
            </TouchableOpacity>
          </View>
        </Field>

      </View>

      {/* BOTÃO */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Criar Conta</Text>
          </>
        )}
      </TouchableOpacity>

      {/* LINK LOGIN */}
      <TouchableOpacity onPress={() => router.replace("/login")} style={styles.loginLink}>
        <Text style={styles.loginText}>
          Já tem uma conta?{" "}
          <Text style={styles.loginHighlight}>Entrar</Text>
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// ── Componente auxiliar de campo ─────────────────────────────────────────────
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.fieldWrapper}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={14} color="#003480" style={{ marginRight: 5 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0e0e0e",
    flexGrow: 1,
    paddingBottom: 40,
  },

  // VOLTAR
  voltarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    alignSelf: "flex-start",
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#2e2e50",
  },
  voltarText: {
    color: "#003480",
    fontSize: 14,
    fontWeight: "500",
  },

  // HEADER
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#003480",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#a0a0b8",
    fontSize: 14,
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

  // FORM
  form: {
    gap: 4,
  },
  fieldWrapper: {
    marginBottom: 12,
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
    backgroundColor: "#003480",
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

  // LINK LOGIN
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#a0a0b8",
    fontSize: 14,
  },
  loginHighlight: {
    color: "#003480",
    fontWeight: "bold",
  },
});