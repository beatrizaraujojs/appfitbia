import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from "@/components/BottomBar";
import editarSenhaStyle from "@/styles/editarSenhaStyle";
import globalStyle from "@/styles/globalStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function EditarSenhaScreen() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [esconderSenhaAtual, setEsconderSenhaAtual] = useState(true);
  const [esconderNovaSenha, setEsconderNovaSenha] = useState(true);
  const [esconderConfirmarSenha, setEsconderConfirmarSenha] = useState(true);

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function alterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      setMensagem("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("A confirmação da senha não corresponde à nova senha.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }

      const resposta = await fetch(`${API}/cliente/senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senha_atual: senhaAtual,
          nova_senha: novaSenha,
          nova_senha_confirmation: confirmarSenha,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok || !json.success) {
        setMensagem(json.message || "Erro ao alterar a senha.");
        return;
      }

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      // Ajustado para o nome correto do ficheiro: configuracoes.tsx
      router.replace("/configuracoes" as any);
    } catch (erro) {
      console.log("Erro ao alterar senha:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
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
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={editarSenhaStyle.conteudo}>
              {/* Header com Voltar e Logo */}
              <View style={editarSenhaStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={editarSenhaStyle.btnVoltar}
                >
                  <Image
                    source={require("@/assets/images/fitbia/de-volta.png")}
                    style={editarSenhaStyle.iconeVoltar}
                  />
                </Pressable>

                <View style={editarSenhaStyle.headerDireita}>
                  <Text style={editarSenhaStyle.tituloHeader}>
                    Alterar senha
                  </Text>
                  <Image
                    source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                    style={editarSenhaStyle.logoHeader}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Campo Senha Atual */}
              <View style={editarSenhaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/senha-marrom.png")}
                  style={editarSenhaStyle.fieldIcone}
                />
                <View style={editarSenhaStyle.infoBox}>
                  <Text style={editarSenhaStyle.label}>Sua senha atual</Text>
                  <TextInput
                    style={editarSenhaStyle.input}
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry={esconderSenhaAtual}
                    placeholder="••••••••"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <Pressable
                  onPress={() => setEsconderSenhaAtual(!esconderSenhaAtual)}
                  style={editarSenhaStyle.btnOlho}
                >
                  <Image
                    source={
                      esconderSenhaAtual
                        ? require("@/assets/images/fitbia/olho-verde-fechado.png")
                        : require("@/assets/images/fitbia/olho-verde-aberto.png")
                    }
                    style={editarSenhaStyle.iconeOlho}
                  />
                </Pressable>

                <Pressable style={editarSenhaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarSenhaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Link Esqueci minha senha */}
              <Pressable
                style={editarSenhaStyle.btnEsqueciSenha}
                onPress={() => router.push("/recuperarSenha" as any)}
              >
                <Text style={editarSenhaStyle.txtEsqueciSenha}>
                  Esqueci minha senha
                </Text>
              </Pressable>

              {/* Instruções de Requisitos */}
              <View style={editarSenhaStyle.instrucoesContainer}>
                <Text style={editarSenhaStyle.txtInstrucao}>
                  • Use pelo menos 8 caracteres
                </Text>
                <Text style={editarSenhaStyle.txtInstrucao}>
                  • Combine letras e números
                </Text>
              </View>

              {/* Campo Nova Senha */}
              <View style={editarSenhaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/senha-marrom.png")}
                  style={editarSenhaStyle.fieldIcone}
                />
                <View style={editarSenhaStyle.infoBox}>
                  <Text style={editarSenhaStyle.label}>Nova senha</Text>
                  <TextInput
                    style={editarSenhaStyle.input}
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={esconderNovaSenha}
                    placeholder="••••••••"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <Pressable
                  onPress={() => setEsconderNovaSenha(!esconderNovaSenha)}
                  style={editarSenhaStyle.btnOlho}
                >
                  <Image
                    source={
                      esconderNovaSenha
                        ? require("@/assets/images/fitbia/olho-verde-fechado.png")
                        : require("@/assets/images/fitbia/olho-verde-aberto.png")
                    }
                    style={editarSenhaStyle.iconeOlho}
                  />
                </Pressable>

                <Pressable style={editarSenhaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarSenhaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Campo Confirmar Senha */}
              <View style={editarSenhaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/senha-marrom.png")}
                  style={editarSenhaStyle.fieldIcone}
                />
                <View style={editarSenhaStyle.infoBox}>
                  <Text style={editarSenhaStyle.label}>Confirmar senha</Text>
                  <TextInput
                    style={editarSenhaStyle.input}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={esconderConfirmarSenha}
                    placeholder="••••••••"
                    placeholderTextColor="#A0A0A0"
                  />
                </View>

                <Pressable
                  onPress={() =>
                    setEsconderConfirmarSenha(!esconderConfirmarSenha)
                  }
                  style={editarSenhaStyle.btnOlho}
                >
                  <Image
                    source={
                      esconderConfirmarSenha
                        ? require("@/assets/images/fitbia/olho-verde-fechado.png")
                        : require("@/assets/images/fitbia/olho-verde-aberto.png")
                    }
                    style={editarSenhaStyle.iconeOlho}
                  />
                </Pressable>

                <Pressable style={editarSenhaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarSenhaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Exibição de Mensagens de Erro / Sucesso */}
              {mensagem ? (
                <Text style={{ color: "#ff4d4d", textAlign: "center", marginBottom: 15, fontSize: 14, fontWeight: "bold" }}>
                  {mensagem}
                </Text>
              ) : null}

              {/* Botão Salvar Senha */}
              <Pressable
                style={editarSenhaStyle.btnSalvar}
                onPress={alterarSenha}
                disabled={carregando}
              >
                <Text style={editarSenhaStyle.txtSalvar}>
                  {carregando ? "Salvando..." : "Salvar nova senha"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          <BottomBar />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}