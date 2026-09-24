import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const editarSenhaStyle = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 60,
    marginBottom: 50,
  },
  btnVoltar: {
    paddingVertical: 4,
  },
  iconeVoltar: {
    width: 24,
    height: 24,
    tintColor: cores.verdeEscuro,
  },
  headerDireita: {
    alignItems: "flex-end",
  },
  tituloHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 2,
  },
  logoHeader: {
    width: 90,
    height: 35,
  },

  /* Tag Verde Topo 'Alterar Senha' */
  tagTopo: {
    backgroundColor: "#E4EDE4", // tom suave de verde
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  txtTagTopo: {
    fontSize: 14,
    color: cores.verdeEscuro,
    fontWeight: "700",
  },

  /* Cards de Input com Sombra idêntica ao Figma */
  cardInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.brancoFundo,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
    overflow: "visible",
    ...({ outlineStyle: "none" } as any),
  },
  fieldIcone: {
    width: 22,
    height: 22,
    tintColor: cores.detalhesMarrom,
    marginRight: 14,
  },
  infoBox: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 1,
  },
  input: {
    fontSize: 13,
    color: cores.textoClaro,
    padding: 0,
    margin: 0,
    ...({ outlineStyle: "none" } as any),
  },

  /* Ícone do Olho */
  btnOlho: {
    padding: 4,
    marginRight: 8,
  },
  iconeOlho: {
    width: 20,
    height: 20,
    tintColor: cores.detalhesMarrom,
  },

  /* Badge de Editar */
  btnEditarBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: cores.detalhesMarrom,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: cores.brancoFundo,
  },
  iconeEditar: {
    width: 11,
    height: 11,
    tintColor: "#FFFFFF",
  },

  /* Link Esqueci minha senha */
  btnEsqueciSenha: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 16,
  },
  txtEsqueciSenha: {
    fontSize: 12,
    color: cores.detalhesMarrom,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  /* Requisitos da Senha */
  instrucoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  txtInstrucao: {
    fontSize: 11,
    color: "#777777",
    fontWeight: "500",
  },

  /* Botão Salvar Senha */
   btnSalvar: {
    backgroundColor: cores.brancoFundo,
    borderRadius: 18,
    paddingVertical: 12,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 15,
    overflow: "visible",
    marginTop: 50,
  
  },
  txtSalvar: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.detalhesMarrom,
  },
});

export default editarSenhaStyle;