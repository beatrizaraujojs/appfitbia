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

import BottomBar from "@/components/BottomBar";
import editarSenhaStyle from "@/styles/editarSenhaStyle";
import globalStyle from "@/styles/globalStyle";

export default function EditarSenhaScreen() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [esconderSenhaAtual, setEsconderSenhaAtual] = useState(true);
  const [esconderNovaSenha, setEsconderNovaSenha] = useState(true);
  const [esconderConfirmarSenha, setEsconderConfirmarSenha] = useState(true);

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
                    source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                    style={editarSenhaStyle.logoHeader}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Campo Senha Atual */}
              <View style={editarSenhaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/senha.png")}
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

                {/* Ícone Olho */}
                <Pressable
                  onPress={() => setEsconderSenhaAtual(!esconderSenhaAtual)}
                  style={editarSenhaStyle.btnOlho}
                >
                  <Image
                    source={
                      esconderSenhaAtual
                        ? require("@/assets/images/fitbia/olho-vermelho.png")
                        : require("@/assets/images/fitbia/olho.png")
                    }
                    style={editarSenhaStyle.iconeOlho}
                  />
                </Pressable>

                {/* Badge de Editar */}
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
                onPress={() => router.push("/recuperarSenha")}
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
                  source={require("@/assets/images/fitbia/senha.png")}
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
                        ? require("@/assets/images/fitbia/olho-vermelho.png")
                        : require("@/assets/images/fitbia/olho.png")
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
                  source={require("@/assets/images/fitbia/senha.png")}
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
                        ? require("@/assets/images/fitbia/olho-vermelho.png")
                        : require("@/assets/images/fitbia/olho.png")
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

              {/* Botão Salvar Senha */}
              <Pressable
                style={editarSenhaStyle.btnSalvar}
                onPress={() => router.back()}
              >
                <Text style={editarSenhaStyle.txtSalvar}>Salvar senha</Text>
              </Pressable>
            </View>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
