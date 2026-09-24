import { cores } from "@/styles/estilos";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import detalhesFinalizadoStyle, {
  DetalhesFinalizadoModalProps,
} from "../styles/detalhesFinalizado";
 
export default function DetalhesFinalizadoModal({
  visible,
  onClose,
  detalhesFinalizado,
  onPedirNovamente,
}: DetalhesFinalizadoModalProps & { onPedirNovamente?: () => void }) {
  if (!detalhesFinalizado) return null;
 
  // Verifica se o pedido está cancelado para aplicar estilos dinâmicos
  const isCancelado = detalhesFinalizado.status === "Cancelado";
 
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Fundo escuro fixo */}
      <View style={detalhesFinalizadoStyle.fundoDetalhe}>
        {/* Clique fora para fechar */}
        <Pressable style={detalhesFinalizadoStyle.fechar} onPress={onClose} />
 
        {/* Conteúdo que se comporta como gaveta inferior */}
        <View style={detalhesFinalizadoStyle.conteudo}>
          {/* Tracinho indicador de arraste */}
          <View style={detalhesFinalizadoStyle.abaDetalhe} />
 
          <View style={detalhesFinalizadoStyle.headerDetalhe}>
            <Pressable
              onPress={onClose}
              style={detalhesFinalizadoStyle.btnVoltarModal}
            >
              <Image
                source={require("@/assets/images/fitbia/de-volta.png")}
                style={detalhesFinalizadoStyle.imgVoltarHeader}
              />
            </Pressable>
            <Text style={detalhesFinalizadoStyle.tituloHeader}>
              Detalhes do Pedido
            </Text>
          </View>
 
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Card Superior do Pedido */}
            <View style={detalhesFinalizadoStyle.cardTopoPedido}>
              <View style={detalhesFinalizadoStyle.cardTopoLinha}>
                <View>
                  <Text style={detalhesFinalizadoStyle.pedidoIdTexto}>
                    Pedido {detalhesFinalizado.id}
                  </Text>
                  <Text style={detalhesFinalizadoStyle.pedidoDataTexto}>
                    {isCancelado
                      ? "Pedido Cancelado"
                      : "Entregue em 30/07/2026 às 11:45"}
                  </Text>
                </View>
                <View
                  style={[
                    detalhesFinalizadoStyle.badgeStatusModal,
                    {
                      backgroundColor: isCancelado ? "#F8D7DA" : "#E6F4EA",
                    },
                  ]}
                >
                  <Text
                    style={[
                      detalhesFinalizadoStyle.badgeStatusTexto,
                      {
                        color: isCancelado ? "#721C24" : "#137333",
                      },
                    ]}
                  >
                    {detalhesFinalizado.status}
                  </Text>
                </View>
              </View>
 
              <View style={detalhesFinalizadoStyle.divisoria} />
 
              {/* Lista de Itens do Pedido */}
              {detalhesFinalizado.itens?.map((item: any, index: number) => (
                <View key={index} style={{ marginBottom: 12 }}>
                  <View style={detalhesFinalizadoStyle.itemLinhaModal}>
                    <View style={detalhesFinalizadoStyle.itemInfoEsquerda}>
                      {item.img && (
                        <Image
                          source={item.img}
                          style={detalhesFinalizadoStyle.itemImgModal}
                        />
                      )}
                      <Text style={detalhesFinalizadoStyle.itemNomeModal}>
                        {item.nome}
                      </Text>
                    </View>
                    <Text style={detalhesFinalizadoStyle.itemPrecoModal}>
                      {item.preco || "R$ 28,00"}
                    </Text>
                  </View>
 
                  {/* Subtítulos / Detalhes do item listados abaixo */}
                  {item.detalhes?.map((det: string, dIdx: number) => (
                    <Text
                      key={dIdx}
                      style={detalhesFinalizadoStyle.subtituloDetalhes}
                     
                    >
                      {det}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
 
            {/* Seção: Resumo de valores */}
            <View style={detalhesFinalizadoStyle.secaoContainer}>
              <Text style={detalhesFinalizadoStyle.secaoTitulo}>
                Resumo de valores
              </Text>
 
              <View style={detalhesFinalizadoStyle.resumoLinha}>
                <Text style={detalhesFinalizadoStyle.resumoLabel}>
                  Subtotal
                </Text>
                <Text style={detalhesFinalizadoStyle.resumoValor}>
                  R$ 63,00
                </Text>
              </View>
 
              <View style={detalhesFinalizadoStyle.resumoLinha}>
                <Text style={detalhesFinalizadoStyle.resumoLabel}>Cupom</Text>
                <Text
                  style={[
                    detalhesFinalizadoStyle.resumoValor,
                    { color: cores.verdeFolha },
                  ]}
                >
                  - R$ 7,00
                </Text>
              </View>
 
              <View style={detalhesFinalizadoStyle.resumoLinha}>
                <Text style={detalhesFinalizadoStyle.resumoLabel}>
                  Taxa de entrega
                </Text>
                <Text style={detalhesFinalizadoStyle.resumoValor}>
                  R$ 10,00
                </Text>
              </View>
 
              <View style={detalhesFinalizadoStyle.divisoria} />
 
              <View style={detalhesFinalizadoStyle.resumoLinha}>
                <Text style={detalhesFinalizadoStyle.resumoTotalLabel}>
                  Total Pago
                </Text>
                <Text
                  style={[
                    detalhesFinalizadoStyle.resumoTotalValor,
                    isCancelado && { color: "#D9534F" },
                  ]}
                >
                  {detalhesFinalizado.total}
                </Text>
              </View>
            </View>
 
            {/* Seção: Forma de pagamento */}
            <View style={detalhesFinalizadoStyle.secaoContainer}>
              <Text style={detalhesFinalizadoStyle.secaoTitulo}>
                Forma de pagamento
              </Text>
              <View style={detalhesFinalizadoStyle.infoBloco}>
                <Image
                  source={require("@/assets/images/fitbia/cpf.png")}
                  style={detalhesFinalizadoStyle.icone}
                />
                <Text style={detalhesFinalizadoStyle.infoTexto}>Pix</Text>
              </View>
            </View>
 
            {/* Seção: Endereço de entrega */}
            <View style={detalhesFinalizadoStyle.secaoEnderecoContainer}>
              <Text style={detalhesFinalizadoStyle.secaoTitulo}>
                Endereço de entrega
              </Text>
              <View style={detalhesFinalizadoStyle.infoBloco}>
                <Image
                  source={require("@/assets/images/fitbia/endereco.png")}
                  style={detalhesFinalizadoStyle.icone}
                />
                <View>
                  <Text style={detalhesFinalizadoStyle.infoTexto}>
                    Av. Paes de Barros, 663
                  </Text>
                  <Text style={detalhesFinalizadoStyle.infoSubtexto}>
                    Mooca, São Paulo
                  </Text>
                </View>
              </View>
            </View>
 
            {/* Botão de Ação */}
            {onPedirNovamente && (
              <Pressable
                style={detalhesFinalizadoStyle.botaoAcaoFinal}
                pressable-style={onPedirNovamente}
                onPress={onPedirNovamente}
              >
                <Text style={detalhesFinalizadoStyle.botaoAcaoTexto}>
                  Pedir novamente
                </Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}