import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ResumoAposta from "@/src/components/ResumoAposta";
import Header from "@/src/components/Header";
import CardFormularioPix from "@/src/components/CardFormularioPix";
import CardQrCode from "@/src/components/CardQrCode";
import VoltarAposta from "@/src/components/VoltarAposta";
import { useAuth } from "@/src/contexts/AuthContext";

export default function PagamentoPix() {
  const router = useRouter();
  const { user, carregando } = useAuth();

  const params = useLocalSearchParams<{
    placar: string;
    valor: string;
    numeros: string;
  }>();

  const { placar, valor, numeros } = params;

  const [idCompra, setIdCompra] = useState("");
  const [mostrarQr, setMostrarQr] = useState(false);

  // ✅ Redireciona se não estiver logado
  useEffect(() => {
    if (!carregando && !user) {
      router.replace("/login");
    }
  }, [user, carregando]);

  // ✅ Aguarda carregar e garante que user não é null
  if (carregando || !user) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  function handleRedirecionar() {
    router.replace("/");
  }

  return (
    <ScrollView style={styles.screen}>
      <Header />

      <View style={styles.container}>
        <VoltarAposta />

        <Text style={styles.title}>
          Pagamento via Pix
        </Text>

        <ResumoAposta
          placar={placar}
          valor={valor}
        />

        {!mostrarQr ? (
          <CardFormularioPix
            numeros={numeros}
            valor={valor}
            id_usuario={user.id_usuario}
            onGerar={(id) => {
              setIdCompra(id);
              setMostrarQr(true);
            }}
          />
        ) : (
          <CardQrCode
            valor={valor}
            id_compra={idCompra}
            onRedirecionar={handleRedirecionar}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    paddingBottom: 50,
  },
  container: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
});