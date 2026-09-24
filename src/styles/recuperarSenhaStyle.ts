import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const recuperarSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Logo */
  logo: {
    width: 160,
    height: 60,
    marginBottom: 20,
  },

  /* Título e Subtítulo */
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 36,
  },

  /* Form */
  formGroup: {
    width: "100%",
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...({ outlineStyle: "none" } as any),
  },
  iconeEmail: {
    width: 20,
    height: 20,
    tintColor: cores.verdeEscuro,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: cores.textoClaro,
    padding: 0,
    margin: 0,
    ...({ outlineStyle: "none" } as any),
  },

  /* Botão Enviar Link */
  btnEnviar: {
    backgroundColor: cores.verdeEscuro,
    borderRadius: 12,
    paddingVertical: 14,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  txtEnviar: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* Botão Cancelar */
  btnCancelar: {
    backgroundColor: cores.brancoFundo,
    borderRadius: 10,
    paddingVertical: 8,
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  txtCancelar: {
    fontSize: 12,
    fontWeight: "700",
    color: cores.detalhesMarrom,
  },
});

export default recuperarSenhaStyle;