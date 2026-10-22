import React, { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  Text,
  Pressable,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyle from "@/styles/globalStyle";
import pedidossStyle from "@/styles/pedidossStyle";
import DivisoriaOndulada from "@/components/divisoriaOndulada";
import BottomBar from "@/components/BottomBar";
import DetalhesPedidoModal from "@/components/detalhesPedido";
import { cores } from "@/styles/estilos";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);

  // Recarrega os pedidos da API sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      buscarPedidosUsuario();
    }, [])
  );

  async function buscarPedidosUsuario() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setPedidos([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API}/pedidos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok && json.success && Array.isArray(json.data)) {
        // Filtra apenas pedidos que estão "Em andamento" (Aguardando, Em preparo, A caminho)
        const emAndamento = json.data.filter((p: any) =>
          ["Aguardando", "Em preparo", "A caminho", "PENDENTE", "PREPARANDO", "A_CAMINHO"].includes(
            p.status_pedido || p.status
          )
        );
        setPedidos(emAndamento);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos da conta:", error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }

  const abrirDetalhes = (pedido: any) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);
  };

  const fecharDetalhes = () => {
    setModalVisible(false);
    setPedidoSelecionado(null);
  };

  // Mapeia a cor do badge de acordo com o status retornado da API
  const getStatusCor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "AGUARDANDO":
      case "PENDENTE":
        return "#a5a2a2dd";
      case "EM PREPARO":
      case "PREPARANDO":
        return "#70b380ff";
      case "A CAMINHO":
      case "A_CAMINHO":
        return cores.verdeFolha;
      default:
        return cores.verdeFolha;
    }
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

          {/* Abas */}
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

          {/* Conteúdo dos Pedidos */}
          <ScrollView
            style={globalStyle.scrollConteudo}
            showsVerticalScrollIndicator={false}
          >
            <View style={pedidossStyle.conteudo}>
              {loading ? (
                <View style={{ marginVertical: 40, alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#2B3A28" />
                  <Text style={{ marginTop: 10, color: "#666" }}>
                    Carregando seus pedidos...
                  </Text>
                </View>
              ) : pedidos.length === 0 ? (
                /* Estado Vazio */
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 50,
                    paddingHorizontal: 20,
                  }}
                >
                  <Image
                    source={require("@/assets/images/fitbia/promo-code.png")}
                    style={{ width: 60, height: 60, opacity: 0.5, marginBottom: 16 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#2D3B2D",
                      marginBottom: 6,
                    }}
                  >
                    Nenhum pedido em andamento
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#7A7A7A",
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    Você ainda não fez nenhum pedido ou seus pedidos anteriores já foram concluídos.
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#2B3A28",
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 10,
                    }}
                    onPress={() => router.push("/menu")}
                  >
                    <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                      Ver cardápio
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* Lista de Pedidos da Conta */
                pedidos.map((pedido) => {
                  const statusTexto = pedido.status_pedido || pedido.status || "Em andamento";
                  const statusCor = getStatusCor(statusTexto);
                  const totalFormatado = typeof pedido.valor_total === "number"
                    ? `R$ ${pedido.valor_total.toFixed(2).replace(".", ",")}`
                    : pedido.total || "R$ 0,00";

                  const itensLista = pedido.itens || pedido.produtos || [];

                  return (
                    <View key={pedido.id_pedido || pedido.id} style={pedidossStyle.cardPedido}>
                      <DivisoriaOndulada posicao="topo" />

                      <View style={pedidossStyle.cardHeader}>
                        <Text style={pedidossStyle.pedidoId}>
                          Pedido #{pedido.id_pedido || pedido.id}
                        </Text>
                        <View
                          style={[
                            pedidossStyle.badgeStatus,
                            { backgroundColor: statusCor },
                          ]}
                        >
                          <Text
                            style={[
                              pedidossStyle.badgeTexto,
                              { color: "#FFF" },
                            ]}
                          >
                            {statusTexto}
                          </Text>
                        </View>
                      </View>

                      <View style={pedidossStyle.cardCorpo}>
                        <View style={pedidossStyle.listaItens}>
                          {itensLista.map((item: any, idx: number) => {
                            const nomeItem = item.nome_produto || item.nome || "Produto";
                            const qtd = item.quantidade || item.qtd || 1;
                            const foto = item.foto_produto
                              ? { uri: `${SERVIDOR}/fitbia/images/produto/${item.foto_produto}` }
                              : require("@/assets/images/fotosfitbia/caldo_abobora_frango_desfiado.png");

                            return (
                              <View key={idx} style={pedidossStyle.itemLinha}>
                                <Image
                                  source={foto}
                                  style={pedidossStyle.itemImagem}
                                />
                                <Text style={pedidossStyle.itemNome}>
                                  {qtd}x {nomeItem}
                                </Text>
                              </View>
                            );
                          })}
                        </View>

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
                            {totalFormatado}
                          </Text>
                        </View>

                        <View style={pedidossStyle.previsaoContainer}>
                          <Text style={pedidossStyle.previsaoLabel}>Previsão</Text>
                          <Text style={pedidossStyle.previsaoTempo}>
                            {pedido.previsao_tempo || "30 - 45 min"}
                          </Text>
                        </View>
                      </View>

                      <DivisoriaOndulada posicao="rodape" />
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>

          <BottomBar abaAtiva="pedidoEmAndamento" />

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