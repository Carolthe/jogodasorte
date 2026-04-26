import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ResumoAposta from "@/src/components/ResumoAposta";
import Header from "@/src/components/Header";
import CardFormularioPix from "@/src/components/CardFormularioPix";
import CardQrCode from "@/src/components/CardQrCode";
import VoltarAposta from "@/src/components/VoltarAposta";

export default function PagamentoPix() {
  const params = useLocalSearchParams<{
    placar: string;
    valor: string;
    id_compra: string;
  }>();

  const { placar, valor, id_compra } = params;

  const [mostrarQr, setMostrarQr] = useState(false);
  console.log("PARAMS:", params);

  return (
    <ScrollView style={styles.screen}>
      <Header />

      <View style={styles.container}>
        <VoltarAposta />
        <Text style={styles.title}>Pagamento via Pix</Text>

        <ResumoAposta
          placar={placar}
          valor={valor}
        />

        {!mostrarQr ? (
          <CardFormularioPix
            id_compra={id_compra}
            onGerar={() => setMostrarQr(true)}
          />
        ) : (
          <CardQrCode valor={valor} />
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