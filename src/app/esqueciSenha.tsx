import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import globalStyle from '@/styles/globalStyle';
import esqueciSenhaStyle from '@/styles/esqueciSenhaStyle';

export default function EsqueciSenha() {
  const router = useRouter();

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require('@/assets/images/fitbia/fundo-fitbia.png')}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView
            style={globalStyle.scrollConteudo}
            contentContainerStyle={esqueciSenhaStyle.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={esqueciSenhaStyle.conteudo}>

              {/* Logo */}
              <Image
                source={require('@/assets/images/fitbia/FITBIA LOGO (1).svg')}
                style={esqueciSenhaStyle.logo}
                resizeMode="contain"
              />

              {/* Título */}
              <Text style={esqueciSenhaStyle.titulo}>
                Esqueci minha senha
              </Text>

              {/* Descrição */}
              <Text style={esqueciSenhaStyle.descricao}>
                Informe o seu e-mail para receber
                {'\n'}
                o link de redefinição
              </Text>

              {/* Campo de e-mail */}
              <View style={esqueciSenhaStyle.campoContainer}>
                <Text style={esqueciSenhaStyle.label}>
                  Email:
                </Text>

                <View style={esqueciSenhaStyle.inputContainer}>
                  <Image
                    source={require('@/assets/images/fitbia/o-email (1).png')}
                    style={esqueciSenhaStyle.icone}
                    resizeMode="contain"
                  />

                  <TextInput
                    style={esqueciSenhaStyle.input}
                    placeholder="Informe seu E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Botões */}
              <View style={esqueciSenhaStyle.botoes}>
                <Pressable 
                  style={esqueciSenhaStyle.botaoEnviar} 
                  onPress={() => router.navigate('/')}
                >
                  <Text style={esqueciSenhaStyle.textoBotaoEnviar}>
                    Enviar Link
                  </Text>
                </Pressable>

                <Pressable
                  style={esqueciSenhaStyle.botaoVoltar}
                  onPress={() => router.navigate('/login')}
                >
                  <Text style={esqueciSenhaStyle.textoBotaoVoltar}>
                    Voltar ao Login
                  </Text>
                </Pressable>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}