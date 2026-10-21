import { useState, useCallback } from "react";
import {
    Image,
    ImageBackground,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyle from "@/styles/globalStyle";
import enderecoStyle from "@/styles/enderecoStyle";
import BottomBar from "@/components/BottomBar";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

export default function EnderecoScreen() {
    const [enderecos, setEnderecos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [buscandoCep, setBuscandoCep] = useState(false);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(0);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    const [enderecoEditando, setEnderecoEditando] = useState<any | null>(null);
    const [enderecoParaExcluir, setEnderecoParaExcluir] = useState<number | null>(null);

    // Campos do formulário (incluindo Nome e Ponto de Referência)
    const [nomeLocal, setNomeLocal] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [pontoReferencia, setPontoReferencia] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("São Paulo");

    useFocusEffect(
        useCallback(() => {
            carregarEnderecos();
        }, [])
    );

    async function carregarEnderecos() {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                router.replace("/login" as any);
                return;
            }

            const response = await fetch(`${API}/enderecos`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await response.json();

            if (json.success && Array.isArray(json.data)) {
                setEnderecos(json.data);
            }
        } catch (error) {
            console.error("Erro ao carregar endereços:", error);
        } finally {
            setLoading(false);
        }
    }

    // Função para descartar alterações e fechar o modal
    function fecharModalSemSalvar() {
        setModalEditar(false);
        setEnderecoEditando(null);
        setNomeLocal("");
        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
        setPontoReferencia("");
        setBairro("");
        setCidade("São Paulo");
    }

    async function buscarCep(cepDigitado: string) {
        setCep(cepDigitado);
        const cepLimpo = cepDigitado.replace(/\D/g, "");

        if (cepLimpo.length === 8) {
            try {
                setBuscandoCep(true);
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setRua(data.logradouro || "");
                    setBairro(data.bairro || "");
                    setCidade(data.localidade || "São Paulo");
                } else {
                    Alert.alert("Atenção", "CEP não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                Alert.alert("Erro", "Não foi possível buscar o CEP.");
            } finally {
                setBuscandoCep(false);
            }
        }
    }

    function abrirEditar(item: any) {
        setEnderecoEditando(item);
        setNomeLocal(item.nome_endereco || "");
        setCep(item.cep_endereco || "");
        setRua(item.rua_endereco || "");
        setNumero(item.numero_endereco || "");
        setComplemento(item.complemento_endereco || "");
        setPontoReferencia(item.ponto_referencia_endereco || "");
        setBairro(item.bairro_endereco || "");
        setCidade(item.cidade_endereco || "São Paulo");
        setModalEditar(true);
    }

    async function salvarEndereco() {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
                return;
            }

            const idAtual = enderecoEditando?.id_endereco;
            const isEdicao = Boolean(idAtual);
            
            const url = isEdicao
                ? `${API}/enderecos/${idAtual}`
                : `${API}/enderecos`;

            const bodyData = {
                nome_endereco: nomeLocal,
                cep_endereco: cep,
                rua_endereco: rua,
                numero_endereco: numero,
                complemento_endereco: complemento,
                ponto_referencia_endereco: pontoReferencia,
                bairro_endereco: bairro,
                cidade_endereco: cidade || "São Paulo",
                ...(isEdicao && { _method: "PUT" }),
            };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });

            const json = await response.json();

            if (response.ok && json.success) {
                setModalEditar(false);
                setEnderecoEditando(null);
                carregarEnderecos();
                Alert.alert("Sucesso", "Endereço salvo com sucesso!");
            } else {
                if (json.errors) {
                    const primeiroErro = Object.values(json.errors)[0] as string[];
                    Alert.alert("Atenção", primeiroErro[0] || "Verifique os campos preenchidos.");
                } else {
                    Alert.alert("Atenção", json.message || "Não foi possível salvar o endereço.");
                }
            }
        } catch (error) {
            console.error("Erro ao salvar endereço:", error);
            Alert.alert("Erro de Conexão", "Não foi possível se conectar com o servidor.");
        }
    }

    function abrirModalExclusao(id: number) {
        setEnderecoParaExcluir(id);
        setModalExcluir(true);
    }

    async function excluirEndereco() {
        if (enderecoParaExcluir === null) return;

        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API}/enderecos/${enderecoParaExcluir}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setModalExcluir(false);
                setEnderecoParaExcluir(null);
                carregarEnderecos();
                Alert.alert("Sucesso", "Endereço excluído com sucesso.");
            } else {
                Alert.alert("Erro", "Não foi possível excluir o endereço.");
            }
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
        }
    }

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/fitbia/fundo-fitbia.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView
                        style={globalStyle.scrollConteudo}
                        contentContainerStyle={enderecoStyle.scroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={enderecoStyle.topo}>
                            <Pressable onPress={() => router.back()}>
                                <Image
                                    source={require("@/assets/images/fitbia/de-volta.png")}
                                    style={enderecoStyle.voltar}
                                />
                            </Pressable>

                            <Image style={enderecoStyle.logo} />
                        </View>

                        <Text style={enderecoStyle.titulo}>Meus endereços</Text>

                        {loading ? (
                            <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
                        ) : (
                            <View style={enderecoStyle.lista}>
                                {enderecos.length === 0 ? (
                                    <Text style={{ textAlign: "center", color: "#666", marginVertical: 20 }}>
                                        Nenhum endereço cadastrado.
                                    </Text>
                                ) : (
                                    enderecos.map((item, index) => {
                                        const idItem = item.id_endereco;
                                        const tituloNome = item.nome_endereco || "Endereço de entrega";
                                        const ruaTexto = item.rua_endereco || "Rua não informada";
                                        const numeroTexto = item.numero_endereco || "S/N";
                                        const complementoTexto = item.complemento_endereco;
                                        const bairroTexto = item.bairro_endereco;
                                        const cidadeTexto = item.cidade_endereco || "São Paulo";

                                        const bairroFormatado = bairroTexto ? `${bairroTexto} - ` : "";
                                        const localizacaoTexto = `${bairroFormatado}${cidadeTexto}`;

                                        return (
                                            <Pressable
                                                key={idItem || index}
                                                onPress={() => setEnderecoSelecionado(index)}
                                                style={[
                                                    enderecoStyle.caixaEndereco,
                                                    enderecoSelecionado === index && enderecoStyle.caixaAtiva,
                                                ]}
                                            >
                                                <Image
                                                    source={require("@/assets/images/fitbia/endereco.png")}
                                                    style={enderecoStyle.imgLocal}
                                                />

                                                <View style={enderecoStyle.informacoes}>
                                                    <Text style={enderecoStyle.tituloEndereco}>
                                                        {tituloNome}
                                                    </Text>

                                                    <Text style={enderecoStyle.nomeLocal}>
                                                        {ruaTexto}
                                                    </Text>

                                                    <Text style={enderecoStyle.endereco}>
                                                        Nº {numeroTexto}{complementoTexto ? ` (${complementoTexto})` : ""}
                                                    </Text>

                                                    <Text style={enderecoStyle.localizacao}>
                                                        {localizacaoTexto}
                                                    </Text>
                                                </View>

                                                <View style={enderecoStyle.acoes}>
                                                    <Pressable onPress={() => abrirModalExclusao(idItem)}>
                                                        <Image
                                                            source={require("@/assets/images/fitbia/lixeira-de-reciclagem.png")}
                                                            style={enderecoStyle.imgLixeira}
                                                        />
                                                    </Pressable>

                                                    <Pressable onPress={() => abrirEditar(item)}>
                                                        <Text style={enderecoStyle.editar}>Editar &gt;</Text>
                                                    </Pressable>
                                                </View>
                                            </Pressable>
                                        );
                                    })
                                )}
                            </View>
                        )}

                        <Pressable
                            style={enderecoStyle.btnAdicionar}
                            onPress={() => {
                                setEnderecoEditando(null);
                                setNomeLocal("");
                                setCep("");
                                setRua("");
                                setNumero("");
                                setComplemento("");
                                setPontoReferencia("");
                                setBairro("");
                                setCidade("São Paulo");
                                setModalEditar(true);
                            }}
                        >
                            <Text style={enderecoStyle.textoAdicionar}>
                                + Adicionar Endereço
                            </Text>
                        </Pressable>
                    </ScrollView>

                    <BottomBar abaAtiva="config" />
                </SafeAreaView>
            </ImageBackground>

            {/* Modal Editar / Adicionar */}
            <Modal
                visible={modalEditar}
                transparent
                animationType="fade"
                onRequestClose={fecharModalSemSalvar}
            >
                <TouchableWithoutFeedback onPress={fecharModalSemSalvar}>
                    <View style={enderecoStyle.fundoModal}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={enderecoStyle.modalEditar}>
                                <Pressable
                                    style={enderecoStyle.fecharEditar}
                                    onPress={fecharModalSemSalvar}
                                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                >
                                    <Text style={enderecoStyle.textoFecharEditar}>X</Text>
                                </Pressable>

                                <Text style={enderecoStyle.tituloEditar}>
                                    {enderecoEditando ? "Editar endereço" : "Novo endereço"}
                                </Text>

                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={enderecoStyle.formularioEditar}
                                >
                                    {/* CAMPO NOME DO LOCAL */}
                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>Nome do local (Ex: Casa, Trabalho)</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={nomeLocal}
                                            onChangeText={setNomeLocal}
                                            placeholder="Ex: Casa"
                                            placeholderTextColor="#999"
                                        />
                                    </View>

                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>CEP do local</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={cep}
                                            onChangeText={buscarCep}
                                            keyboardType="numeric"
                                            maxLength={9}
                                        />
                                        {buscandoCep && (
                                            <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 5 }} />
                                        )}
                                    </View>

                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>Rua</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={rua}
                                            onChangeText={setRua}
                                        />
                                    </View>

                                    <View style={enderecoStyle.linhaCampos}>
                                        <View style={enderecoStyle.campoNumero}>
                                            <Text style={enderecoStyle.subtituloEditar}>Número</Text>
                                            <TextInput
                                                style={enderecoStyle.inputEditar}
                                                value={numero}
                                                onChangeText={(texto) => setNumero(texto.replace(/\D/g, ""))}
                                                keyboardType="numeric"
                                            />
                                        </View>

                                        <View style={enderecoStyle.campoComplemento}>
                                            <Text style={enderecoStyle.subtituloEditar}>Complemento</Text>
                                            <TextInput
                                                style={enderecoStyle.inputEditar}
                                                value={complemento}
                                                onChangeText={setComplemento}
                                            />
                                        </View>
                                    </View>

                                    {/* CAMPO PONTO DE REFERÊNCIA */}
                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>Ponto de referência</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={pontoReferencia}
                                            onChangeText={setPontoReferencia}
                                            placeholder="Ex: Próximo à praça"
                                            placeholderTextColor="#999"
                                        />
                                    </View>

                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>Bairro</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={bairro}
                                            onChangeText={setBairro}
                                        />
                                    </View>

                                    <View style={enderecoStyle.campoEditar}>
                                        <Text style={enderecoStyle.subtituloEditar}>Cidade</Text>
                                        <TextInput
                                            style={enderecoStyle.inputEditar}
                                            value={cidade}
                                            onChangeText={setCidade}
                                        />
                                    </View>

                                    <Pressable
                                        style={enderecoStyle.btnSalvarEditar}
                                        onPress={salvarEndereco}
                                    >
                                        <Text style={enderecoStyle.textoSalvarEditar}>
                                            Salvar endereço
                                        </Text>
                                    </Pressable>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Modal Excluir */}
            <Modal
                visible={modalExcluir}
                transparent
                animationType="fade"
                onRequestClose={() => setModalExcluir(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalExcluir(false)}>
                    <View style={enderecoStyle.fundoModal}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={enderecoStyle.modal}>
                                <Pressable
                                    style={enderecoStyle.fecharModal}
                                    onPress={() => setModalExcluir(false)}
                                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                >
                                    <Text style={enderecoStyle.textoFechar}>X</Text>
                                </Pressable>

                                <Text style={enderecoStyle.tituloModal}>
                                    Deseja excluir o endereço?
                                </Text>

                                <Text style={enderecoStyle.textoModal}>
                                    você perderá as informações{"\n"}do local selecionado.
                                </Text>

                                <View style={enderecoStyle.botoesModal}>
                                    <Pressable
                                        style={enderecoStyle.btnCancelar}
                                        onPress={() => setModalExcluir(false)}
                                    >
                                        <Text style={enderecoStyle.textoCancelar}>Cancelar</Text>
                                    </Pressable>

                                    <Pressable
                                        style={enderecoStyle.btnExcluir}
                                        onPress={excluirEndereco}
                                    >
                                        <Text style={enderecoStyle.textoExcluir}>Excluir</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}