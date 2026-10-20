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
import * as ImagePicker from "expo-image-picker";

import BottomBar from "@/components/BottomBar";
import editarContaStyle from "@/styles/editarContaStyle";
import globalStyle from "@/styles/globalStyle";

const SERVIDOR_WEB = "http://localhost:8081";
const SERVIDOR_IMAGENS = "http://localhost:8081";
const API = `${SERVIDOR_WEB}/api/v1`;
const IMAGEM_BASE = `${SERVIDOR_IMAGENS}/clientes`;

export default function EditarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [fotoCliente, setFotoCliente] = useState<string | null>(null);
  
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

        // console.log("JSON da API:", json)

        if (resposta.ok && json.success) {
          setNome(json.data.nome_cliente || "");
          setEmail(json.data.email_cliente || "");
          setTelefone(json.data.whatsapp_cliente || "");
          setCpf(json.data.cpf_cliente || "");

          if (json.data.foto_cliente) {
            setFotoCliente(json.data.foto_cliente);
          }
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

  // 2. Selecionar a foto da galeria
  async function handleSelecionarFoto() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissao.granted) {
      Alert.alert("Permissão negada", "Precisamos de permissão para aceder à galeria.");
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setFotoCliente(base64Image);
    }
  }

  // 3. Salvar as alterações feitas pelo utilizador
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
          email_cliente: email, // Corrigido para corresponder à regra da API
          whatsapp_cliente: telefone,
          cpf_cliente: cpf,
          foto_cliente: fotoCliente,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        const mensagemErro = json.message || (json.errors ? JSON.stringify(json.errors) : "Verifique os campos preenchidos.");
        Alert.alert("Erro de validação", mensagemErro);
        return;
      }

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      router.replace("/configuracoes");
    } catch (erro) {
      console.log("Erro ao atualizar dados:", erro);
      Alert.alert("Erro", "Não foi possível ligar ao servidor.");
    } finally {
      setSalvando(false);
    }
  }

  const uriFotoPerfil = fotoCliente 
    ? (fotoCliente.startsWith("http") || fotoCliente.startsWith("data:") 
        ? fotoCliente 
        : `${IMAGEM_BASE}/${fotoCliente}`)
    : null;

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
                      source={
                        uriFotoPerfil
                          ? { uri: uriFotoPerfil }
                          : require("@/assets/images/fitbia/do-utilizador.png")
                      }
                      style={editarContaStyle.avatarIcone}
                    />
                    <Pressable 
                      style={editarContaStyle.btnFotoBadge}
                      onPress={handleSelecionarFoto}
                    >
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