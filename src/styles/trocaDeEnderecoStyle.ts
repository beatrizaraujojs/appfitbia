import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const trocaDeEnderecoStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "76%",
    maxHeight: "65%", // Mantém a altura máxima fixa
    backgroundColor: cores.brancoFundo,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 4,
  },
  tituloModal: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.verdeEscuro,
  },
  btnFechar: {
    padding: 2,
  },
  txtFechar: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  scrollArea: {
    flexGrow: 0, // Impede que a lista force o modal a esticar
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 4,
  },
  cardEndereco: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  tituloCard: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.verdeEscuro,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E2E2E2",
  },
  radioOuterSelected: {
    backgroundColor: cores.verdeFolha,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  iconePin: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  infoConteudo: {
    flex: 1,
  },
  tipoEndereco: {
    fontSize: 11,
    fontWeight: "700",
    color: cores.corTexto,
    marginBottom: 1,
  },
  textoEndereco: {
    fontSize: 11,
    fontWeight: "500",
    color: cores.corTexto,
    lineHeight: 13,
  },
  textoEnderecoSecundario: {
    fontSize: 11,
    fontWeight: "400",
    color: cores.corTexto,
    lineHeight: 12,
    marginTop: 1,
  },
  btnEditar: {
    alignSelf: "flex-end",
    marginTop: 2,
  },
  txtEditar: {
    fontSize: 11,
    color: cores.verdeFolha,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  btnAddEndereco: {
    alignSelf: "flex-end",
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: cores.detalhesMarrom,
    paddingBottom: 1,
  },
  txtAddEndereco: {
    fontSize: 15,
    color: cores.detalhesMarrom,
    fontWeight: "600",
  },
});

export default trocaDeEnderecoStyle;