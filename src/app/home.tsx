import { useState, useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import globalStyle from "@/styles/globalStyle";
import homeStyle from "@/styles/homeStyle";
import ProdutoModal from "@/components/produtoModal";
import BottomBar from "@/components/BottomBar";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function HomeScreen() {
  const [busca, setBusca] = useState("");
  const [nomeCliente, setNomeCliente] = useState("Cliente");

  const [queridinhos, setQueridinhos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any | null>(
    null,
  );

  useFocusEffect(
    useCallback(() => {
      async function carregarDadosHome() {
        try {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            try {
              const respCliente = await fetch(`${API}/cliente`, {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              const jsonCliente = await respCliente.json();
              if (jsonCliente.success && jsonCliente.data?.nome_cliente) {
                const primeiroNome =
                  jsonCliente.data.nome_cliente.split(" ")[0];
                setNomeCliente(primeiroNome);
              }
            } catch (e) {
              const nomeSalvo = await AsyncStorage.getItem("nome_cliente");
              if (nomeSalvo) {
                setNomeCliente(nomeSalvo.split(" ")[0]);
              }
            }
          }

          const [respProdutos, respFavoritos] = await Promise.all([
            fetch(`${API}/produtos`),
            token
              ? fetch(`${API}/favoritos`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
              : Promise.resolve(null),
          ]);

          const jsonProdutos = await respProdutos.json();
          let idsFavoritos = [];

          if (respFavoritos && respFavoritos.ok) {
            const jsonFavoritos = await respFavoritos.json();
            idsFavoritos = jsonFavoritos.map((fav: any) => fav.id);
          }

          if (
            jsonProdutos &&
            jsonProdutos.success &&
            Array.isArray(jsonProdutos.data)
          ) {
            const produtosAtivos = jsonProdutos.data
              .filter((produto: any) => produto.status_produto === "ATIVO")
              .map((produto: any) => ({
                ...produto,
                favorito: idsFavoritos.includes(produto.id_produto),
              }));

            const destaques = produtosAtivos.filter(
              (produto: any) => produto.destaque_produto === "SIM",
            );
            setQueridinhos(destaques.length > 0 ? destaques : produtosAtivos);
          }

          const respCategorias = await fetch(`${API}/categorias`);
          const jsonCategorias = await respCategorias.json();

          if (
            jsonCategorias &&
            jsonCategorias.success &&
            Array.isArray(jsonCategorias.data)
          ) {
            const categoriasAtivas = jsonCategorias.data
              .filter(
                (cat: any) =>
                  cat.ativa_categoria === "ATIVO" ||
                  cat.status_categoria === "ATIVO",
              )
              .sort(
                (a: any, b: any) =>
                  (a.ordem_categoria || 0) - (b.ordem_categoria || 0),
              );

            setCategorias(categoriasAtivas);
          }
        } catch (erro) {
          console.error("Erro crítico ao carregar dados da API na Home:", erro);
        }
      }

      carregarDadosHome();
    }, []),
  );

  const toggleFavorito = async (idItem: number) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API}/favoritos/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_produto_fk: idItem }),
      });

      if (response.ok) {
        setQueridinhos((prev) =>
          prev.map((item) =>
            item.id_produto === idItem
              ? { ...item, favorito: !item.favorito }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error("Erro ao alterar favorito na Home:", error);
    }
  };

  const abrirModal = (produto: any) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  const handleBuscar = () => {
    if (!busca.trim()) return;

    router.push({
      pathname: "/menu" as any,
      params: { busca: busca.trim() },
    });
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
                  <Text style={homeStyle.saudacao}>Olá, {nomeCliente}!</Text>
                  <Text style={homeStyle.subSaudacao}>
                    O que vai nutrir seu corpo hoje?
                  </Text>
                </View>
                <Image
                  source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                  style={homeStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              <View style={homeStyle.buscarContainer}>
                <Pressable onPress={handleBuscar}>
                  <Image
                    style={homeStyle.iconeBusca}
                    source={require("@/assets/images/fitbia/lupa.png")}
                  />
                </Pressable>
                <TextInput
                  placeholder="Buscar produtos"
                  placeholderTextColor="#A0A0A0"
                  style={homeStyle.textInputBusca}
                  value={busca}
                  onChangeText={setBusca}
                  returnKeyType="search"
                  onSubmitEditing={handleBuscar}
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
                      <View style={homeStyle.categoriaCard}>
                        <Text
                          style={homeStyle.categoriaTexto}
                          numberOfLines={1}
                        >
                          {categoria.nome_categoria}
                        </Text>
                      </View>
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
                      semImagem.includes(produto.id_produto) ||
                      !produto.foto_produto
                        ? `${IMAGEM}/produto/sem-imagem.png`
                        : `${IMAGEM}/${produto.foto_produto}`;

                    const valorFormatado = `R$ ${Number(
                      produto.preco_base_produto || 0,
                    )
                      .toFixed(2)
                      .replace(".", ",")}`;

                    return (
                      <View
                        style={homeStyle.cardProduto}
                        key={produto.id_produto}
                      >
                        <Image
                          source={{ uri: imagemUri }}
                          style={homeStyle.imgProduto}
                          onError={() => {
                            setSemImagem((imgs) => [
                              ...imgs,
                              produto.id_produto,
                            ]);
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
                          <Text style={homeStyle.precoProduto}>
                            {valorFormatado}
                          </Text>
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

      {modalVisivel && produtoSelecionado && (
        <ProdutoModal
          visible={modalVisivel}
          onClose={() => setModalVisivel(false)}
          produto={produtoSelecionado}
        />
      )}
    </View>
  );
}