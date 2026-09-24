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
import pedidossStyle from "@/styles/pedidossStyle";
import DivisoriaOndulada from "@/components/divisoriaOndulada";
import BottomBar from "@/components/BottomBar";
import DetalhesPedidoModal from "@/components/detalhesPedido";
import { cores } from "@/styles/estilos";
 
const pedidosEmAndamentoMock = [
  {
    id: "#2216",
    status: "Aguardando",
    statusCor: "#a5a2a2dd",
    statusTextoCor: "#FFF",
    total: "R$ 27,80",
    info: "45 - 60 min",
    infoLabel: "Previsão",
    itens: [
      {
        nome: "1x Caldo de Abóbora",
        preco: "R$ 27,80",
        detalhes: ["1x - Arroz Integral"], // Detalhes apenas no modal
        img: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
      },
    ],
  },
  {
    id: "#2100",
    status: "Em preparo",
    statusCor: "#70b380ff",
    statusTextoCor: "#FFF",
    total: "R$ 63,00",
    info: "30 - 40 min",
    infoLabel: "Previsão",
    itens: [
      {
        nome: "1x Caldo de Abóbora",
        preco: "R$ 28,00",
        detalhes: ["1x - Arroz Integral", "2x - Filé de tilápia"],
        img: require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png"),
      },
      {
        nome: "1x Caldo Verde",
        preco: "R$ 35,00",
        detalhes: ["1x - Batata Doce"],
        img: require("@/assets/images/fotosfitbia/caldo_verde_carne_moida.png"),
      },
    ],
  },
  {
    id: "#2081",
    status: "A caminho",
    statusCor: cores.verdeFolha,
    statusTextoCor: "#FFF",
    total: "R$ 91,50",
    info: "20 - 35 min",
    infoLabel: "Previsão",
    itens: [
      {
        nome: "1x Salmão com batatas",
        preco: "R$ 45,00",
        detalhes: ["1x - Molho Especial"],
        img: require("@/assets/images/fotosfitbia/salmao_batatas_assadas_brocolis.png"),
      },
      {
        nome: "1x Salada de Atum",
        preco: "R$ 31,50",
        detalhes: ["Sem cebola"],
        img: require("@/assets/images/fotosfitbia/salada_atum_bowl.png"),
      },
      {
        nome: "1x Suco Verde",
        preco: "R$ 15,00",
        detalhes: ["Sem açúcar"],
        img: require("@/assets/images/fotosfitbia/suco_verde_300ml.png"),
      },
    ],
  },
];
 
export default function PedidosScreen() {
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
          <View style={pedidossStyle.conteudoHeader}>
            <Text style={pedidossStyle.titulo}>Pedidos</Text>
            <Text style={pedidossStyle.subtitulo}>Acompanhe o seu pedido</Text>
          </View>
 
          {/* Abas: Em andamento (Ativa) / Finalizados (Navega para a rota) */}
          <View style={pedidossStyle.abasContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[pedidossStyle.abaTexto, pedidossStyle.abaAtivaTexto]}>
                Em andamento
              </Text>
              <View style={pedidossStyle.abaLinha} />
            </TouchableOpacity>
 
            <TouchableOpacity
              onPress={() => router.push("/finalizados" as any)}
            >
              <Text style={pedidossStyle.abaTexto}>Finalizados</Text>
            </TouchableOpacity>
          </View>
 
          {/* Lista de Pedidos Em Andamento */}
          <ScrollView
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={pedidossStyle.conteudo}>
              {pedidosEmAndamentoMock.map((pedido) => (
                <View key={pedido.id} style={pedidossStyle.cardPedido}>
                  {/* Divisória Ondulada do Topo (Verde padrão) */}
                  <DivisoriaOndulada posicao="topo" />
 
                  <View style={pedidossStyle.cardHeader}>
                    <Text style={pedidossStyle.pedidoId}>
                      Pedido {pedido.id}
                    </Text>
                    <View
                      style={[
                        pedidossStyle.badgeStatus,
                        { backgroundColor: pedido.statusCor },
                      ]}
                    >
                      <Text
                        style={[
                          pedidossStyle.badgeTexto,
                          { color: pedido.statusTextoCor },
                        ]}
                      >
                        {pedido.status}
                      </Text>
                    </View>
                  </View>
 
                  <View style={pedidossStyle.cardCorpo}>
                    <View style={pedidossStyle.listaItens}>
                      {pedido.itens.map((item, idx) => (
                        <View key={idx} style={pedidossStyle.itemLinha}>
                          <Image
                            source={item.img}
                            style={pedidossStyle.itemImagem}
                          />
                          <Text style={pedidossStyle.itemNome}>{item.nome}</Text>
                        </View>
                      ))}
                    </View>
 
                    {/* Botão Ver Detalhes */}
                    <TouchableOpacity
                      style={pedidossStyle.btnDetalhes}
                      onPress={() => abrirDetalhes(pedido)}
                    >
                      <Text style={pedidossStyle.btnDetalhesTexto}>
                        Ver detalhes
                      </Text>
                    </TouchableOpacity>
                  </View>
 
                  <View style={pedidossStyle.linhaSeparadora} />
 
                  <View style={pedidossStyle.cardFooter}>
                    <View>
                      <Text style={pedidossStyle.totalLabel}>TOTAL</Text>
                      <Text style={pedidossStyle.totalValor}>
                        {pedido.total}
                      </Text>
                    </View>
 
                    <View style={pedidossStyle.previsaoContainer}>
                      <Text style={pedidossStyle.previsaoLabel}>
                        {pedido.infoLabel}
                      </Text>
                      <Text style={pedidossStyle.previsaoTempo}>
                        {pedido.info}
                      </Text>
                    </View>
                  </View>
 
                  {/* Divisória Ondulada do Rodapé (Verde padrão) */}
                  <DivisoriaOndulada posicao="rodape" />
                </View>
              ))}
            </View>
          </ScrollView>
 
          <BottomBar />
 
          {/* Modal de Detalhes do Pedido Ativo */}
          <DetalhesPedidoModal
            visible={modalVisible}
            onClose={fecharDetalhes}
            pedido={pedidoSelecionado}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}