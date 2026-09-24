import { StyleSheet } from "react-native";

const redefinirSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  logo: {
    height: 120,
    width: 180,
    marginBottom: 10,
    marginTop: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E3E2B",
    textAlign: "center",
  },
  subtitulo: {
    marginTop: 8,
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
    marginBottom: 25,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    color: "#4A4A4A",
    marginBottom: 6,
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    height: 48,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#333333",
  },
  icone: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#3B4E38",
  },
  btnMostrarSenha: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  mostrarSenha: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  btnSalvar: {
    width: "100%",
    height: 45,
    backgroundColor: "#3B4E38",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  txtBtnSalvar: {
    color: "#FFFFFF",
    fontSize: 16  ,
    fontWeight: "bold",
  },
  btnVoltar: {
    width: "70%",
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 14,
    
    // Sombras (iOS e Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  txtBtnVoltar: {
    color: "#5E4330",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default redefinirSenhaStyle;