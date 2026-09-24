import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const loginStyle = StyleSheet.create({
  scrollConteudo: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40, // Garante que em telas pequenas haja espaço no topo e no final para rolar confortavelmente
  },
  logo: {
    width: 240,
    height: 75,
  },
  titulo: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: cores.verdeEscuro,
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 15,
    color: cores.textoClaro,
  },
  form: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  tituloInput: {
    alignSelf: "flex-start",
    color: cores.corTexto,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: cores.cinzaForm,
    ...({ outlineStyle: "none" } as any),
  },
  inputContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icone: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: cores.corTexto,
    ...({ outlineStyle: "none" } as any),
  },
  btnMostrarSenha: {
    justifyContent: "center",
    padding: 4,
  },
  mostrarSenha: {
    width: 20,
    height: 20,
  },
  btnEsqueciSenha: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  txtEsqueciSenha: {
    fontSize: 12,
    color: cores.detalhesMarrom,
    textDecorationLine: "underline",
  },
  btnEsqueciSenhaPressed: {
    opacity: 0.8,
  },
  btnEntrar: {
    width: "100%",
    height: 48,
    backgroundColor: cores.verdeEscuro,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 25,
  },
  textoEntrar: {
    fontSize: 18,
    color: cores.brancoFundo,
    fontWeight: "bold",
  },
  btnEntrarPressed: {
    opacity: 0.8,
  },
  criarConta: {
    flexDirection: "row",
    gap: 5,
    marginTop: 16,
    alignItems: "center",
  },
  textoCriar: {
    fontSize: 14,
    color: cores.textoClaro,
  },
  linkCriarConta: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.detalhesMarrom,
    textDecorationLine: "underline",
  },
});

export default loginStyle;