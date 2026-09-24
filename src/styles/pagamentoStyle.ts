import { StyleSheet } from "react-native";
 
import { cores } from "./estilos";
 
 
export default StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: cores.brancoFundo,
    },
 
 
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
 
 
    areaConteudo: {
        flex: 1,
    },
   
    scroll: {
        flex: 1,
    },
 
    scrollConteudo: {
        paddingTop: 20,
        paddingHorizontal: 38,
        paddingBottom: 20,
    },
 
    cabecalho: {
        width: "100%",
        height: 70,
 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
 
        position: "relative",
    },
 
 
    botaoVoltar: {
        width: 30,
        height: 30,
 
        alignItems: "center",
        justifyContent: "center",
    },
 
 
    iconeVoltar: {
        width: 30,
        height: 30,
    },
 
    tituloCabecalho: {
        position: "absolute",
 
        left: 0,
        right: 0,
 
        textAlign: "center",
 
        fontSize: 20,
        fontWeight: "700",
 
        color: cores.verdeEscuro,
    },
 
    logo: {
        width: 54,
        height: 35,
    },
 
 
    linhaCabecalho: {
        width: "100%",
        height: 1,
        backgroundColor: "#E5E5E5",
        marginTop: 0,
        marginBottom: 30,
    },
 
    tituloSecao: {
        fontSize: 20,
        fontWeight: "700",
        color: cores.verdeEscuro,
        marginBottom: 20,
    },
 
 
    tituloSecaoEntrega: {
        fontSize: 20,
        fontWeight: "700",
        color: cores.verdeEscuro,
        marginTop: 0,
        marginBottom: 20,
    },
 
    opcaoPagamento: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D5D5D5",
        backgroundColor: "transparent",
        borderRadius: 10,
    },
 
    opcaoSelecionada: {
        backgroundColor: cores.brancoFundo,
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
    },
 
    conteudoOpcao: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
    },
 
    iconePagamento: {
        width: 21,
        height: 21,
        marginRight: 10,
    },
 
    textoOpcao: {
        fontSize: 12,
        color: cores.verdeOliva,
        fontWeight: "400",
    },
 
    bolinha: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#E5E5E5",
    },
 
 
    bolinhaSelecionada: {
        backgroundColor: cores.verdeFolha,
    },
 
    divisorResumo: {
        width: "100%",
        height: 1,
        backgroundColor: "#E0E0E0",
        marginTop: -1,
        marginBottom: 10,
    },
 
    tituloResumo: {
        fontSize: 20,
        fontWeight: "700",
        color: cores.verdeEscuro,
        marginBottom: 20,
    },
 
 
    linhaCupom: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
    },
 
 
    conteudoCupom: {
        flexDirection: "row",
        alignItems: "center",
    },
 
 
    iconeCupom: {
        width: 21,
        height: 21,
        marginRight: 10,
    },
 
 
    textoCupom: {
        fontSize: 12,
        color: cores.corTexto,
        fontWeight: "400",
    },
 
 
    subtextoCupom: {
        fontSize: 12,
        color: cores.textoClaro,
        marginTop: 2,
    },
 
 
    codigoCupom: {
        fontSize: 12,
        color: cores.verdeFolha,
        fontWeight: "500",
    },
 
    resumoValores: {
        width: "100%",
        marginBottom: 20,
    },
 
 
    tituloValores: {
        fontSize: 12,
        color: cores.corTexto,
        marginBottom: 7,
    },
 
 
    linhaValor: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 19,
    },
 
 
    labelValorCinza: {
        fontSize: 12,
        color: cores.textoClaro,
    },
 
 
    valorCinza: {
        fontSize: 12,
        color: cores.textoClaro,
    },
 
 
    labelDesconto: {
        fontSize: 12,
        color: cores.verdeFolha,
    },
 
 
    valorDesconto: {
        fontSize: 12,
        color: cores.verdeFolha,
    },
 
 
    labelSubtotal: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "500",
    },
 
 
    valorSubtotal: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "500",
    },
 
    divisorCpf: {
        width: "100%",
        height: 1,
        backgroundColor: "#E0E0E0",
        marginTop: 0,
        marginBottom: 12,
    },
 
 
    linhaCpf: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
 
 
    tituloCpf: {
        fontSize: 15,
        color: cores.verdeEscuro,
        fontWeight: "700",
        marginBottom: 5,
    },
 
 
    documentoCpf: {
        flexDirection: "row",
        alignItems: "center",
    },
 
 
    iconeCpf: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
 
 
    numeroCpf: {
        fontSize: 12,
        color: cores.verdeFolha,
    },
 
 
    trocarCpf: {
        fontSize: 12,
        color: cores.verdeOliva,
    },
 
    valorFinal: {
        width: "100%",
        marginTop: 15,
        marginBottom: 5,
    },
 
 
    valorFinalTexto: {
        fontSize: 15,
        color: cores.corTexto,
        fontWeight: "700",
    },
 
    botaoContinuar: {
        width: "100%",
        height: 30,
        backgroundColor: cores.verdeEscuro,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
 
        marginTop: 5,
    },
 
 
    textoContinuar: {
        fontSize: 12,
        color: cores.brancoFundo,
        fontWeight: "600",
    },
 
    espacoMenu: {
        height: 70,
    },
 
});
 