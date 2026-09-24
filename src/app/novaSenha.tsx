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

import novaSenhaStyle from "@/styles/novaSenhaStyle";
import globalStyle from "@/styles/globalStyle";

export default function NovaSenhaScreen() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <View style={novaSenhaStyle.conteudo}>
            {/* Logo Centralizada */}
            <Image
              source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
              style={novaSenhaStyle.logo}
              resizeMode="contain"
            />

            {/* Título e Subtítulo */}
            <Text style={novaSenhaStyle.titulo}>Redefinir senha</Text>
            <Text style={novaSenhaStyle.subtitulo}>Crie uma nova senha</Text>

            {/* Campo Nova Senha */}
            <View style={novaSenhaStyle.formGroup}>
              <Text style={novaSenhaStyle.label}>Nova senha:</Text>
              <View style={novaSenhaStyle.inputContainer}>
                <Image
                  source={require("@/assets/images/fitbia/senha.png")}
                  style={novaSenhaStyle.iconeCadeado}
                />
                <TextInput
                  style={novaSenhaStyle.input}
                  placeholder="Informe sua nova senha:"
                  placeholderTextColor="#A0A0A0"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Campo Confirmar Senha */}
            <View style={novaSenhaStyle.formGroup}>
              <Text style={novaSenhaStyle.label}>Confirmar:</Text>
              <View style={novaSenhaStyle.inputContainer}>
                <Image
                  source={require("@/assets/images/fitbia/senha.png")}
                  style={novaSenhaStyle.iconeCadeado}
                />
                <TextInput
                  style={novaSenhaStyle.input}
                  placeholder="Confirme sua nova senha:"
                  placeholderTextColor="#A0A0A0"
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Botão Salvar nova senha */}
            <Pressable
              style={novaSenhaStyle.btnSalvar}
              onPress={() => router.push("/login")}
            >
              <Text style={novaSenhaStyle.txtSalvar}>Salvar nova senha</Text>
            </Pressable>

            {/* Botão Voltar ao Login */}
            <Pressable
              style={novaSenhaStyle.btnVoltarLogin}
              onPress={() => router.push("/login")}
            >
              <Text style={novaSenhaStyle.txtVoltarLogin}>Voltar ao Login</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}