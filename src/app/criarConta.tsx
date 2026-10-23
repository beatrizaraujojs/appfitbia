import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import TermosUsoModal from "@/components/termosUsoModal";
import criarContaStyle from "@/styles/criarContaStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function CriarContaScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [modalTermosUso, setModalTermosUso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCriarConta() {
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!aceitarTermos) {
      Alert.alert("Termos de Uso", "Você precisa aceitar os termos de uso para continuar.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: nome,
        email_cliente: email,
        telefone: telefone,
        password: senha,
      };

      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let json;
      try {
        json = JSON.parse(responseText);
      } catch (e) {
        console.error("Erro ao analisar JSON:", responseText);
      }

      // Tratamento de erros do Laravel (ex: 422 Unprocessable Content)
      if (!response.ok) {
        let mensagemErro = "Não foi possível criar a conta. Verifique os dados.";

        if (json?.errors) {
          // Captura a mensagem específica do campo que falhou na validação (ex: e-mail já em uso)
          const primeiroCampo = Object.keys(json.errors)[0];
          if (primeiroCampo && json.errors[primeiroCampo][0]) {
            mensagemErro = json.errors[primeiroCampo][0];
          }
        } else if (json?.message) {
          mensagemErro = json.message;
        }

        Alert.alert("Atenção", mensagemErro);
        return;
      }

      // Resposta com Sucesso
      if (json?.success || json?.token) {
        Alert.alert("Sucesso!", "Conta criada com sucesso. Faça login para continuar.", [
          {
            text: "Ir para Login",
            onPress: () => router.replace("/login"),
          },
        ]);
      }
    } catch (error) {
      console.error("Erro de conexão ao criar conta:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
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
          <Pressable
            style={criarContaStyle.btnVoltar}
            onPress={() => router.navigate('/login')}
          >
            <Image
              style={criarContaStyle.imgVoltar}
              source={require("@/assets/images/fitbia/de-volta.png")}
            />
          </Pressable>

          <ScrollView
            contentContainerStyle={criarContaStyle.conteudo}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
              style={criarContaStyle.logo}
            />

            <Text style={criarContaStyle.titulo}>Criar conta</Text>
            <Text style={criarContaStyle.subtitulo}>
              Cadastre-se para fazer seus pedidos
            </Text>

            <View style={criarContaStyle.form}>
              {/* Nome */}
              <Text style={criarContaStyle.tituloInput}>Nome</Text>
              <View style={criarContaStyle.input}>
                <Image
                  source={require("@/assets/images/fitbia/perfil.png")}
                  style={criarContaStyle.icone}
                />
                <TextInput
                  placeholder="Informe o seu nome:"
                  placeholderTextColor="#888888"
                  keyboardType="default"
                  autoCapitalize="words"
                  style={criarContaStyle.textInput}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* Email */}
              <Text style={criarContaStyle.tituloInput}>Email</Text>
              <View style={criarContaStyle.input}>
                <Image
                  source={require("@/assets/images/fitbia/o-email (1).png")}
                  style={criarContaStyle.icone}
                />
                <TextInput
                  placeholder="Informe o seu e-mail:"
                  placeholderTextColor="#888888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={criarContaStyle.textInput}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Telefone */}
              <Text style={criarContaStyle.tituloInput}>Telefone</Text>
              <View style={criarContaStyle.input}>
                <Image
                  source={require("@/assets/images/fitbia/chamada-telefonica (1).png")}
                  style={criarContaStyle.icone}
                />
                <TextInput
                  placeholder="Informe o seu telefone:"
                  placeholderTextColor="#888888"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  style={criarContaStyle.textInput}
                  value={telefone}
                  onChangeText={setTelefone}
                />
              </View>

              {/* Senha */}
              <Text style={criarContaStyle.tituloInput}>Senha</Text>
              <View style={criarContaStyle.input}>
                <Image
                  source={require("@/assets/images/fitbia/senha (1).png")}
                  style={criarContaStyle.icone}
                />
                <TextInput
                  placeholder="Informe sua senha:"
                  placeholderTextColor="#888888"
                  style={criarContaStyle.textInput}
                  secureTextEntry={!verSenha}
                  value={senha}
                  onChangeText={setSenha}
                />

                <Pressable
                  style={criarContaStyle.btnMostrarSenha}
                  onPress={() => setVerSenha((current) => !current)}
                >
                  <Image
                    source={
                      verSenha
                        ? require("@/assets/images/fitbia/olho.png")
                        : require("@/assets/images/fitbia/olho-vermelho (1).png")
                    }
                    style={criarContaStyle.mostrarSenha}
                  />
                </Pressable>
              </View>

              {/* Confirmar Senha */}
              <Text style={criarContaStyle.tituloInput}>Confirmar senha</Text>
              <View style={criarContaStyle.input}>
                <Image
                  source={require("@/assets/images/fitbia/senha (1).png")}
                  style={criarContaStyle.icone}
                />
                <TextInput
                  placeholder="Confirme sua senha:"
                  placeholderTextColor="#888888"
                  style={criarContaStyle.textInput}
                  secureTextEntry={!verConfirmarSenha}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                />

                <Pressable
                  style={criarContaStyle.btnMostrarSenha}
                  onPress={() => setVerConfirmarSenha((current) => !current)}
                >
                  <Image
                    source={
                      verConfirmarSenha
                        ? require("@/assets/images/fitbia/olho.png")
                        : require("@/assets/images/fitbia/olho-vermelho (1).png")
                    }
                    style={criarContaStyle.mostrarSenha}
                  />
                </Pressable>
              </View>

              {/* Check Termos de uso */}
              <View style={criarContaStyle.termosUso}>
                <Pressable
                  style={criarContaStyle.btnTermos}
                  onPress={() => setAceitarTermos((current) => !current)}
                >
                  <View
                    style={[
                      criarContaStyle.checkTermos,
                      aceitarTermos && criarContaStyle.termoAceito,
                    ]}
                  >
                    {aceitarTermos && (
                      <Text style={criarContaStyle.checkOk}>✓</Text>
                    )}
                  </View>
                </Pressable>

                <Text style={criarContaStyle.txtTermos}>Aceito os </Text>

                <Pressable onPress={() => setModalTermosUso(true)}>
                  <Text style={criarContaStyle.linkTermos}>
                    termos de uso
                  </Text>
                </Pressable>
              </View>

              {/* Botão Criar */}
              <Pressable
                style={({ pressed }) => [
                  criarContaStyle.btnCriar,
                  pressed && criarContaStyle.btnCriarPressed,
                  loading && { opacity: 0.7 },
                ]}
                onPress={handleCriarConta}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={criarContaStyle.textoCriarConta}>
                    Criar conta
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>

          <TermosUsoModal
            visible={modalTermosUso}
            onClose={() => setModalTermosUso(false)}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}