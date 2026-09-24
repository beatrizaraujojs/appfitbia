import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  Text,
  Pressable,
  ImageBackground,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import redefinirSenhaStyle from "@/styles/redefinirSenhaStyle";

export default function RedefinirSenhaScreen() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [verNovaSenha, setVerNovaSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={redefinirSenhaStyle.conteudo}>
              
              {/* Logo */}
              <Image
                source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                style={redefinirSenhaStyle.logo}
                resizeMode="contain"
              />

              {/* Título e Subtítulo */}
              <Text style={redefinirSenhaStyle.titulo}>Redefinir senha</Text>
              <Text style={redefinirSenhaStyle.subtitulo}>
                Crie uma nova senha para acessar sua conta
              </Text>

              {/* Formulário */}
              <View style={redefinirSenhaStyle.form}>
                
                {/* Campo Nova Senha */}
                <Text style={redefinirSenhaStyle.label}>Nova senha:</Text>
                <View style={redefinirSenhaStyle.inputContainer}>
                  <Image
                    style={redefinirSenhaStyle.icone}
                    source={require("@/assets/images/fitbia/senha.png")}
                  />
                  <TextInput
                    placeholder="Informe sua nova senha"
                    placeholderTextColor="#A0A0A0"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verNovaSenha}
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                  />
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerNovaSenha((prev) => !prev)}
                  >
                    <Image
                      style={redefinirSenhaStyle.mostrarSenha}
                      source={
                        verNovaSenha
                          ? require("@/assets/images/fitbia/olho-vermelho (1).png")
                          : require("@/assets/images/fitbia/olho.png")
                      }
                    />
                  </Pressable>
                </View>

                {/* Campo Confirmar Senha */}
                <Text style={redefinirSenhaStyle.label}>Confirmar:</Text>
                <View style={redefinirSenhaStyle.inputContainer}>
                  <Image
                    style={redefinirSenhaStyle.icone}
                    source={require("@/assets/images/fitbia/senha.png")}
                  />
                  <TextInput
                    placeholder="Confirme sua nova senha"
                    placeholderTextColor="#A0A0A0"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verConfirmarSenha}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                  />
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerConfirmarSenha((prev) => !prev)}
                  >
                    <Image
                      style={redefinirSenhaStyle.mostrarSenha}
                      source={
                        verConfirmarSenha
                          ? require("@/assets/images/fitbia/olho-vermelho (1).png")
                          : require("@/assets/images/fitbia/olho.png")
                      }
                    />
                  </Pressable>
                </View>

                {/* Botão Salvar */}
                <Pressable 
                  style={redefinirSenhaStyle.btnSalvar}
                  onPress={() => router.replace("/login")}
                >
                  <Text style={redefinirSenhaStyle.txtBtnSalvar}>
                    Salvar nova senha
                  </Text>
                </Pressable>

                {/* Botão Voltar ao Login */}
                <Pressable
                  style={redefinirSenhaStyle.btnVoltar}
                  onPress={() => router.navigate("/login")}
                >
                  <Text style={redefinirSenhaStyle.txtBtnVoltar}>
                    Voltar ao Login
                  </Text>
                </Pressable>

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}