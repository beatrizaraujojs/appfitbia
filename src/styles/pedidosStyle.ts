import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const pedidosStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  conteudoHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: cores.verdeEscuro,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 15,
    color: cores.textoClaro,
    marginBottom: 10,
  },
 
  /* Abas de Navegação Superior */
  abasContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  abaTexto: {
    fontSize: 16,
    color: "#999",
  },
  abaAtivaTexto: {
    fontWeight: "bold",
    color: cores.verdeEscuro,
  },
  abaLinha: {
    height: 3,
    backgroundColor: cores.verdeEscuro,
    marginTop: 4,
    borderRadius: 2,
  },
 
  /* Card de Pedido */
  cardPedido: {
    marginBottom: 25,
    backgroundColor: cores.brancoFundo,
    borderRadius: 16, // Arredonda as bordas do card
    overflow: "hidden", // Garante que o conteúdo interno respeite o arredondamento
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  divisoriaOndulada: {
    height: 8,
    backgroundColor: cores.verdeEscuro,
    borderRadius: 4,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginVertical: 15,
    paddingHorizontal: 12,
  },
  pedidoId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  badgeStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "600",
  },
 
  /* Itens do Pedido */
  cardCorpo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10
  },
  listaItens: {
    flex: 1,
  },
  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImagem: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 10,
  },
  itemNome: {
    fontSize: 13,
    color: "#444",
    fontWeight: "500",
  },
  btnDetalhes: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnDetalhesTexto: {
    fontSize: 12,
    color: "#555",
  },
 
  /* Linha e Rodapé */
  linhaSeparadora: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#777",
  },
  totalValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.verdeEscuro || "#2C5E3B",
  },
  previsaoContainer: {
    alignItems: "center",
  },
  previsaoLabel: {
    fontSize: 11,
    color: "#777",
  },
  previsaoTempo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
});
 
export default pedidosStyle;