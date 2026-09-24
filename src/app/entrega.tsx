import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyle";
import entregaStyle from "@/styles/entregaStyle";
import BottomBar from "@/components/BottomBar";
import TrocaDeEnderecoModal from "@/components/trocaDeEndereco";

export default function EntregaScreen() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<"entrega" | "retirada">("entrega");
  const [modalEnderecoVisivel, setModalEnderecoVisivel] = useState(false);

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
            <View style={entregaStyle.conteudo}>
              {/* Header */}
              <View style={entregaStyle.header}>
                <Pressable
                  onPress={() => router.back()}
                  style={entregaStyle.btnVoltar}
                  hitSlop={10}
                >
                  <Image
                    source={require("@/assets/images/fitbia/de-volta.png")}
                    style={entregaStyle.iconeVoltar}
                    resizeMode="contain"
                  />
                </Pressable>

                <Text style={entregaStyle.tituloHeader}>Endereço</Text>

                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={entregaStyle.logoHeader}
                  resizeMode="contain"
                />
              </View>

              {/* Seção Entrega ou Retirada */}
              <Text style={entregaStyle.tituloSecao}>Entrega ou retirada</Text>

              {/* Mapa */}
              <View style={entregaStyle.boxMapa}>
                <Image
                  source={require("@/assets/images/fitbia/mapa-exemplo.png")}
                  style={entregaStyle.mapaImage}
                  resizeMode="cover"
                />
              </View>

              {/* Endereço Atual */}
              <View style={entregaStyle.cardEndereco}>
                <View style={entregaStyle.infoEndereco}>
                  <Image
                    source={require("@/assets/images/fitbia/endereco.png")}
                    style={entregaStyle.iconePin}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={entregaStyle.ruaTexto}>
                      Rua Pedro de Medeiros, 13a
                    </Text>
                    <Text style={entregaStyle.bairroTexto}>
                      Jardim Vila Carrão
                    </Text>
                  </View>
                </View>

                {/* Botão para abrir o Modal */}
                <Pressable onPress={() => setModalEnderecoVisivel(true)}>
                  <Text style={entregaStyle.txtTrocar}>Trocar</Text>
                </Pressable>
              </View>

              {/* Opções de Entrega */}
              <Text style={entregaStyle.tituloSecao}>Opções de entrega</Text>

              <View style={entregaStyle.opcoesContainer}>
                {/* Opção 1: Entregar no endereço */}
                <Pressable
                  style={[
                    entregaStyle.cardOpcao,
                    opcaoSelecionada === "entrega" &&
                      entregaStyle.cardOpcaoSelecionado,
                  ]}
                  onPress={() => setOpcaoSelecionada("entrega")}
                >
                  <Text style={entregaStyle.txtOpcao}>Entregar no endereço</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={entregaStyle.valorEntrega}>R$ 10,00</Text>
                    <View
                      style={[
                        entregaStyle.radioOuter,
                        opcaoSelecionada === "entrega" &&
                          entregaStyle.radioOuterSelecionado,
                      ]}
                    >
                      {opcaoSelecionada === "entrega" && (
                        <View style={entregaStyle.radioInner} />
                      )}
                    </View>
                  </View>
                </Pressable>

                {/* Opção 2: Retirada na loja */}
                <Pressable
                  style={[
                    entregaStyle.cardOpcao,
                    opcaoSelecionada === "retirada" &&
                      entregaStyle.cardOpcaoSelecionado,
                  ]}
                  onPress={() => setOpcaoSelecionada("retirada")}
                >
                  <Text style={entregaStyle.txtOpcao}>Retirada na loja</Text>
                  <View
                    style={[
                      entregaStyle.radioOuter,
                      opcaoSelecionada === "retirada" &&
                        entregaStyle.radioOuterSelecionado,
                    ]}
                  >
                    {opcaoSelecionada === "retirada" && (
                      <View style={entregaStyle.radioInner} />
                    )}
                  </View>
                </Pressable>
              </View>

              {/* Barra de Rodapé com valor e Continuar */}
              <View style={entregaStyle.barCheckout}>
                <View style={entregaStyle.boxPrecoCheckout}>
                  <Text style={entregaStyle.totalCheckout}>R$ 34,90</Text>
                  <Text style={entregaStyle.qtdItensCheckout}> / 4 itens</Text>
                </View>
                <Pressable
                  style={entregaStyle.btnContinuar}
                  onPress={() => router.push("/pagamento")}
                >
                  <Text style={entregaStyle.txtBtnContinuar}>Continuar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* Modal de Troca de Endereço */}
          <TrocaDeEnderecoModal
            visible={modalEnderecoVisivel}
            onClose={() => setModalEnderecoVisivel(false)}
          />

          <BottomBar abaAtiva="carrinho" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}