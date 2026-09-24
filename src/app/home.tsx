import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  Text,
  Pressable,
  ImageBackground,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import homeStyle from "@/styles/homeStyle";
import ProdutoModal from "@/components/produtoModal";
import BottomBar from "@/components/BottomBar";
import { Produto } from "@/styles/produtoModalStyle";

export default function HomeScreen() {
  const [busca, setBusca] = useState("");

  // Array estruturado dos queridinhos (com id, dados e estado de favorito individual)
  const [queridinhos, setQueridinhos] = useState([
    {
      id: 1,
      nome: "Salada FitBia Power",
      preco: 20.0,
      valorStr: "R$ 20,00",
      descricao: "Mix de folhas frescas, frango grelhado, mix de sementes e molho especial FitBia.",
      imagem: require("@/assets/images/fotosfitbia/salada_fitbia_power.png"),
      favorito: false,
    },
    {
      id:2 ,
      nome: "Salada FitBia Power",
      preco: 20.0,
      valorStr: "R$ 30,00",
      descricao: "Mix de folhas frescas, frango grelhado, mix de sementes e molho especial FitBia.",
      imagem: require("@/assets/images/fotosfitbia/sabado_1.png"),
      favorito: false,
    },
    {
      id: 3,
      nome: "Salada FitBia",
      preco: 20.0,
      valorStr: "R$ 40,00",
      descricao: "Alface americana, tiras de frango, croutons integrais e molho caesar leve.",
      imagem: require("@/assets/images/fotosfitbia/salada_ceaser_fit.png"),
      favorito: false,
    },
  ]);

  // Estados para controlar o Modal
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  // Função para alternar o favorito de cada produto dinamicamente pelo ID
  const toggleFavorito = (idItem: number) => {
    setQueridinhos((prev) =>
      prev.map((item) =>
        item.id === idItem ? { ...item, favorito: !item.favorito } : item
      )
    );
  };

  const abrirModal = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
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
            <View style={homeStyle.conteudo}>
              {/* Header: Saudação + Logo */}
              <View style={homeStyle.header}>
                <View>
                  <Text style={homeStyle.saudacao}>Olá, Beatriz!</Text>
                  <Text style={homeStyle.subSaudacao}>
                    O que vai nutrir seu corpo hoje?
                  </Text>
                </View>
                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={homeStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Campo de Busca */}
              <View style={homeStyle.buscarContainer}>
                <Image
                  style={homeStyle.iconeBusca}
                  source={require("@/assets/images/fitbia/lupa.png")}
                />
                <TextInput
                  placeholder="Buscar produtos"
                  placeholderTextColor="#A0A0A0"
                  style={homeStyle.textInputBusca}
                  value={busca}
                  onChangeText={setBusca}
                />
              </View>

              {/* Banner Promocional */}
              <View style={homeStyle.bannerWrapper}>
                <Pressable
                  style={homeStyle.arrowLeft}
                  onPress={() => {
                    /* ação de voltar banner */
                  }}
                >
                  <Text style={homeStyle.arrowText}>{"<"}</Text>
                </Pressable>

                <Image
                  source={require("@/assets/images/fitbia/banner1.png")}
                  style={homeStyle.banner}
                  resizeMode="cover"
                />

                <Pressable
                  style={homeStyle.arrowRight}
                  onPress={() => {
                    /* ação de avançar banner */
                  }}
                >
                  <Text style={homeStyle.arrowText}>{">"}</Text>
                </Pressable>
              </View>

              {/* Seção Categorias */}
              <View style={homeStyle.categoriasSection}>
                <Text style={homeStyle.tituloSecao}>
                  Navegue por nossas categorias
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={homeStyle.categoriasList}
                >
                  <Pressable 
                    style={homeStyle.categoriaItem}
                    onPress={() => router.replace("/menu" as any)}
                  >
                    <View style={homeStyle.categoriaIconeBox}>
                      <Image
                        style={homeStyle.categoriaIcone}
                        source={require("@/assets/images/fitbia/potes.png")}
                      />
                    </View>
                    <Text style={homeStyle.categoriaTexto}>Marmitas</Text>
                  </Pressable>

                  <Pressable 
                    style={homeStyle.categoriaItem}
                    onPress={() => router.replace("/menu" as any)}
                  >
                    <View style={homeStyle.categoriaIconeBox}>
                      <Image
                        style={homeStyle.categoriaIcone}
                        source={require("@/assets/images/fitbia/sanduiche.png")}
                      />
                    </View>
                    <Text style={homeStyle.categoriaTexto}>Lanches</Text>
                  </Pressable>

                  <Pressable 
                    style={homeStyle.categoriaItem}
                    onPress={() => router.replace("/menu" as any)}
                  >
                    <View style={homeStyle.categoriaIconeBox}>
                      <Image
                        style={homeStyle.categoriaIcone}
                        source={require("@/assets/images/fitbia/morango.png")}
                      />
                    </View>
                    <Text style={homeStyle.categoriaTexto}>Frutas</Text>
                  </Pressable>

                  <Pressable 
                    style={homeStyle.categoriaItem}
                    onPress={() => router.replace("/menu" as any)}
                  >
                    <View style={homeStyle.categoriaIconeBox}>
                      <Image
                        style={homeStyle.categoriaIcone}
                        source={require("@/assets/images/fitbia/refrigerantes.png")}
                      />
                    </View>
                    <Text style={homeStyle.categoriaTexto}>Bebidas</Text>
                  </Pressable>

                  <Pressable 
                    style={homeStyle.categoriaItem}
                    onPress={() => router.replace("/menu" as any)}
                  >
                    <View style={homeStyle.categoriaIconeBox}>
                      <Image
                        style={homeStyle.categoriaIcone}
                        source={require("@/assets/images/fitbia/bolo.png")}
                      />
                    </View>
                    <Text style={homeStyle.categoriaTexto}>Doces</Text>
                  </Pressable>
                </ScrollView>
              </View>

              {/* Seção Queridinhos com .map() */}
              <View style={homeStyle.produtosSection}>
                <Text style={homeStyle.tituloSecao}>
                  Os queridinhos da casa, peça já!
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={homeStyle.produtosList}
                >
                  {queridinhos.map((produto) => (
                    <View style={homeStyle.cardProduto} key={produto.id}>
                      <Image
                        source={produto.imagem}
                        style={homeStyle.imgProduto}
                      />
                      <Pressable
                        style={homeStyle.btnFavorito}
                        onPress={() => toggleFavorito(produto.id)}
                      >
                        <Image
                          source={
                            produto.favorito
                              ? require("@/assets/images/fitbia/coracaovermelho.png")
                              : require("@/assets/images/fitbia/coracao.png")
                          }
                          style={homeStyle.iconeFavorito}
                        />
                      </Pressable>
                      <Text style={homeStyle.nomeProduto}>
                        {produto.nome}
                      </Text>
                      <View style={homeStyle.rodapeCard}>
                        <Text style={homeStyle.precoProduto}>{produto.valorStr}</Text>
                        <Pressable
                          style={homeStyle.btnAdd}
                          onPress={() =>
                            abrirModal({
                              nome: produto.nome,
                              preco: produto.preco,
                              descricao: produto.descricao,
                              imagem: produto.imagem,
                            })
                          }
                        >
                          <Text style={homeStyle.txtBtnAdd}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Navigation Bar Importado */}
          <BottomBar abaAtiva="home" />
        </SafeAreaView>
      </ImageBackground>

      {/* Componente Modal de Produto */}
      <ProdutoModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        produto={produtoSelecionado}
      />
    </View>
  );
}