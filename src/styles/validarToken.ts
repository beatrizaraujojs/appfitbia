
import { StyleSheet } from "react-native";

const validarTokenStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E3E2B",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 55,
    lineHeight: 21,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 13,
    color: "#4A4A4A",
    marginBottom: 12,
  },
  codigoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 320,
  },
  quadrado: {
    width: "21%",
    height: 65,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  quadradoAtivo: {
    borderColor: "#3B4E38",
    borderWidth: 2,
  },
  digito: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E3E2B",
  },
  inputOculto: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  tempo: {
    fontSize: 13,
    color: "#7A7A7A",
    marginTop: 22,
    marginBottom: 35,
  },
  btnValidar: {
    width: "100%",
    height: 45,
    backgroundColor: "#3B4E38",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtValidar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnReenviar: {
    marginTop: 20,
    padding: 8,
  },
  txtReenviar: {
    fontSize: 13,
    color: "#5E4330",
    fontWeight: "600",
  },
  btnVoltar: {
    width: "70%",
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    elevation: 3,
  },
  txtVoltar: {
    color: "#5E4330",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default validarTokenStyle;
