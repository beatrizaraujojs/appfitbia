import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from "@/components/BottomBar";
import editarContaStyle from "@/styles/editarContaStyle";
import globalStyle from "@/styles/globalStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;


export default function EditarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // 1. Carregar os dados do cliente ao abrir a tela
  useEffect(() => {
    async function carregarDadosCliente() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Sessão expirada", "Faça login novamente.");
          router.replace("/login");
          return;
        }

        const resposta = await fetch(`${API}/cliente`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await resposta.json();

        if (resposta.ok && json.success) {
          setNome(json.data.nome_cliente || "");
          setEmail(json.data.email_cliente || "");
          // Mapeado para whatsapp_cliente conforme o seu Model
          setTelefone(json.data.whatsapp_cliente || "");
          // Mapeado para cpf_cliente conforme o seu Model
          setCpf(json.data.cpf_cliente || "");
        } else {
          Alert.alert("Erro", "Não foi possível carregar os seus dados.");
        }
      } catch (erro) {
        console.log("Erro ao buscar dados do cliente:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosCliente();
  }, []);

  // 2. Salvar as alterações feitas pelo utilizador
  async function handleSalvarAlteracoes() {
    try {
      setSalvando(true);
      const token = await AsyncStorage.getItem("token");

      const resposta = await fetch(`${API}/cliente`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_cliente: nome,
          email_cliente: email,
          whatsapp_cliente: telefone, // Enviando com a chave correta da base de dados
          cpf_cliente: cpf,           // Enviando com a chave correta da base de dados
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        Alert.alert("Erro de validação", json.message || "Verifique os campos preenchidos.");
        return;
      }

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      router.back();
    } catch (erro) {
      console.log("Erro ao atualizar dados:", erro);
      Alert.alert("Erro", "Não foi possível ligar ao servidor.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={[globalStyle.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4B5320" />
        <Text style={{ marginTop: 10, color: "#fff" }}>A carregar dados...</Text>
      </View>
    );
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
            <View style={editarContaStyle.conteudo}>
              {/* Botão Voltar Topo */}
              <Pressable
                onPress={() => router.back()}
                style={editarContaStyle.btnVoltar}
              >
                <Text style={editarContaStyle.txtVoltar}>←</Text>
              </Pressable>

              {/* Seção Principal do Topo */}
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

              {/* Nome do Utilizador Dinâmico */}
              <Text style={editarContaStyle.nomeUsuario}>
                {nome || "Utilizador"}
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
              </View>

              {/* Botão Alterar Senha */}
              <Pressable
                style={editarContaStyle.btnAlterarSenha}
                onPress={() => router.push("/editarSenha")}
              >
                <Text style={editarContaStyle.txtAlterarSenha}>
                  Alterar Senha
                </Text>
              </Pressable>

              {/* Botão Salvar alterações */}
              <Pressable
                style={editarContaStyle.btnSalvar}
                onPress={handleSalvarAlteracoes}
                disabled={salvando}
              >
                <Text style={editarContaStyle.txtSalvar}>
                  {salvando ? "A guardar..." : "Salvar alterações"}
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