import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

// Mesmo estilo para todas as paginas
import globalStyle from "@/styles/globalStyle";

// Estilo para esta pagina especifica
import loginStyle from "@/styles/loginStyle";

export default function LoginScreen() {
  const [verSenha, setVerSenha] = useState(false);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <ScrollView
          contentContainerStyle={loginStyle.scrollConteudo}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <Image
            source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
            style={loginStyle.logo}
            resizeMode="contain"
          />

          <Text style={loginStyle.titulo}>Bem-vindo(a)!</Text>
          <Text style={loginStyle.subtitulo}>
            Faça seu login para continuar
          </Text>

          {/* Formulário de login */}
          <View style={loginStyle.form}>
            {/* E-mail */}
            <Text style={loginStyle.tituloInput}>Email</Text>

            <View style={loginStyle.input}>
              <Image
                source={require("@/assets/images/fitbia/o-email (1).png")}
                style={loginStyle.icone}
              />
              <TextInput
                placeholder="Informe o seu e-mail:"
                placeholderTextColor="#888888"
                keyboardType="email-address"
                autoCapitalize="none"
                style={loginStyle.textInput}
              />
            </View>

            {/* Senha */}
            <Text style={loginStyle.tituloInput}>Senha</Text>

            <View style={loginStyle.input}>
              <View style={loginStyle.inputContent}>
                <Image
                  source={require("@/assets/images/fitbia/senha (1).png")}
                  style={loginStyle.icone}
                />
                <TextInput
                  placeholder="Informe a sua senha:"
                  placeholderTextColor="#888888"
                  style={loginStyle.textInput}
                  secureTextEntry={!verSenha}
                />
              </View>

              <Pressable
                style={loginStyle.btnMostrarSenha}
                onPress={() => setVerSenha((current) => !current)}
              >
                <Image
                  source={
                    verSenha
                      ? require("@/assets/images/fitbia/olho.png")
                      : require("@/assets/images/fitbia/olho-vermelho (1).png")
                  }
                  style={loginStyle.mostrarSenha}
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEsqueciSenha,
                pressed && loginStyle.btnEsqueciSenhaPressed,
              ]}
              onPress={() => router.navigate("/esqueciSenha")}
            >
              <Text style={loginStyle.txtEsqueciSenha}>
                Esqueci minha senha
              </Text>
            </Pressable>

            {/* Botão Entrar */}
            <Pressable
              style={({ pressed }) => [
                loginStyle.btnEntrar,
                pressed && loginStyle.btnEntrarPressed,
              ]}
              onPress={() => router.replace("/home")}
            >
              <Text style={loginStyle.textoEntrar}>Entrar</Text>
            </Pressable>

            <View style={loginStyle.criarConta}>
              <Text style={loginStyle.textoCriar}>Primeira vez aqui?</Text>

              <Pressable onPress={() => router.navigate("/criarConta")}>
                <Text style={loginStyle.linkCriarConta}>Criar conta</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}