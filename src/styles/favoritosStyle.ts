import { StyleSheet } from "react-native";
import { cores } from "@/styles/estilos"; 

const favoritosStyle = StyleSheet.create({


header: {
  width: "90%",
  alignSelf: "center",
  marginTop: 40,
},
conteudoHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
},
iconeVoltar: {
  width: 28,
  height: 28,
  resizeMode: "contain",
},
titulo: {
  fontSize: 22,
  fontWeight: "bold",
  color: cores.verdeEscuro, 
  textAlign: "center",
},
logo: {
  width: 45,
  height: 45,
},
  /* Categorias */
  scrollCategorias: {
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
  },
  containerCategorias: {
    paddingHorizontal: 22,
    gap: 20,
    alignItems: "center",
  },
  btnCategoria: {
    alignItems: "center",
    paddingVertical: 4,
  },
  txtCategoria: {
    fontSize: 14,
    color: cores.textoClaro,
    fontWeight: "500",
  },
  txtCategoriaAtiva: {
    color: cores.detalhesMarrom,
    fontWeight: "bold",
  },
  indicadorAtivo: {
    height: 2,
    backgroundColor: cores.detalhesMarrom,
    width: "100%",
    marginTop: 4,
    borderRadius: 2,
  },

  /* Lista de Cards */
  main: {
    width: "88%",
    alignSelf: "center",
    marginTop: 10,
    gap: 16,
    paddingBottom: 20,
  },
  cardFavorito: {
    backgroundColor: cores.brancoFundo,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  areaImagem: {
    position: "relative",
    width: 105,
    height: 105,
  },
  imgPrato: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  btnCoracao: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 4,
    elevation: 2,
  },
  iconeCoracao: {
    width: 18,
    height: 18,
    tintColor: "#E53935",
  },
  infoCard: {
    flex: 1,
    justifyContent: "space-between",
  },
  tituloPrato: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.verdeEscuro,
  },
  descPrato: {
    fontSize: 11,
    color: cores.corTexto,
    lineHeight: 14,
    marginTop: 2,
  },
  btnPecaAgora: {
    backgroundColor: cores.detalhesMarrom,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    marginTop: 8,
    gap: 6,
  },
  txtPecaAgora: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  iconeSeta: {
    width: 30,
    height: 30,
    tintColor: "#FFFFFF",
  },
});

export default favoritosStyle;