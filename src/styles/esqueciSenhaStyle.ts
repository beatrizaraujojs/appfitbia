import { StyleSheet } from 'react-native';
 
const esqueciSenhaStyle = StyleSheet.create({
 
 
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
 
 
    conteudo: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 35,
    },
 
 
    logo: {
        width: 210,
        height: 60,
        marginBottom: 30,
    },
 
 
    titulo: {
        fontSize: 28,
        color: '#2C3D29',
        textAlign: 'center',
        marginBottom: 20,
    },
 
 
    descricao: {
        fontSize: 20,
        color: '#888888',
        textAlign: 'center',
        lineHeight: 26, // Corrigido de 19 para 26
        marginBottom: 100,
    },
 
 
    campoContainer: {
        width: 350,
        height: 50,
    },
 
    label: {
        fontSize: 15,
        color: '#888888',
        marginBottom: 7,
        fontWeight: '400',
    },
 
 
    inputContainer: {
        width: '100%',
        height: 36,
        backgroundColor: '#EEEEEE',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
 
    icone: {
        width: 30,
        height: 30,
        marginLeft: 5,
    },
 
    input: {
        flex: 1,
        height: 36,
        fontSize: 12,
        color: '#333333',
        paddingHorizontal: 7,
        paddingVertical: 0,
         ...({ outlineStyle: "none" } as any)
    },
 
 
    botoes: {
        width: '100%',
        alignItems: 'center',
        marginTop: 150,
    },
 
 
    botaoEnviar: {
        width: 280,
        height: 50,
        backgroundColor: '#2D422B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
 
    textoBotaoEnviar: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
 
    botaoVoltar: {
        width: 210,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 2,
    },
 
    textoBotaoVoltar: {
        color: '#916F4A',
        fontSize: 12,
        fontWeight: 'bold',
    },
 
});
 
export default esqueciSenhaStyle;