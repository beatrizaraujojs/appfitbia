
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBar from "@/components/BottomBar";
import enderecoStyle from "@/styles/enderecoStyle";
import globalStyle from "@/styles/globalStyle";

const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const API = `${SERVIDOR}/api/v1`;

function normalizarTexto(valor: unknown) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(avenida|av\.?)\b/g, "av")
    .replace(/\b(rua|r\.?)\b/g, "r")
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function somenteNumeros(valor: unknown) {
  return String(valor ?? "").replace(/\D/g, "");
}

export default function EnderecoScreen() {
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(0);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [enderecoEditando, setEnderecoEditando] = useState<any | null>(null);
  const [enderecoParaExcluir, setEnderecoParaExcluir] = useState<number | null>(null);

  const [nomeLocal, setNomeLocal] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("São Paulo");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("erro");

  const timerMensagem = useRef<ReturnType<typeof setTimeout> | null>(null);
  const salvandoRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerMensagem.current) {
        clearTimeout(timerMensagem.current);
      }
    };
  }, []);

  function mostrarMensagem(
    texto: string,
    tipo: "erro" | "sucesso" = "erro"
  ) {
    if (timerMensagem.current) {
      clearTimeout(timerMensagem.current);
    }

    setTipoMensagem(tipo);
    setMensagem(texto);

    timerMensagem.current = setTimeout(() => {
      setMensagem("");
    }, 3500);
  }

  function limparMensagem() {
    if (timerMensagem.current) {
      clearTimeout(timerMensagem.current);
      timerMensagem.current = null;
    }

    setMensagem("");
  }

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

      if (response.ok && json.success && Array.isArray(json.data)) {
        setEnderecos(json.data);
      }
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    } finally {
      setLoading(false);
    }
  }

  function limparFormulario() {
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

  function fecharModalSemSalvar() {
    if (salvandoRef.current) return;

    setModalEditar(false);
    limparFormulario();
    limparMensagem();
  }

  function abrirAdicionar() {
    limparFormulario();
    limparMensagem();
    setModalEditar(true);
  }

  function abrirEditar(item: any) {
    limparMensagem();

    setEnderecoEditando(item);
    setNomeLocal(item.nome_endereco || "");
    setCep(item.cep_endereco || "");
    setRua(item.rua_endereco || "");
    setNumero(item.numero_endereco || "");
    setComplemento(item.complemento_endereco || "");
    setPontoReferencia(
      item.ponto_referencia_endereco ||
      item.referencia_endereco ||
      ""
    );
    setBairro(item.bairro_endereco || "");
    setCidade(item.cidade_endereco || "São Paulo");

    setModalEditar(true);
  }

  async function buscarCep(cepDigitado: string) {
    setCep(cepDigitado);

    const cepLimpo = somenteNumeros(cepDigitado);

    if (cepLimpo.length !== 8) return;

    try {
      setBuscandoCep(true);

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

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

  function enderecoDuplicado(lista: any[], idAtual?: number) {
    return lista.some((item) => {
      if (
        idAtual != null &&
        String(item.id_endereco) === String(idAtual)
      ) {
        return false;
      }

      const mesmaRua =
        normalizarTexto(item.rua_endereco) === normalizarTexto(rua);

      const mesmoNumero =
        normalizarTexto(item.numero_endereco) === normalizarTexto(numero);

      const mesmaCidade =
        normalizarTexto(item.cidade_endereco || "São Paulo") ===
        normalizarTexto(cidade || "São Paulo");

      const mesmoBairro =
        normalizarTexto(item.bairro_endereco) === normalizarTexto(bairro);

      const cepAtual = somenteNumeros(cep);
      const cepExistente = somenteNumeros(item.cep_endereco);

      const mesmoCep =
        cepAtual.length === 8 &&
        cepExistente.length === 8 &&
        cepAtual === cepExistente;

      return (
        mesmaRua &&
        mesmoNumero &&
        mesmaCidade &&
        (mesmoBairro || mesmoCep)
      );
    });
  }

  async function salvarEndereco() {
    if (salvandoRef.current) return;

    limparMensagem();

    if (!cep.trim() || !rua.trim() || !numero.trim()) {
      mostrarMensagem("Preencha CEP, rua e número.");
      return;
    }

    salvandoRef.current = true;
    setSalvando(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        mostrarMensagem("Sessão expirada. Faça login novamente.");
        return;
      }

      const idAtual = enderecoEditando?.id_endereco;
      const isEdicao = Boolean(idAtual);

      // Consulta os endereços atuais antes de salvar.
      const consulta = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!consulta.ok) {
        mostrarMensagem("Não foi possível verificar os endereços.");
        return;
      }

      const dadosConsulta = await consulta.json();

      if (
        !dadosConsulta.success ||
        !Array.isArray(dadosConsulta.data)
      ) {
        mostrarMensagem("Não foi possível verificar os endereços.");
        return;
      }

      if (enderecoDuplicado(dadosConsulta.data, idAtual)) {
        mostrarMensagem("Este endereço já está cadastrado!");
        return;
      }

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
        limparFormulario();
        limparMensagem();

        await carregarEnderecos();

        mostrarMensagem(
          isEdicao
            ? "Endereço alterado com sucesso!"
            : "Endereço adicionado com sucesso!",
          "sucesso"
        );
      } else if (json.errors) {
        const primeiroErro = Object.values(json.errors)[0] as
          | string[]
          | string;

        mostrarMensagem(
          Array.isArray(primeiroErro)
            ? primeiroErro[0] || "Verifique os campos preenchidos."
            : String(primeiroErro)
        );
      } else {
        mostrarMensagem(
          json.message || "Não foi possível salvar o endereço."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      mostrarMensagem("Não foi possível conectar ao servidor.");
    } finally {
      salvandoRef.current = false;
      setSalvando(false);
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

      const response = await fetch(
        `${API}/enderecos/${enderecoParaExcluir}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setModalExcluir(false);
        setEnderecoParaExcluir(null);

        await carregarEnderecos();

        mostrarMensagem("Endereço excluído com sucesso!", "sucesso");
      } else {
        Alert.alert("Erro", "Não foi possível excluir o endereço.");
      }
    } catch (error) {
      console.error("Erro ao excluir endereço:", error);
      Alert.alert("Erro", "Não foi possível excluir o endereço.");
    }
  }

  // Aviso reutilizado na página e dentro do modal.
  function renderizarMensagem() {
    if (!mensagem) return null;

    const sucesso = tipoMensagem === "sucesso";

    return (
      <View
        style={{
          backgroundColor: sucesso ? "#D4E8D6" : "#F8D7DA",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 6,
          alignSelf: "center",
          maxWidth: "100%",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: sucesso ? "#285A35" : "#842029",
            fontSize: 12,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {mensagem}
        </Text>
      </View>
    );
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

            {!modalEditar && renderizarMensagem()}

            <Text style={enderecoStyle.titulo}>Meus endereços</Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#4CAF50"
                style={{ marginTop: 20 }}
              />
            ) : (
              <View style={enderecoStyle.lista}>
                {enderecos.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#666",
                      marginVertical: 20,
                    }}
                  >
                    Nenhum endereço cadastrado.
                  </Text>
                ) : (
                  enderecos.map((item, index) => {
                    const idItem = item.id_endereco;
                    const tituloNome =
                      item.nome_endereco || "Endereço de entrega";
                    const ruaTexto =
                      item.rua_endereco || "Rua não informada";
                    const numeroTexto =
                      item.numero_endereco || "S/N";
                    const complementoTexto = item.complemento_endereco;
                    const bairroTexto = item.bairro_endereco;
                    const cidadeTexto =
                      item.cidade_endereco || "São Paulo";

                    const bairroFormatado = bairroTexto
                      ? `${bairroTexto} - `
                      : "";

                    const localizacaoTexto =
                      `${bairroFormatado}${cidadeTexto}`;

                    return (
                      <Pressable
                        key={idItem || index}
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
                            {tituloNome}
                          </Text>

                          <Text style={enderecoStyle.nomeLocal}>
                            {ruaTexto}
                          </Text>

                          <Text style={enderecoStyle.endereco}>
                            Nº {numeroTexto}
                            {complementoTexto
                              ? ` (${complementoTexto})`
                              : ""}
                          </Text>

                          <Text style={enderecoStyle.localizacao}>
                            {localizacaoTexto}
                          </Text>
                        </View>

                        <View style={enderecoStyle.acoes}>
                          <Pressable
                            onPress={() => abrirModalExclusao(idItem)}
                          >
                            <Image
                              source={require("@/assets/images/fitbia/lixeira-de-reciclagem.png")}
                              style={enderecoStyle.imgLixeira}
                            />
                          </Pressable>

                          <Pressable onPress={() => abrirEditar(item)}>
                            <Text style={enderecoStyle.editar}>
                              Editar &gt;
                            </Text>
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
              onPress={abrirAdicionar}
            >
              <Text style={enderecoStyle.textoAdicionar}>
                + Adicionar Endereço
              </Text>
            </Pressable>
          </ScrollView>

          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>

      {/* MODAL ADICIONAR / EDITAR */}
      <Modal
        visible={modalEditar}
        transparent
        animationType="fade"
        onRequestClose={fecharModalSemSalvar}
      >
        <TouchableWithoutFeedback onPress={fecharModalSemSalvar}>
          <View style={enderecoStyle.fundoModal}>
            <TouchableWithoutFeedback
              onPress={(e) => e.stopPropagation()}
            >
              <View style={enderecoStyle.modalEditar}>
                <Pressable
                  style={enderecoStyle.fecharEditar}
                  onPress={fecharModalSemSalvar}
                  hitSlop={{
                    top: 15,
                    bottom: 15,
                    left: 15,
                    right: 15,
                  }}
                >
                  <Text style={enderecoStyle.textoFecharEditar}>
                    X
                  </Text>
                </Pressable>

                <Text style={enderecoStyle.tituloEditar}>
                  {enderecoEditando
                    ? "Editar endereço"
                    : "Novo endereço"}
                </Text>

                {/* Aviso visível acima dos campos, dentro do modal */}
                {renderizarMensagem()}

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={enderecoStyle.formularioEditar}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={enderecoStyle.campoEditar}>
                    <Text style={enderecoStyle.subtituloEditar}>
                      Nome do local (Ex: Casa, Trabalho)
                    </Text>
                    <TextInput
                      style={enderecoStyle.inputEditar}
                      value={nomeLocal}
                      onChangeText={setNomeLocal}
                      placeholder="Ex: Casa"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={enderecoStyle.campoEditar}>
                    <Text style={enderecoStyle.subtituloEditar}>
                      CEP do local
                    </Text>
                    <TextInput
                      style={enderecoStyle.inputEditar}
                      value={cep}
                      onChangeText={buscarCep}
                      keyboardType="numeric"
                      maxLength={9}
                    />
                    {buscandoCep && (
                      <ActivityIndicator
                        size="small"
                        color="#4CAF50"
                        style={{ marginTop: 5 }}
                      />
                    )}
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
                        onChangeText={(texto) =>
                          setNumero(texto.replace(/\D/g, ""))
                        }
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={enderecoStyle.campoComplemento}>
                      <Text style={enderecoStyle.subtituloEditar}>
                        Complemento
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
                      value={pontoReferencia}
                      onChangeText={setPontoReferencia}
                      placeholder="Ex: Próximo à praça"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={enderecoStyle.campoEditar}>
                    <Text style={enderecoStyle.subtituloEditar}>
                      Bairro
                    </Text>
                    <TextInput
                      style={enderecoStyle.inputEditar}
                      value={bairro}
                      onChangeText={setBairro}
                    />
                  </View>

                  <View style={enderecoStyle.campoEditar}>
                    <Text style={enderecoStyle.subtituloEditar}>
                      Cidade
                    </Text>
                    <TextInput
                      style={enderecoStyle.inputEditar}
                      value={cidade}
                      onChangeText={setCidade}
                    />
                  </View>

                  <Pressable
                    style={[
                      enderecoStyle.btnSalvarEditar,
                      salvando && { opacity: 0.6 },
                    ]}
                    onPress={salvarEndereco}
                    disabled={salvando}
                  >
                    <Text style={enderecoStyle.textoSalvarEditar}>
                      {salvando
                        ? "Salvando..."
                        : "Salvar endereço"}
                    </Text>
                  </Pressable>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL EXCLUIR */}
      <Modal
        visible={modalExcluir}
        transparent
        animationType="fade"
        onRequestClose={() => setModalExcluir(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalExcluir(false)}
        >
          <View style={enderecoStyle.fundoModal}>
            <TouchableWithoutFeedback
              onPress={(e) => e.stopPropagation()}
            >
              <View style={enderecoStyle.modal}>
                <Pressable
                  style={enderecoStyle.fecharModal}
                  onPress={() => setModalExcluir(false)}
                  hitSlop={{
                    top: 15,
                    bottom: 15,
                    left: 15,
                    right: 15,
                  }}
                >
                  <Text style={enderecoStyle.textoFechar}>
                    X
                  </Text>
                </Pressable>

                <Text style={enderecoStyle.tituloModal}>
                  Deseja excluir o endereço?
                </Text>

                <Text style={enderecoStyle.textoModal}>
                  você perderá as informações{"\n"}
                  do local selecionado.
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
