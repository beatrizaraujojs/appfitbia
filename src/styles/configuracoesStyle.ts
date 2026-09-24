import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const configuracoesStyle = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 26,
  },
  btnVoltar: {
    padding: 4,
  },
  txtVoltar: {
    fontSize: 26,
    color: cores.verdeEscuro, // Verde bem escuro (#2D4030)
    fontWeight: "500",
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: cores.verdeEscuro,
  },
  logoHeader: {
    width: 36,
    height: 36,
  },

  /* Card de Perfil */
  cardPerfil: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginBottom: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarContainer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 43,
    resizeMode: "cover",
  },
  infoPerfil: {
    flex: 1,
    justifyContent: "center",
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: "700",
    color: cores.verdeEscuro,
    lineHeight: 23,
  },
  badgeCliente: {
    backgroundColor: cores.detalhesMarrom, // Cor bege/palha idêntica ao layout
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 15,
  },
  txtBadge: {
    fontSize: 11,
    color: cores.brancoFundo,
    fontWeight: "600",
  },

  /* Lista de Opções */
  listaOpcoes: {
    marginTop: 4,
    paddingHorizontal: 10
  },
  opcaoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  opcaoIcone: {
    width: 28,
    height: 28,
    marginRight: 18,
    resizeMode: "contain",
    tintColor: cores.verdeEscuro, // Aplica o verde escuro a todos os ícones para garantirem visibilidade
  },
  opcaoTextoBox: {
    flex: 1,
  },
  opcaoTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.verdeEscuro,
  },
  opcaoSubtitulo: {
    fontSize: 12,
    color: cores.textoClaro,
    marginTop: 2,
    fontWeight: "400",
  },
  opcaoSeta: {
    fontSize: 18,
    color: cores.detalhesMarrom,
    fontWeight: "600",
  },
  divisor: {
    height: 1,
    backgroundColor: "#EAEAEA",
    width: "100%",
  },
});

export default configuracoesStyle;