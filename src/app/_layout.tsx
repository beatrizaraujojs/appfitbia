
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import MensagemCarrinho from "@/components/mensagemCarrinho";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <MensagemCarrinho />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
