import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const preloaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.verdeEscuro,
  },
  areaConteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
 
export default preloaderStyle;