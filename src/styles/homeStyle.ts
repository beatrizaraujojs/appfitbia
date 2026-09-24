import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  saudacao: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
  subSaudacao: {
    fontSize: 14,
    color: "#7A7A7A",
    marginTop: 4,
  },
  logoHeader: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  buscarContainer: {
    width: "100%",
    height: 48,
    backgroundColor: "#f7f7f7ff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  iconeBusca: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#7A7A7A",
  },
  textInputBusca: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#333333",
    ...({ outlineStyle: "none" } as any),
  },

  /* --- BANNER PROMOCIONAL --- */
  bannerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  banner: {
    flex: 1,
    height: 145,
    borderRadius: 15,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  arrowLeft: {
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRight: {
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 12,
    color: "#7A7A7A",
    fontWeight: "bold",
  },

  /* --- TÍTULOS DE SEÇÃO --- */
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginTop: 10,
    marginBottom: 16,
  },

  /* --- SEÇÃO DE CATEGORIAS --- */
  categoriasSection: {
    width: "100%",
    marginBottom: 24,
  },
  categoriasList: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 20,
    gap: 15,
  },
  categoriaItem: {
    alignItems: "center",
    width: 60,
  },
  categoriaIconeBox: {
    width: 56,
    height: 56,
    backgroundColor: "#3B4E38",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoriaIcone: {
    width: 28,
    height: 28,
    tintColor: "#FFFFFF",
    resizeMode: "contain",
  },
  categoriaTexto: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "500",
    textAlign: "center",
  },

  /* --- SEÇÃO DE PRODUTOS --- */
  produtosSection: {
    width: "100%",
    marginBottom: 24,
  },
  produtosList: {
    flexDirection: "row",
  },
  cardProduto: {
    width: 150,
    marginRight: 16,
    position: "relative",
  },
  imgProduto: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  btnFavorito: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconeFavorito: {
    width: 16,
    height: 16,
  },
  nomeProduto: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginTop: 8,
  },
  rodapeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  precoProduto: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4d9e41ff",
  },
  btnAdd: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B4E38",
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtnAdd: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 4,
  },

  /* --- BOTTOM BAR --- */
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  navItemAtivo: {
    backgroundColor: "#E2EBE0",
  },
  navIcone: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  navTexto: {
    fontSize: 11,
    color: "#7A7A7A",
    marginTop: 2,
  },
  navTextoAtivo: {
    fontSize: 11,
    color: "#3B4E38",
    fontWeight: "bold",
    marginTop: 2,
  },
});

export default homeStyle;