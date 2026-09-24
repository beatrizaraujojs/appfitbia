import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const termosUsoSobreStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  btnVoltar: {
    paddingVertical: 4,
  },
  iconeVoltar: {
    width: 24,
    height: 24,
    tintColor: cores.verdeFolha,
  },
  tituloTermos: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.verdeEscuro,
  },
  divisor: {
    height: 1,
    backgroundColor: "#EBEBEB",
    width: "100%",
    marginBottom: 15,
  },
  conteudoTermos: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  cardTermos: {
    width: "90%",
    flex: 1,
    backgroundColor: cores.brancoFundo,
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cabecalhoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  titulo: {
    fontSize: 13,
    color: cores.textoClaro,
  },
  logoTopo: {
    width: 60,
    height: 25,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    paddingRight: 5,
    paddingBottom: 20,
  },
  subtitulo: {
    fontSize: 13,
    color: cores.textoClaro,
    marginVertical: 1,
  },
  texto: {
    fontSize: 12,
    color: cores.textoClaro,
    lineHeight: 18,
    textAlign: "justify",
  },
});
 
export default termosUsoSobreStyle;
 