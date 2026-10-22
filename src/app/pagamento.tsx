import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from "@/components/BottomBar";
import pagamentoStyle from "@/styles/pagamentoStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const WHATSAPP_NUMERO = "5511981826719";

const imagens = {
  voltar: require("@/assets/images/fitbia/de-volta.png"),
  pix: require("@/assets/images/fitbia/pix.png"),
  dinheiro: require("@/assets/images/fitbia/icons8-dinheiro-48.png"),
  cartao: require("@/assets/images/fitbia/sem-contato.png"),
  cupom: require("@/assets/images/fitbia/promo-code.png"),
  cpf: require("@/assets/images/fitbia/arquivo.png"),
};

type MetodoPagamento = "pix" | "dinheiro" | "debito" | "credito";

export default function Pagamento() {
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [cpf, setCpf] = useState("555.333.888-98");
  const [editandoCpf, setEditandoCpf] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados dinâmicos do carrinho
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);
  const [totalItens, setTotalItens] = useState(0);
  const [valorDesconto, setValorDesconto] = useState(0);
  const [subtotalItens, setSubtotalItens] = useState(0);
  const [codigoCupom, setCodigoCupom] = useState("primeiropedido");
  const [percentualDesconto, setPercentualDesconto] = useState(5);

  useFocusEffect(
    useCallback(() => {
      carregarDadosCarrinho();
    }, [])
  );

  async function carregarDadosCarrinho() {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem("@carrinho_fitbia");
      if (carrinhoSalvo) {
        const itens = JSON.parse(carrinhoSalvo);
        setItensCarrinho(itens);
        const bruto = itens.reduce((acc: number, item: any) => acc + (item.valorTotal || 0), 0);
        
        setTotalItens(bruto);
        const descontoCalculado = (bruto * percentualDesconto) / 100;
        setValorDesconto(descontoCalculado);
        setSubtotalItens(Math.max(0, bruto - descontoCalculado));
      }
    } catch (error) {
      console.error("Erro ao carregar dados no pagamento:", error);
    }
  }

  function selecionarPagamento(metodo: MetodoPagamento) {
    setMetodoPagamento(metodo);
  }

  function trocarCpf() {
    setEditandoCpf(true);
  }

  function salvarCpf() {
    setEditandoCpf(false);
  }

  const taxaEntrega = 10.00;
  const valorFinalTotal = subtotalItens + taxaEntrega;

  async function handleFinalizarPedido() {
    if (itensCarrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos ao carrinho antes de finalizar.");
      return;
    }

    // REGRA 1: PIX -> Envia para o WhatsApp
    if (metodoPagamento === "pix") {
      let mensagem = `*Novo Pedido - FitBia*\n\n`;
      mensagem += `*Itens do Pedido:*\n`;
      
      itensCarrinho.forEach((item) => {
        mensagem += `- ${item.quantidade}x ${item.nome} (R$ ${(item.valorTotal || 0).toFixed(2)})\n`;
      });

      mensagem += `\n*Resumo de Valores:*\n`;
      mensagem += `Total dos itens: R$ ${totalItens.toFixed(2)}\n`;
      mensagem += `Desconto (${percentualDesconto}%): -R$ ${valorDesconto.toFixed(2)}\n`;
      mensagem += `Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}\n`;
      mensagem += `*Total Final: R$ ${valorFinalTotal.toFixed(2)}*\n\n`;
      mensagem += `*Forma de Pagamento:* PIX\n`;
      mensagem += `*CPF na Nota:* ${cpf}\n\n`;
      mensagem += `Aguardo as instruções para o pagamento via Pix!`;

      const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

      try {
        await AsyncStorage.removeItem("@carrinho_fitbia");
        await Linking.openURL(urlWhatsApp);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
      }
      return;
    }

    // REGRA 2: Outras formas -> Envia para o backend Laravel
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const enderecoSalvo = await AsyncStorage.getItem("enderecoSelecionado");
      const enderecoObj = enderecoSalvo ? JSON.parse(enderecoSalvo) : null;
      const idEnderecoFinal = enderecoObj?.id_endereco || enderecoObj?.id || null;

      const payload = {
        metodo_pagamento: metodoPagamento,
        forma_pagamento: metodoPagamento,
        cpf_nota: cpf,
        cupom: codigoCupom,
        valor_desconto: valorDesconto,
        total: valorFinalTotal,
        valor_total: valorFinalTotal,
        endereco_id: idEnderecoFinal,
        id_endereco: idEnderecoFinal,
        itens: itensCarrinho.map(i => ({
          id_produto: i.id_produto || i.id,
          quantidade: i.quantidade,
          preco_unitario: i.precoUnitario,
          valor_total: i.valorTotal,
          observacao: i.observacao || ""
        })),
      };

      console.log("Enviando pedido para o backend:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Resposta bruta do Laravel:", responseText);

      let json;
      try {
        json = JSON.parse(responseText);
      } catch (e) {
        console.error("A resposta não é um JSON válido:", responseText);
      }

      if (response.ok && (json?.success || json?.id || json?.message)) {
        await AsyncStorage.removeItem("@carrinho_fitbia");
        Alert.alert("Pedido realizado!", "Seu pedido foi registado com sucesso.", [
          {
            text: "Ver Pedidos em Andamento",
            onPress: () => router.push("/pedidoEmAndamento" as any),
          },
        ]);
      } else {
        Alert.alert(
          "Atenção", 
          json?.message || "O pedido foi processado, mas verifique o painel."
        );
        await AsyncStorage.removeItem("@carrinho_fitbia");
        router.push("/pedidoEmAndamento" as any);
      }
    } catch (error) {
      console.error("Erro de rede ao salvar pedido:", error);
      Alert.alert("Erro de Conexão", "Não foi possível comunicar com o servidor Laravel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={pagamentoStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={pagamentoStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={pagamentoStyle.areaConteudo}>
          <ScrollView
            style={pagamentoStyle.scroll}
            contentContainerStyle={pagamentoStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={pagamentoStyle.cabecalho}>
              <Pressable
                style={pagamentoStyle.botaoVoltar}
                onPress={() => router.back()}
              >
                <Image
                  source={imagens.voltar}
                  style={pagamentoStyle.iconeVoltar}
                  resizeMode="contain"
                />
              </Pressable>

              <Text style={pagamentoStyle.tituloCabecalho}>Pagamento</Text>

              <Image
                source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                style={pagamentoStyle.logo}
                resizeMode="contain"
              />
            </View>

            <View style={pagamentoStyle.linhaCabecalho} />

            <Text style={pagamentoStyle.tituloSecao}>Pagamento pelo app</Text>

            <Pressable
              onPress={() => selecionarPagamento("pix")}
              style={[
                pagamentoStyle.opcaoPagamento,
                metodoPagamento === "pix" && pagamentoStyle.opcaoSelecionada,
              ]}
            >
              <View style={pagamentoStyle.conteudoOpcao}>
                <Image
                  source={imagens.pix}
                  style={pagamentoStyle.iconePagamento}
                  resizeMode="contain"
                />
                <Text style={pagamentoStyle.textoOpcao}>Pix</Text>
              </View>

              <View
                style={[
                  pagamentoStyle.bolinha,
                  metodoPagamento === "pix" && pagamentoStyle.bolinhaSelecionada,
                ]}
              />
            </Pressable>

            <Text style={pagamentoStyle.tituloSecaoEntrega}>
              Pagamento na entrega / retirada
            </Text>

            <Pressable
              onPress={() => selecionarPagamento("dinheiro")}
              style={[
                pagamentoStyle.opcaoPagamento,
                metodoPagamento === "dinheiro" && pagamentoStyle.opcaoSelecionada,
              ]}
            >
              <View style={pagamentoStyle.conteudoOpcao}>
                <Image
                  source={imagens.dinheiro}
                  style={pagamentoStyle.iconePagamento}
                  resizeMode="contain"
                />
                <Text style={pagamentoStyle.textoOpcao}>Dinheiro</Text>
              </View>

              <View
                style={[
                  pagamentoStyle.bolinha,
                  metodoPagamento === "dinheiro" &&
                    pagamentoStyle.bolinhaSelecionada,
                ]}
              />
            </Pressable>

            <Pressable
              onPress={() => selecionarPagamento("debito")}
              style={[
                pagamentoStyle.opcaoPagamento,
                metodoPagamento === "debito" && pagamentoStyle.opcaoSelecionada,
              ]}
            >
              <View style={pagamentoStyle.conteudoOpcao}>
                <Image
                  source={imagens.cartao}
                  style={pagamentoStyle.iconePagamento}
                  resizeMode="contain"
                />
                <Text style={pagamentoStyle.textoOpcao}>Cartão de débito</Text>
              </View>

              <View
                style={[
                  pagamentoStyle.bolinha,
                  metodoPagamento === "debito" &&
                    pagamentoStyle.bolinhaSelecionada,
                ]}
              />
            </Pressable>

            <Pressable
              onPress={() => selecionarPagamento("credito")}
              style={[
                pagamentoStyle.opcaoPagamento,
                metodoPagamento === "credito" && pagamentoStyle.opcaoSelecionada,
              ]}
            >
              <View style={pagamentoStyle.conteudoOpcao}>
                <Image
                  source={imagens.cartao}
                  style={pagamentoStyle.iconePagamento}
                  resizeMode="contain"
                />
                <Text style={pagamentoStyle.textoOpcao}>Cartão de crédito</Text>
              </View>

              <View
                style={[
                  pagamentoStyle.bolinha,
                  metodoPagamento === "credito" &&
                    pagamentoStyle.bolinhaSelecionada,
                ]}
              />
            </Pressable>

            <View style={pagamentoStyle.divisorResumo} />

            <Text style={pagamentoStyle.tituloResumo}>Resumo do pedido</Text>

            <View style={pagamentoStyle.linhaCupom}>
              <View style={pagamentoStyle.conteudoCupom}>
                <Image
                  source={imagens.cupom}
                  style={pagamentoStyle.iconeCupom}
                  resizeMode="contain"
                />
                <View>
                  <Text style={pagamentoStyle.textoCupom}>Cupom</Text>
                  <Text style={pagamentoStyle.subtextoCupom}>
                    Cupom adicionado
                  </Text>
                </View>
              </View>

              <Text style={pagamentoStyle.codigoCupom}>
                {codigoCupom.toUpperCase()}
              </Text>
            </View>

            <View style={pagamentoStyle.resumoValores}>
              <Text style={pagamentoStyle.tituloValores}>Resumo de valores</Text>

              <View style={pagamentoStyle.linhaValor}>
                <Text style={pagamentoStyle.labelValorCinza}>
                  Total dos itens
                </Text>
                <Text style={pagamentoStyle.valorCinza}>
                  R$ {totalItens.toFixed(2).replace(".", ",")}
                </Text>
              </View>

              <View style={pagamentoStyle.linhaValor}>
                <Text style={pagamentoStyle.labelDesconto}>
                  Desconto ({percentualDesconto}%)
                </Text>
                <Text style={pagamentoStyle.valorDesconto}>
                  - R$ {valorDesconto.toFixed(2).replace(".", ",")}
                </Text>
              </View>

              <View style={pagamentoStyle.linhaValor}>
                <Text style={pagamentoStyle.labelSubtotal}>Subtotal</Text>
                <Text style={pagamentoStyle.valorSubtotal}>
                  R$ {subtotalItens.toFixed(2).replace(".", ",")}
                </Text>
              </View>
            </View>

            <View style={pagamentoStyle.divisorCpf} />

            <View style={pagamentoStyle.linhaCpf}>
              <View>
                <Text style={pagamentoStyle.tituloCpf}>CPF na nota</Text>
                <View style={pagamentoStyle.documentoCpf}>
                  <Image
                    source={imagens.cpf}
                    style={pagamentoStyle.iconeCpf}
                    resizeMode="contain"
                  />
                  {editandoCpf ? (
                    <TextInput
                      value={cpf}
                      onChangeText={setCpf}
                      style={pagamentoStyle.numeroCpf}
                      keyboardType="numeric"
                      maxLength={14}
                      autoFocus
                    />
                  ) : (
                    <Text style={pagamentoStyle.numeroCpf}>{cpf}</Text>
                  )}
                </View>
              </View>

              <Pressable onPress={editandoCpf ? salvarCpf : trocarCpf}>
                <Text style={pagamentoStyle.trocarCpf}>
                  {editandoCpf ? "Salvar" : "Trocar"}
                </Text>
              </Pressable>
            </View>

            <View style={pagamentoStyle.valorFinal}>
              <Text style={pagamentoStyle.valorFinalTexto}>
                R$ {valorFinalTotal.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <Pressable
              style={[pagamentoStyle.botaoContinuar, loading && { opacity: 0.7 }]}
              onPress={handleFinalizarPedido}
              disabled={loading}
            >
              <Text style={pagamentoStyle.textoContinuar}>
                {loading ? "Processando..." : "Finalizar pedido"}
              </Text>
            </Pressable>

            <View style={pagamentoStyle.espacoMenu} />
          </ScrollView>

          <BottomBar abaAtiva="carrinho" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}