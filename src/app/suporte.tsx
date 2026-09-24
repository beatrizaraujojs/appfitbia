import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "@/components/BottomBar";
import globalStyle from "@/styles/globalStyle";
import sobreStyle from "@/styles/sobreStyle";

export default function SobreScreen() {
  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link:", err)
    );
  };

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={sobreStyle.conteudo}>
              {/* Header com Voltar e Logo */}
              <View style={sobreStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={sobreStyle.btnVoltar}
                >
                  <Image
                    source={require("@/assets/images/fitbia/de-volta.png")}
                    style={sobreStyle.iconeVoltar}
                  />
                </Pressable>

                <View style={sobreStyle.headerDireita}>
                  <Text style={sobreStyle.tituloHeader}>
                    sobre do aplicativo
                  </Text>
                  <Image
                    source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                    style={sobreStyle.logoHeader}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Links Principais */}
              <View style={sobreStyle.secaoLinks}>
                <Pressable
                  style={sobreStyle.opcaoItem}
                  onPress={() => router.push("/")}
                >
                  <Text style={sobreStyle.opcaoTexto}>Dúvidas frequentes</Text>
                  <Text style={sobreStyle.opcaoSeta}>&gt;</Text>
                </Pressable>

                <View style={sobreStyle.divisor} />

                <Pressable
                  style={sobreStyle.opcaoItem}
                  onPress={() =>
                    abrirLink(
                      "https://api.whatsapp.com/send?phone=5511981826719"
                    )
                  }
                >
                  <Text style={sobreStyle.opcaoTexto}>
                    Falar com suporte via whatsapp
                  </Text>
                  <Text style={sobreStyle.opcaoSeta}>&gt;</Text>
                </Pressable>

                <View style={sobreStyle.divisor} />
              </View>

              
            </View>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}