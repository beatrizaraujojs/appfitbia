import { StyleSheet } from "react-native";
import { cores } from "./estilos";
 
const enderecoStyle = StyleSheet.create({
    background: {
        flex: 1,
    },
 
    container: {
        flex: 1,
    },
 
    scroll: {
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 100,
    },
 
    topo: {
        width: 350,
        height: 85,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
 
    voltar: {
        width: 30,
        height: 30,
    },
 
    logo: {
        width: 35,
        height: 50,
        resizeMode: "contain",
    },
 
    titulo: {
        width: 350,
        fontSize: 20,
        fontWeight: "bold",
        color: cores.verdeEscuro,
        marginBottom: 20,
    },
 
    lista: {
        alignItems: "center",
    },
 
    caixaEndereco: {
        width: 350,
        height: 115,
        backgroundColor: cores.brancoFundo,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginBottom: 30,
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12,
    },
 
    caixaAtiva: {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5,
    },
 
    imgLocal: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
 
    informacoes: {
        height: 75,
        justifyContent: "center",
    },
 
    tituloEndereco: {
        fontSize: 15,
        fontWeight: "bold",
        color: cores.verdeEscuro,
        marginBottom: 8,
    },
 
    nomeLocal: {
        fontSize: 12,
        fontWeight: "bold",
        color: cores.corTexto,
        marginBottom: 5,
    },
 
    endereco: {
        fontSize: 9,
        fontWeight: "bold",
        color: cores.corTexto,
        marginBottom: 3,
    },
 
    localizacao: {
        fontSize: 9,
        color: cores.corTexto,
    },
 
    acoes: {
        position: "absolute",
        right: 12,
        top: 10,
        height: 75,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
 
    imgLixeira: {
        width: 20,
        height: 20,
    },
 
    editar: {
        fontSize: 9,
        color: cores.verdeFolha,
    },
 
    btnAdicionar: {
        width: 150,
        height: 30,
        backgroundColor: cores.detalhesMarrom,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: -5,
        marginRight: 25,
    },
 
    textoAdicionar: {
        fontSize: 12,
        fontWeight: "bold",
        color: cores.brancoFundo,
        textAlign: "center",
    },
 
 
    fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
},
 
modal: {
    width: 350,
    height: 235,
    backgroundColor: cores.brancoFundo,
    borderRadius: 30,
    paddingTop: 45,
    paddingHorizontal: 43,
    position: "relative",
},
 
fecharModal: {
    position: "absolute",
    right: 28,
    top: 20,
},
 
textoFechar: {
    fontSize: 25,
    color: "#000000",
},
 
tituloModal: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.verdeEscuro,
    marginBottom: 18,
},
 
textoModal: {
    fontSize: 16,
    color: cores.verdeEscuro,
    lineHeight: 19,
    marginBottom: 30,
},
 
botoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
 
btnCancelar: {
    width: 128,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
},
 
textoCancelar: {
    fontSize: 16,
    color: cores.textoClaro,
},
 
btnExcluir: {
    width: 128,
    height: 32,
    backgroundColor: "#F6B3B3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
},
 
textoExcluir: {
    fontSize: 16,
    color: "#FF3030",
},
 
modalEditar: {
    width: 350,
    height: 415,
    backgroundColor: cores.brancoFundo,
    borderRadius: 30,
    paddingTop: 45,
    paddingHorizontal: 43,
    position: "relative",
},
 
fecharEditar: {
    position: "absolute",
    right: 20,
    top: 12,
},
 
textoFecharEditar: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
},
 
tituloEditar: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.verdeEscuro,
    marginBottom: 18,
},
 
formularioEditar: {
    paddingBottom: 5,
},
 
campoEditar: {
    width: "100%",
    marginBottom: 15,
},
 
subtituloEditar: {
    fontSize: 12,
    fontWeight: "normal",
    color: cores.textoClaro,
    marginBottom: 20,
},
 
inputEditar: {
    width: "100%",
    height: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    fontSize: 12,
    fontWeight: "normal",
    color: "#000000",
    paddingVertical: 0,
},
 
linhaCampos: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
},
 
campoNumero: {
    width: 82,
},
 
campoComplemento: {
    width: 90,
},
 
btnSalvarEditar: {
    alignSelf: "flex-end",
    marginTop: 0,
    marginBottom: 10,
},
 
textoSalvarEditar: {
    fontSize: 15,
    fontWeight: "normal",
    color: cores.detalhesMarrom,
    textDecorationLine: "underline",
},
});
 
export default enderecoStyle;
 