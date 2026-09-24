import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

const entregaStyle = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  } as ViewStyle,
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    marginBottom: 20,
  } as ViewStyle,
  btnVoltar: {
    padding: 4,
  } as ViewStyle,
  iconeVoltar: {
    width: 22,
    height: 22,
  } as ImageStyle,
  tituloHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E2A1B",
  } as TextStyle,
  logoHeader: {
    width: 32,
    height: 32,
  } as ImageStyle,
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E2A1B",
    marginBottom: 16,
  } as TextStyle,
  boxMapa: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  } as ViewStyle,
  mapaImage: {
    width: "100%",
    height: "100%",
  } as ImageStyle,
  cardEndereco: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    marginBottom: 24,
  } as ViewStyle,
  infoEndereco: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  } as ViewStyle,
  iconePin: {
    width: 28,
    height: 28,
  } as ImageStyle,
  ruaTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E2A1B",
  } as TextStyle,
  bairroTexto: {
    fontSize: 13,
    color: "#888888",
    marginTop: 2,
  } as TextStyle,
  txtTrocar: {
    fontSize: 14,
    color: "#8C6A48",
    textDecorationLine: "underline",
    fontWeight: "500",
  } as TextStyle,
  opcoesContainer: {
    gap: 14,
    marginBottom: 32,
  } as ViewStyle,
  cardOpcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  } as ViewStyle,
  cardOpcaoSelecionado: {
    backgroundColor: "#FAF9F6",
    // Sombra suave para o card selecionado
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  } as ViewStyle,
  txtOpcao: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333333",
  } as TextStyle,
  valorEntrega: {
    fontSize: 12,
    color: "#4E8D66",
    fontWeight: "bold",
    marginRight: 10,
  } as TextStyle,
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  radioOuterSelecionado: {
    backgroundColor: "#4E8D66",
  } as ViewStyle,
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  } as ViewStyle,
  barCheckout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  } as ViewStyle,
  boxPrecoCheckout: {
    flexDirection: "row",
    alignItems: "baseline",
  } as ViewStyle,
  totalCheckout: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E2A1B",
  } as TextStyle,
  qtdItensCheckout: {
    fontSize: 12,
    color: "#777777",
    marginLeft: 4,
  } as TextStyle,
  btnContinuar: {
    backgroundColor: "#2E3E2B",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  } as ViewStyle,
  txtBtnContinuar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  } as TextStyle,
});

export default entregaStyle;