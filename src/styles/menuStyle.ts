import { StyleSheet } from "react-native";

const menuStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  /* --- HEADER --- */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  btnVoltar: {
    padding: 4,
  },
  arrowBack: {
    fontSize: 28,
    color: "#2E3E2B",
    fontWeight: "bold",
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
  logoHeader: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  /* --- TEXTOS DE DESTAQUE --- */
  titulosContainer: {
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 14,
    color: "#7A7A7A",
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginTop: 2,
  },

  /* --- CAMPO DE BUSCA (BRANCO + SOMBRA) --- */
  buscarContainer: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
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

  /* --- ABAS DE CATEGORIAS (CORRIGIDO PARA NÃO QUEBRAR) --- */
  abasCentralizadas: {
    width: "100%",
    marginBottom: 16,
  },
  abasContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 4,
  },
  abaItem: {
    alignItems: "center",
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  abaTexto: {
    fontSize: 14,
    color: "#8C7A6B",
    fontWeight: "500",
  },
  abaTextoAtiva: {
    color: "#8C7A6B",
    fontWeight: "bold",
  },
  linhaAtiva: {
    height: 3,
    backgroundColor: "#8C7A6B",
    width: "100%",
    borderRadius: 2,
    marginTop: 4,
  },

  /* --- PRATOS DA SEMANA --- */
  secaoPratosSemana: {
    width: "100%",
    marginBottom: 8,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3E2B",
    marginBottom: 14,
  },
  listaPratosSemana: {
    flexDirection: "row",
    gap: 12,
  },
  imgPratoSemana: {
    width: 130,
    height: 130,
    borderRadius: 16,
  },

  /* --- DIVISOR --- */
  divisor: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },

  /* --- LISTA VERTICAL DE CARDÁPIO --- */
  listaProdutos: {
    gap: 20,
  },
  cardHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoProduto: {
    flex: 1,
    paddingRight: 12,
    justifyContent: "space-between",
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
  descProduto: {
    fontSize: 12,
    color: "#7A7A7A",
    marginTop: 4,
    lineHeight: 16,
  },
  linhaPreco: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingRight: 8,
  },
  precoProduto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
  btnFavorito: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  iconeFavorito: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  boxImagemProduto: {
    position: "relative",
  },
  imgProdutoHorizontal: {
    width: 110,
    height: 100,
    borderRadius: 16,
  },
  btnAddHorizontal: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#4E8D66",
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtnAdd: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 2,
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

export default menuStyle;