import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const criarContaStyle = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingTop: 60, // Dá espaço suficiente para o botão voltar não encostar no logo
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },
  titulo: {
    marginTop: 15,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: cores.verdeEscuro,
  },
  subtitulo: {
    marginTop: 6,
    fontSize: 15,
    textAlign: "center",
    color: cores.textoClaro,
    paddingHorizontal: 20, // Garante que o texto não colida nas bordas da tela
  },
  form: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  tituloInput: {
    alignSelf: "flex-start",
    color: cores.corTexto,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    width: "100%",
    backgroundColor: cores.cinzaForm,
    ...({ outlineStyle: "none" } as any),
  },
  icone: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: cores.corTexto,
    ...({ outlineStyle: "none" } as any),
  },
  btnMostrarSenha: {
    padding: 6,
    justifyContent: "center",
  },
  mostrarSenha: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  btnCriar: {
    width: "100%",
    height: 48,
    backgroundColor: cores.verdeEscuro,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 25,
  },
  textoCriarConta: {
    fontSize: 16,
    color: cores.brancoFundo,
    fontWeight: "bold",
  },
  btnCriarPressed: {
    opacity: 0.8,
  },
  termosUso: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 14,
  },
  btnTermos: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  checkTermos: {
    width: "100%",
    height: "100%",
    backgroundColor: cores.brancoFundo,
    borderColor: cores.detalhesMarrom,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  termoAceito: {
    backgroundColor: cores.detalhesMarrom,
  },
  checkOk: {
    fontSize: 12,
    fontWeight: "bold",
    color: cores.brancoFundo,
  },
  txtTermos: {
    fontSize: 13,
    color: cores.textoClaro,
  },
  linkTermos: {
    fontSize: 13,
    color: cores.detalhesMarrom,
    textDecorationLine: "underline",
  },
  btnVoltar: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 10,
    padding: 8,
  },
  imgVoltar: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default criarContaStyle;