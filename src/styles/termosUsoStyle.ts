import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const termosUsoStyle = StyleSheet.create({
  sobrepor: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  conteudo: {
    width: "90%",
    height: "90%",
    backgroundColor: cores.brancoFundo,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cabecalho: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // position: "relative",
  },
 
  btnFechar: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
 
  iconeFechar: {
    fontSize: 22,
    color: cores.detalhesMarrom,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 13,
    alignSelf: "flex-start",
    color: cores.textoClaro,
  },
  scroll: {
    marginVertical: 5,
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
  logo: {
    alignSelf: "flex-end",
    width: 70,
    height: 20,
    marginTop: 5,
  },
});
 
export default termosUsoStyle;