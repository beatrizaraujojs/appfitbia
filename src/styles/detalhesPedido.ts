import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { cores } from "./estilos";
 
export interface DetalhesPedidoModalProps {
  visible: boolean;
  onClose: () => void;
  pedido: any | null;
}
 
const detalhesPedidoStyle = StyleSheet.create({
  // Fundo escuro fixo que preenche a tela inteira sem animação de subida
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
 
  backdrop: {
    flex: 1,
  },
 
  conteudo: {
    backgroundColor: cores.brancoFundo,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: "90%",
  },
 
  dragHandle: {
    width: 60,
    height: 4,
    backgroundColor: "#A0A0A0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
 
  // Cabeçalho
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
    height: 40,
  },
 
  btnVoltarModal: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    padding: 4,
  },
 
  imgVoltarHeader: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
 
  tituloHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: cores.verdeEscuro,
    textAlign: "center",
  },
 
  // Card do Pedido (Topo)
  cardTopoPedido: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E9E5",
    marginBottom: 20,
  },
 
  cardTopoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
 
  pedidoIdTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
 
  pedidoDataTexto: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },
 
  badgeStatusModal: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
 
  badgeStatusTexto: {
    fontSize: 12,
    fontWeight: "bold",
  },
 
  // Divisória interna
  divisoria: {
    height: 1,
    backgroundColor: "#E5E9E5",
    marginVertical: 12,
  },
 
  // Itens
  itemLinhaModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
 
  itemInfoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
 
  itemImgModal: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
 
  itemNomeModal: {
    fontSize: 14,
    color: "#333333",
    flex: 1,
  },
 
  itemPrecoModal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
 
  subtituloDetalhes: {
    fontSize: 12,
    color: "#777",
    marginLeft: 50, // Alinha com o texto do nome considerando a largura da imagem
    marginTop: 2,
  },
 
  // Seções gerais
  secaoContainer: {
    marginBottom: 20,
  },
 
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginBottom: 10,
  },
 
  // Resumo de valores
  resumoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
 
  resumoLabel: {
    fontSize: 14,
    color: "#666666",
  },
 
  resumoValor: {
    fontSize: 14,
    color: "#333333",
  },
 
  resumoTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
 
  resumoTotalValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
 
  // Blocos de Informação (Pagamento e Endereço)
  infoBloco: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
 
  icone: {
    width: 30,
    height: 30,
    marginRight: 8,
    alignSelf: "flex-start",
    resizeMode: "contain",
  },
 
  infoTexto: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
 
  infoSubtexto: {
    fontSize: 12,
    color: "#888888",
  },
});
 
export default detalhesPedidoStyle;
 