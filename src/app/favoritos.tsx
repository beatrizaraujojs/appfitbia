import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
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
              setListaFavoritos(dataFav);
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
          prev.filter((item: any) => String(item.id) !== String(idProduto)),
        );
      }
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
    }
  };

  // Filtragem robusta comparando tanto por ID da categoria quanto por nome
  const favoritosFiltrados = listaFavoritos.filter((item: any) => {
    if (categoriaAtiva === "Todos") return true;

    const itemCatId = String(item.id_categoria || "");
    const itemCatNome = String(item.categoria || "")
      .trim()
      .toLowerCase();

    const catAtivaStr = String(categoriaAtiva);

    // Procura o nome correspondente à categoria ativa caso o usuário tenha clicado num ID
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

    // Compara por ID ou por Nome
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

            {/* Abas Dinâmicas de Categorias (Iguais à Home e Menu) */}
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
                favoritosFiltrados.map((item: any) => (
                  <View key={item.id} style={favoritosStyle.cardFavorito}>
                    <View style={favoritosStyle.areaImagem}>
                      <Image
                        source={
                          item.imagem
                            ? { uri: item.imagem }
                            : require("@/assets/images/fotosfitbia/carne_desfiada_arroz_legumes.png")
                        }
                        style={favoritosStyle.imgPrato}
                        resizeMode="cover"
                      />
                      <Pressable
                        style={favoritosStyle.btnCoracao}
                        onPress={() => toggleFavorito(item.id)}
                      >
                        <Image
                          source={require("@/assets/images/fitbia/coracaovermelho.png")}
                          style={favoritosStyle.iconeCoracao}
                        />
                      </Pressable>
                    </View>

                    <View style={favoritosStyle.infoCard}>
                      <Text style={favoritosStyle.tituloPrato}>
                        {item.titulo}
                      </Text>
                      <Text style={favoritosStyle.descPrato}>
                        {item.descricao}
                      </Text>

                      <Pressable style={favoritosStyle.btnPecaAgora}>
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
                ))
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
