import { router } from "expo-router";
import { useState } from "react";
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

import globalStyle from "@/styles/globalStyle";
import carrinhoStyle from "@/styles/carrinhoStyle";
import BottomBar from "@/components/BottomBar";
import AdicionarCupomModal from "@/components/adicionarCupomModal";
import ProdutoModal from "@/components/produtoModal"; // 1. Importação do ProdutoModal

export default function CarrinhoScreen() {
  const [cupom, setCupom] = useState("FITBIA01");
  const [quantidadeItem, setQuantidadeItem] = useState(2);
  const [modalCupomVisivel, setModalCupomVisivel] = useState(false);

  // 2. Estado para controlar o modal do produto selecionado para edição
  const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Exemplo de objeto de produto do item do carrinho
  const itemCarrinho =
   {
    id: 1  ,
    nome: "Caldo de abóbora",
    preco: 27.8,
    descricao:
      "O caldo de abóbora é uma opção prática, saborosa e nutritiva, ideal para dias mais frios ou para uma refeição leve.",
    imagem: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
  };


  

  const aumentarQuantidade = () => setQuantidadeItem((prev) => prev + 1);
  const diminuirQuantidade = () => {
    if (quantidadeItem > 1) {
      setQuantidadeItem((prev) => prev - 1);
    }
  };

  const handleAplicarCupom = (novoCupom: string) => {
    setCupom(novoCupom);
  };

  // 3. Função para abrir o modal com o item
  const handleEditarItem = () => {
    setProdutoSelecionado(itemCarrinho);
    setProdutoModalVisivel(true);
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
                <Pressable onPress={() => {}}>
                  <Text style={carrinhoStyle.txtLimpar}>Limpar</Text>
                </Pressable>
              </View>

              {/* Card do Item Adicionado */}
              <View style={carrinhoStyle.cardItem}>
                <View style={carrinhoStyle.boxImagemItem}>
                  <Image
                    source={itemCarrinho.imagem}
                    style={carrinhoStyle.imgItem}
                  />
                  {/* 4. Ação de clique no ícone de Lápis/Editar */}
                  <Pressable
                    style={carrinhoStyle.badgeEditar}
                    onPress={handleEditarItem}
                  >
                    <Image
                      source={require("@/assets/images/fitbia/editar (1).png")}
                      style={carrinhoStyle.iconePequeno}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>

                <View style={carrinhoStyle.infoItem}>
                  <Text style={carrinhoStyle.nomeItem}>
                    {itemCarrinho.nome}
                  </Text>
                  <Text style={carrinhoStyle.descItem} numberOfLines={2}>
                    {itemCarrinho.descricao}
                  </Text>
                  <Text style={carrinhoStyle.precoItem}>
                    R$ {itemCarrinho.preco.toFixed(2).replace(".", ",")}
                  </Text>
                </View>

                {/* Contadores + Lixeira */}
                <View style={carrinhoStyle.controleQuantidade}>
                  <Pressable
                    style={carrinhoStyle.btnQtd}
                    onPress={aumentarQuantidade}
                  >
                    <Text style={carrinhoStyle.txtBtnQtd}>+</Text>
                  </Pressable>
                  <Text style={carrinhoStyle.txtQtd}>{quantidadeItem}</Text>
                  <Pressable
                    style={carrinhoStyle.btnLixeira}
                    onPress={diminuirQuantidade}
                  >
                    <Image
                      source={require("@/assets/images/fitbia/lixeira-de-reciclagem.png")}
                      style={carrinhoStyle.iconeLixeira}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Link Adicionar Mais Itens */}
              <Pressable
                style={carrinhoStyle.btnAdicionarMais}
                onPress={() => router.push("/menu")}
              >
                <Text style={carrinhoStyle.txtAdicionarMais}>
                  Adicionar mais itens
                </Text>
              </Pressable>

              {/* Carrossel Peça Também */}
              <View style={carrinhoStyle.secaoPecaTambem}>
                <Text style={carrinhoStyle.tituloSecaoPecaTambem}>
                  Peça também
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={carrinhoStyle.listaPecaTambem}
                >
                  <View style={carrinhoStyle.cardSugestao}>
                    <Image
                      source={require("@/assets/images/fotosfitbia/agua_sem_gas.png")}
                      style={carrinhoStyle.imgSugestao}
                    />
                    <Text style={carrinhoStyle.precoSugestao}>R$ 5,00</Text>
                    <Text style={carrinhoStyle.nomeSugestao}>Água mineral</Text>
                  </View>

                  <View style={carrinhoStyle.cardSugestao}>
                    <Image
                      source={require("@/assets/images/fotosfitbia/shake_wheyprotein.png")}
                      style={carrinhoStyle.imgSugestao}
                    />
                    <Text style={carrinhoStyle.precoSugestao}>R$ 25,00</Text>
                    <Text style={carrinhoStyle.nomeSugestao}>
                      Shake de Whey Protein
                    </Text>
                  </View>

                  <View style={carrinhoStyle.cardSugestao}>
                    <Image
                      source={require("@/assets/images/fotosfitbia/coca_cola.png")}
                      style={carrinhoStyle.imgSugestao}
                    />
                    <Text style={carrinhoStyle.precoSugestao}>R$ 6,00</Text>
                    <Text style={carrinhoStyle.nomeSugestao}>
                      Coca-Cola Zero Açúcar 400ml
                    </Text>
                  </View>
                </ScrollView>
              </View>

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
                  <Text style={carrinhoStyle.valorResumo}>R$ 27,80</Text>
                </View>

                <View style={carrinhoStyle.linhaResumo}>
                  <Text style={carrinhoStyle.labelDesconto}>Desconto</Text>
                  <Text style={carrinhoStyle.valorDesconto}>- R$ 7,00</Text>
                </View>

                <View style={carrinhoStyle.linhaResumoSubtotal}>
                  <Text style={carrinhoStyle.labelSubtotal}>Subtotal</Text>
                  <Text style={carrinhoStyle.valorSubtotal}>R$ 30,80</Text>
                </View>
              </View>

              {/* Barra de Checkout */}
              <View style={carrinhoStyle.barCheckout}>
                <View style={carrinhoStyle.boxPrecoCheckout}>
                  <Text style={carrinhoStyle.totalCheckout}>R$ 30,80</Text>
                  <Text style={carrinhoStyle.qtdItensCheckout}> / 1 item</Text>
                </View>
                <Pressable
                  style={carrinhoStyle.btnContinuar}
                  onPress={() => router.push("/entrega")} // Adicionado o redirecionamento
                >
                  <Text style={carrinhoStyle.txtBtnContinuar}>Continuar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* 5. Renderização do Modal de Produto */}
          <ProdutoModal
            visible={produtoModalVisivel}
            onClose={() => setProdutoModalVisivel(false)}
            produto={produtoSelecionado}
          />

          {/* Modal de Cupom */}
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
