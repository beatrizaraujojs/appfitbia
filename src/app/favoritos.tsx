import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import globalStyle from "@/styles/globalStyle";
import BottomBar from "@/components/BottomBar";
import favoritosStyle from "@/styles/favoritosStyle";

export default function FavoritosScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>({
    "1": true,
    "2": true,
    "3": true,
    "4": true,
  });

  const toggleFavorito = (idItem: string) => {
    setFavoritos((prev) => ({
      ...prev,
      [idItem]: !prev[idItem],
    }));
  };

  const categorias = [
    "Todos",
    "Marmitas",
    "Caldos",
    "Sobremesas",
    "Pacotes Fit",
  ];

  const listaFavoritos = [
    {
      id: "1",
      titulo: "Marmita Fit",
      descricao:
        "A marmita fit é uma refeição prática, saudável e saborosa, ideal para manter uma alimentação equilibrada no dia a dia.",
      imagem: require("@/assets/images/fotosfitbia/carne_desfiada_arroz_legumes.png"),
    },
    {
      id: "2",
      titulo: "Salmão com batatas",
      descricao:
        "O salmão com batatas é uma refeição nutritiva, saborosa e equilibrada, ideal para quem busca praticidade sem abrir mão de uma alimentação saudável.",
      imagem: require("@/assets/images/fotosfitbia/salmao_batatas_assadas_brocolis.png"),
    },
    {
      id: "3",
      titulo: "Fondue",
      descricao:
        "O fondue é uma opção deliciosa, cremosa e irresistível, perfeita para transformar qualquer momento em uma experiência especial e cheia de sabor.",
      imagem: require("@/assets/images/fotosfitbia/fondue.png"),
    },
    {
      id: "4",
      titulo: "Crepioca",
      descricao:
        "A crepioca é uma opção saudável, versátil e deliciosa, perfeita para qualquer hora do dia, unindo sabor e praticidade em cada mordida.",
      imagem: require("@/assets/images/fotosfitbia/crepioca.png"),
    },
  ];

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
            {/* Header com a seta de voltar alinhada */}
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
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Carrossel de Categorias */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={favoritosStyle.scrollCategorias}
              contentContainerStyle={favoritosStyle.containerCategorias}
            >
              {categorias.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategoriaAtiva(cat)}
                  style={favoritosStyle.btnCategoria}
                >
                  <Text
                    style={[
                      favoritosStyle.txtCategoria,
                      categoriaAtiva === cat &&
                        favoritosStyle.txtCategoriaAtiva,
                    ]}
                  >
                    {cat}
                  </Text>
                  {categoriaAtiva === cat && (
                    <View style={favoritosStyle.indicadorAtivo} />
                  )}
                </Pressable>
              ))}
            </ScrollView>

            {/* Lista de Favoritos */}
            <View style={favoritosStyle.main}>
              {listaFavoritos.map((item) => (
                <View key={item.id} style={favoritosStyle.cardFavorito}>
                  <View style={favoritosStyle.areaImagem}>
                    <Image
                      source={item.imagem}
                      style={favoritosStyle.imgPrato}
                      resizeMode="cover"
                    />
                    <Pressable
                      style={favoritosStyle.btnCoracao}
                      onPress={() => toggleFavorito(item.id)}
                    >
                      <Image
                        source={
                          favoritos[item.id]
                            ? require("@/assets/images/fitbia/coracaovermelho.png")
                            : require("@/assets/images/fitbia/coracao.png")
                        }
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
              ))}
            </View>
          </ScrollView>

          {/* Barra inferior */}
          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}