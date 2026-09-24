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
} from "react-native";

// Estilo global
import globalStyle from "@/styles/globalStyle";

// Modal de Termos de Uso
import TermosUsoModal from "@/components/termosUsoModal";

// Estilo exclusivo da tela
import criarContaStyle from "@/styles/criarContaStyle";

export default function CriarContaScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [modalTermosUso, setModalTermosUso] = useState(false);

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

            {/* Formulário criação de conta */}
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
                />
              </View>

              {/* E-mail */}
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
                ]}
                onPress={() => router.replace("/login")}
              >
                <Text style={criarContaStyle.textoCriarConta}>
                  Criar conta
                </Text>
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