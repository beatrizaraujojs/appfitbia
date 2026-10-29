
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import globalStyle from "@/styles/globalStyle";
import esqueciSenhaStyle from "@/styles/esqueciSenhaStyle";

const API = "http://localhost:8081/api/v1";

export default function EsqueciSenha() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function enviarToken() {
    const emailFormatado = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado)) {
      Alert.alert("Atenção", "Informe um e-mail válido.");
      return;
    }

    try {
      setEnviando(true);
      setMensagem("");

      const resposta = await fetch(`${API}/senha/solicitar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: emailFormatado,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(
          dados.message || "Não foi possível solicitar o token."
        );
        return;
      }

      setMensagem("Solicitação realizada com sucesso!");

      router.push({
        pathname: "/validarToken",
        params: {
          email: emailFormatado,
        },
      });
    } catch (erro) {
      console.error("Erro ao solicitar token:", erro);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
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
          <ScrollView
            style={globalStyle.scrollConteudo}
            contentContainerStyle={esqueciSenhaStyle.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={esqueciSenhaStyle.conteudo}>

              {/* Logo */}
              <Image
                source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                style={esqueciSenhaStyle.logo}
                resizeMode="contain"
              />

              {/* Título */}
              <Text style={esqueciSenhaStyle.titulo}>
                Esqueci minha senha
              </Text>

              {/* Descrição */}
              <Text style={esqueciSenhaStyle.descricao}>
                Informe seu e-mail para receber o token
                {"\n"}
                de redefinição da senha
              </Text>

              {/* Campo de e-mail */}
              <View style={esqueciSenhaStyle.campoContainer}>
                <Text style={esqueciSenhaStyle.label}>
                  E-mail:
                </Text>

                <View style={esqueciSenhaStyle.inputContainer}>
                  <Image
                    source={require("@/assets/images/fitbia/email-verde.png")}
                    style={esqueciSenhaStyle.icone}
                    resizeMode="contain"
                  />

                  <TextInput
                    style={esqueciSenhaStyle.input}
                    placeholder="Informe seu e-mail cadastrado"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Mensagem informativa */}
                <Text
                  style={{
                    fontSize: 12,
                    color: "#7A7A7A",
                    textAlign: "center",
                    marginTop: 12,
                    lineHeight: 18,
                  }}
                >
                  Caso o e-mail digitado esteja cadastrado,
                  você receberá um token de acesso.
                </Text>

                {/* Mensagem da solicitação */}
                {mensagem !== "" && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#3B4E38",
                      textAlign: "center",
                      marginTop: 12,
                    }}
                  >
                    {mensagem}
                  </Text>
                )}
              </View>

              {/* Botões */}
              <View style={esqueciSenhaStyle.botoes}>
                <Pressable
                  style={esqueciSenhaStyle.botaoEnviar}
                  onPress={enviarToken}
                  disabled={enviando}
                >
                  {enviando ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={esqueciSenhaStyle.textoBotaoEnviar}>
                      Enviar token
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  style={esqueciSenhaStyle.botaoVoltar}
                  onPress={() => router.replace("/login")}
                >
                  <Text style={esqueciSenhaStyle.textoBotaoVoltar}>
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
