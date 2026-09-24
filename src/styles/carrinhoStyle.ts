import { StyleSheet } from "react-native";

const VERDE_BOTAO = "#2B402B";
const VERDE_TEXTO = "#4E7051";
const VERDE_CLARO_BG = "#EAEFEA";

const carrinhoStyle = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 24,
  },
  btnVoltar: {
    padding: 4,
  },
  iconeVoltar: {
    width: 22,
    height: 22,
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  logoHeader: {
    width: 42,
    height: 42,
  },

  /* Topo Seção Itens */
  topSecaoItens: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  txtLimpar: {
    fontSize: 14,
    color: "#888888",
    fontWeight: "500",
  },

  /* Card Item Adicionado */
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  boxImagemItem: {
    position: "relative",
  },
  imgItem: {
    width: 76,
    height: 76,
    borderRadius: 14,
  },
  badgeEditar: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#3FA56B",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  iconePequeno: {
    width: 12,
    height: 12,
    tintColor: "#FFFFFF",
  },
  infoItem: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  nomeItem: {
    fontSize: 15,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  descItem: {
    fontSize: 12,
    color: "#777777",
    marginVertical: 3,
    lineHeight: 16,
  },
  precoItem: {
    fontSize: 15,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },

  /* Controle de Quantidade */
  controleQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F4",
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 10,
  },
  btnQtd: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#3FA56B",
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtnQtd: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -2,
  },
  txtQtd: {
    fontSize: 14,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  btnLixeira: {
    padding: 2,
  },
  iconeLixeira: {
    width: 16,
    height: 16,
    tintColor: "#D9534F",
  },

  /* Link Adicionar Mais */
  btnAdicionarMais: {
    alignSelf: "center",
    marginVertical: 18,
  },
  txtAdicionarMais: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D4731",
  },

  /* Seção Peça Também */
  secaoPecaTambem: {
    marginBottom: 20,
  },
  tituloSecaoPecaTambem: {
    fontSize: 16,
    fontWeight: "700",
    color: VERDE_BOTAO,
    marginBottom: 14,
  },
  listaPecaTambem: {
    gap: 14,
  },
  cardSugestao: {
    width: 115,
  },
  imgSugestao: {
    width: 115,
    height: 115,
    borderRadius: 16,
    marginBottom: 6,
  },
  precoSugestao: {
    fontSize: 14,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  nomeSugestao: {
    fontSize: 12,
    color: "#555555",
    marginTop: 2,
  },

  /* Cupom */
  containerCupom: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingVertical: 14,
    marginBottom: 20,
  },
  iconeCupom: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  boxInputCupom: {
    flex: 1,
  },
  labelCupom: {
    fontSize: 14,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  inputCupom: {
    fontSize: 13,
    color: VERDE_TEXTO,
    fontWeight: "600",
    padding: 0,
    marginTop: 2,
  },
  btnAplicarCupom: {
    paddingLeft: 12,
  },
  txtBtnCupom: {
    fontSize: 14,
    fontWeight: "700",
    color: VERDE_TEXTO,
  },

  /* Resumo de Valores */
  secaoResumo: {
    marginBottom: 24,
  },
  tituloResumo: {
    fontSize: 16,
    fontWeight: "700",
    color: VERDE_BOTAO,
    marginBottom: 12,
  },
  linhaResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labelResumo: {
    fontSize: 14,
    color: "#999999",
  },
  valorResumo: {
    fontSize: 14,
    color: "#999999",
  },
  labelDesconto: {
    fontSize: 14,
    color: VERDE_TEXTO,
  },
  valorDesconto: {
    fontSize: 14,
    fontWeight: "700",
    color: VERDE_TEXTO,
  },
  linhaResumoSubtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  labelSubtotal: {
    fontSize: 16,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  valorSubtotal: {
    fontSize: 16,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },

  /* Barra de Checkout de Ações Rápidas */
  barCheckout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  boxPrecoCheckout: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  totalCheckout: {
    fontSize: 20,
    fontWeight: "700",
    color: VERDE_BOTAO,
  },
  qtdItensCheckout: {
    fontSize: 12,
    color: "#888888",
  },
  btnContinuar: {
    backgroundColor: VERDE_BOTAO,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 22,
  },
  txtBtnContinuar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  /* Bottom Bar */
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  navItemAtivo: {
    backgroundColor: VERDE_CLARO_BG,
  },
  navIcone: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  navTexto: {
    fontSize: 11,
    color: "#888888",
    marginTop: 2,
  },
  navTextoAtivo: {
    fontSize: 11,
    color: VERDE_TEXTO,
    fontWeight: "bold",
    marginTop: 2,
  },
});

export default carrinhoStyle;