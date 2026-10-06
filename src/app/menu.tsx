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
import menuStyle from "@/styles/menuStyle";
import ProdutoModal from "@/components/produtoModal";
import BottomBar from "@/components/BottomBar";
import { Produto } from "@/styles/produtoModalStyle";

export default function MenuScreen() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Lista de categorias dinâmicas
  const categorias = [
    "Todos",
    "Marmitas",
    "Caldos",
    "Proteínas",
    "Pacotes Fit",
  ];

  // Array estruturado dos Pratos da Semana com ID numérico
  const pratosSemana = [
    {
      id: 1,
      imagem: require("@/assets/images/fotosfitbia/salmao_batatas_assadas_brocolis.png"),
    },
    {
      id: 2,
      imagem: require("@/assets/images/fotosfitbia/salada_fitbia_power.png"),
    },
    {
      id: 3,
      imagem: require("@/assets/images/fotosfitbia/panqueca_carne_moida_arroz_legumes.png"),
    },
    {
      id: 4,
      imagem: require("@/assets/images/fotosfitbia/quinta_feira.png"),
    },
     {
      id: 5,
      imagem: require("@/assets/images/fotosfitbia/quarta_feira.png"),
    },
     {
      id: 6,
      imagem: require("@/assets/images/fotosfitbia/segunda_feira.png"),
    },
     {
      id: 7,
      imagem: require("@/assets/images/fotosfitbia/sabado_1.png"),
    },

  ];

  // Array estruturado dos Produtos do Cardápio com IDs numéricos (1, 2...)
  const [produtosCardapio, setProdutosCardapio] = useState([
    {
      id: 1,
      nome: "Marmita Fit",
      descricao: "A marmita fit é uma refeição prática, saudável e saborosa, ideal para manter uma alimentação equilibrada no dia a dia.",
      preco: 25.0,
      precoStr: "R$ 25,00",
      imagem: require("@/assets/images/fotosfitbia/carne_desfiada_arroz_legumes.png"),
      favorito: false,
    },
    {
      id: 2,
      nome: "Caldo de abóbora",
      descricao: "O caldo de abóbora é uma opção prática, saborosa e nutritiva, ideal para aquecer e tornar as refeições mais leves.",
      preco: 27.8,
      precoStr: "R$ 27,80",
      imagem: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
      favorito: false,
    },
    {
      id: 3,
      nome: "Wrap de Frango",
      descricao: "O caldo de abóbora é uma opção prática, saborosa e nutritiva, ideal para aquecer e tornar as refeições mais leves.",
      preco: 27.8,
      precoStr: "R$ 30,50",
      imagem: require("@/assets/images/fotosfitbia/wrap_frango.png"),
      favorito: false,
    },
    {
      id: 4,
      nome: "Wrap de Frango",
      descricao: "O caldo de abóbora é uma opção prática, saborosa e nutritiva, ideal para aquecer e tornar as refeições mais leves.",
      preco: 27.8,
      precoStr: "R$ 30,50",
      imagem: require("@/assets/images/fotosfitbia/wrap_frango.png"),
      favorito: false,
    },
  ]);

  // Estados para controlar o Modal
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  // Função para alternar o favorito usando o ID numérico
  const toggleFavorito = (idItem: number) => {
    setProdutosCardapio((prev) =>
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

              {/* Busca com fundo branco e sombra */}
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

              {/* Categorias Centralizadas com .map() */}
              <View style={menuStyle.abasCentralizadas}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={menuStyle.abasContainer}
                >
                  {categorias.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategoriaAtiva(cat)}
                      style={menuStyle.abaItem}
                    >
                      <Text
                        style={[
                          menuStyle.abaTexto,
                          categoriaAtiva === cat && menuStyle.abaTextoAtiva,
                        ]}
                      >
                        {cat}
                      </Text>
                      {categoriaAtiva === cat && (
                        <View style={menuStyle.linhaAtiva} />
                      )}
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Pratos da Semana com .map() */}
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

              {/* Lista Vertical de Cardápio com .map() */}
              <View style={menuStyle.listaProdutos}>
                {produtosCardapio.map((produto) => (
                  <View style={menuStyle.cardHorizontal} key={produto.id}>
                    <View style={menuStyle.infoProduto}>
                      <Text style={menuStyle.nomeProduto}>{produto.nome}</Text>
                      <Text style={menuStyle.descProduto}>
                        {produto.descricao}
                      </Text>
                      <View style={menuStyle.linhaPreco}>
                        <Text style={menuStyle.precoProduto}>{produto.precoStr}</Text>
                        <Pressable
                          style={menuStyle.btnFavorito}
                          onPress={() => toggleFavorito(produto.id)}
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
                        source={produto.imagem}
                        style={menuStyle.imgProdutoHorizontal}
                      />
                      <Pressable
                        style={menuStyle.btnAddHorizontal}
                        onPress={() =>
                          abrirModal({
                            nome: produto.nome,
                            preco: produto.preco,
                            descricao: produto.descricao,
                            imagem: produto.imagem,
                          })
                        }
                      >
                        <Text style={menuStyle.txtBtnAdd}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Bottom Bar Importado */}
          <BottomBar abaAtiva="cardapio" />
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