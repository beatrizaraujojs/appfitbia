
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
const CHAVE_CARRINHO = "@carrinho_fitbia";

export default function CarrinhoScreen() {
  const [cupom, setCupom] = useState("");
  const [percentualDesconto, setPercentualDesconto] = useState(0);
  const [modalCupomVisivel, setModalCupomVisivel] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);

  const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Agrupa produtos iguais, mantendo configurações diferentes separadas
  const agruparItens = (itens: any[]) => {
    const agrupados: any[] = [];

    itens.forEach((item) => {
      const quantidade = Number(item.quantidade) || 1;
      const precoUnitario = Number(item.precoUnitario) || 0;

      const existente = agrupados.find(
        (produto) =>
          String(produto.id) === String(item.id) &&
          Number(produto.precoUnitario) === precoUnitario &&
          (produto.observacao || "") === (item.observacao || "") &&
          JSON.stringify(produto.adicionaisSelecionados || {}) ===
            JSON.stringify(item.adicionaisSelecionados || {})
      );

      if (existente) {
        existente.quantidade += quantidade;
        existente.valorTotal =
          existente.precoUnitario * existente.quantidade;
      } else {
        agrupados.push({
          ...item,
          cartItemId:
            item.cartItemId ||
            `${item.id}-${Date.now()}-${agrupados.length}`,
          quantidade,
          precoUnitario,
          valorTotal: precoUnitario * quantidade,
        });
      }
    });

    return agrupados;
  };

  // Carregar carrinho ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [])
  );

  async function carregarCarrinho() {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem(CHAVE_CARRINHO);

      if (carrinhoSalvo) {
        const itens = JSON.parse(carrinhoSalvo);
        const listaAgrupada = agruparItens(
          Array.isArray(itens) ? itens : []
        );

        setItensCarrinho(listaAgrupada);

        await AsyncStorage.setItem(
          CHAVE_CARRINHO,
          JSON.stringify(listaAgrupada)
        );
      } else {
        setItensCarrinho([]);
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  }

  // Alterar quantidade de um produto
  const alterarQuantidadeItem = async (
    cartItemId: string,
    delta: number
  ) => {
    const novaLista = itensCarrinho
      .map((item) => {
        if (item.cartItemId === cartItemId) {
          const novaQtd = item.quantidade + delta;

          return {
            ...item,
            quantidade: novaQtd,
            valorTotal: item.precoUnitario * novaQtd,
          };
        }

        return item;
      })
      .filter((item) => item.quantidade > 0);

    setItensCarrinho(novaLista);

    try {
      await AsyncStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(novaLista)
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  // Limpar carrinho
  const limparCarrinho = async () => {
    try {
      await AsyncStorage.removeItem(CHAVE_CARRINHO);
      setItensCarrinho([]);
      setCupom("");
      setPercentualDesconto(0);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
    }
  };

  // Aplicar cupom
  const handleAplicarCupom = (
    novoCupom: string,
    descontoBanco: number
  ) => {
    setCupom(novoCupom);
    setPercentualDesconto(Number(descontoBanco) || 0);
  };

  // Cálculos dinâmicos
  const totalItensValor = itensCarrinho.reduce(
    (acc, item) => acc + (Number(item.valorTotal) || 0),
    0
  );

  const totalQuantidadeItens = itensCarrinho.reduce(
    (acc, item) => acc + (Number(item.quantidade) || 0),
    0
  );

  const valorDesconto = cupom
    ? (totalItensValor * percentualDesconto) / 100
    : 0;

  const subtotalValor = Math.max(
    0,
    totalItensValor - valorDesconto
  );

  const carrinhoVazio = itensCarrinho.length === 0;

  const formatarPreco = (valor: number) =>
    `R$ ${valor.toFixed(2).replace(".", ",")}`;

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

              {/* HEADER */}
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

                <Text style={carrinhoStyle.tituloHeader}>
                  Carrinho
                </Text>

                <Image
                  source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                  style={carrinhoStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* TÍTULO DOS ITENS */}
              <View style={carrinhoStyle.topSecaoItens}>
                <Text style={carrinhoStyle.tituloSecao}>
                  Itens adicionados
                </Text>

                {!carrinhoVazio && (
                  <Pressable onPress={limparCarrinho}>
                    <Text style={carrinhoStyle.txtLimpar}>
                      Limpar
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* LISTA DE PRODUTOS */}
              {carrinhoVazio ? (
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
                    ? {
                        uri: `${SERVIDOR}/fitbia/images/produto/${item.foto_produto}`,
                      }
                    : require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png");

                  return (
                    <View
                      key={item.cartItemId}
                      style={[
                        carrinhoStyle.cardItem,
                        { marginBottom: 12 },
                      ]}
                    >
                      <View style={carrinhoStyle.boxImagemItem}>
                        <Image
                          source={imagemSource}
                          style={carrinhoStyle.imgItem}
                        />
                      </View>

                      <View style={carrinhoStyle.infoItem}>
                        <Text style={carrinhoStyle.nomeItem}>
                          {item.nome}
                        </Text>

                        <Text
                          style={carrinhoStyle.descItem}
                          numberOfLines={2}
                        >
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
                          {formatarPreco(
                            Number(item.valorTotal) || 0
                          )}
                        </Text>
                      </View>

                      {/* CONTROLE DE QUANTIDADE */}
                      <View style={carrinhoStyle.controleQuantidade}>
                        <Pressable
                          style={carrinhoStyle.btnQtd}
                          onPress={() =>
                            alterarQuantidadeItem(
                              item.cartItemId,
                              1
                            )
                          }
                        >
                          <Text style={carrinhoStyle.txtBtnQtd}>
                            +
                          </Text>
                        </Pressable>

                        <Text style={carrinhoStyle.txtQtd}>
                          {item.quantidade}
                        </Text>

                        <Pressable
                          style={carrinhoStyle.btnLixeira}
                          onPress={() =>
                            alterarQuantidadeItem(
                              item.cartItemId,
                              -1
                            )
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

              {/* ADICIONAR MAIS ITENS - SEMPRE VISÍVEL */}
              <Pressable
                style={carrinhoStyle.btnAdicionarMais}
                onPress={() => router.push("/menu")}
              >
                <Text style={carrinhoStyle.txtAdicionarMais}>
                  Adicionar mais itens
                </Text>
              </Pressable>

              {/* ABAIXO SÓ APARECE SE HOUVER PRODUTOS */}
              {!carrinhoVazio && (
                <>
                  {/* CAMPO DE CUPOM */}
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
                      <Text style={carrinhoStyle.labelCupom}>
                        Cupom
                      </Text>

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

                  {/* RESUMO DE VALORES */}
                  <View style={carrinhoStyle.secaoResumo}>
                    <Text style={carrinhoStyle.tituloResumo}>
                      Resumo de valores
                    </Text>

                    <View style={carrinhoStyle.linhaResumo}>
                      <Text style={carrinhoStyle.labelResumo}>
                        Total dos itens
                      </Text>

                      <Text style={carrinhoStyle.valorResumo}>
                        {formatarPreco(totalItensValor)}
                      </Text>
                    </View>

                    <View style={carrinhoStyle.linhaResumo}>
                      <Text style={carrinhoStyle.labelDesconto}>
                        Desconto ({percentualDesconto}%)
                      </Text>

                      <Text style={carrinhoStyle.valorDesconto}>
                        {formatarPreco(valorDesconto)}
                      </Text>
                    </View>

                    <View style={carrinhoStyle.linhaResumoSubtotal}>
                      <Text style={carrinhoStyle.labelSubtotal}>
                        Subtotal
                      </Text>

                      <Text style={carrinhoStyle.valorSubtotal}>
                        {formatarPreco(subtotalValor)}
                      </Text>
                    </View>
                  </View>

                  {/* CHECKOUT */}
                  <View style={carrinhoStyle.barCheckout}>
                    <View style={carrinhoStyle.boxPrecoCheckout}>
                      <Text style={carrinhoStyle.totalCheckout}>
                        {formatarPreco(subtotalValor)}
                      </Text>

                      <Text style={carrinhoStyle.qtdItensCheckout}>
                        {" "}
                        / {totalQuantidadeItens} item(s)
                      </Text>
                    </View>

                    <Pressable
                      style={carrinhoStyle.btnContinuar}
                      onPress={async () => {
                        try {
                          await AsyncStorage.setItem(
                            "@resumo_carrinho",
                            JSON.stringify({
                              subtotal: subtotalValor,
                              descontoPercentual: percentualDesconto,
                              valorDesconto: valorDesconto,
                              totalItens: totalItensValor,
                            })
                          );

                          router.push("/entrega" as any);
                        } catch (error) {
                          console.error(
                            "Erro ao continuar pedido:",
                            error
                          );
                        }
                      }}
                    >
                      <Text style={carrinhoStyle.txtBtnContinuar}>
                        Continuar
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
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
