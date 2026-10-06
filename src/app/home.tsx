import { useState, useEffect } from "react";
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

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function HomeScreen() {
  const [busca, setBusca] = useState("");
  
  const [queridinhos, setQueridinhos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  useEffect(() => {
    async function carregarDadosHome() {
      try {
        console.log("A tentar ligar à API em:", API);

        // 1. Buscar Produtos
        const respProdutos = await fetch(`${API}/produtos`);
        const textProdutos = await respProdutos.text();
        
        let jsonProdutos;
        try {
          jsonProdutos = JSON.parse(textProdutos);
        } catch (e) {
          console.error("Erro: A resposta de produtos não é um JSON válido. Recebido:", textProdutos);
          return;
        }

        if (jsonProdutos && jsonProdutos.success && Array.isArray(jsonProdutos.data)) {
          const produtosAtivos = jsonProdutos.data
            .filter((produto: any) => produto.status_produto === "ATIVO")
            .map((produto: any) => ({
              ...produto,
              favorito: false,
            }));

          const destaques = produtosAtivos.filter(
            (produto: any) => produto.destaque_produto === "SIM"
          );
          setQueridinhos(destaques.length > 0 ? destaques : produtosAtivos);
        } else {
          console.warn("A estrutura de produtos da API veio diferente do esperado:", jsonProdutos);
        }

        // 2. Buscar Categorias
        const respCategorias = await fetch(`${API}/categorias`);
        const textCategorias = await respCategorias.text();

        let jsonCategorias;
        try {
          jsonCategorias = JSON.parse(textCategorias);
        } catch (e) {
          console.error("Erro: A resposta de categorias não é um JSON válido. Recebido:", textCategorias);
          return;
        }

        if (jsonCategorias && jsonCategorias.success && Array.isArray(jsonCategorias.data)) {
          const categoriasAtivas = jsonCategorias.data
            .filter((cat: any) => cat.ativa_categoria === "ATIVO" || cat.status_categoria === "ATIVO")
            .sort((a: any, b: any) => (a.ordem_categoria || 0) - (b.ordem_categoria || 0));

          setCategorias(categoriasAtivas);
        } else {
          console.warn("A estrutura de categorias da API veio diferente do esperado:", jsonCategorias);
        }

      } catch (erro) {
        console.error("Erro crítico ao carregar dados da API na Home:", erro);
      }
    }

    carregarDadosHome();
  }, []);

  const toggleFavorito = (idItem: number) => {
    setQueridinhos((prev) =>
      prev.map((item) =>
        item.id_produto === idItem ? { ...item, favorito: !item.favorito } : item
      )
    );
  };

  const abrirModal = (produto: any) => {
    setProdutoSelecionado({
      nome: produto.nome_produto,
      preco: Number(produto.valor_produto),
      descricao: produto.descricao_produto,
      imagem: semImagem.includes(produto.id_produto) || !produto.foto_produto
        ? { uri: `${IMAGEM}/produto/sem-imagem.png` }
        : { uri: `${IMAGEM}/${produto.foto_produto}` },
    });
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

              <View style={homeStyle.bannerWrapper}>
                <Image
                  source={require("@/assets/images/fitbia/banner1.png")}
                  style={homeStyle.banner}
                  resizeMode="cover"
                />
              </View>

              <View style={homeStyle.categoriasSection}>
                <Text style={homeStyle.tituloSecao}>
                  Navegue por nossas categorias
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={homeStyle.categoriasList}
                >
                  {categorias.map((categoria) => (
                    <Pressable 
                      key={categoria.id_categoria}
                      style={homeStyle.categoriaItem}
                      onPress={() =>
                        router.push({
                          pathname: "/menu" as any,
                          params: { id_categoria: categoria.id_categoria },
                        })
                      }
                    >
                      <View style={homeStyle.categoriaIconeBox}>
                        <Image
                          style={homeStyle.categoriaIcone}
                          source={require("@/assets/images/fitbia/potes.png")}
                        />
                      </View>
                      <Text style={homeStyle.categoriaTexto}>
                        {categoria.nome_categoria}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={homeStyle.produtosSection}>
                <Text style={homeStyle.tituloSecao}>
                  Os queridinhos da casa, peça já!
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={homeStyle.produtosList}
                >
                  {queridinhos.map((produto) => {
                    const imagemUri =
                      semImagem.includes(produto.id_produto) || !produto.foto_produto
                        ? `${IMAGEM}/produto/sem-imagem.png`
                        : `${IMAGEM}/${produto.foto_produto}`;

                  const valorFormatado = `R$ ${Number(produto.preco_base_produto)
                      .toFixed(2)
                      .replace(".", ",")}`;

                    return (
                      <View style={homeStyle.cardProduto} key={produto.id_produto}>
                        <Image
                          source={{ uri: imagemUri }}
                          style={homeStyle.imgProduto}
                          onError={() => {
                            setSemImagem((imgs) => [...imgs, produto.id_produto]);
                          }}
                        />
                        <Pressable
                          style={homeStyle.btnFavorito}
                          onPress={() => toggleFavorito(produto.id_produto)}
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
                        <Text style={homeStyle.nomeProduto} numberOfLines={1}>
                          {produto.nome_produto}
                        </Text>
                        <View style={homeStyle.rodapeCard}>
                          <Text style={homeStyle.precoProduto}>{valorFormatado}</Text>
                          <Pressable
                            style={homeStyle.btnAdd}
                            onPress={() => abrirModal(produto)}
                          >
                            <Text style={homeStyle.txtBtnAdd}>+</Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          <BottomBar abaAtiva="home" />
        </SafeAreaView>
      </ImageBackground>

      <ProdutoModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        produto={produtoSelecionado}
      />
    </View>
  );
}