import { cores } from "@/styles/estilos";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import detalhesPedidoStyle, {
  DetalhesPedidoModalProps,
} from "../styles/detalhesPedido";
 
export default function DetalhesPedidoModal({
  visible,
  onClose,
  pedido,
}: DetalhesPedidoModalProps) {
  if (!pedido) return null;
 
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={detalhesPedidoStyle.overlay}>
        <Pressable style={detalhesPedidoStyle.backdrop} onPress={onClose} />
 
        <View style={detalhesPedidoStyle.conteudo}>
          <View style={detalhesPedidoStyle.dragHandle} />
 
          <View style={detalhesPedidoStyle.headerTop}>
            <Pressable
              onPress={onClose}
              style={detalhesPedidoStyle.btnVoltarModal}
            >
              <Image
                source={require("@/assets/images/fitbia/de-volta.png")}
                style={detalhesPedidoStyle.imgVoltarHeader}
              />
            </Pressable>
            <Text style={detalhesPedidoStyle.tituloHeader}>
              Detalhes do Pedido
            </Text>
          </View>
 
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Card Superior do Pedido */}
            <View style={detalhesPedidoStyle.cardTopoPedido}>
              <View style={detalhesPedidoStyle.cardTopoLinha}>
                <View>
                  <Text style={detalhesPedidoStyle.pedidoIdTexto}>
                    Pedido {pedido.id}
                  </Text>
                  <Text style={detalhesPedidoStyle.pedidoDataTexto}>
                    30/07/2026 às 11:01
                  </Text>
                </View>
                <View
                  style={[
                    detalhesPedidoStyle.badgeStatusModal,
                    { backgroundColor: pedido.statusCor || "#4E654C" },
                  ]}
                >
                  <Text
                    style={[
                      detalhesPedidoStyle.badgeStatusTexto,
                      { color: pedido.statusTextoCor || "#FFF" },
                    ]}
                  >
                    {pedido.status}
                  </Text>
                </View>
              </View>
 
              <View style={detalhesPedidoStyle.divisoria} />
 
              {/* Lista de Itens do Pedido com Subtítulos/Detalhes */}
              {pedido.itens?.map((item: any, index: number) => (
                <View key={index} style={{ marginBottom: 12 }}>
                  <View style={detalhesPedidoStyle.itemLinhaModal}>
                    <View style={detalhesPedidoStyle.itemInfoEsquerda}>
                      {item.img && (
                        <Image
                          source={item.img}
                          style={detalhesPedidoStyle.itemImgModal}
                        />
                      )}
                      <Text style={detalhesPedidoStyle.itemNomeModal}>
                        {item.nome}
                      </Text>
                    </View>
                    <Text style={detalhesPedidoStyle.itemPrecoModal}>
                      {item.preco || "R$ 28,00"}
                    </Text>
                  </View>
 
                  {/* Subtítulos / Detalhes exibidos apenas no modal */}
                  {item.detalhes?.map((det: string, dIdx: number) => (
                    <Text
                      key={dIdx}
                      style={detalhesPedidoStyle.subtituloDetalhes}
                    >
                      {det}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
 
            {/* Seção: Resumo de valores */}
            <View style={detalhesPedidoStyle.secaoContainer}>
              <Text style={detalhesPedidoStyle.secaoTitulo}>
                Resumo de valores
              </Text>
 
              <View style={detalhesPedidoStyle.resumoLinha}>
                <Text style={detalhesPedidoStyle.resumoLabel}>Subtotal</Text>
                <Text style={detalhesPedidoStyle.resumoValor}>R$ 63,00</Text>
              </View>
 
              <View style={detalhesPedidoStyle.resumoLinha}>
                <Text style={detalhesPedidoStyle.resumoLabel}>Cupom</Text>
                <Text
                  style={[
                    detalhesPedidoStyle.resumoValor,
                    { color: cores.verdeFolha },
                  ]}
                >
                  - R$ 7,00
                </Text>
              </View>
 
              <View style={detalhesPedidoStyle.resumoLinha}>
                <Text style={detalhesPedidoStyle.resumoLabel}>
                  Taxa de entrega
                </Text>
                <Text style={detalhesPedidoStyle.resumoValor}>R$ 10,00</Text>
              </View>
 
              <View style={detalhesPedidoStyle.divisoria} />
 
              <View style={detalhesPedidoStyle.resumoLinha}>
                <Text style={detalhesPedidoStyle.resumoTotalLabel}>Total</Text>
                <Text style={detalhesPedidoStyle.resumoTotalValor}>
                  {pedido.total}
                </Text>
              </View>
            </View>
 
            {/* Seção: Forma de pagamento */}
            <View style={detalhesPedidoStyle.secaoContainer}>
              <Text style={detalhesPedidoStyle.secaoTitulo}>
                Forma de pagamento
              </Text>
              <View style={detalhesPedidoStyle.infoBloco}>
                <Image
                  source={require("@/assets/images/fitbia/cpf.png")}
                  style={detalhesPedidoStyle.icone}
                />
                <Text style={detalhesPedidoStyle.infoTexto}>Pix</Text>
              </View>
            </View>
 
            {/* Seção: Endereço de entrega */}
            <View style={detalhesPedidoStyle.secaoContainer}>
              <Text style={detalhesPedidoStyle.secaoTitulo}>
                Endereço de entrega
              </Text>
              <View style={detalhesPedidoStyle.infoBloco}>
                <Image
                  source={require("@/assets/images/fitbia/endereco.png")}
                  style={detalhesPedidoStyle.icone}
                />
                <View>
                  <Text style={detalhesPedidoStyle.infoTexto}>
                    Av. Paes de Barros, 663
                  </Text>
                  <Text style={detalhesPedidoStyle.infoSubtexto}>
                    Mooca, São Paulo
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
 