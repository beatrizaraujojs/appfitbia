
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import recuperarSenhaStyle from "@/styles/recuperarSenhaStyle";
import globalStyle from "@/styles/globalStyle";

const API = "http://localhost:8081/api/v1";

export default function RecuperarSenhaScreen() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // Impede vários cliques simultâneos
  const envioEmAndamento = useRef(false);

  function mostrarErro(mensagem: string) {
    setMensagemErro(mensagem);

    if (Platform.OS !== "web") {
      Alert.alert("Atenção", mensagem);
    }
  }

  async function enviarToken() {
    // Bloqueia imediatamente os cliques repetidos
    if (envioEmAndamento.current) {
      return;
    }

    const emailLimpo = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      mostrarErro("Informe um e-mail válido.");
      return;
    }

    // Trava antes de iniciar a requisição
    envioEmAndamento.current = true;
    setEnviando(true);
    setMensagemErro("");

    try {
      const resposta = await fetch(`${API}/senha/solicitar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: emailLimpo,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        mostrarErro(
          json.message || "Não foi possível solicitar o código."
        );
        return;
      }

      // Após o sucesso, segue para validar o token
      router.replace({
        pathname: "/validarToken",
        params: {
          email: emailLimpo,
        },
      });
    } catch (erro) {
      mostrarErro(
        "Não foi possível conectar ao servidor. Tente novamente."
      );
    } finally {
      // Libera a trava quando a requisição termina
      envioEmAndamento.current = false;
      setEnviando(false);
    }
  }

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <View style={recuperarSenhaStyle.conteudo}>
            <Image
              source={require("@/assets/images/fitbia/logo-fitbia.svg")}
              style={recuperarSenhaStyle.logo}
              resizeMode="contain"
            />

            <Text style={recuperarSenhaStyle.titulo}>
              Esqueci minha senha
            </Text>

            <Text style={recuperarSenhaStyle.subtitulo}>
              Informe seu e-mail cadastrado para receber
              {"\n"}o token de redefinição da senha
            </Text>

            <View style={recuperarSenhaStyle.formGroup}>
              <Text style={recuperarSenhaStyle.label}>
                E-mail:
              </Text>

              <View style={recuperarSenhaStyle.inputContainer}>
                <Image
                  source={require("@/assets/images/fitbia/email-verde.png")}
                  style={recuperarSenhaStyle.iconeEmail}
                />

                <TextInput
                  style={recuperarSenhaStyle.input}
                  placeholder="Informe seu e-mail cadastrado"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!enviando}
                />
              </View>

              <Text
                style={{
                  color: "#7A7A7A",
                  fontSize: 12,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Caso o e-mail digitado esteja cadastrado,
                você receberá um token de acesso.
              </Text>

              {mensagemErro !== "" && (
                <Text
                  style={{
                    color: "#D32F2F",
                    fontSize: 13,
                    textAlign: "center",
                    marginTop: 12,
                  }}
                >
                  {mensagemErro}
                </Text>
              )}
            </View>

            <Pressable
              style={[
                recuperarSenhaStyle.btnEnviar,
                enviando && { opacity: 0.7 },
              ]}
              onPress={enviarToken}
              disabled={enviando}
            >
              {enviando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={recuperarSenhaStyle.txtEnviar}>
                  Enviar token
                </Text>
              )}
            </Pressable>

            <Pressable
              style={recuperarSenhaStyle.btnCancelar}
              onPress={() => router.replace("/login")}
              disabled={enviando}
            >
              <Text style={recuperarSenhaStyle.txtCancelar}>
                Voltar ao Login
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
