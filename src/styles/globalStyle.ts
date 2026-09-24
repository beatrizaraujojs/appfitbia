import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FAF9F5", // Cor base para evitar telas brancas durante a transição
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

   Background:{
    width: '100%',
    height: '100%',
    maxWidth: 440,
  },
  
  areaConteudo: {
    flex: 1,
    width: "100%",
  },
  scrollConteudo: {
    flexGrow: 1,
  },


  btnVoltar: {
    top: 30,
    left: "7%",
    width: 55,
    height: 55,
    zIndex: 1,
  },
  imgVoltar: {
    width: 30,
    height: 30,
  },

  
});

export default globalStyle;


