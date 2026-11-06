
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "@/components/BottomBar";
import editarContaStyle from "@/styles/editarContaStyle";
import globalStyle from "@/styles/globalStyle";

const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM_BASE = `${SERVIDOR}/clientes`;

type FotoSelecionada = {
  uri: string;
  name: string;
  type: string;
  file?: File;
};

function obterUriFoto(foto: string | null) {
  if (!foto) return null;

  if (
    foto.startsWith("http") ||
    foto.startsWith("data:") ||
    foto.startsWith("file:") ||
    foto.startsWith("blob:")
  ) {
    return foto;
  }

  return `${IMAGEM_BASE}/${foto}`;
}

export default function EditarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [fotoCliente, setFotoCliente] = useState<string | null>(null);
  const [novaFoto, setNovaFoto] = useState<FotoSelecionada | null>(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const salvamentoEmAndamento = useRef(false);

  // Carregar dados do cliente
  useEffect(() => {
    async function carregarDadosCliente() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert(
            "Sessão expirada",
            "Faça login novamente."
          );

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

        if (resposta.ok && json.success && json.data) {
          setNome(json.data.nome_cliente || "");
          setEmail(json.data.email_cliente || "");
          setTelefone(json.data.whatsapp_cliente || "");
          setCpf(json.data.cpf_cliente || "");
          setFotoCliente(json.data.foto_cliente || null);
        } else {
          Alert.alert(
            "Erro",
            json.message || "Não foi possível carregar os dados."
          );
        }
      } catch (erro) {
        console.log("Erro ao carregar cliente:", erro);

        Alert.alert(
          "Erro",
          "Não foi possível conectar ao servidor."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosCliente();
  }, []);

  // Selecionar foto
  async function handleSelecionarFoto() {
    try {
      if (Platform.OS !== "web") {
        const permissao =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {
          Alert.alert(
            "Permissão negada",
            "Precisamos de acesso à galeria."
          );
          return;
        }
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (resultado.canceled || !resultado.assets?.length) {
        return;
      }

      const imagem = resultado.assets[0];

      const nomeArquivo =
        imagem.fileName || `perfil_${Date.now()}.jpg`;

      const tipoArquivo =
        imagem.mimeType || "image/jpeg";

      setNovaFoto({
        uri: imagem.uri,
        name: nomeArquivo,
        type: tipoArquivo,
        file: Platform.OS === "web"
          ? imagem.file
          : undefined,
      });

      // Mostrar prévia da foto
      setFotoCliente(imagem.uri);

    } catch (erro) {
      console.log("Erro ao selecionar imagem:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem."
      );
    }
  }

  // Salvar alterações
  async function handleSalvarAlteracoes() {
    if (salvamentoEmAndamento.current) return;

    if (!nome.trim() || !email.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha o nome e o e-mail."
      );
      return;
    }

    salvamentoEmAndamento.current = true;
    setSalvando(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Sessão expirada",
          "Faça login novamente."
        );

        router.replace("/login");
        return;
      }

      const formData = new FormData();

      formData.append("nome_cliente", nome.trim());
      formData.append("email_cliente", email.trim());
      formData.append("whatsapp_cliente", telefone.trim());
      formData.append("cpf_cliente", cpf.trim());

      // Enviar foto somente quando selecionada
      if (novaFoto) {
        if (Platform.OS === "web") {
          let arquivo: File;

          if (novaFoto.file) {
            arquivo = novaFoto.file;
          } else {
            const respostaImagem = await fetch(novaFoto.uri);
            const blob = await respostaImagem.blob();

            arquivo = new File(
              [blob],
              novaFoto.name,
              { type: novaFoto.type }
            );
          }

          formData.append("foto_cliente", arquivo);

        } else {
          formData.append("foto_cliente", {
            uri: novaFoto.uri,
            name: novaFoto.name,
            type: novaFoto.type,
          } as any);
        }
      }

      // Laravel interpreta como PUT
      formData.append("_method", "PUT");

      const resposta = await fetch(`${API}/cliente`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const textoResposta = await resposta.text();

      let json: any;

      try {
        json = JSON.parse(textoResposta);
      } catch {
        console.log("Resposta não JSON:", textoResposta);

        throw new Error(
          `O servidor retornou uma resposta inválida. Status: ${resposta.status}`
        );
      }

      console.log("STATUS ATUALIZAÇÃO:", resposta.status);
      console.log("RESPOSTA ATUALIZAÇÃO:", json);

      if (!resposta.ok || json.success === false) {
        const mensagemErro =
          json.errors
            ? Object.values(json.errors)
                .flat()
                .join("\n")
            : json.message ||
              "Não foi possível atualizar o perfil.";

        throw new Error(mensagemErro);
      }

      // Confirmar atualização antes de redirecionar
      router.replace({
        pathname: "/configuracoes",
        params: {
          perfilAtualizado: "true",
        },
      });

    } catch (erro: any) {
      console.log("Erro ao salvar alterações:", erro);

      const mensagem =
        erro?.message ||
        "Não foi possível salvar as alterações.";

      // Mensagem visível também no Expo Web
      if (Platform.OS === "web") {
        window.alert(mensagem);
      } else {
        Alert.alert("Erro ao salvar", mensagem);
      }
    } finally {
      salvamentoEmAndamento.current = false;
      setSalvando(false);
    }
  }

  const uriFotoPerfil = obterUriFoto(fotoCliente);

  if (carregando) {
    return (
      <View
        style={[
          globalStyle.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color="#4B5320"
        />

        <Text
          style={{
            marginTop: 10,
            color: "#4B5320",
          }}
        >
          Carregando dados...
        </Text>
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

              {/* Botão Voltar */}
              <Pressable
                onPress={() => router.back()}
                style={editarContaStyle.btnVoltar}
              >
                <Text style={editarContaStyle.txtVoltar}>
                  ←
                </Text>
              </Pressable>

              {/* Topo */}
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
                      disabled={salvando}
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
                    source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                    style={editarContaStyle.logoHeader}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Nome */}
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
                  <Text style={editarContaStyle.label}>
                    Seu nome
                  </Text>

                  <TextInput
                    style={editarContaStyle.input}
                    value={nome}
                    onChangeText={setNome}
                    editable={!salvando}
                  />
                </View>
              </View>

              {/* Campo Email */}
              <View style={editarContaStyle.cardInput}>
                <Image
                  source={require("@/assets/images/fitbia/email-verde.png")}
                  style={editarContaStyle.fieldIcone}
                />

                <View style={editarContaStyle.infoBox}>
                  <Text style={editarContaStyle.label}>
                    Email
                  </Text>

                  <TextInput
                    style={editarContaStyle.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!salvando}
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
                  <Text style={editarContaStyle.label}>
                    Telefone
                  </Text>

                  <TextInput
                    style={editarContaStyle.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    editable={!salvando}
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
                  <Text style={editarContaStyle.label}>
                    CPF
                  </Text>

                  <TextInput
                    style={editarContaStyle.input}
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                    editable={!salvando}
                  />
                </View>
              </View>

              {/* Alterar Senha */}
              <Pressable
                style={editarContaStyle.btnAlterarSenha}
                onPress={() => router.push("/editarSenha")}
                disabled={salvando}
              >
                <Text style={editarContaStyle.txtAlterarSenha}>
                  Alterar Senha
                </Text>
              </Pressable>

              {/* Salvar Alterações */}
              <Pressable
                style={[
                  editarContaStyle.btnSalvar,
                  salvando && { opacity: 0.6 },
                ]}
                onPress={handleSalvarAlteracoes}
                disabled={salvando}
              >
                {salvando ? (
                  <ActivityIndicator color="#38513B" />
                ) : (
                  <Text style={editarContaStyle.txtSalvar}>
                    Salvar alterações
                  </Text>
                )}
              </Pressable>

            </View>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
