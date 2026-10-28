
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useState, useCallback, useRef, useEffect } from "react";
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
import menuStyle from "@/styles/menuStyle";
import ProdutoModal from "@/components/produtoModal";
import BottomBar from "@/components/BottomBar";
import { Produto } from "@/styles/produtoModalStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

// Identificar o dia da semana pelo nome do produto
function identificarDia(nome: string) {
  const texto = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const dias = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];

  return dias.findIndex((dia) => texto.includes(dia));
}

// Formatar preço em reais
function formatarPreco(valor: any) {
  return `R$ ${Number(valor || 0)
    .toFixed(2)
    .replace(".", ",")}`;
}

export default function MenuScreen() {
  const params = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);

  const [busca, setBusca] = useState(
    params.busca ? String(params.busca) : ""
  );

  const [categoriaAtiva, setCategoriaAtiva] = useState<
    number | string | "Todos"
  >(params.id_categoria ? Number(params.id_categoria) : "Todos");

  const [categorias, setCategorias] = useState<any[]>([]);
  const [produtosCardapio, setProdutosCardapio] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<Produto | null>(null);

  // Dia atual, atualizado ao entrar na tela
  const [hoje, setHoje] = useState(new Date().getDay());

  useFocusEffect(
    useCallback(() => {
      setHoje(new Date().getDay());
    }, [])
  );

  useEffect(() => {
    if (params.busca) {
      setBusca(String(params.busca));
    }
  }, [params.busca]);

  // Carregar categorias
  useFocusEffect(
    useCallback(() => {
      async function carregarCategorias() {
        try {
          const resp = await fetch(`${API}/categorias`);
          const json = await resp.json();

          if (json && json.success && Array.isArray(json.data)) {
            setCategorias(json.data);
          } else if (Array.isArray(json)) {
            setCategorias(json);
          }
        } catch (erro) {
          console.error("Erro ao carregar categorias:", erro);
        }
      }

      carregarCategorias();
    }, [])
  );

  // Carregar produtos e favoritos
  useFocusEffect(
    useCallback(() => {
      async function carregarProdutosComFavoritos() {
        try {
          const token = await AsyncStorage.getItem("token");

          const [respProdutos, respFavoritos] = await Promise.all([
            fetch(`${API}/produtos`),
            token
              ? fetch(`${API}/favoritos`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              : Promise.resolve(null),
          ]);

          const json = await respProdutos.json();
          let idsFavoritos: number[] = [];

          if (respFavoritos && respFavoritos.ok) {
            const jsonFavoritos = await respFavoritos.json();

            const listaFavoritos = Array.isArray(jsonFavoritos)
              ? jsonFavoritos
              : Array.isArray(jsonFavoritos.data)
              ? jsonFavoritos.data
              : [];

            idsFavoritos = listaFavoritos.map((fav: any) =>
              Number(fav.id_produto_fk || fav.id_produto || fav.id)
            );
          }

          let listaProdutos: any[] = [];

          if (json && json.success && Array.isArray(json.data)) {
            listaProdutos = json.data;
          } else if (Array.isArray(json)) {
            listaProdutos = json;
          }

          const produtosMapeados = listaProdutos.map((produto: any) => {
            const prodId = produto.id_produto || produto.id;

            return {
              ...produto,
              favorito: idsFavoritos.includes(Number(prodId)),
            };
          });

          setProdutosCardapio(produtosMapeados);

          setTimeout(() => {
            scrollViewRef.current?.scrollTo({
              y: 320,
              animated: true,
            });
          }, 200);
        } catch (erro) {
          console.error("Erro ao carregar produtos:", erro);
        }
      }

      carregarProdutosComFavoritos();
    }, [categoriaAtiva])
  );

  // Favoritar ou desfavoritar
  const toggleFavorito = async (idItem: number) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API}/favoritos/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_produto_fk: idItem,
        }),
      });

      if (response.ok) {
        setProdutosCardapio((prev) =>
          prev.map((item) =>
            item.id_produto === idItem || item.id === idItem
              ? { ...item, favorito: !item.favorito }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Erro ao alterar favorito no Menu:", error);
    }
  };

  // Abrir modal do produto
  const abrirModal = (produto: any) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  // Pratos da semana: categoria Pratos do dia (ID 8)
  // Ordenação começa pelo dia atual
  const pratosSemana = produtosCardapio
    .filter(
      (produto) =>
        Number(produto.id_categoria_fk) === 8 &&
        produto.status_produto === "ATIVO"
    )
    .sort((a, b) => {
      const diaA = identificarDia(a.nome_produto || a.nome || "");
      const diaB = identificarDia(b.nome_produto || b.nome || "");

      const ordemA = diaA === -1 ? 7 : (diaA - hoje + 7) % 7;
      const ordemB = diaB === -1 ? 7 : (diaB - hoje + 7) % 7;

      return ordemA - ordemB;
    });

  // Filtrar produtos por busca e categoria
  const produtosFiltrados = produtosCardapio.filter((produto) => {
    const nomeProd = produto.nome_produto || produto.nome || "";

    const matchBusca = nomeProd
      .toLowerCase()
      .includes(busca.toLowerCase());

    if (categoriaAtiva === "Todos") {
      return matchBusca;
    }

    const prodCatId =
      produto.id_categoria_fk ||
      produto.id_categoria ||
      produto.categoria_id ||
      produto.pivot?.id_categoria ||
      produto.categoria?.id_categoria;

    return (
      matchBusca &&
      String(prodCatId) === String(categoriaAtiva)
    );
  });

  // Agrupar produtos por categoria
  const produtosPorCategoria = categorias
    .map((cat) => {
      const catId = cat.id_categoria || cat.id;
      const catNome = cat.nome_categoria || cat.nome;

      const itensDaCat = produtosFiltrados.filter((p) => {
        const pCatId =
          p.id_categoria_fk ||
          p.id_categoria ||
          p.categoria_id ||
          p.pivot?.id_categoria ||
          p.categoria?.id_categoria;

        return String(pCatId) === String(catId);
      });

      return {
        id: catId,
        nome: catNome,
        produtos: itensDaCat,
      };
    })
    .filter((grupo) => grupo.produtos.length > 0);

  const nomeCategoriaAtual =
    categoriaAtiva === "Todos"
      ? null
      : categorias.find(
          (c) =>
            String(c.id_categoria || c.id) ===
            String(categoriaAtiva)
        )?.nome_categoria || "Categoria";

  // Renderizar cards dos produtos
  const renderizarCard = (produto: any) => {
    const prodId = produto.id_produto || produto.id;

    const imagemUri =
      semImagem.includes(prodId) || !produto.foto_produto
        ? `${IMAGEM}/sem-imagem.png`
        : `${IMAGEM}/${produto.foto_produto}`;

    const precoBase =
      produto.preco_base_produto ?? produto.preco ?? 0;

    return (
      <View style={menuStyle.cardHorizontal} key={prodId}>
        <View style={menuStyle.infoProduto}>
          <Text style={menuStyle.nomeProduto} numberOfLines={1}>
            {produto.nome_produto || produto.nome}
          </Text>

          <Text style={menuStyle.descProduto} numberOfLines={2}>
            {produto.descricao_produto || produto.descricao}
          </Text>

          <View style={menuStyle.linhaPreco}>
            <Text style={menuStyle.precoProduto}>
              {formatarPreco(precoBase)}
            </Text>

            <Pressable
              style={menuStyle.btnFavorito}
              onPress={() => toggleFavorito(prodId)}
            >
              <Image
                source={
                  produto.favorito
                    ? require("@/assets/images/fitbia/coracaovermelho.png")
                    : require("@/assets/images/fitbia/coracao.png")
                }
                style={menuStyle.iconeFavorito}
              />
            </Pressable>
          </View>
        </View>

        <View style={menuStyle.boxImagemProduto}>
          <Image
            source={{ uri: imagemUri }}
            style={menuStyle.imgProdutoHorizontal}
            onError={() => {
              setSemImagem((imgs) =>
                imgs.includes(prodId) ? imgs : [...imgs, prodId]
              );
            }}
          />

          <Pressable
            style={menuStyle.btnAddHorizontal}
            onPress={() => abrirModal(produto)}
          >
            <Text style={menuStyle.txtBtnAdd}>+</Text>
          </Pressable>
        </View>
      </View>
    );
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
            ref={scrollViewRef}
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={menuStyle.conteudo}>
              {/* Header */}
              <View style={menuStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={menuStyle.btnVoltar}
                >
                  <Text style={menuStyle.arrowBack}>←</Text>
                </Pressable>

                <Text style={menuStyle.tituloHeader}>Menu</Text>

                <Image
                  source={require("@/assets/images/fitbia/logo-fitbia.svg")}
                  style={menuStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Títulos */}
              <View style={menuStyle.titulosContainer}>
                <Text style={menuStyle.subtitulo}>Nossa comida</Text>

                <Text style={menuStyle.tituloPrincipal}>
                  Especial para você
                </Text>
              </View>

              {/* Busca */}
              <View style={menuStyle.buscarContainer}>
                <Image
                  style={menuStyle.iconeBusca}
                  source={require("@/assets/images/fitbia/lupa.png")}
                />

                <TextInput
                  placeholder="Buscar produtos"
                  placeholderTextColor="#A0A0A0"
                  style={menuStyle.textInputBusca}
                  value={busca}
                  onChangeText={setBusca}
                />
              </View>

              {/* Categorias */}
              <View style={menuStyle.abasCentralizadas}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={menuStyle.abasContainer}
                >
                  <Pressable
                    onPress={() => setCategoriaAtiva("Todos")}
                    style={menuStyle.abaItem}
                  >
                    <Text
                      style={[
                        menuStyle.abaTexto,
                        categoriaAtiva === "Todos" &&
                          menuStyle.abaTextoAtiva,
                      ]}
                    >
                      Todos
                    </Text>

                    {categoriaAtiva === "Todos" && (
                      <View style={menuStyle.linhaAtiva} />
                    )}
                  </Pressable>

                  {categorias.map((cat) => {
                    const catId = cat.id_categoria || cat.id;
                    const catNome = cat.nome_categoria || cat.nome;

                    const isActive =
                      String(categoriaAtiva) === String(catId);

                    return (
                      <Pressable
                        key={catId}
                        onPress={() => setCategoriaAtiva(catId)}
                        style={menuStyle.abaItem}
                      >
                        <Text
                          style={[
                            menuStyle.abaTexto,
                            isActive && menuStyle.abaTextoAtiva,
                          ]}
                        >
                          {catNome}
                        </Text>

                        {isActive && (
                          <View style={menuStyle.linhaAtiva} />
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Pratos da semana */}
              <View style={menuStyle.secaoPratosSemana}>
                <Text style={menuStyle.tituloSecao}>
                  Pratos da semana
                </Text>

                {pratosSemana.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={menuStyle.listaPratosSemana}
                  >
                    {pratosSemana.map((produto) => {
                      const prodId =
                        produto.id_produto || produto.id;

                      const imagemUri =
                        semImagem.includes(prodId) ||
                        !produto.foto_produto
                          ? `${IMAGEM}/sem-imagem.png`
                          : `${IMAGEM}/${produto.foto_produto}`;

                      const preco =
                        produto.preco_base_produto ??
                        produto.preco ??
                        0;

                      return (
                        <Pressable
                          key={prodId}
                          onPress={() => abrirModal(produto)}
                          style={{
                            width: 120,
                            marginRight: 10,
                          }}
                        >
                          <Image
                            source={{ uri: imagemUri }}
                            style={menuStyle.imgPratoSemana}
                            resizeMode="cover"
                            onError={() => {
                              setSemImagem((anterior) =>
                                anterior.includes(prodId)
                                  ? anterior
                                  : [...anterior, prodId]
                              );
                            }}
                          />

                          <Text
                            numberOfLines={2}
                            style={{
                              fontSize: 13,
                              fontWeight: "600",
                              color: "#2C3E2D",
                              marginTop: 7,
                              minHeight: 34,
                            }}
                          >
                            {produto.nome_produto || produto.nome}
                          </Text>

                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "bold",
                              color: "#916F4A",
                              marginTop: 3,
                            }}
                          >
                            {formatarPreco(preco)}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <Text
                    style={{
                      color: "#666",
                      marginTop: 10,
                    }}
                  >
                    Nenhum prato da semana disponível.
                  </Text>
                )}
              </View>

              <View style={menuStyle.divisor} />

              {/* Lista de produtos */}
              <View style={menuStyle.listaProdutos}>
                {produtosFiltrados.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#666",
                      marginTop: 20,
                    }}
                  >
                    Nenhum produto encontrado.
                  </Text>
                ) : categoriaAtiva === "Todos" ? (
                  produtosPorCategoria.map((grupo) => (
                    <View
                      key={grupo.id}
                      style={{ marginBottom: 20 }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#2C3E2D",
                          marginBottom: 12,
                          marginTop: 10,
                        }}
                      >
                        {grupo.nome}
                      </Text>

                      {grupo.produtos.map((produto) =>
                        renderizarCard(produto)
                      )}
                    </View>
                  ))
                ) : (
                  <View style={{ marginBottom: 20 }}>
                    {nomeCategoriaAtual && (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#2C3E2D",
                          marginBottom: 12,
                          marginTop: 10,
                        }}
                      >
                        {nomeCategoriaAtual}
                      </Text>
                    )}

                    {produtosFiltrados.map((produto) =>
                      renderizarCard(produto)
                    )}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <BottomBar abaAtiva="cardapio" />
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
