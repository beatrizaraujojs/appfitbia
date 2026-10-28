import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyle from "@/styles/globalStyle";
import BottomBar from "@/components/BottomBar";
import favoritosStyle from "@/styles/favoritosStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function FavoritosScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<
    number | string | "Todos"
  >("Todos");
  const [categorias, setCategorias] = useState<any[]>([]);
  const [listaFavoritos, setListaFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega as Categorias do Dash e os Favoritos do Usuário ao focar na tela
  useFocusEffect(
    useCallback(() => {
      async function carregarDados() {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem("token");

          // 1. Buscar Categorias ativas da API
          const respCat = await fetch(`${API}/categorias`);
          const jsonCat = await respCat.json();

          let listaCatData = [];
          if (jsonCat && jsonCat.success && Array.isArray(jsonCat.data)) {
            listaCatData = jsonCat.data;
          } else if (Array.isArray(jsonCat)) {
            listaCatData = jsonCat;
          }

          const categoriasAtivas = listaCatData
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

          // 2. Buscar Favoritos do Cliente Logado
          if (token) {
            const respFav = await fetch(`${API}/favoritos`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (respFav.ok) {
              const dataFav = await respFav.json();
              const favoritosArray = Array.isArray(dataFav)
                ? dataFav
                : dataFav.data || [];
              setListaFavoritos(favoritosArray);
            }
          }
        } catch (error) {
          console.error("Erro ao carregar dados em favoritos:", error);
        } finally {
          setLoading(false);
        }
      }

      carregarDados();
    }, []),
  );

  const toggleFavorito = async (idProduto: number | string) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API}/favoritos/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_produto_fk: idProduto }),
      });

      if (response.ok) {
        setListaFavoritos((prev) =>
          prev.filter(
            (item: any) =>
              String(item.id || item.id_produto || item.id_produto_fk) !==
              String(idProduto),
          ),
        );
      }
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
    }
  };

  // Função para adicionar o produto direto ao carrinho local do App com o formato correto da foto
  const adicionarAoCarrinho = async (item: any) => {
    try {
      const idProduto = item.id_produto || item.id_produto_fk || item.id;
      const precoProduto = Number(item.preco_base_produto || item.preco || item.valor || 0);
      const nomeProduto = item.nome_produto || item.titulo || "Produto";
      const descProduto = item.descricao_produto || item.descricao || "";

      // Extrai apenas o nome do arquivo da imagem caso venha a URL completa
      let imagemNome = item.foto_produto || item.imagem || "";
      if (imagemNome.includes("/")) {
        const partes = imagemNome.split("/");
        imagemNome = partes[partes.length - 1];
      }

      // 1. Buscar carrinho atual do AsyncStorage
      const carrinhoSalvo = await AsyncStorage.getItem("@carrinho_fitbia");
      let itensCarrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

      // 2. Criar um ID único para o item no carrinho
      const cartItemId = `${idProduto}_${Date.now()}`;

      // 3. Verificar se o produto já existe no carrinho para somar ou criar novo
      const indexExistente = itensCarrinho.findIndex(
        (i: any) => String(i.id_produto || i.id) === String(idProduto)
      );

      if (indexExistente >= 0) {
        itensCarrinho[indexExistente].quantidade += 1;
        itensCarrinho[indexExistente].valorTotal = 
          itensCarrinho[indexExistente].quantidade * itensCarrinho[indexExistente].precoUnitario;
      } else {
        const novoItem = {
          cartItemId: cartItemId,
          id_produto: idProduto,
          nome: nomeProduto,
          descricao: descProduto,
          precoUnitario: precoProduto,
          valorTotal: precoProduto,
          quantidade: 1,
          foto_produto: imagemNome, // Nome do arquivo compatível com o CarrinhoScreen
          observacao: "",
          adicionais: [],
        };
        itensCarrinho.push(novoItem);
      }

      // 4. Salvar de volta no AsyncStorage
      await AsyncStorage.setItem("@carrinho_fitbia", JSON.stringify(itensCarrinho));

      // 5. Redirecionar para a tela de carrinho
      router.push("/carrinho");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      Alert.alert("Erro", "Não foi possível adicionar o produto ao carrinho.");
    }
  };

  // Formatação do preço (R$ 0,00)
  const formatarPreco = (preco: number | string) => {
    const valor = Number(preco) || 0;
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  };

  // Filtragem robusta comparando tanto por ID da categoria quanto por nome
  const favoritosFiltrados = listaFavoritos.filter((item: any) => {
    if (categoriaAtiva === "Todos") return true;

    const itemCatId = String(item.id_categoria_fk || item.id_categoria || "");
    const itemCatNome = String(item.categoria || "")
      .trim()
      .toLowerCase();

    const catAtivaStr = String(categoriaAtiva);

    const categoriaSelecionadaObj = categorias.find(
      (c) => String(c.id_categoria || c.id) === catAtivaStr,
    );
    const nomeCatSelecionada = categoriaSelecionadaObj
      ? String(
          categoriaSelecionadaObj.nome_categoria ||
            categoriaSelecionadaObj.nome ||
            "",
        )
          .trim()
          .toLowerCase()
      : catAtivaStr.toLowerCase();

    return itemCatId === catAtivaStr || itemCatNome === nomeCatSelecionada;
  });

  const nomeCategoriaAtual =
    categoriaAtiva === "Todos"
      ? null
      : categorias.find(
          (c) => String(c.id_categoria || c.id) === String(categoriaAtiva),
        )?.nome_categoria || categoriaAtiva;

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
            {/* Header */}
            <View style={favoritosStyle.header}>
              <View style={favoritosStyle.conteudoHeader}>
                <Pressable onPress={() => router.back()}>
                  <Image
                    style={favoritosStyle.iconeVoltar}
                    source={require("@/assets/images/fitbia/de-volta.png")}
                  />
                </Pressable>

                <Text style={favoritosStyle.titulo}>Meus favoritos</Text>

                <Image
                  style={favoritosStyle.logo}
                  source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Abas Dinâmicas de Categorias */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={favoritosStyle.scrollCategorias}
              contentContainerStyle={favoritosStyle.containerCategorias}
            >
              <Pressable
                onPress={() => setCategoriaAtiva("Todos")}
                style={favoritosStyle.btnCategoria}
              >
                <Text
                  style={[
                    favoritosStyle.txtCategoria,
                    categoriaAtiva === "Todos" &&
                      favoritosStyle.txtCategoriaAtiva,
                  ]}
                >
                  Todos
                </Text>
                {categoriaAtiva === "Todos" && (
                  <View style={favoritosStyle.indicadorAtivo} />
                )}
              </Pressable>

              {categorias.map((cat) => {
                const catId = cat.id_categoria || cat.id;
                const catNome = cat.nome_categoria || cat.nome;
                const isActive = String(categoriaAtiva) === String(catId);

                return (
                  <Pressable
                    key={catId}
                    onPress={() => setCategoriaAtiva(catId)}
                    style={favoritosStyle.btnCategoria}
                  >
                    <Text
                      style={[
                        favoritosStyle.txtCategoria,
                        isActive && favoritosStyle.txtCategoriaAtiva,
                      ]}
                    >
                      {catNome}
                    </Text>
                    {isActive && <View style={favoritosStyle.indicadorAtivo} />}
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Lista de Favoritos Filtrados */}
            <View style={favoritosStyle.main}>
              {favoritosFiltrados.length > 0 ? (
                favoritosFiltrados.map((item: any) => {
                  const itemId = item.id_produto || item.id_produto_fk || item.id;
                  const precoProduto =
                    item.preco_base_produto || item.preco || item.valor || 0;

                  return (
                    <View key={itemId} style={favoritosStyle.cardFavorito}>
                      <View style={favoritosStyle.areaImagem}>
                        <Image
                          source={
                            item.foto_produto || item.imagem
                              ? { uri: item.foto_produto || item.imagem }
                              : require("@/assets/images/fotosfitbia/carne_desfiada_arroz_legumes.png")
                          }
                          style={favoritosStyle.imgPrato}
                          resizeMode="cover"
                        />
                        <Pressable
                          style={favoritosStyle.btnCoracao}
                          onPress={() => toggleFavorito(itemId)}
                        >
                          <Image
                            source={require("@/assets/images/fitbia/coracaovermelho.png")}
                            style={favoritosStyle.iconeCoracao}
                          />
                        </Pressable>
                      </View>

                      <View style={favoritosStyle.infoCard}>
                        <Text style={favoritosStyle.tituloPrato}>
                          {item.nome_produto || item.titulo}
                        </Text>
                        <Text style={favoritosStyle.descPrato} numberOfLines={2}>
                          {item.descricao_produto || item.descricao}
                        </Text>

                        {/* Exibição do Preço do Banco */}
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#333",
                            marginVertical: 4,
                          }}
                        >
                          {formatarPreco(precoProduto)}
                        </Text>

                        {/* Botão Peça Agora adicionando direto ao carrinho */}
                        <Pressable
                          style={favoritosStyle.btnPecaAgora}
                          onPress={() => adicionarAoCarrinho(item)}
                        >
                          <Text style={favoritosStyle.txtPecaAgora}>
                            Peça agora
                          </Text>
                          <Image
                            source={require("@/assets/images/fitbia/seta-direita.png")}
                            style={favoritosStyle.iconeSeta}
                          />
                        </Pressable>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{ textAlign: "center", color: "#666", marginTop: 40 }}
                >
                  {loading
                    ? "A carregar favoritos..."
                    : categoriaAtiva === "Todos"
                      ? "Ainda não tens nenhum item nos favoritos."
                      : `Nenhum favorito encontrado na categoria ${nomeCategoriaAtual}.`}
                </Text>
              )}
            </View>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}