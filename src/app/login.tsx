import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import loginStyle from "@/styles/loginStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function LoginScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_cliente: email,
          senha_cliente: senha,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        Alert.alert("Erro", json.message || "E-mail ou senha inválidos.");
        return;
      }

      // Salva o token gerado pelo Sanctum no armazenamento local do dispositivo
      await AsyncStorage.setItem("token", json.data.token);

      // Redireciona para a home após o sucesso
      router.replace("/home");
    } catch (erro) {
      console.log("Erro ao fazer login: ", erro);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <ScrollView
          contentContainerStyle={loginStyle.scrollConteudo}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <Image
            source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
            style={loginStyle.logo}
            resizeMode="contain"
          />

          <Text style={loginStyle.titulo}>Bem-vindo(a)!</Text>
          <Text style={loginStyle.subtitulo}>
            Faça seu login para continuar
          </Text>

          {/* Formulário de login */}
          <View style={loginStyle.form}>
            {/* E-mail */}
            <Text style={loginStyle.tituloInput}>Email</Text>

            <View style={loginStyle.input}>
              <Image
                source={require("@/assets/images/fitbia/o-email (1).png")}
                style={loginStyle.icone}
              />
              <TextInput
                placeholder="Informe o seu e-mail:"
                placeholderTextColor="#888888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={loginStyle.textInput}
              />
            </View>

            {/* Senha */}
            <Text style={loginStyle.tituloInput}>Senha</Text>

            <View style={loginStyle.input}>
              <View style={loginStyle.inputContent}>
                <Image
                  source={require("@/assets/images/fitbia/senha (1).png")}
                  style={loginStyle.icone}
                />
                <TextInput
                  placeholder="Informe a sua senha:"
                  placeholderTextColor="#888888"
                  style={loginStyle.textInput}
                  secureTextEntry={!verSenha}
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              <Pressable
                style={loginStyle.btnMostrarSenha}
                onPress={() => setVerSenha((current) => !current)}
              >
                <Image
                  source={
                    verSenha
                      ? require("@/assets/images/fitbia/olho.png")
                      : require("@/assets/images/fitbia/olho-vermelho (1).png")
                  }
                  style={loginStyle.mostrarSenha}
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEsqueciSenha,
                pressed && loginStyle.btnEsqueciSenhaPressed,
              ]}
              onPress={() => router.navigate("/esqueciSenha")}
            >
              <Text style={loginStyle.txtEsqueciSenha}>
                Esqueci minha senha
              </Text>
            </Pressable>

            {/* Botão Entrar */}
            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEntrar,
                pressed && loginStyle.btnEntrarPressed,
              ]}
              onPress={handleLogin}
              disabled={carregando}
            >
              <Text style={loginStyle.textoEntrar}>
                {carregando ? "A entar..." : "Entrar"}
              </Text>
            </Pressable>

            <View style={loginStyle.criarConta}>
              <Text style={loginStyle.textoCriar}>Primeira vez aqui?</Text>

              <Pressable onPress={() => router.navigate("/criarConta")}>
                <Text style={loginStyle.linkCriarConta}>Criar conta</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}