 
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
 
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BottomBar from "@/components/BottomBar";
import { router } from "expo-router";
 
import pagamentoStyle from "@/styles/pagamentoStyle";
 
const imagens = {
    voltar: require("@/assets/images/fitbia/de-volta.png"),
    pix: require("@/assets/images/fitbia/pix.png"),
    dinheiro: require("@/assets/images/fitbia/icons8-dinheiro-48.png"),
    cartao: require("@/assets/images/fitbia/sem-contato.png"),
    cupom: require("@/assets/images/fitbia/promo-code.png"),
    cpf: require("@/assets/images/fitbia/arquivo.png"),
};
 
type MetodoPagamento =
    | "pix"
    | "dinheiro"
    | "debito"
    | "credito";
 
export default function Pagamento() {
    const [metodoPagamento, setMetodoPagamento] =
        useState<MetodoPagamento>("pix");
 
    const [cpf, setCpf] = useState("555.333.888-98");
    const [editandoCpf, setEditandoCpf] = useState(false);
 
    function selecionarPagamento(metodo: MetodoPagamento) {
        setMetodoPagamento(metodo);
    }
 
    function trocarCpf() {
        setEditandoCpf(true);
    }
 
    function salvarCpf() {
        setEditandoCpf(false);
    }
 
    return (
        <View style={pagamentoStyle.container}>
 
            <ImageBackground style={pagamentoStyle.background} resizeMode="stretch">
 
                <SafeAreaView style={pagamentoStyle.areaConteudo}>
 
                    <ScrollView
                        style={pagamentoStyle.scroll}
                        contentContainerStyle={pagamentoStyle.scrollConteudo}
                        showsVerticalScrollIndicator={false}
                    >
 
                        <View style={pagamentoStyle.cabecalho}>
 
                            <Pressable
                                style={pagamentoStyle.botaoVoltar}
                                onPress={() => router.back()}
                            >
                                <Image
                                    source={imagens.voltar}
                                    style={pagamentoStyle.iconeVoltar}
                                    resizeMode="contain"
                                />
                            </Pressable>
 
                            <Text style={pagamentoStyle.tituloCabecalho}>
                                Pagamento
                            </Text>
 
                            <Image
                                style={pagamentoStyle.logo}
                                resizeMode="contain"
                            />
 
                        </View>
 
                        <View style={pagamentoStyle.linhaCabecalho} />
 
                        <Text style={pagamentoStyle.tituloSecao}>
                            Pagamento pelo app
                        </Text>
 
                        <Pressable
                            onPress={() => selecionarPagamento("pix")}
                            style={[
                                pagamentoStyle.opcaoPagamento,
                                metodoPagamento === "pix" &&
                                pagamentoStyle.opcaoSelecionada,
                            ]}
                        >
                            <View style={pagamentoStyle.conteudoOpcao}>
 
                                <Image
                                    source={imagens.pix}
                                    style={pagamentoStyle.iconePagamento}
                                    resizeMode="contain"
                                />
 
                                <Text style={pagamentoStyle.textoOpcao}>
                                    Pix
                                </Text>
 
                            </View>
 
                            <View
                                style={[
                                    pagamentoStyle.bolinha,
                                    metodoPagamento === "pix" &&
                                    pagamentoStyle.bolinhaSelecionada,
                                ]}
                            />
                        </Pressable>
 
                        <Text style={pagamentoStyle.tituloSecaoEntrega}>
                            Pagamento na entrega / retirada
                        </Text>
 
                        <Pressable
                            onPress={() => selecionarPagamento("dinheiro")}
                            style={[
                                pagamentoStyle.opcaoPagamento,
                                metodoPagamento === "dinheiro" &&
                                pagamentoStyle.opcaoSelecionada,
                            ]}
                        >
                            <View style={pagamentoStyle.conteudoOpcao}>
 
                                <Image
                                    source={imagens.dinheiro}
                                    style={pagamentoStyle.iconePagamento}
                                    resizeMode="contain"
                                />
 
                                <Text style={pagamentoStyle.textoOpcao}>
                                    Dinheiro
                                </Text>
 
                            </View>
 
                            <View
                                style={[
                                    pagamentoStyle.bolinha,
                                    metodoPagamento === "dinheiro" &&
                                    pagamentoStyle.bolinhaSelecionada,
                                ]}
                            />
                        </Pressable>
 
                        <Pressable
                            onPress={() => selecionarPagamento("debito")}
                            style={[
                                pagamentoStyle.opcaoPagamento,
                                metodoPagamento === "debito" &&
                                pagamentoStyle.opcaoSelecionada,
                            ]}
                        >
                            <View style={pagamentoStyle.conteudoOpcao}>
 
                                <Image
                                    source={imagens.cartao}
                                    style={pagamentoStyle.iconePagamento}
                                    resizeMode="contain"
                                />
 
                                <Text style={pagamentoStyle.textoOpcao}>
                                    Cartão de débito
                                </Text>
 
                            </View>
 
                            <View
                                style={[
                                    pagamentoStyle.bolinha,
                                    metodoPagamento === "debito" &&
                                    pagamentoStyle.bolinhaSelecionada,
                                ]}
                            />
                        </Pressable>
 
                        <Pressable
                            onPress={() => selecionarPagamento("credito")}
                            style={[
                                pagamentoStyle.opcaoPagamento,
                                metodoPagamento === "credito" &&
                                pagamentoStyle.opcaoSelecionada,
                            ]}
                        >
                            <View style={pagamentoStyle.conteudoOpcao}>
 
                                <Image
                                    source={imagens.cartao}
                                    style={pagamentoStyle.iconePagamento}
                                    resizeMode="contain"
                                />
 
                                <Text style={pagamentoStyle.textoOpcao}>
                                    Cartão de crédito
                                </Text>
 
                            </View>
 
                            <View
                                style={[
                                    pagamentoStyle.bolinha,
                                    metodoPagamento === "credito" &&
                                    pagamentoStyle.bolinhaSelecionada,
                                ]}
                            />
                        </Pressable>
 
                        <View style={pagamentoStyle.divisorResumo} />
 
                        <Text style={pagamentoStyle.tituloResumo}>
                            Resumo do pedido
                        </Text>
 
                        <View style={pagamentoStyle.linhaCupom}>
 
                            <View style={pagamentoStyle.conteudoCupom}>
 
                                <Image
                                    source={imagens.cupom}
                                    style={pagamentoStyle.iconeCupom}
                                    resizeMode="contain"
                                />
 
                                <View>
 
                                    <Text style={pagamentoStyle.textoCupom}>
                                        Cupom
                                    </Text>
 
                                    <Text style={pagamentoStyle.subtextoCupom}>
                                        Cupom adicionado
                                    </Text>
 
                                </View>
 
                            </View>
 
                            <Text style={pagamentoStyle.codigoCupom}>
                                FITBIA01
                            </Text>
 
                        </View>
 
                        <View style={pagamentoStyle.resumoValores}>
 
                            <Text style={pagamentoStyle.tituloValores}>
                                Resumo de valores
                            </Text>
 
                            <View style={pagamentoStyle.linhaValor}>
 
                                <Text style={pagamentoStyle.labelValorCinza}>
                                    Total dos itens
                                </Text>
 
                                <Text style={pagamentoStyle.valorCinza}>
                                    R$ 27,80
                                </Text>
 
                            </View>
 
                            <View style={pagamentoStyle.linhaValor}>
 
                                <Text style={pagamentoStyle.labelDesconto}>
                                    Desconto
                                </Text>
 
                                <Text style={pagamentoStyle.valorDesconto}>
                                    - R$ 7,00
                                </Text>
 
                            </View>
 
                            <View style={pagamentoStyle.linhaValor}>
 
                                <Text style={pagamentoStyle.labelSubtotal}>
                                    Subtotal
                                </Text>
 
                                <Text style={pagamentoStyle.valorSubtotal}>
                                    R$ 30,80
                                </Text>
 
                            </View>
 
                        </View>
 
                        <View style={pagamentoStyle.divisorCpf} />
 
                        <View style={pagamentoStyle.linhaCpf}>
 
                            <View>
 
                                <Text style={pagamentoStyle.tituloCpf}>
                                    CPF na nota
                                </Text>
 
                                <View style={pagamentoStyle.documentoCpf}>
 
                                    <Image
                                        source={imagens.cpf}
                                        style={pagamentoStyle.iconeCpf}
                                        resizeMode="contain"
                                    />
 
                                    {editandoCpf ? (
                                        <TextInput
                                            value={cpf}
                                            onChangeText={setCpf}
                                            style={pagamentoStyle.numeroCpf}
                                            keyboardType="numeric"
                                            maxLength={14}
                                            autoFocus
                                        />
                                    ) : (
                                        <Text style={pagamentoStyle.numeroCpf}>
                                            {cpf}
                                        </Text>
                                    )}
 
                                </View>
 
                            </View>
 
                            <Pressable
                                onPress={editandoCpf ? salvarCpf : trocarCpf}
                            >
                                <Text style={pagamentoStyle.trocarCpf}>
                                    {editandoCpf ? "Salvar" : "Trocar"}
                                </Text>
                            </Pressable>
 
                        </View>
 
                        <View style={pagamentoStyle.valorFinal}>
 
                            <Text style={pagamentoStyle.valorFinalTexto}>
                                R$ 24,80
                            </Text>
 
                        </View>
 
                        <Pressable
                            style={pagamentoStyle.botaoContinuar}
                            onPress={() => { }}
                        >
                            <Text style={pagamentoStyle.textoContinuar}>
                                Continuar
                            </Text>
                        </Pressable>
 
                        <View style={pagamentoStyle.espacoMenu} />
 
                    </ScrollView>

                  <BottomBar  />
 
                </SafeAreaView>
 
            </ImageBackground>
 
        </View>
    );
}
 
 
 