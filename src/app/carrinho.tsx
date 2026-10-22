import { router, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyle from "@/styles/globalStyle";
import carrinhoStyle from "@/styles/carrinhoStyle";
import BottomBar from "@/components/BottomBar";
import AdicionarCupomModal from "@/components/adicionarCupomModal";
import ProdutoModal from "@/components/produtoModal";

const SERVIDOR = "http://localhost:8081";

export default function CarrinhoScreen() {
  const [cupom, setCupom] = useState("primeiropedido");
  const [percentualDesconto, setPercentualDesconto] = useState(5);
  const [modalCupomVisivel, setModalCupomVisivel] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);

  const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Recarrega o carrinho sempre que o ecrã ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [])
  );

  async function carregarCarrinho() {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem("@carrinho_fitbia");
      if (carrinhoSalvo) {
        setItensCarrinho(JSON.parse(carrinhoSalvo));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  }

  const alterarQuantidadeItem = (cartItemId: string, delta: number) => {
    const novaLista = itensCarrinho
      .map((item) => {
        if (item.cartItemId === cartItemId) {
          const novaQtd = item.quantidade + delta;
          if (novaQtd > 0) {
            return {
              ...item,
              quantidade: novaQtd,
              valorTotal: item.precoUnitario * novaQtd,
            };
          }
        }
        return item;
      })
      .filter((item) => item.quantidade > 0);

    setItensCarrinho(novaLista);
    AsyncStorage.setItem("@carrinho_fitbia", JSON.stringify(novaLista));
  };

  const limparCarrinho = async () => {
    setItensCarrinho([]);
    await AsyncStorage.removeItem("@carrinho_fitbia");
  };

  const handleAplicarCupom = (novoCupom: string, descontoBanco: number) => {
    setCupom(novoCupom);
    if (descontoBanco !== undefined) {
      setPercentualDesconto(descontoBanco);
    }
  };

  // Cálculos dinâmicos
  const totalItensValor = itensCarrinho.reduce(
    (acc, item) => acc + (item.valorTotal || 0),
    0
  );
  const totalQuantidadeItens = itensCarrinho.reduce(
    (acc, item) => acc + (item.quantidade || 0),
    0
  );

  const valorDesconto = cupom ? (totalItensValor * percentualDesconto) / 100 : 0.0;
  const subtotalValor = Math.max(0, totalItensValor - valorDesconto);

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
            <View style={carrinhoStyle.conteudo}>
              {/* Header */}
              <View style={carrinhoStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={carrinhoStyle.btnVoltar}
                  hitSlop={10}
                >
                  <Image
                    source={require("@/assets/images/fitbia/de-volta.png")}
                    style={carrinhoStyle.iconeVoltar}
                    resizeMode="contain"
                  />
                </Pressable>

                <Text style={carrinhoStyle.tituloHeader}>Carrinho</Text>

                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={carrinhoStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Cabeçalho da Lista de Itens */}
              <View style={carrinhoStyle.topSecaoItens}>
                <Text style={carrinhoStyle.tituloSecao}>Itens adicionados</Text>
                <Pressable onPress={limparCarrinho}>
                  <Text style={carrinhoStyle.txtLimpar}>Limpar</Text>
                </Pressable>
              </View>

              {/* Lista de Itens do Carrinho */}
              {itensCarrinho.length === 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    marginVertical: 20,
                    color: "#666",
                  }}
                >
                  O seu carrinho está vazio.
                </Text>
              ) : (
                itensCarrinho.map((item) => {
                  const imagemSource = item.foto_produto
                    ? { uri: `${SERVIDOR}/fitbia/images/produto/${item.foto_produto}` }
                    : require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png");

                  return (
                    <View
                      key={item.cartItemId}
                      style={[carrinhoStyle.cardItem, { marginBottom: 12 }]}
                    >
                      <View style={carrinhoStyle.boxImagemItem}>
                        <Image source={imagemSource} style={carrinhoStyle.imgItem} />
                      </View>

                      <View style={carrinhoStyle.infoItem}>
                        <Text style={carrinhoStyle.nomeItem}>{item.nome}</Text>
                        <Text style={carrinhoStyle.descItem} numberOfLines={2}>
                          {item.descricao}
                        </Text>
                        {item.observacao ? (
                          <Text
                            style={{
                              fontSize: 11,
                              color: "#888",
                              fontStyle: "italic",
                            }}
                          >
                            Obs: {item.observacao}
                          </Text>
                        ) : null}
                        <Text style={carrinhoStyle.precoItem}>
                          R$ {item.valorTotal.toFixed(2).replace(".", ",")}
                        </Text>
                      </View>

                      {/* Contadores + Lixeira */}
                      <View style={carrinhoStyle.controleQuantidade}>
                        <Pressable
                          style={carrinhoStyle.btnQtd}
                          onPress={() =>
                            alterarQuantidadeItem(item.cartItemId, 1)
                          }
                        >
                          <Text style={carrinhoStyle.txtBtnQtd}>+</Text>
                        </Pressable>
                        <Text style={carrinhoStyle.txtQtd}>
                          {item.quantidade}
                        </Text>
                        <Pressable
                          style={carrinhoStyle.btnLixeira}
                          onPress={() =>
                            alterarQuantidadeItem(item.cartItemId, -1)
                          }
                        >
                          <Image
                            source={require("@/assets/images/fitbia/lixeira-de-reciclagem.png")}
                            style={carrinhoStyle.iconeLixeira}
                            resizeMode="contain"
                          />
                        </Pressable>
                      </View>
                    </View>
                  );
                })
              )}

              {/* Link Adicionar Mais Itens */}
              <Pressable
                style={carrinhoStyle.btnAdicionarMais}
                onPress={() => router.push("/menu")}
              >
                <Text style={carrinhoStyle.txtAdicionarMais}>
                  Adicionar mais itens
                </Text>
              </Pressable>

              {/* Campo de Cupom */}
              <View style={carrinhoStyle.containerCupom}>
                <Image
                  source={require("@/assets/images/fitbia/promo-code.png")}
                  style={carrinhoStyle.iconeCupom}
                  resizeMode="contain"
                />
                <Pressable
                  style={carrinhoStyle.boxInputCupom}
                  onPress={() => setModalCupomVisivel(true)}
                >
                  <Text style={carrinhoStyle.labelCupom}>Cupom</Text>
                  <TextInput
                    style={carrinhoStyle.inputCupom}
                    value={cupom}
                    editable={false}
                    pointerEvents="none"
                    placeholder="Adicionar cupom"
                    placeholderTextColor="#A0A0A0"
                  />
                </Pressable>
                <Pressable
                  style={carrinhoStyle.btnAplicarCupom}
                  onPress={() => setModalCupomVisivel(true)}
                >
                  <Text style={carrinhoStyle.txtBtnCupom}>
                    {cupom ? "Alterar" : "Adicionar"}
                  </Text>
                </Pressable>
              </View>

              {/* Resumo de Valores */}
              <View style={carrinhoStyle.secaoResumo}>
                <Text style={carrinhoStyle.tituloResumo}>
                  Resumo de valores
                </Text>

                <View style={carrinhoStyle.linhaResumo}>
                  <Text style={carrinhoStyle.labelResumo}>Total dos itens</Text>
                  <Text style={carrinhoStyle.valorResumo}>
                    R$ {totalItensValor.toFixed(2).replace(".", ",")}
                  </Text>
                </View>

                <View style={carrinhoStyle.linhaResumo}>
                  <Text style={carrinhoStyle.labelDesconto}>
                    Desconto ({percentualDesconto}%)
                  </Text>
                  <Text style={carrinhoStyle.valorDesconto}>
                    R$ {valorDesconto.toFixed(2).replace(".", ",")}
                  </Text>
                </View>

                <View style={carrinhoStyle.linhaResumoSubtotal}>
                  <Text style={carrinhoStyle.labelSubtotal}>Subtotal</Text>
                  <Text style={carrinhoStyle.valorSubtotal}>
                    R$ {subtotalValor.toFixed(2).replace(".", ",")}
                  </Text>
                </View>
              </View>

              {/* Barra de Checkout */}
              <View style={carrinhoStyle.barCheckout}>
                <View style={carrinhoStyle.boxPrecoCheckout}>
                  <Text style={carrinhoStyle.totalCheckout}>
                    R$ {subtotalValor.toFixed(2).replace(".", ",")}
                  </Text>
                  <Text style={carrinhoStyle.qtdItensCheckout}>
                    {" "}
                    / {totalQuantidadeItens} item(s)
                  </Text>
                </View>
                <Pressable
                  style={carrinhoStyle.btnContinuar}
                  onPress={() => router.push("/entrega" as any)}
                >
                  <Text style={carrinhoStyle.txtBtnContinuar}>Continuar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          <ProdutoModal
            visible={produtoModalVisivel}
            onClose={() => setProdutoModalVisivel(false)}
            produto={produtoSelecionado}
          />

          <AdicionarCupomModal
            visible={modalCupomVisivel}
            onClose={() => setModalCupomVisivel(false)}
            onAplicarCupom={handleAplicarCupom}
          />

          <BottomBar abaAtiva="carrinho" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}