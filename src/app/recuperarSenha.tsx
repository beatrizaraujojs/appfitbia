import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import recuperarSenhaStyle from "@/styles/recuperarSenhaStyle";
import globalStyle from "@/styles/globalStyle";

export default function RecuperarSenhaScreen() {
  const [email, setEmail] = useState("");

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <View style={recuperarSenhaStyle.conteudo}>
            {/* Logo Centralizada */}
            <Image
              source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
              style={recuperarSenhaStyle.logo}
              resizeMode="contain"
            />

            {/* Título e Subtítulo */}
            <Text style={recuperarSenhaStyle.titulo}>Esqueci minha senha</Text>
            <Text style={recuperarSenhaStyle.subtitulo}>
              Informe o seu e-mail para receber{"\n"}o link de redefinição
            </Text>

            {/* Campo Email */}
            <View style={recuperarSenhaStyle.formGroup}>
              <Text style={recuperarSenhaStyle.label}>Email:</Text>
              <View style={recuperarSenhaStyle.inputContainer}>
                <Image
                  source={require("@/assets/images/fitbia/e-mail.png")}
                  style={recuperarSenhaStyle.iconeEmail}
                />
                <TextInput
                  style={recuperarSenhaStyle.input}
                  placeholder="Informe seu E-mail"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Botão Enviar Link */}
            <Pressable
              style={recuperarSenhaStyle.btnEnviar}
              onPress={() => router.push("/novaSenha")}
            >
              <Text style={recuperarSenhaStyle.txtEnviar}>Enviar Link</Text>
            </Pressable>

            {/* Botão Cancelar */}
            <Pressable
              style={recuperarSenhaStyle.btnCancelar}
              onPress={() => router.back()}
            >
              <Text style={recuperarSenhaStyle.txtCancelar}>Cancelar</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
