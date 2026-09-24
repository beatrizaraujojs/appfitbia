import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const sobreStyle = StyleSheet.create({
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
    marginBottom: 40,
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

  /* Secção de Opções */
  secaoLinks: {
    marginBottom: 35,
  },
  opcaoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  opcaoTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.verdeEscuro,
  },
  opcaoSeta: {
    fontSize: 14,
    fontWeight: "700",
    color: cores.detalhesMarrom,
  },
  divisor: {
    height: 1,
    backgroundColor: "#EBEBEB",
    width: "100%",
  },

  /* Redes Sociais */
  tituloRedes: {
    fontSize: 13,
    fontWeight: "600",
    color: cores.verdeEscuro,
    marginBottom: 20,
  },
  listaRedes: {
    gap: 16,
  },
  itemRede: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconeRede: {
    width: 32,
    height: 32,
    marginRight: 14,
    resizeMode: "contain",
  },
  txtRede: {
    fontSize: 13,
    color: "#7A7A7A",
    fontWeight: "500",
  },
});

export default sobreStyle;