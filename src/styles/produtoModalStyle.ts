import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

export interface Produto {
  nome: string;
  preco: number;
  descricao: string;
  imagem: any;
}

export interface ProdutoModalProps {
  visible: boolean;
  onClose: () => void;
  produto: Produto | null;
}

const produtoModalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  } as ViewStyle,
  backdrop: {
    flex: 1,
  } as ViewStyle,
  sheetContainer: {
    backgroundColor: "#F9F9F7",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    maxHeight: "85%",
  } as ViewStyle,
  dragHandle: {
    width: 60,
    height: 3,
    backgroundColor: "#555555",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  } as ViewStyle,
  imagemProduto: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  } as ImageStyle,
  nomeProduto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3E2B",
  } as TextStyle,
  linhaQtdPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  } as ViewStyle,
  controleQtd: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  } as ViewStyle,
  btnMenos: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#4E8D66",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  txtBtnMenos: {
    color: "#4E8D66",
    fontSize: 18,
    fontWeight: "bold",
  } as TextStyle,
  btnMais: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4E8D66",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  txtBtnMais: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  } as TextStyle,
  txtQtd: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
  } as TextStyle,
  precoBase: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3E2B",
  } as TextStyle,
  descricao: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
    marginBottom: 20,
  } as TextStyle,
  tituloAdicionais: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginBottom: 12,
  } as TextStyle,
  itemAdicional: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  } as ViewStyle,
  checkboxArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  } as ViewStyle,
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#A0A0A0",
  } as ViewStyle,
  checkboxChecado: {
    backgroundColor: "#4E8D66",
    borderColor: "#4E8D66",
  } as ViewStyle,
  nomeAdicional: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E3E2B",
  } as TextStyle,
  precoAdicional: {
    fontSize: 11,
    color: "#888888",
  } as TextStyle,
  controleQtdPequeno: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  } as ViewStyle,
  btnMenosPequeno: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#4E8D66",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  txtBtnMenosPequeno: {
    color: "#4E8D66",
    fontSize: 14,
    fontWeight: "bold",
  } as TextStyle,
  btnMaisPequeno: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4E8D66",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  txtBtnMaisPequeno: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  } as TextStyle,
  txtQtdPequeno: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E3E2B",
  } as TextStyle,
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
  } as ViewStyle,
  valorTotal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E3E2B",
  } as TextStyle,
  btnAdicionar: {
    backgroundColor: "#2E3E2B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  } as ViewStyle,
  txtBtnAdicionar: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  } as TextStyle,


  inputObservacoes: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E0E0E0",
  borderRadius: 12,
  padding: 12,
  fontSize: 14,
  color: "#333333",
  minHeight: 80,
  marginBottom: 16,
},

});

export default produtoModalStyle;