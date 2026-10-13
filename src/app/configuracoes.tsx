import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from "@/components/BottomBar";
import ModalSair from "@/components/sair";
import globalStyle from "@/styles/globalStyle";
import configuracoesStyle from "@/styles/configuracoesStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;


export default function ConfiguracoesScreen() {
  const [modalSairVisivel, setModalSairVisivel] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [criadoEm, setCriadoEm] = useState("");
  const [carregando, setCarregando] = useState(true);

  // 1. Carregar os dados do perfil do cliente autenticado
  useEffect(() => {
    async function carregarPerfil() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
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
          setNomeCliente(json.data.nome_cliente || "Utilizador");

          // Extrai o ano de criação da conta caso exista a data na resposta
          if (json.data.criado_em_cliente || json.data.created_at) {
            const dataData = json.data.criado_em_cliente || json.data.created_at;
            const ano = new Date(dataData).getFullYear();
            setCriadoEm(String(ano));
          } else {
            setCriadoEm("2024");
          }
        }
      } catch (erro) {
        console.log("Erro ao carregar dados em configurações:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  // 2. Fazer Logout revogando o token e removendo do AsyncStorage
  const handleConfirmarSair = async () => {
    try {
      setModalSairVisivel(false);
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Chama a rota de logout da API (opcional, para revogar no servidor)
        await fetch(`${API}/auth/logout`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (erro) {
      console.log("Erro ao efetuar logout na API:", erro);
    } finally {
      // Apaga o token do dispositivo e direciona para o login
      await AsyncStorage.removeItem("token");
      router.replace("/");
    }
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
                  {carregando ? (
                    <ActivityIndicator size="small" color="#4B5320" />
                  ) : (
                    <>
                      <Text style={configuracoesStyle.nomeUsuario}>
                        {nomeCliente || "Cliente"}
                      </Text>
                      <View style={configuracoesStyle.badgeCliente}>
                        <Text style={configuracoesStyle.txtBadge}>
                          Cliente desde {criadoEm || "2024"}
                        </Text>
                      </View>
                    </>
                  )}
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