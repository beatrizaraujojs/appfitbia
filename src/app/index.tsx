import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, Pressable } from "react-native";
import { router } from "expo-router";

import preloaderStyle from "@/styles/preloaderStyle";

export default function PreloaderScreen() {
  // Valores animados para opacidade e escala
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 1. Entra mostrando o logo e aumentando o tamanho
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Aguarda 1.2 segundos no centro e depois faz o fade out
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          // 3. Navega para o login após o sumiço do logo
          router.replace("/login");
        });
      }, 1200);
    });
  }, []);

  return (
    <Pressable 
      style={preloaderStyle.container} 
      onPress={() => router.replace("/login")}
    >
      <SafeAreaView style={preloaderStyle.areaConteudo}>
        <Animated.Image
          source={require("@/assets/images/fitbia/FITBIA LOGO-preloader.svg")}
          style={[
            preloaderStyle.logo,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        />
      </SafeAreaView>
    </Pressable>
  );
}