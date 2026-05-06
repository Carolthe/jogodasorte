import { View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VoltarAposta() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.replace("/rifa")}
        style={styles.button}
      >
        <Ionicons name="arrow-back" size={24} color="#007ACC" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1a1a2e",
    borderWidth: 0.5,
    borderColor: "#2e2e50",
    alignItems: "center",
    justifyContent: "center",
  },
});