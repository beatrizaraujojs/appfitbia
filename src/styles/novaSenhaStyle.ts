import { StyleSheet } from "react-native";
import { cores } from "./estilos";

const novaSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Logo */
  logo: {
    width: 170,
    height: 65,
    marginBottom: 20,
  },

  /* Título e Subtítulo */
  titulo: {
    fontSize: 22, // Aumentado de 20 para 22
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14, // Aumentado de 13 para 14
    color: "#888888",
    textAlign: "center",
    marginBottom: 36,
  },

  /* Form */
  formGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14, // Aumentado de 12 para 14
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...({ outlineStyle: "none" } as any),
  },
  iconeCadeado: {
    width: 20, // Aumentado de 18 para 20
    height: 20,
    tintColor: cores.verdeEscuro,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14, // Aumentado de 12 para 14
    color: cores.textoClaro,
    padding: 0,
    margin: 0,
    ...({ outlineStyle: "none" } as any),
  },

  /* Botão Salvar nova senha */
  btnSalvar: {
    backgroundColor: cores.verdeEscuro,
    borderRadius: 12,
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  txtSalvar: {
    fontSize: 16, // Aumentado de 14 para 16
    fontWeight: "700",
    color: "#FFFFFF",
    
  },

  /* Botão Voltar ao Login */
  btnVoltarLogin: {
    backgroundColor: cores.brancoFundo,
    borderRadius: 10,
    paddingVertical: 10,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  txtVoltarLogin: {
    fontSize: 13, // Aumentado de 11 para 13
    fontWeight: "700",
    color: cores.detalhesMarrom,
  },
});

export default novaSenhaStyle;