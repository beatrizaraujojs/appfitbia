import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const editarContaStyle = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* Voltar */
  btnVoltar: {
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  txtVoltar: {
    fontSize: 28,
    color: cores.verdeEscuro,
    fontWeight: "600",
  },

  /* Topo com Avatar e Header Alinhados */
  topoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 20,
  },
  headerDireita: {
    alignItems: "flex-end",
    marginTop: 10,
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

  /* Section Avatar */
  avatarSection: {
    position: "relative",
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cores.brancoFundo,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarIcone: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
  },
  btnFotoBadge: {
    position: "absolute",
    top: 2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: cores.detalhesMarrom,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: cores.brancoFundo,
  },
  iconeCamera: {
    width: 14,
    height: 14,
    tintColor: "#FFFFFF",
  },

  /* Nome do Usuário */
  nomeUsuario: {
    fontSize: 18,
    fontWeight: "600",
    color: cores.verdeEscuro,
    marginTop: 10,
    marginBottom: 18,
  },

  /* Cards de Input */
  cardInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.brancoFundo,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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

  /* Botão Alterar Senha */
  btnAlterarSenha: {
    backgroundColor: cores.verdeClaroFundo,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 12,
    marginBottom: 80, // Aumentado para distanciar do botão Salvar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  txtAlterarSenha: {
    fontSize: 13,
    color: cores.textoClaro,
    fontWeight: "600",
  },

  /* Botão Salvar Alterações */
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
  },
  txtSalvar: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.detalhesMarrom,
  },
});

export default editarContaStyle;