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
import editarContaStyle from "@/styles/editarContaStyle";
import globalStyle from "@/styles/globalStyle";

export default function EditarContaScreen() {
  const [nome, setNome] = useState("Beatriz Araújo dos Santos");
  const [email, setEmail] = useState("beatriz20araujo123@gmail.com");
  const [telefone, setTelefone] = useState("11 981826719");
  const [cpf, setCpf] = useState("543.275.828-83");

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
            <View style={editarContaStyle.conteudo}>
              {/* Botão Voltar Topo */}
              <Pressable
                onPress={() => router.back()}
                style={editarContaStyle.btnVoltar}
              >
                <Text style={editarContaStyle.txtVoltar}>←</Text>
              </Pressable>

              {/* Seção Principal do Topo: Avatar Alinhado com a Logo */}
              <View style={editarContaStyle.topoSection}>
                <View style={editarContaStyle.avatarSection}>
                  <View style={editarContaStyle.avatarContainer}>
                    <Image
                      source={require("@/assets/images/fitbia/do-utilizador.png")}
                      style={editarContaStyle.avatarIcone}
                    />
                    <Pressable style={editarContaStyle.btnFotoBadge}>
                      <Image
                        source={require("@/assets/images/fitbia/camera.png")}
                        style={editarContaStyle.iconeCamera}
                      />
                    </Pressable>
                  </View>
                </View>

                <View style={editarContaStyle.headerDireita}>
                  <Text style={editarContaStyle.tituloHeader}>
                    Editar perfil
                  </Text>
                  <Image
                    source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                    style={editarContaStyle.logoHeader}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Nome do Usuário */}
              <Text style={editarContaStyle.nomeUsuario}>
                Beatriz Araújo dos Santos
              </Text>

              {/* Campo Nome */}
              <View style={editarContaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/usuario.png")}
                  style={editarContaStyle.fieldIcone}
                />
                <View style={editarContaStyle.infoBox}>
                  <Text style={editarContaStyle.label}>Seu nome</Text>
                  <TextInput
                    style={editarContaStyle.input}
                    value={nome}
                    onChangeText={setNome}
                  />
                </View>
                <Pressable style={editarContaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarContaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Campo Email */}
              <View style={editarContaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/e-mail.png")}
                  style={editarContaStyle.fieldIcone}
                />
                <View style={editarContaStyle.infoBox}>
                  <Text style={editarContaStyle.label}>Email</Text>
                  <TextInput
                    style={editarContaStyle.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <Pressable style={editarContaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarContaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Campo Telefone */}
              <View style={editarContaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/telefone.png")}
                  style={editarContaStyle.fieldIcone}
                />
                <View style={editarContaStyle.infoBox}>
                  <Text style={editarContaStyle.label}>Telefone</Text>
                  <TextInput
                    style={editarContaStyle.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                  />
                </View>
                <Pressable style={editarContaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarContaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Campo CPF */}
              <View style={editarContaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/cpf.png")}
                  style={editarContaStyle.fieldIcone}
                />
                <View style={editarContaStyle.infoBox}>
                  <Text style={editarContaStyle.label}>CPF</Text>
                  <TextInput
                    style={editarContaStyle.input}
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                  />
                </View>
                <Pressable style={editarContaStyle.btnEditarBadge}>
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={editarContaStyle.iconeEditar}
                  />
                </Pressable>
              </View>

              {/* Botão Alterar Senha */}
             <Pressable
                style={editarContaStyle.btnAlterarSenha}
                onPress={() => router.push("/editarSenha")} // <--- ADICIONADO AQUI
              >
                <Text style={editarContaStyle.txtAlterarSenha}>
                  Alterar Senha
                </Text>
              </Pressable>

              {/* Botão Salvar alterações */}
              <Pressable
                style={editarContaStyle.btnSalvar}
                onPress={() => router.back()}
              >
                <Text style={editarContaStyle.txtSalvar}>
                  Salvar alterações
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}