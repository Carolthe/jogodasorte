import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useAuth } from "@/src/contexts/AuthContext";

function RootLayout() {
  const { carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0e0e0e" }}>
        <ActivityIndicator color="#195ec7" size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}