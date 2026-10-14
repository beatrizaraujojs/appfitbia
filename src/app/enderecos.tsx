import {
    Image,
    ImageBackground,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
 
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
 
import enderecoStyle from "@/styles/enderecoStyle";
 
const enderecosIniciais = [
    {
        nome: "Casa",
        cep: "08000-000",
        estado: "São Paulo",
        rua: "Avenida Marechal Tito",
        numero: "1500",
        complemento: "",
        referencia: "",
        localizacao: "São Miguel Paulista - São Paulo - SP",
    },
    {
        nome: "Trabalho",
        cep: "08000-000",
        estado: "São Paulo",
        rua: "Avenida Marechal Tito",
        numero: "1500",
        complemento: "",
        referencia: "",
        localizacao: "São Miguel Paulista - São Paulo - SP",
    },
    {
        nome: "Escola",
        cep: "08000-000",
        estado: "São Paulo",
        rua: "Avenida Marechal Tito",
        numero: "1500",
        complemento: "",
        referencia: "",
        localizacao: "São Miguel Paulista - São Paulo - SP",
    },
];
 
export default function EnderecoScreen() {
    const [enderecos, setEnderecos] = useState(enderecosIniciais);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(0);
 
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
 
    const [enderecoEditando, setEnderecoEditando] = useState<number | null>(null);
    const [enderecoParaExcluir, setEnderecoParaExcluir] = useState<number | null>(null);
 
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [referencia, setReferencia] = useState("");
 
    function abrirEditar(index: number) {
        const endereco = enderecos[index];
 
        setEnderecoEditando(index);
        setNome(endereco.nome);
        setCep(endereco.cep);
        setEstado(endereco.estado);
        setRua(endereco.rua);
        setNumero(endereco.numero);
        setComplemento(endereco.complemento);
        setReferencia(endereco.referencia);
        setModalEditar(true);
    }
 
    function salvarEndereco() {
        if (enderecoEditando === null) {
            return;
        }
 
        const novaLista = [...enderecos];
 
        novaLista[enderecoEditando] = {
            ...novaLista[enderecoEditando],
            nome: nome,
            cep: cep,
            estado: estado,
            rua: rua,
            numero: numero,
            complemento: complemento,
            referencia: referencia,
            localizacao: `São Miguel Paulista - ${estado} - SP`,
        };
 
        setEnderecos(novaLista);
        setModalEditar(false);
        setEnderecoEditando(null);
    }
 
    function abrirModalExclusao(index: number) {
        setEnderecoParaExcluir(index);
        setModalExcluir(true);
    }
 
    function excluirEndereco() {
        if (enderecoParaExcluir === null) {
            return;
        }
 
        const novaLista = enderecos.filter(
            (_, index) => index !== enderecoParaExcluir
        );
 
        setEnderecos(novaLista);
        setModalExcluir(false);
        setEnderecoParaExcluir(null);
 
        if (novaLista.length === 0) {
            setEnderecoSelecionado(0);
            return;
        }
 
        if (enderecoSelecionado >= novaLista.length) {
            setEnderecoSelecionado(novaLista.length - 1);
        }
    }
 
    return (
        <ImageBackground
            source={require("@/assets/images/fitbia/fundo-fitbia.png")}
            style={enderecoStyle.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={enderecoStyle.container}>
                <ScrollView
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
 
                    <View style={enderecoStyle.lista}>
                        {enderecos.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => setEnderecoSelecionado(index)}
                                style={[
                                    enderecoStyle.caixaEndereco,
                                    enderecoSelecionado === index &&
                                    enderecoStyle.caixaAtiva,
                                ]}
                            >
                                <Image
                                    source={require("@/assets/images/fitbia/endereco.png")}
                                    style={enderecoStyle.imgLocal}
                                />
 
                                <View style={enderecoStyle.informacoes}>
                                    <Text style={enderecoStyle.tituloEndereco}>
                                        Endereço de entrega
                                    </Text>
 
                                    <Text style={enderecoStyle.nomeLocal}>
                                        {item.nome}
                                    </Text>
 
                                    <Text style={enderecoStyle.endereco}>
                                        {item.rua}, {item.numero}
                                    </Text>
 
                                    <Text style={enderecoStyle.localizacao}>
                                        {item.localizacao}
                                    </Text>
                                </View>
 
                                <View style={enderecoStyle.acoes}>
                                    <Pressable
                                        onPress={() => abrirModalExclusao(index)}
                                    >
                                        <Image
                                            source={require("@/assets/images/fitbia/lixeira-de-reciclagem.png")}
                                            style={enderecoStyle.imgLixeira}
                                        />
                                    </Pressable>
 
                                    <Pressable
                                        onPress={() => abrirEditar(index)}
                                    >
                                        <Text style={enderecoStyle.editar}>
                                            Editar &gt;
                                        </Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        ))}
                    </View>
 
                    <Pressable style={enderecoStyle.btnAdicionar}>
                        <Text style={enderecoStyle.textoAdicionar}>
                            + Adicionar Endereço
                        </Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
 
            <Modal
                visible={modalEditar}
                transparent
                animationType="fade"
                onRequestClose={() => setModalEditar(false)}
            >
                <View style={enderecoStyle.fundoModal}>
                    <View style={enderecoStyle.modalEditar}>
                        <Pressable
                            style={enderecoStyle.fecharEditar}
                            onPress={() => setModalEditar(false)}
                        >
                            <Text style={enderecoStyle.textoFecharEditar}>
                                X
                            </Text>
                        </Pressable>
 
                        <Text style={enderecoStyle.tituloEditar}>
                            Editar endereço
                        </Text>
 
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={enderecoStyle.formularioEditar}
                        >
                            <View style={enderecoStyle.campoEditar}>
                                <Text style={enderecoStyle.subtituloEditar}>
                                    Qual o nome do local? ex: casa, trabalho
                                </Text>
 
                                <TextInput
                                    style={enderecoStyle.inputEditar}
                                    value={nome}
                                    onChangeText={setNome}
                                />
                            </View>
 
                            <View style={enderecoStyle.campoEditar}>
                                <Text style={enderecoStyle.subtituloEditar}>
                                    Digite o Cep do local
                                </Text>
 
                                <TextInput
                                    style={enderecoStyle.inputEditar}
                                    value={cep}
                                    onChangeText={setCep}
                                    keyboardType="numeric"
                                />
                            </View>
 
                            <View style={enderecoStyle.campoEditar}>
                                <Text style={enderecoStyle.subtituloEditar}>
                                    Estado
                                </Text>
 
                                <TextInput
                                    style={enderecoStyle.inputEditar}
                                    value={estado}
                                    onChangeText={setEstado}
                                />
                            </View>
 
                            <View style={enderecoStyle.campoEditar}>
                                <Text style={enderecoStyle.subtituloEditar}>
                                    Rua
                                </Text>
 
                                <TextInput
                                    style={enderecoStyle.inputEditar}
                                    value={rua}
                                    onChangeText={setRua}
                                />
                            </View>
 
                            <View style={enderecoStyle.linhaCampos}>
                                <View style={enderecoStyle.campoNumero}>
                                    <Text style={enderecoStyle.subtituloEditar}>
                                        Número
                                    </Text>
 
                                    <TextInput
                                        style={enderecoStyle.inputEditar}
                                        value={numero}
                                        onChangeText={setNumero}
                                        keyboardType="numeric"
                                    />
                                </View>
 
                                <View style={enderecoStyle.campoComplemento}>
                                    <Text style={enderecoStyle.subtituloEditar}>
                                        Complemento - opcional
                                    </Text>
 
                                    <TextInput
                                        style={enderecoStyle.inputEditar}
                                        value={complemento}
                                        onChangeText={setComplemento}
                                    />
                                </View>
                            </View>
 
                            <View style={enderecoStyle.campoEditar}>
                                <Text style={enderecoStyle.subtituloEditar}>
                                    Ponto de referência
                                </Text>
 
                                <TextInput
                                    style={enderecoStyle.inputEditar}
                                    value={referencia}
                                    onChangeText={setReferencia}
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
                </View>
            </Modal>
 
            <Modal
                visible={modalExcluir}
                transparent
                animationType="fade"
                onRequestClose={() => setModalExcluir(false)}
            >
                <View style={enderecoStyle.fundoModal}>
                    <View style={enderecoStyle.modal}>
                        <Pressable
                            style={enderecoStyle.fecharModal}
                            onPress={() => setModalExcluir(false)}
                        >
                            <Text style={enderecoStyle.textoFechar}>
                                X
                            </Text>
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
                                <Text style={enderecoStyle.textoCancelar}>
                                    Cancelar
                                </Text>
                            </Pressable>
 
                            <Pressable
                                style={enderecoStyle.btnExcluir}
                                onPress={excluirEndereco}
                            >
                                <Text style={enderecoStyle.textoExcluir}>
                                    Excluir
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}
 