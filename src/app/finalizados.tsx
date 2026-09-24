import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  Text,
  Pressable,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
 
import globalStyle from "@/styles/globalStyle";
import finalizadosStyle from "@/styles/finalizadosStyle";
import DivisoriaOndulada from "@/components/divisoriaOndulada";
import BottomBar from "@/components/BottomBar";
import DetalhesFinalizadoModal from "@/components/detalhesFinalizados";
 
const pedidosFinalizadosMock = [
  {
    id: "#2116",
    status: "Entregue",
    statusCor: "#D4EDDA",
    statusTextoCor: "#155724",
    total: "R$27,80",
    totalCor: "#2C5E3B",
    info: "Entregue com sucesso",
    itens: [
      {
        nome: "1x Caldo de Abóbora",
        preco: "R$ 27,80",
        detalhes: ["1x - Arroz Integral", "2x - Filé de tilápia"],
        img: require("@/assets/images/fotosfitbia/salada_atum_bowl.png"),
      },
    ],
  },
  {
    id: "#2115",
    status: "Cancelado",
    statusCor: "#F8D7DA",
    statusTextoCor: "#721C24",
    total: "R$27,80",
    totalCor: "#C0392B",
    info: "Pedido cancelado",
    itens: [
      {
        nome: "1x Caldo de Abóbora",
        preco: "R$ 27,80",
        detalhes: ["1x Caldo de Abóbora"],
        img: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
      },
    ],
  },
  {
    id: "#1999",
    status: "Entregue",
    statusCor: "#D4EDDA",
    statusTextoCor: "#155724",
    total: "R$ 45,00",
    totalCor: "#2C5E3B",
    info: "Entregue com sucesso",
    itens: [
      {
        nome: "1x Sopa de Legumes",
        preco: "R$ 45,00",
        detalhes: ["1x - Arroz Integral"],
        img: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
      },
    ],
  },
];
 
export default function PedidosFinalizadosScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);
 
  const abrirDetalhes = (pedido: any) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);
  };
 
  const fecharDetalhes = () => {
    setModalVisible(false);
    setPedidoSelecionado(null);
  };
 
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.Background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          {/* Botão Voltar */}
          <Pressable
            style={globalStyle.btnVoltar}
            onPress={() => router.back()}
          >
            <Image
              style={globalStyle.imgVoltar}
              source={require("@/assets/images/fitbia/de-volta.png")}
            />
          </Pressable>
 
          {/* Cabeçalho */}
          <View style={finalizadosStyle.conteudoHeader}>
            <Text style={finalizadosStyle.titulo}>Finalizados</Text>
            <Text style={finalizadosStyle.subtitulo}>Histórico de pedidos</Text>
          </View>
 
          {/* Abas: Em andamento / Finalizados */}
          <View style={finalizadosStyle.abasContainer}>
            <TouchableOpacity  onPress={() => router.push("/pedidoEmAndamento" as any)}>
              <Text style={finalizadosStyle.abaTexto}>Em andamento</Text>
            </TouchableOpacity>
 
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={[
                  finalizadosStyle.abaTexto,
                  finalizadosStyle.abaAtivaTexto,
                ]}
              >
                Finalizados
              </Text>
              <View style={finalizadosStyle.abaLinha} />
            </TouchableOpacity>
          </View>
 
          {/* Lista de Pedidos Finalizados */}
          <ScrollView
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={finalizadosStyle.conteudo}>
              {pedidosFinalizadosMock.map((pedido) => (
                <View key={pedido.id} style={finalizadosStyle.cardPedido}>
                  {/* Divisória Cinza do Topo */}
                  <DivisoriaOndulada posicao="topo" color="#D3D3D3" />
 
                  <View style={finalizadosStyle.cardHeader}>
                    <Text style={finalizadosStyle.pedidoId}>
                      Pedido {pedido.id}
                    </Text>
                    <View
                      style={[
                        finalizadosStyle.badgeStatus,
                        { backgroundColor: pedido.statusCor },
                      ]}
                    >
                      <Text
                        style={[
                          finalizadosStyle.badgeTexto,
                          { color: pedido.statusTextoCor },
                        ]}
                      >
                        {pedido.status}
                      </Text>
                    </View>
                  </View>
 
                  <View style={finalizadosStyle.cardCorpo}>
                    <View style={finalizadosStyle.listaItens}>
                      {pedido.itens.map((item, idx) => (
                        <View key={idx} style={finalizadosStyle.itemContainer}>
                          <View style={finalizadosStyle.itemLinha}>
                            <Image
                              source={item.img}
                              style={finalizadosStyle.itemImagem}
                            />
                            <Text style={finalizadosStyle.itemNome}>
                              {item.nome}
                            </Text>
                          </View>
                          {/* Os detalhes/subtítulos foram removidos daqui da tela principal! */}
                        </View>
                      ))}
                    </View>
 
                    {/* Botões de Ação */}
                    <View style={finalizadosStyle.botoesAcaoContainer}>
                      <TouchableOpacity
                        style={[finalizadosStyle.btnDetalhes, { flex: 1 }]}
                        onPress={() => abrirDetalhes(pedido)}
                      >
                        <Text
                          style={[
                            finalizadosStyle.btnDetalhesTexto,
                            { textAlign: "center" },
                          ]}
                        >
                          Ver detalhes
                        </Text>
                      </TouchableOpacity>
 
                      <TouchableOpacity
                        style={[
                          finalizadosStyle.btnPedirNovamente,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          // Lógica de Pedir Novamente
                        }}
                      >
                        <Text
                          style={[
                            finalizadosStyle.btnPedirNovamenteTexto,
                            { textAlign: "center" },
                          ]}
                        >
                          Pedir novamente
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
 
                  <View style={finalizadosStyle.linhaSeparadora} />
 
                  <View style={finalizadosStyle.cardFooter}>
                    <View>
                      <Text style={finalizadosStyle.totalLabel}>TOTAL</Text>
                      <Text
                        style={[
                          finalizadosStyle.totalValor,
                          { color: pedido.totalCor },
                        ]}
                      >
                        {pedido.total}
                      </Text>
                    </View>
 
                    <View>
                      <Text style={finalizadosStyle.totalLabel}>Status:</Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {pedido.info}
                      </Text>
                    </View>
                  </View>
 
                  {/* Divisória Cinza do Rodapé */}
                  <DivisoriaOndulada posicao="rodape" color="#D3D3D3" />
                </View>
              ))}
            </View>
          </ScrollView>
 
          <BottomBar />
 
          {/* Modal de Detalhes do Pedido Pressionado */}
          <DetalhesFinalizadoModal
            visible={modalVisible}
            onClose={fecharDetalhes}
            detalhesFinalizado={pedidoSelecionado}
            onPedirNovamente={() => {
              fecharDetalhes();
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}