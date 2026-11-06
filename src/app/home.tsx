
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
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

import BottomBar from "@/components/BottomBar";
import ProdutoModal from "@/components/produtoModal";
import globalStyle from "@/styles/globalStyle";
import homeStyle from "@/styles/homeStyle";

const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function HomeScreen() {
  const [busca, setBusca] = useState("");
  const [nomeCliente, setNomeCliente] = useState("Cliente");

  const [queridinhos, setQueridinhos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<any | null>(null);

  // Mensagem de favoritos
  const [mensagemFavorito, setMensagemFavorito] = useState("");

  const timerMensagem = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const favoritosEmProcessamento = useRef<Set<number>>(
    new Set()
  );

  // Mostrar mensagem temporária
  const mostrarMensagem = (mensagem: string) => {
    if (timerMensagem.current) {
      clearTimeout(timerMensagem.current);
    }

    setMensagemFavorito(mensagem);

    timerMensagem.current = setTimeout(() => {
      setMensagemFavorito("");
    }, 2500);
  };

  // Limpar temporizador ao sair
  useEffect(() => {
    return () => {
      if (timerMensagem.current) {
        clearTimeout(timerMensagem.current);
      }
    };
  }, []);

  // Carregar informações da Home
  useFocusEffect(
    useCallback(() => {
      let ativo = true;

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

              if (
                ativo &&
                jsonCliente.success &&
                jsonCliente.data?.nome_cliente
              ) {
                const primeiroNome =
                  jsonCliente.data.nome_cliente.split(" ")[0];

                setNomeCliente(primeiroNome);
              }
            } catch (e) {
              const nomeSalvo = await AsyncStorage.getItem(
                "nome_cliente"
              );

              if (ativo && nomeSalvo) {
                setNomeCliente(nomeSalvo.split(" ")[0]);
              }
            }
          }

          const [respProdutos, respFavoritos] = await Promise.all([
            fetch(`${API}/produtos`),

            token
              ? fetch(`${API}/favoritos`, {
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
              : Promise.resolve(null),
          ]);

          const jsonProdutos = await respProdutos.json();

          let idsFavoritos: number[] = [];

          if (respFavoritos && respFavoritos.ok) {
            const jsonFavoritos = await respFavoritos.json();

            const listaFavoritos = Array.isArray(jsonFavoritos)
              ? jsonFavoritos
              : Array.isArray(jsonFavoritos.data)
              ? jsonFavoritos.data
              : [];

            idsFavoritos = listaFavoritos.map((fav: any) =>
              Number(
                fav.id_produto_fk ??
                fav.id_produto ??
                fav.id
              )
            );
          }

          if (
            jsonProdutos &&
            jsonProdutos.success &&
            Array.isArray(jsonProdutos.data)
          ) {
            const produtosAtivos = jsonProdutos.data
              .filter(
                (produto: any) =>
                  produto.status_produto === "ATIVO"
              )
              .map((produto: any) => ({
                ...produto,
                favorito: idsFavoritos.includes(
                  Number(produto.id_produto)
                ),
              }));

            const destaques = produtosAtivos.filter(
              (produto: any) =>
                produto.destaque_produto === "SIM"
            );

            if (ativo) {
              setQueridinhos(
                destaques.length > 0
                  ? destaques
                  : produtosAtivos
              );
            }
          }

          const respCategorias = await fetch(
            `${API}/categorias`
          );

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
                  cat.status_categoria === "ATIVO"
              )
              .sort(
                (a: any, b: any) =>
                  (a.ordem_categoria || 0) -
                  (b.ordem_categoria || 0)
              );

            if (ativo) {
              setCategorias(categoriasAtivas);
            }
          }
        } catch (erro) {
          console.error(
            "Erro crítico ao carregar dados da API na Home:",
            erro
          );
        }
      }

      carregarDadosHome();

      return () => {
        ativo = false;
      };
    }, [])
  );

  // Favoritar ou desfavoritar produtos
  const toggleFavorito = async (idItem: number) => {
    if (favoritosEmProcessamento.current.has(idItem)) {
      return;
    }

    favoritosEmProcessamento.current.add(idItem);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        mostrarMensagem("Faça login para favoritar produtos");
        return;
      }

      // Identifica se o produto já estava favoritado
      const produtoAtual = queridinhos.find(
        (item) => Number(item.id_produto) === idItem
      );

      if (!produtoAtual) {
        return;
      }

      const eraFavorito = Boolean(produtoAtual.favorito);

      const response = await fetch(
        `${API}/favoritos/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_produto_fk: idItem,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível atualizar o favorito"
        );
      }

      // Atualiza o coração na tela
      setQueridinhos((prev) =>
        prev.map((item) =>
          Number(item.id_produto) === idItem
            ? {
                ...item,
                favorito: !eraFavorito,
              }
            : item
        )
      );

      // Mostra a mensagem correspondente
      if (eraFavorito) {
        mostrarMensagem(
          "Produto removido dos favoritos"
        );
      } else {
        mostrarMensagem(
          "Produto adicionado aos favoritos"
        );
      }
    } catch (error) {
      console.error(
        "Erro ao alterar favorito na Home:",
        error
      );

      mostrarMensagem(
        "Erro ao atualizar favoritos"
      );
    } finally {
      favoritosEmProcessamento.current.delete(idItem);
    }
  };

  // Abrir modal do produto
  const abrirModal = (produto: any) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  // Buscar produtos
  const handleBuscar = () => {
    if (!busca.trim()) return;

    router.push({
      pathname: "/menu" as any,
      params: {
        busca: busca.trim(),
      },
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
              {/* Header */}
              <View style={homeStyle.header}>
                <View>
                  <Text style={homeStyle.saudacao}>
                    Olá, {nomeCliente}!
                  </Text>

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

              {/* Busca */}
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

              {/* Banner */}
              <View style={homeStyle.bannerWrapper}>
                <Image
                  source={require("@/assets/images/fitbia/banner1.png")}
                  style={homeStyle.banner}
                  resizeMode="cover"
                />
              </View>

              {/* Categorias */}
              <View style={homeStyle.categoriasSection}>
                <Text style={homeStyle.tituloSecao}>
                  Navegue por nossas categorias
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={
                    homeStyle.categoriasList
                  }
                >
                  {categorias.map((categoria) => (
                    <Pressable
                      key={categoria.id_categoria}
                      style={homeStyle.categoriaItem}
                      onPress={() =>
                        router.push({
                          pathname: "/menu" as any,
                          params: {
                            id_categoria:
                              categoria.id_categoria,
                          },
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

              {/* Produtos */}
              <View style={homeStyle.produtosSection}>
                <Text style={homeStyle.tituloSecao}>
                  Os queridinhos da casa, peça já!
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={
                    homeStyle.produtosList
                  }
                >
                  {queridinhos.map((produto) => {
                    const imagemUri =
                      semImagem.includes(
                        produto.id_produto
                      ) || !produto.foto_produto
                        ? `${IMAGEM}/sem-imagem.png`
                        : `${IMAGEM}/${produto.foto_produto}`;

                    const valorFormatado = `R$ ${Number(
                      produto.preco_base_produto || 0
                    )
                      .toFixed(2)
                      .replace(".", ",")}`;

                    return (
                      <View
                        style={homeStyle.cardProduto}
                        key={produto.id_produto}
                      >
                        {/* Imagem */}
                        <Image
                          source={{ uri: imagemUri }}
                          style={homeStyle.imgProduto}
                          onError={() => {
                            setSemImagem((imgs) =>
                              imgs.includes(
                                produto.id_produto
                              )
                                ? imgs
                                : [
                                    ...imgs,
                                    produto.id_produto,
                                  ]
                            );
                          }}
                        />

                        {/* Favorito */}
                        <Pressable
                          style={homeStyle.btnFavorito}
                          onPress={() =>
                            toggleFavorito(
                              Number(produto.id_produto)
                            )
                          }
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

                        {/* Nome */}
                        <Text
                          style={homeStyle.nomeProduto}
                          numberOfLines={1}
                        >
                          {produto.nome_produto}
                        </Text>

                        {/* Preço e adicionar */}
                        <View style={homeStyle.rodapeCard}>
                          <Text
                            style={homeStyle.precoProduto}
                          >
                            {valorFormatado}
                          </Text>

                          <Pressable
                            style={homeStyle.btnAdd}
                            onPress={() =>
                              abrirModal(produto)
                            }
                          >
                            <Text style={homeStyle.txtBtnAdd}>
                              +
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          {/* Mensagem de favoritos */}
          {mensagemFavorito !== "" && (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 8,
                alignSelf: "center",
                backgroundColor: "#B7C5B7",
                paddingHorizontal: 18,
                paddingVertical: 9,
                borderRadius: 5,
                zIndex: 100,
                maxWidth: "90%",
              }}
            >
              <Text
                style={{
                  color: "#2E813B",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {mensagemFavorito}
              </Text>
            </View>
          )}

          <BottomBar abaAtiva="home" />
        </SafeAreaView>
      </ImageBackground>

      {/* Modal do produto */}
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
