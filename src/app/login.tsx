
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
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

// const SERVIDOR = "http://localhost:8081";
const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const API = `${SERVIDOR}/api/v1`;

export default function LoginScreen() {
  const params = useLocalSearchParams();

  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState(
    params.senhaRedefinida === "true"
  );

  useEffect(() => {
    if (params.senhaRedefinida === "true") {
      setMensagemSucesso(true);

      router.setParams({
        senhaRedefinida: "",
      });
    }
  }, [params.senhaRedefinida]);

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha o e-mail e a senha."
      );
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
          email_cliente: email.trim(),
          senha_cliente: senha,
        }),
      });

      const json = await resposta.json();

      console.log("STATUS LOGIN:", resposta.status);
      console.log("LOGIN SUCESSO:", json.success);
      console.log("TOKEN RECEBIDO:", !!json.data?.token);

      if (!resposta.ok) {
        Alert.alert(
          "Erro",
          json.message || "E-mail ou senha inválidos."
        );
        return;
      }

      if (!json.data?.token) {
        Alert.alert(
          "Erro",
          "O servidor não retornou um token de autenticação."
        );
        return;
      }

      await AsyncStorage.setItem(
        "token",
        json.data.token
      );

      setMensagemSucesso(false);

      router.replace("/home");
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );
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
            source={require("@/assets/images/fitbia/logo-fitbia.svg")}
            style={loginStyle.logo}
            resizeMode="contain"
          />

          <Text style={loginStyle.titulo}>
            Bem-vindo(a)!
          </Text>

          <Text style={loginStyle.subtitulo}>
            Faça seu login para continuar
          </Text>

          <View style={loginStyle.form}>
            {/* E-MAIL */}
            <Text style={loginStyle.tituloInput}>
              Email
            </Text>

            <View style={loginStyle.input}>
              <Image
                source={require("@/assets/images/fitbia/email-verde.png")}
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

            {/* SENHA */}
            <Text style={loginStyle.tituloInput}>
              Senha
            </Text>

            <View style={loginStyle.input}>
              <View style={loginStyle.inputContent}>
                <Image
                  source={require("@/assets/images/fitbia/senha-verde.png")}
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
                onPress={() => setVerSenha(!verSenha)}
              >
                <Image
                  source={
                    verSenha
                      ? require("@/assets/images/fitbia/olho-verde-aberto.png")
                      : require("@/assets/images/fitbia/olho-verde-fechado.png")
                  }
                  style={loginStyle.mostrarSenha}
                />
              </Pressable>
            </View>

            {/* RECUPERAR SENHA */}
            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEsqueciSenha,
                pressed && loginStyle.btnEsqueciSenhaPressed,
              ]}
              onPress={() => router.navigate("/recuperarSenha")}
            >
              <Text style={loginStyle.txtEsqueciSenha}>
                Esqueci minha senha
              </Text>
            </Pressable>

            {/* MENSAGEM DE SENHA REDEFINIDA */}
            {mensagemSucesso && (
              <Text
                style={{
                  color: "#2E7D32",
                  fontSize: 13,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                Senha alterada com sucesso!
              </Text>
            )}

            {/* ENTRAR */}
            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEntrar,
                pressed && loginStyle.btnEntrarPressed,
              ]}
              onPress={handleLogin}
              disabled={carregando}
            >
              <Text style={loginStyle.textoEntrar}>
                {carregando ? "Carregando..." : "Entrar"}
              </Text>
            </Pressable>

            {/* CRIAR CONTA */}
            <View style={loginStyle.criarConta}>
              <Text style={loginStyle.textoCriar}>
                Primeira vez aqui?
              </Text>

              <Pressable
                onPress={() => router.navigate("/criarConta")}
              >
                <Text style={loginStyle.linkCriarConta}>
                  Criar conta
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
