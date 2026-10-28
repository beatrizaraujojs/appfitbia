
import React, { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

import globalStyle from "@/styles/globalStyle";
import entregaStyle from "@/styles/entregaStyle";
import BottomBar from "@/components/BottomBar";
import TrocaDeEnderecoModal from "@/components/trocaDeEndereco";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function EntregaScreen() {
  const [opcaoSelecionada, setOpcaoSelecionada] =
    useState<"entrega" | "retirada">("entrega");

  const [modalEnderecoVisivel, setModalEnderecoVisivel] = useState(false);

  const [enderecoAtual, setEnderecoAtual] = useState<any | null>(null);
  const [loadingEndereco, setLoadingEndereco] = useState(true);

  const [subtotalCarrinho, setSubtotalCarrinho] = useState(0);
  const [qtdItensCarrinho, setQtdItensCarrinho] = useState(0);

  useFocusEffect(
    useCallback(() => {
      carregarEnderecoAtivo();
      carregarCarrinhoDoStorage();
    }, [])
  );

  async function carregarCarrinhoDoStorage() {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem("@carrinho_fitbia");

      if (carrinhoSalvo) {
        const itens = JSON.parse(carrinhoSalvo);

        const subtotalBruto = itens.reduce(
          (acc: number, item: any) => acc + (item.valorTotal || 0),
          0
        );

        const quantidade = itens.reduce(
          (acc: number, item: any) => acc + (item.quantidade || 0),
          0
        );

        const desconto = (subtotalBruto * 5) / 100;
        const subtotalComDesconto = Math.max(0, subtotalBruto - desconto);

        setSubtotalCarrinho(subtotalComDesconto);
        setQtdItensCarrinho(quantidade);
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho na entrega:", error);
    }
  }

  async function carregarEnderecoAtivo() {
    try {
      setLoadingEndereco(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const enderecoSalvo = await AsyncStorage.getItem("enderecoSelecionado");

      if (enderecoSalvo) {
        setEnderecoAtual(JSON.parse(enderecoSalvo));
        return;
      }

      const response = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const primeiroEndereco = json.data[0];

        setEnderecoAtual(primeiroEndereco);

        await AsyncStorage.setItem(
          "enderecoSelecionado",
          JSON.stringify(primeiroEndereco)
        );
      } else {
        setEnderecoAtual(null);
      }
    } catch (error) {
      console.error("Erro ao carregar endereço principal:", error);
    } finally {
      setLoadingEndereco(false);
    }
  }

  async function selecionarNovoEndereco(endereco: any) {
    setEnderecoAtual(endereco);
    setModalEnderecoVisivel(false);

    try {
      await AsyncStorage.setItem(
        "enderecoSelecionado",
        JSON.stringify(endereco)
      );
    } catch (error) {
      console.error("Erro ao salvar endereço selecionado:", error);
    }
  }

  // Monta o endereço completo para pesquisar no Google Maps
  const enderecoCompleto = enderecoAtual
    ? [
        enderecoAtual.rua_endereco,
        enderecoAtual.numero_endereco,
        enderecoAtual.bairro_endereco,
        enderecoAtual.cidade_endereco || "São Paulo",
        "Brasil",
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  // Atualiza a URL sempre que o endereço mudar
  const urlMapa = enderecoCompleto
    ? `https://maps.google.com/maps?q=${encodeURIComponent(
        enderecoCompleto
      )}&z=16&output=embed`
    : "";

  const ruaFormatada = enderecoAtual
    ? `${enderecoAtual.rua_endereco}, ${
        enderecoAtual.numero_endereco || "S/N"
      }`
    : "Nenhum endereço cadastrado";

  const bairroFormatado = enderecoAtual
    ? `${
        enderecoAtual.bairro_endereco
          ? enderecoAtual.bairro_endereco + " - "
          : ""
      }${enderecoAtual.cidade_endereco || "São Paulo"}`
    : "Clique em trocar para adicionar";

  const taxaEntrega = opcaoSelecionada === "entrega" ? 10.0 : 0.0;
  const valorFinalCheckout = subtotalCarrinho + taxaEntrega;

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
            <View style={entregaStyle.conteudo}>
              {/* Header */}
              <View style={entregaStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={entregaStyle.btnVoltar}
                  hitSlop={10}
                >
                  <Image
                    source={require("@/assets/images/fitbia/de-volta.png")}
                    style={entregaStyle.iconeVoltar}
                    resizeMode="contain"
                  />
                </Pressable>

                <Text style={entregaStyle.tituloHeader}>Endereço</Text>

                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={entregaStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Seção Entrega ou Retirada */}
              <Text style={entregaStyle.tituloSecao}>
                Entrega ou retirada
              </Text>

              {/* Mapa dinâmico */}
              <View style={[entregaStyle.boxMapa, { overflow: "hidden" }]}>
                {loadingEndereco ? (
                  <ActivityIndicator
                    size="large"
                    color="#916F4A"
                    style={{ flex: 1 }}
                  />
                ) : enderecoAtual && urlMapa ? (
                  Platform.OS === "web" ? (
                    React.createElement("iframe" as any, {
                      key: urlMapa,
                      src: urlMapa,
                      title: "Mapa do endereço selecionado",
                      style: {
                        width: "100%",
                        height: "100%",
                        border: 0,
                      },
                      loading: "lazy",
                      referrerPolicy: "no-referrer-when-downgrade",
                    })
                  ) : (
                    <WebView
                      key={urlMapa}
                      source={{ uri: urlMapa }}
                      style={{ flex: 1, width: "100%" }}
                      javaScriptEnabled
                      domStorageEnabled
                      startInLoadingState
                      renderLoading={() => (
                        <ActivityIndicator
                          size="large"
                          color="#916F4A"
                          style={{ flex: 1 }}
                        />
                      )}
                    />
                  )
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#666" }}>
                      Selecione um endereço para visualizar o mapa.
                    </Text>
                  </View>
                )}
              </View>

              {/* Endereço Atual */}
              <View style={entregaStyle.cardEndereco}>
                <View style={entregaStyle.infoEndereco}>
                  <Image
                    source={require("@/assets/images/fitbia/endereco.png")}
                    style={entregaStyle.iconePin}
                    resizeMode="contain"
                  />

                  {loadingEndereco ? (
                    <ActivityIndicator size="small" color="#916F4A" />
                  ) : (
                    <View>
                      <Text style={entregaStyle.ruaTexto}>
                        {ruaFormatada}
                      </Text>

                      <Text style={entregaStyle.bairroTexto}>
                        {bairroFormatado}
                      </Text>
                    </View>
                  )}
                </View>

                <Pressable onPress={() => setModalEnderecoVisivel(true)}>
                  <Text style={entregaStyle.txtTrocar}>Trocar</Text>
                </Pressable>
              </View>

              {/* Opções de Entrega */}
              <Text style={entregaStyle.tituloSecao}>
                Opções de entrega
              </Text>

              <View style={entregaStyle.opcoesContainer}>
                {/* Entregar no endereço */}
                <Pressable
                  style={[
                    entregaStyle.cardOpcao,
                    opcaoSelecionada === "entrega" &&
                      entregaStyle.cardOpcaoSelecionado,
                  ]}
                  onPress={() => setOpcaoSelecionada("entrega")}
                >
                  <Text style={entregaStyle.txtOpcao}>
                    Entregar no endereço
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={entregaStyle.valorEntrega}>
                      R$ 10,00
                    </Text>

                    <View
                      style={[
                        entregaStyle.radioOuter,
                        opcaoSelecionada === "entrega" &&
                          entregaStyle.radioOuterSelecionado,
                      ]}
                    >
                      {opcaoSelecionada === "entrega" && (
                        <View style={entregaStyle.radioInner} />
                      )}
                    </View>
                  </View>
                </Pressable>

                {/* Retirada na loja */}
                <Pressable
                  style={[
                    entregaStyle.cardOpcao,
                    opcaoSelecionada === "retirada" &&
                      entregaStyle.cardOpcaoSelecionado,
                  ]}
                  onPress={() => setOpcaoSelecionada("retirada")}
                >
                  <Text style={entregaStyle.txtOpcao}>
                    Retirada na loja
                  </Text>

                  <View
                    style={[
                      entregaStyle.radioOuter,
                      opcaoSelecionada === "retirada" &&
                        entregaStyle.radioOuterSelecionado,
                    ]}
                  >
                    {opcaoSelecionada === "retirada" && (
                      <View style={entregaStyle.radioInner} />
                    )}
                  </View>
                </Pressable>
              </View>

              {/* Barra de Checkout */}
              <View style={entregaStyle.barCheckout}>
                <View style={entregaStyle.boxPrecoCheckout}>
                  <Text style={entregaStyle.totalCheckout}>
                    R$ {valorFinalCheckout.toFixed(2).replace(".", ",")}
                  </Text>

                  <Text style={entregaStyle.qtdItensCheckout}>
                    {" "} / {qtdItensCarrinho} item(ns)
                  </Text>
                </View>

                <Pressable
                  style={entregaStyle.btnContinuar}
                  onPress={() => router.push("/pagamento")}
                >
                  <Text style={entregaStyle.txtBtnContinuar}>
                    Continuar
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* Modal de Troca de Endereço */}
          <TrocaDeEnderecoModal
            visible={modalEnderecoVisivel}
            onClose={() => setModalEnderecoVisivel(false)}
            onSelecionarEndereco={selecionarNovoEndereco}
          />

          <BottomBar abaAtiva="carrinho" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
