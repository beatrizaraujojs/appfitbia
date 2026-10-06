import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
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
import menuStyle from "@/styles/menuStyle";
import ProdutoModal from "@/components/produtoModal";
import BottomBar from "@/components/BottomBar";
import { Produto } from "@/styles/produtoModalStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function MenuScreen() {
  const params = useLocalSearchParams();
  const [busca, setBusca] = useState("");
  
  const [categoriaAtiva, setCategoriaAtiva] = useState<number | string | "Todos">(
    params.id_categoria ? Number(params.id_categoria) : "Todos"
  );

  const [categorias, setCategorias] = useState<any[]>([]);
  const [produtosCardapio, setProdutosCardapio] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);

  // Pratos da semana fixos
  const pratosSemana = [
    { id: 1, imagem: require("@/assets/images/fotosfitbia/salmao_batatas_assadas_brocolis.png") },
    { id: 2, imagem: require("@/assets/images/fotosfitbia/salada_fitbia_power.png") },
    { id: 3, imagem: require("@/assets/images/fotosfitbia/panqueca_carne_moida_arroz_legumes.png") },
    { id: 4, imagem: require("@/assets/images/fotosfitbia/quinta_feira.png") },
    { id: 5, imagem: require("@/assets/images/fotosfitbia/quarta_feira.png") },
    { id: 6, imagem: require("@/assets/images/fotosfitbia/segunda_feira.png") },
    { id: 7, imagem: require("@/assets/images/fotosfitbia/sabado_1.png") },
  ];

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  // 1. Carregar Categorias ao abrir a tela
  useEffect(() => {
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
  }, []);

  // 2. Carregar Produtos sempre que a Categoria Ativa mudar
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const url =
          categoriaAtiva === "Todos"
            ? `${API}/produtos`
            : `${API}/produtos?categoria_id=${categoriaAtiva}`;

        const resp = await fetch(url);
        const json = await resp.json();

        let listaProdutos = [];
        if (json && json.success && Array.isArray(json.data)) {
          listaProdutos = json.data;
        } else if (Array.isArray(json)) {
          listaProdutos = json;
        }

        const produtosMapeados = listaProdutos.map((produto: any) => ({
          ...produto,
          favorito: false,
        }));

        setProdutosCardapio(produtosMapeados);
      } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
      }
    }

    carregarProdutos();
  }, [categoriaAtiva]);

  const toggleFavorito = (idItem: number) => {
    setProdutosCardapio((prev) =>
      prev.map((item) =>
        (item.id_produto === idItem || item.id === idItem)
          ? { ...item, favorito: !item.favorito }
          : item
      )
    );
  };

  const abrirModal = (produto: any) => {
    const prodId = produto.id_produto || produto.id;
    const imagemUri =
      semImagem.includes(prodId) || !produto.foto_produto
        ? `${IMAGEM}/produto/sem-imagem.png`
        : `${IMAGEM}/${produto.foto_produto}`;

    setProdutoSelecionado({
      nome: produto.nome_produto || produto.nome,
      preco: Number(produto.preco_base_produto || produto.preco || 0),
      descricao: produto.descricao_produto || produto.descricao,
      imagem: { uri: imagemUri },
    });
    setModalVisivel(true);
  };

  // Filtragem local por texto de busca
  const produtosFiltrados = produtosCardapio.filter((produto) => {
    const nomeProd = produto.nome_produto || produto.nome || "";
    return nomeProd.toLowerCase().includes(busca.toLowerCase());
  });

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
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={menuStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Destaque */}
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

              {/* Abas de Categorias */}
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
                        categoriaAtiva === "Todos" && menuStyle.abaTextoAtiva,
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
                    const isActive = String(categoriaAtiva) === String(catId);

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
                        {isActive && <View style={menuStyle.linhaAtiva} />}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Pratos da Semana Fixos */}
              <View style={menuStyle.secaoPratosSemana}>
                <Text style={menuStyle.tituloSecao}>Pratos da semana</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={menuStyle.listaPratosSemana}
                >
                  {pratosSemana.map((prato) => (
                    <Image
                      key={prato.id}
                      source={prato.imagem}
                      style={menuStyle.imgPratoSemana}
                    />
                  ))}
                </ScrollView>
              </View>

              <View style={menuStyle.divisor} />

              {/* Lista Vertical de Produtos */}
              <View style={menuStyle.listaProdutos}>
                {produtosFiltrados.length === 0 ? (
                  <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
                    Nenhum produto encontrado nesta categoria.
                  </Text>
                ) : (
                  produtosFiltrados.map((produto) => {
                    const prodId = produto.id_produto || produto.id;
                    const imagemUri =
                      semImagem.includes(prodId) || !produto.foto_produto
                        ? `${IMAGEM}/produto/sem-imagem.png`
                        : `${IMAGEM}/${produto.foto_produto}`;

                    const precoBase = produto.preco_base_produto || produto.preco || 0;
                    const valorFormatado = `R$ ${Number(precoBase)
                      .toFixed(2)
                      .replace(".", ",")}`;

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
                              {valorFormatado}
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
                              setSemImagem((imgs) => [...imgs, prodId]);
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
                  })
                )}
              </View>
            </View>
          </ScrollView>

          <BottomBar abaAtiva="cardapio" />
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