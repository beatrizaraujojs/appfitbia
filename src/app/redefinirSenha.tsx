
import { useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
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

const API = "http://localhost:8081/api/v1";

export default function RedefinirSenhaScreen() {
  const params = useLocalSearchParams();

  const email = String(params.email || "");
  const resetToken = String(params.resetToken || "");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [verNovaSenha, setVerNovaSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  const [salvando, setSalvando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const salvamentoEmAndamento = useRef(false);

  // Verifica se as senhas são diferentes
  const senhasDiferentes =
    confirmarSenha.length > 0 &&
    novaSenha !== confirmarSenha;

  // Verifica se a senha tem pelo menos 8 caracteres
  const senhaCurta =
    novaSenha.length > 0 &&
    novaSenha.length < 8;

  // Permite salvar somente quando tudo estiver correto
  const podeSalvar =
    novaSenha.length >= 8 &&
    confirmarSenha.length >= 8 &&
    novaSenha === confirmarSenha &&
    !salvando;

  async function salvarNovaSenha() {
    // Impede cliques repetidos
    if (salvamentoEmAndamento.current) return;

    setMensagemErro("");

    if (!email || !resetToken) {
      setMensagemErro(
        "Acesso inválido. Solicite um novo código de recuperação."
      );
      return;
    }

    if (novaSenha.length < 8) {
      setMensagemErro(
        "A senha deve ter pelo menos 8 caracteres."
      );
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemErro(
        "As duas senhas não estão iguais."
      );
      return;
    }

    // Bloqueia novos envios
    salvamentoEmAndamento.current = true;
    setSalvando(true);

    try {
      const resposta = await fetch(`${API}/senha/redefinir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          reset_token: resetToken,
          senha: novaSenha,
          senha_confirmation: confirmarSenha,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        setMensagemErro(
          json.message || "Não foi possível redefinir a senha."
        );
        return;
      }

      // Redireciona somente após salvar no banco
      router.replace("/login");
    } catch (erro) {
      setMensagemErro(
        "Não foi possível conectar ao servidor. Tente novamente."
      );
    } finally {
      salvamentoEmAndamento.current = false;
      setSalvando(false);
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
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={redefinirSenhaStyle.conteudo}>
              <Image
                source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                style={redefinirSenhaStyle.logo}
                resizeMode="contain"
              />

              <Text style={redefinirSenhaStyle.titulo}>
                Redefinir senha
              </Text>

              <Text style={redefinirSenhaStyle.subtitulo}>
                Crie uma nova senha para acessar sua conta
              </Text>

              <View style={redefinirSenhaStyle.form}>
                {/* Nova senha */}
                <Text style={redefinirSenhaStyle.label}>
                  Nova senha:
                </Text>

                <View style={redefinirSenhaStyle.inputContainer}>
                  <Image
                    style={redefinirSenhaStyle.icone}
                    source={require("@/assets/images/fitbia/senha-marrom.png")}
                  />

                  <TextInput
                    placeholder="Informe sua nova senha"
                    placeholderTextColor="#A0A0A0"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verNovaSenha}
                    value={novaSenha}
                    onChangeText={(valor) => {
                      setNovaSenha(valor);
                      setMensagemErro("");
                    }}
                    editable={!salvando}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() =>
                      setVerNovaSenha(!verNovaSenha)
                    }
                  >
                    <Image
                      style={redefinirSenhaStyle.mostrarSenha}
                      source={
                        verNovaSenha
                          ? require("@/assets/images/fitbia/olho-verde-fechado.png")
                          : require("@/assets/images/fitbia/olho-verde-aberto.png")
                      }
                    />
                  </Pressable>
                </View>

                {/* Mensagem de senha curta */}
                {senhaCurta && (
                  <Text
                    style={{
                      color: "#D32F2F",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    A senha deve ter pelo menos 8 caracteres.
                  </Text>
                )}

                {/* Confirmar senha */}
                <Text style={redefinirSenhaStyle.label}>
                  Confirmar:
                </Text>

                <View style={redefinirSenhaStyle.inputContainer}>
                  <Image
                    style={redefinirSenhaStyle.icone}
                    source={require("@/assets/images/fitbia/senha-marrom.png")}
                  />

                  <TextInput
                    placeholder="Confirme sua nova senha"
                    placeholderTextColor="#A0A0A0"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verConfirmarSenha}
                    value={confirmarSenha}
                    onChangeText={(valor) => {
                      setConfirmarSenha(valor);
                      setMensagemErro("");
                    }}
                    editable={!salvando}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() =>
                      setVerConfirmarSenha(!verConfirmarSenha)
                    }
                  >
                    <Image
                      style={redefinirSenhaStyle.mostrarSenha}
                      source={
                        verConfirmarSenha
                          ? require("@/assets/images/fitbia/olho-verde-fechado.png")
                          : require("@/assets/images/fitbia/olho-verde-aberto.png")
                      }
                    />
                  </Pressable>
                </View>

                {/* Mensagem de senhas diferentes */}
                {senhasDiferentes && (
                  <Text
                    style={{
                      color: "#D32F2F",
                      fontSize: 13,
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    As duas senhas não estão iguais.
                  </Text>
                )}

                {/* Erros da API */}
                {mensagemErro !== "" && (
                  <Text
                    style={{
                      color: "#D32F2F",
                      fontSize: 13,
                      marginTop: 12,
                      textAlign: "center",
                    }}
                  >
                    {mensagemErro}
                  </Text>
                )}

                {/* Salvar nova senha */}
                <Pressable
                  style={[
                    redefinirSenhaStyle.btnSalvar,
                    !podeSalvar && { opacity: 0.5 },
                  ]}
                  onPress={salvarNovaSenha}
                  disabled={!podeSalvar}
                >
                  {salvando ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={redefinirSenhaStyle.txtBtnSalvar}>
                      Salvar nova senha
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
