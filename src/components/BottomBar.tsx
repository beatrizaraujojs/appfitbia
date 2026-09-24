import { router, usePathname } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { cores } from "@/styles/estilos";

interface BottomBarProps {
  abaAtiva?: "home" | "cardapio" | "carrinho" | "pedidoEmAndamento" | "config";
}

export default function BottomBar({ abaAtiva }: BottomBarProps) {
  const pathname = usePathname();

  const ROTA_ATIVA =
    abaAtiva ||
    (pathname.includes("menu")
      ? "cardapio"
      : pathname.includes("carrinho")
      ? "carrinho"
      : pathname.includes("pedidoEmAndamento")
      ? "pedidoEmAndamento"
      : pathname.includes("configuracoes") || pathname.includes("config")
      ? "config"
      : "home");

  return (
    <View style={styles.bottomBar}>
      {/* Home */}
      <Pressable
        style={[styles.navItem, ROTA_ATIVA === "home" && styles.navItemAtivo]}
        onPress={() => router.replace("/home")}
      >
        <Image
          source={require("@/assets/images/fitbia/botao-home.png")}
          style={styles.navIcone}
        />
        <Text
          style={ROTA_ATIVA === "home" ? styles.navTextoAtivo : styles.navTexto}
        >
          Home
        </Text>
      </Pressable>

      {/* Cardápio */}
      <Pressable
        style={[
          styles.navItem,
          ROTA_ATIVA === "cardapio" && styles.navItemAtivo,
        ]}
        onPress={() => router.replace("/menu")}
      >
        <Image
          source={require("@/assets/images/fitbia/pedido3.png")}
          style={styles.navIcone}
        />
        <Text
          style={
            ROTA_ATIVA === "cardapio" ? styles.navTextoAtivo : styles.navTexto
          }
        >
          Cardápio
        </Text>
      </Pressable>

      {/* Carrinho */}
      <Pressable
        style={[
          styles.navItem,
          ROTA_ATIVA === "carrinho" && styles.navItemAtivo,
        ]}
        onPress={() => router.replace("/carrinho")}
      >
        <Image
          source={require("@/assets/images/fitbia/carrinho.png")}
          style={styles.navIcone}
        />
        <Text
          style={
            ROTA_ATIVA === "carrinho" ? styles.navTextoAtivo : styles.navTexto
          }
        >
          Carrinho
        </Text>
      </Pressable>

      {/* Pedidos */}
      <Pressable
        style={[
          styles.navItem,
          ROTA_ATIVA === "pedidoEmAndamento" && styles.navItemAtivo,
        ]}
        onPress={() => router.replace("/pedidoEmAndamento")}
      >
        <Image
          source={require("@/assets/images/fitbia/sacola.png")}
          style={styles.navIcone}
        />
        <Text
          style={
            ROTA_ATIVA === "pedidoEmAndamento" ? styles.navTextoAtivo : styles.navTexto
          }
        >
          Pedidos
        </Text>
      </Pressable>

      {/* Configurações */}
      <Pressable
        style={[styles.navItem, ROTA_ATIVA === "config" && styles.navItemAtivo]}
        onPress={() => router.replace("/configuracoes")} // <--- Alterado para "/configuracoes"
      >
        <Image
          source={require("@/assets/images/fitbia/config.png")}
          style={styles.navIcone}
        />
        <Text
          style={
            ROTA_ATIVA === "config" ? styles.navTextoAtivo : styles.navTexto
          }
        >
          Config
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    backgroundColor: cores.brancoFundo,
    borderRadius: 32,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  navItemAtivo: {
    backgroundColor: cores.verdeClaroFundo,
  },
  navIcone: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  navTexto: {
    fontSize: 11,
    color: cores.textoClaro,
    marginTop: 2,
  },
  navTextoAtivo: {
    fontSize: 11,
    color: cores.verdeEscuro,
    fontWeight: "bold",
    marginTop: 2,
  },
});