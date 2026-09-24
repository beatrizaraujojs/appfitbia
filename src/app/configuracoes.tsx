import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "@/components/BottomBar";
import ModalSair from "@/components/sair";
import globalStyle from "@/styles/globalStyle";
import configuracoesStyle from "@/styles/configuracoesStyle";

export default function ConfiguracoesScreen() {
  const [modalSairVisivel, setModalSairVisivel] = useState(false);

  const handleConfirmarSair = () => {
    setModalSairVisivel(false);
    router.replace("/");
  };

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
            <View style={configuracoesStyle.conteudo}>
              {/* Header */}
              <View style={configuracoesStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={configuracoesStyle.btnVoltar}
                >
                  <Text style={configuracoesStyle.txtVoltar}>←</Text>
                </Pressable>
                <Text style={configuracoesStyle.tituloHeader}>
                  Configurações
                </Text>
                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={configuracoesStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Card de Perfil */}
              <View style={configuracoesStyle.cardPerfil}>
                <View style={configuracoesStyle.avatarContainer}>
                  <Image
                    source={require("@/assets/images/fitbia/do-utilizador.png")}
                    style={configuracoesStyle.avatar}
                  />
                </View>

                <View style={configuracoesStyle.infoPerfil}>
                  <Text style={configuracoesStyle.nomeUsuario}>
                    Beatriz Araújo dos Santos Bia
                  </Text>
                  <View style={configuracoesStyle.badgeCliente}>
                    <Text style={configuracoesStyle.txtBadge}>
                      Cliente desde 2024
                    </Text>
                  </View>
                </View>
              </View>

              {/* Opções */}
              <View style={configuracoesStyle.listaOpcoes}>
                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.push("/editar-conta")}
                >
                  <Image
                    source={require("@/assets/images/fitbia/editar.png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Editar conta
                    </Text>
                    <Text style={configuracoesStyle.opcaoSubtitulo}>
                      nome, telefone, email...
                    </Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.push("/favoritos" as any)}
                >
                  <Image
                    source={require("@/assets/images/fitbia/favorito.png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Meus favoritos
                    </Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.push("/enderecos" as any)}
                >
                  <Image
                    source={require("@/assets/images/fitbia/endereco-residencial.png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Meus endereços
                    </Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.replace("/pedidoEmAndamento")}
                >
                  <Image
                    source={require("@/assets/images/fitbia/pedido (2).png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Meus Pedidos
                    </Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.push("/suporte" as any)}
                >
                  <Image
                    source={require("@/assets/images/fitbia/central-de-atendimento.png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Ajuda e suporte
                    </Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => router.push("/sobre" as any)}
                >
                  <Image
                    source={require("@/assets/images/fitbia/info.png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>Sobre</Text>
                  </View>
                  <Text style={configuracoesStyle.opcaoSeta}>&gt;</Text>
                </Pressable>
                <View style={configuracoesStyle.divisor} />

                {/* Sair da Conta abre o Modal */}
                <Pressable
                  style={configuracoesStyle.opcaoItem}
                  onPress={() => setModalSairVisivel(true)}
                >
                  <Image
                    source={require("@/assets/images/fitbia/sair (1).png")}
                    style={configuracoesStyle.opcaoIcone}
                  />
                  <View style={configuracoesStyle.opcaoTextoBox}>
                    <Text style={configuracoesStyle.opcaoTitulo}>
                      Sair da conta
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* Componente Modal */}
          <ModalSair
            visible={modalSairVisivel}
            onClose={() => setModalSairVisivel(false)}
            onConfirm={handleConfirmarSair}
          />

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
