import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const novoEnderecoStyle = StyleSheet.create({
  espacoTopoCinza: {
    height: 80,
    backgroundColor: "rgba(110, 110, 110, 0.55)", // Fundo cinza somente no topo
  },
  containerForm: {
    flex: 1,
    backgroundColor: cores.brancoFundo, // Fundo branco até a base da tela
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  tracinhoHeader: {
    width: 80,
    height: 4,
    backgroundColor: "#E2D9CB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  btnVoltar: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  txtSetaVoltar: {
    fontSize: 24,
    fontWeight: "600",
    color: cores.verdeEscuro,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: cores.verdeEscuro,
    marginBottom: 28,
  },
  form: {
    gap: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
    paddingVertical: 8,
    fontSize: 13,
    color: cores.corTexto,
     ...({ outlineStyle: "none" } as any)

  },
  linhaDupla: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputMetade: {
    width: "46%",
     ...({ outlineStyle: "none" } as any)

  },

  // Adicione / atualize estas propriedades no seu StyleSheet:
inputContainerCep: {
  position: "relative",
  justifyContent: "center",
},
loadingIndicator: {
  position: "absolute",
  right: 8,
  bottom: 8,
},
  btnSalvar: {
    backgroundColor: cores.detalhesMarrom,
    borderRadius: 22,
    height: 48,
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  txtSalvar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    
  },
});

export default novoEnderecoStyle;