import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ResumoAposta from "@/src/components/ResumoAposta";
import Header from "@/src/components/Header";
import CardFormularioPix from "@/src/components/CardFormularioPix";
import CardQrCode from "@/src/components/CardQrCode";
import VoltarAposta from "@/src/components/VoltarAposta";
import { useAuth } from "@/src/contexts/AuthContext";

export default function PagamentoPix() {
  const router = useRouter();
  const { user } = useAuth();

  const params = useLocalSearchParams<{
    placar: string;
    valor: string;
    numeros: string;
  }>();

  const { placar, valor, numeros } = params;

  // id da compra criado SOMENTE ao gerar PIX
  const [idCompra, setIdCompra] = useState("");

  const [mostrarQr, setMostrarQr] = useState(false);

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
            id_usuario={user!.id_usuario} // ✅ vem do contexto, não da URL
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
});