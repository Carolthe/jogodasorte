import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "@/src/services/api";

type Etapa = "email" | "codigo" | "nova-senha" | "sucesso";

export default function RecuperarSenha() {
  const router = useRouter();

  const [etapa, setEtapa] = useState<Etapa>("email");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // ── ETAPA 1: enviar email ────────────────────────────────────────────────
  const handleEnviarEmail = async () => {
    setErro("");
    if (!email.trim()) { setErro("Informe seu email"); return; }

    try {
      setLoading(true);
      await api.post("/usuarios/recuperar-senha", { email });
      setEtapa("codigo");
    } catch (error: any) {
      setErro(error.response?.data?.error || "Email não encontrado");
    } finally {
      setLoading(false);
    }
  };

  // ── ETAPA 2: validar código ──────────────────────────────────────────────
  const handleValidarCodigo = async () => {
    setErro("");
    if (codigo.length < 4) { setErro("Código inválido"); return; }

    try {
      setLoading(true);
      await api.post("/usuarios/validar-codigo", { email, codigo });
      setEtapa("nova-senha");
    } catch (error: any) {
      setErro(error.response?.data?.error || "Código incorreto ou expirado");
    } finally {
      setLoading(false);
    }
  };

  // ── ETAPA 3: nova senha ──────────────────────────────────────────────────
  const handleNovaSenha = async () => {
    setErro("");
    if (novaSenha.length < 6) { setErro("Senha deve ter no mínimo 6 caracteres"); return; }
    if (novaSenha !== confirmarSenha) { setErro("As senhas não coincidem"); return; }

    try {
      setLoading(true);
      await api.post("/usuarios/redefinir-senha", { email, codigo, novaSenha });
      setEtapa("sucesso");
    } catch (error: any) {
      setErro(error.response?.data?.error || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* VOLTAR */}
      {etapa !== "sucesso" && (
        <TouchableOpacity
          style={styles.voltarBtn}
          onPress={() => etapa === "email" ? router.replace("/login") : setEtapa(etapa === "nova-senha" ? "codigo" : "email")}
        >
          <Ionicons name="arrow-back" size={20} color="#3d3aed" />
          <Text style={styles.voltarText}>Voltar</Text>
        </TouchableOpacity>
      )}

      {/* STEPPER */}
      {etapa !== "sucesso" && (
        <View style={styles.stepper}>
          {(["email", "codigo", "nova-senha"] as Etapa[]).map((e, i) => {
            const steps: Etapa[] = ["email", "codigo", "nova-senha"];
            const atual = steps.indexOf(etapa);
            const done  = i < atual;
            const ativo = i === atual;
            return (
              <View key={e} style={styles.stepRow}>
                <View style={[
                  styles.stepCircle,
                  ativo && styles.stepCircleAtivo,
                  done  && styles.stepCircleDone,
                ]}>
                  {done
                    ? <Ionicons name="checkmark" size={12} color="#fff" />
                    : <Text style={[styles.stepNum, ativo && { color: "#fff" }]}>{i + 1}</Text>
                  }
                </View>
                {i < 2 && (
                  <View style={[styles.stepLine, done && styles.stepLineDone]} />
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* ── ETAPA 1: EMAIL ──────────────────────────────────────────────── */}
      {etapa === "email" && (
        <>
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="mail-outline" size={30} color="#3d3aed" />
            </View>
            <Text style={styles.title}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
              Informe o email cadastrado na sua conta. Enviaremos um código de verificação.
            </Text>
          </View>

          {erro ? <ErroBox msg={erro} /> : null}

          <View style={styles.fieldWrapper}>
            <LabelIcon icon="mail-outline" label="Email" />
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#a0a0b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleEnviarEmail}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="send-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Enviar código</Text>
                </>
            }
          </TouchableOpacity>
        </>
      )}

      {/* ── ETAPA 2: CÓDIGO ─────────────────────────────────────────────── */}
      {etapa === "codigo" && (
        <>
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="keypad-outline" size={30} color="#3d3aed" />
            </View>
            <Text style={styles.title}>Digite o Código</Text>
            <Text style={styles.subtitle}>
              Enviamos um código de verificação para{"\n"}
              <Text style={styles.emailDestaque}>{email}</Text>
            </Text>
          </View>

          {erro ? <ErroBox msg={erro} /> : null}

          <View style={styles.fieldWrapper}>
            <LabelIcon icon="keypad-outline" label="Código de verificação" />
            <TextInput
              style={[styles.input, styles.inputCodigo]}
              placeholder="000000"
              placeholderTextColor="#a0a0b8"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleValidarCodigo}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="checkmark-circle-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Validar código</Text>
                </>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.reenviarBtn} onPress={handleEnviarEmail}>
            <Ionicons name="refresh-outline" size={14} color="#3d3aed" />
            <Text style={styles.reenviarText}>Reenviar código</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ── ETAPA 3: NOVA SENHA ─────────────────────────────────────────── */}
      {etapa === "nova-senha" && (
        <>
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-open-outline" size={30} color="#3d3aed" />
            </View>
            <Text style={styles.title}>Nova Senha</Text>
            <Text style={styles.subtitle}>
              Crie uma nova senha segura para sua conta.
            </Text>
          </View>

          {erro ? <ErroBox msg={erro} /> : null}

          <View style={styles.fieldWrapper}>
            <LabelIcon icon="lock-closed-outline" label="Nova senha" />
            <View style={styles.senhaRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#a0a0b8"
                secureTextEntry={!mostrarSenha}
                value={novaSenha}
                onChangeText={setNovaSenha}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setMostrarSenha(v => !v)}>
                <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={18} color="#a0a0b8" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <LabelIcon icon="shield-checkmark-outline" label="Confirmar nova senha" />
            <View style={styles.senhaRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Repita a nova senha"
                placeholderTextColor="#a0a0b8"
                secureTextEntry={!mostrarConfirmar}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setMostrarConfirmar(v => !v)}>
                <Ionicons name={mostrarConfirmar ? "eye-off-outline" : "eye-outline"} size={18} color="#a0a0b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* indicador de força */}
          <ForcaSenha senha={novaSenha} />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleNovaSenha}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="save-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Salvar nova senha</Text>
                </>
            }
          </TouchableOpacity>
        </>
      )}

      {/* ── ETAPA 4: SUCESSO ────────────────────────────────────────────── */}
      {etapa === "sucesso" && (
        <View style={styles.sucessoContainer}>
          <View style={styles.sucessoIconBox}>
            <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
          </View>
          <Text style={styles.sucessoTitle}>Senha redefinida!</Text>
          <Text style={styles.sucessoSubtitle}>
            Sua senha foi alterada com sucesso. Faça login com sua nova senha.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/login")}
            activeOpacity={0.85}
          >
            <Ionicons name="log-in-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Ir para o Login</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

// ── Componentes auxiliares ───────────────────────────────────────────────────

function ErroBox({ msg }: { msg: string }) {
  return (
    <View style={styles.erroBox}>
      <Ionicons name="alert-circle-outline" size={16} color="#f87171" />
      <Text style={styles.erroText}>{msg}</Text>
    </View>
  );
}

function LabelIcon({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.labelRow}>
      <Ionicons name={icon} size={14} color="#3d3aed" style={{ marginRight: 5 }} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function ForcaSenha({ senha }: { senha: string }) {
  const forca = senha.length === 0 ? 0
    : senha.length < 6 ? 1
    : senha.length < 8 ? 2
    : /[A-Z]/.test(senha) && /[0-9]/.test(senha) ? 4
    : 3;

  const labels = ["", "Fraca", "Razoável", "Boa", "Forte"];
  const cores  = ["#2e2e50", "#f87171", "#fb923c", "#3d3aed", "#22c55e"];

  if (senha.length === 0) return null;

  return (
    <View style={styles.forcaWrapper}>
      <View style={styles.forcaBars}>
        {[1,2,3,4].map(i => (
          <View
            key={i}
            style={[styles.forcaBar, { backgroundColor: i <= forca ? cores[forca] : "#2e2e50" }]}
          />
        ))}
      </View>
      <Text style={[styles.forcaLabel, { color: cores[forca] }]}>{labels[forca]}</Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0e0e0e",
    flexGrow: 1,
    paddingBottom: 40,
  },

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
    marginBottom: 24,
  },
  voltarText: {
    color: "#3d3aed",
    fontSize: 14,
    fontWeight: "500",
  },

  // STEPPER
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleAtivo: {
    backgroundColor: "#3d3aed",
    borderColor: "#3d3aed",
  },
  stepCircleDone: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  stepNum: {
    color: "#a0a0b8",
    fontSize: 12,
    fontWeight: "bold",
  },
  stepLine: {
    width: 40,
    height: 1,
    backgroundColor: "#2e2e50",
    marginHorizontal: 4,
  },
  stepLineDone: {
    backgroundColor: "#22c55e",
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#a0a0b8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  emailDestaque: {
    color: "#d8b4fe",
    fontWeight: "500",
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
  inputCodigo: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 8,
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

  // FORÇA SENHA
  forcaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    marginTop: -4,
  },
  forcaBars: {
    flexDirection: "row",
    gap: 4,
    flex: 1,
  },
  forcaBar: {
    flex: 1,
    height: 4,
    borderRadius: 99,
  },
  forcaLabel: {
    fontSize: 12,
    fontWeight: "500",
    width: 50,
    textAlign: "right",
  },

  // BOTÃO
  button: {
    backgroundColor: "#3d3aed",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // REENVIAR
  reenviarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
  },
  reenviarText: {
    color: "#3d3aed",
    fontSize: 14,
  },

  // SUCESSO
  sucessoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 16,
  },
  sucessoIconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 0.5,
    borderColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sucessoTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  sucessoSubtitle: {
    color: "#a0a0b8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
});