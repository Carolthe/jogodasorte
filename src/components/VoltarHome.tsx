import { View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VoltarHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.replace("/")}
        style={styles.button}
      >
        <Ionicons name="arrow-back" size={24} color="#a855f7" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 15,
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