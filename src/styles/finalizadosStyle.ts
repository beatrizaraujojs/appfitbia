import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const finalizadosStyle = StyleSheet.create({
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
    marginBottom: 25,
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
 
  /* Card de Pedido com Sombra e Arredondamento */
  cardPedido: {
    marginBottom: 25,
    backgroundColor: cores.brancoFundo || "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 15,
    paddingHorizontal: 16,
  },
  pedidoId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  badgeStatus: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "600",
  },
 
  /* Itens do Pedido */
  cardCorpo: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  listaItens: {
    flex: 1,
    marginBottom: 15,
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
  },
  itemDetalheTexto: {
    fontSize: 12,
    color: "#777",
    marginLeft: 42,
    marginTop: 2,
  },
 
  /* Linha e Rodapé */
  linhaSeparadora: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#777",
  },
  totalValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.verdeEscuro || "#2C5E3B",
  },
  botoesAcaoContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  btnDetalhes: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnDetalhesTexto: {
    fontSize: 11,
    color: "#555",
    fontWeight: "500",
  },
  btnPedirNovamente: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnPedirNovamenteTexto: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "500",
  },
});
 
export default finalizadosStyle;
 
 