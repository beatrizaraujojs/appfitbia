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

const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const CHAVE_CARRINHO = "@carrinho_fitbia";
const CHAVE_CUPOM = "@cupon_aplicado_fitbia";

export default function CarrinhoScreen() {
  const [cupom, setCupom] = useState("");
  const [percentualDesconto, setPercentualDesconto] = useState(0);
  const [modalCupomVisivel, setModalCupomVisivel] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);

  const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  const agruparItens = (itens: any[]) => {
    // Mantém a tua lógica de agrupamento caso já tenhas definida ou utiliza a padrão
    return itens;
  };

  const formatarPreco = (valor: number) => {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  };

  const carregarCarrinho = useCallback(async () => {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem(CHAVE_CARRINHO);
      const itens = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
      const listaAgrupada = agruparItens(Array.isArray(itens) ? itens : []);

      setItensCarrinho(listaAgrupada);

      await AsyncStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(listaAgrupada)
      );
    } catch (erro) {
      console.error("Erro ao carregar carrinho:", erro);
    }
  }, []);

  const carregarCupomSalvo = useCallback(async () => {
    try {
      const cupomSalvo = await AsyncStorage.getItem(CHAVE_CUPOM);

      if (cupomSalvo) {
        const dados = JSON.parse(cupomSalvo);
        setCupom(dados.codigo || "");
        setPercentualDesconto(Number(dados.porcentagem) || 0);
      } else {
        setCupom("");
        setPercentualDesconto(0);
      }
    } catch (erro) {
      console.error("Erro ao carregar cupom:", erro);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
      carregarCupomSalvo();
    }, [carregarCarrinho, carregarCupomSalvo])
  );

  const salvarCarrinho = async (lista: any[]) => {
    try {
      setItensCarrinho(lista);
      await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(lista));
    } catch (erro) {
      console.error("Erro ao salvar carrinho:", erro);
    }
  };

  const alterarQuantidadeItem = async (cartItemId: string, delta: number) => {
    const novaLista = itensCarrinho
      .map((item) => {
        if (item.cartItemId !== cartItemId) {
          return item;
        }

        const novaQuantidade = item.quantidade + delta;

        return {
          ...item,
          quantidade: novaQuantidade,
          valorTotal: item.precoUnitario * novaQuantidade,
        };
      })
      .filter((item) => item.quantidade > 0);

    await salvarCarrinho(novaLista);

    if (novaLista.length === 0) {
      await AsyncStorage.removeItem(CHAVE_CUPOM);
      setCupom("");
      setPercentualDesconto(0);
    }
  };

  const limparCarrinho = async () => {
    try {
      await AsyncStorage.multiRemove([CHAVE_CARRINHO, CHAVE_CUPOM]);
      setItensCarrinho([]);
      setCupom("");
      setPercentualDesconto(0);
    } catch (erro) {
      console.error("Erro ao limpar carrinho:", erro);
    }
  };

  const handleAplicarCupom = async (novoCupom: string, descontoBanco: number) => {
    const codigo = novoCupom.trim();
    const percentual = Number(descontoBanco) || 0;

    setCupom(codigo);
    setPercentualDesconto(percentual);

    try {
      if (codigo) {
        await AsyncStorage.setItem(
          CHAVE_CUPOM,
          JSON.stringify({ codigo, porcentagem: percentual })
        );
      } else {
        await AsyncStorage.removeItem(CHAVE_CUPOM);
      }
    } catch (erro) {
      console.error("Erro ao salvar cupom:", erro);
    }
  };

  const totalItensValor = itensCarrinho.reduce(
    (total, item) => total + (Number(item.valorTotal) || 0),
    0
  );

  const totalQuantidadeItens = itensCarrinho.reduce(
    (total, item) => total + (Number(item.quantidade) || 0),
    0
  );

  const valorDesconto = cupom
    ? (totalItensValor * percentualDesconto) / 100
    : 0;

  const subtotalValor = Math.max(0, totalItensValor - valorDesconto);
  const carrinhoVazio = itensCarrinho.length === 0;

  const continuarPedido = async () => {
    try {
      await AsyncStorage.setItem(
        "@resumo_carrinho",
        JSON.stringify({
          subtotal: subtotalValor,
          descontoPercentual: percentualDesconto,
          valorDesconto,
          totalItens: totalItensValor,
          cupom,
        })
      );

      router.push("/entrega" as any);
    } catch (erro) {
      console.error("Erro ao continuar pedido:", erro);
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
            <View style={carrinhoStyle.conteudo}>
              {/* CABEÇALHO */}
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
                  source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                  style={carrinhoStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* ITENS ADICIONADOS */}
              <View style={carrinhoStyle.topSecaoItens}>
                <Text style={carrinhoStyle.tituloSecao}>Itens adicionados</Text>

                {!carrinhoVazio && (
                  <Pressable onPress={limparCarrinho}>
                    <Text style={carrinhoStyle.txtLimpar}>Limpar</Text>
                  </Pressable>
                )}
              </View>

              {/* PRODUTOS */}
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
                  // Ajustado para concatenar corretamente com o servidor do link online
                  const imagemSource = item.foto_produto
                    ? {
                        uri: `${SERVIDOR}/images/produto/${item.foto_produto}`,
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
                          resizeMode="cover"
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

                        {!!item.observacao && (
                          <Text
                            style={{
                              fontSize: 11,
                              color: "#888",
                              fontStyle: "italic",
                            }}
                          >
                            Obs: {item.observacao}
                          </Text>
                        )}

                        <Text style={carrinhoStyle.precoItem}>
                          {formatarPreco(Number(item.valorTotal) || 0)}
                        </Text>
                      </View>

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

              {/* SEMPRE VISÍVEL */}
              <Pressable
                style={carrinhoStyle.btnAdicionarMais}
                onPress={() => router.push("/menu")}
              >
                <Text style={carrinhoStyle.txtAdicionarMais}>
                  Adicionar mais itens
                </Text>
              </Pressable>

              {/* EXIBIR SOMENTE COM PRODUTOS */}
              {!carrinhoVazio && (
                <>
                  {/* CUPOM */}
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
                      <Text style={carrinhoStyle.labelSubtotal}>Subtotal</Text>
                      <Text style={carrinhoStyle.valorSubtotal}>
                        {formatarPreco(subtotalValor)}
                      </Text>
                    </View>
                  </View>

                  {/* FINALIZAÇÃO */}
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
                      onPress={continuarPedido}
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