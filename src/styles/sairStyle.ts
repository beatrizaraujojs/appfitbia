import { StyleSheet } from "react-native";
import { cores } from "@/styles/estilos";

const sairStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  card: {
    width: "100%",
    backgroundColor: cores.brancoFundo || "#FAF9F6",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  btnFechar: {
    position: "absolute",
    top: 18,
    right: 20,
    padding: 4,
    zIndex: 10,
  },
  txtFechar: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A241B",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.verdeEscuro,
    marginTop: 10,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoClaro,
    lineHeight: 20,
    marginBottom: 24,
    paddingRight: 10,
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  btnCancelar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  txtCancelar: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.textoClaro,
  },
  btnSair: {
    backgroundColor: cores.detalhesMarrom,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 16,
  },
  txtSair: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default sairStyle;