
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BottomBar from "@/components/BottomBar";
import globalStyle from "@/styles/globalStyle";
import novoEnderecoStyle from "@/styles/novoEnderecoStyle";

const SERVIDOR = "https://colegasdev.tipi5.smpsistema.com.br/bia";
const API = `${SERVIDOR}/api/v1`;

function normalizarTexto(valor: unknown) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizarNumero(valor: unknown) {
  return String(valor ?? "").replace(/\D/g, "");
}

function enderecoIgual(a: any, b: any) {
  return (
    normalizarNumero(a.cep_endereco) ===
      normalizarNumero(b.cep_endereco) &&
    normalizarTexto(a.rua_endereco) ===
      normalizarTexto(b.rua_endereco) &&
    normalizarTexto(a.numero_endereco) ===
      normalizarTexto(b.numero_endereco) &&
    normalizarTexto(a.bairro_endereco) ===
      normalizarTexto(b.bairro_endereco) &&
    normalizarTexto(a.cidade_endereco) ===
      normalizarTexto(b.cidade_endereco)
  );
}

export default function AdicionarEnderecoScreen() {
  const [nomeLocal, setNomeLocal] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");

  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [aviso, setAviso] = useState("");

  const salvandoRef = useRef(false);
  const avisoTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (avisoTimer.current) {
        clearTimeout(avisoTimer.current);
      }
    };
  }, []);

  function mostrarAviso(mensagem: string) {
    if (avisoTimer.current) {
      clearTimeout(avisoTimer.current);
    }

    setAviso(mensagem);

    avisoTimer.current = setTimeout(() => {
      setAviso("");
    }, 3500);
  }

  const handleCepChange = async (text: string) => {
    const cepLimpo = text.replace(/\D/g, "").slice(0, 8);
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      try {
        setLoadingCep(true);

        const response = await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        if (!response.ok) {
          throw new Error("Falha ao consultar CEP");
        }

        const data = await response.json();

        if (data.erro) {
          Alert.alert("Erro", "CEP não encontrado.");
          return;
        }

        setRua(data.logradouro || "");
        setBairro(data.bairro || "");
        setEstado(data.localidade || data.uf || "");

        if (data.complemento && !complemento) {
          setComplemento(data.complemento);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar o CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSalvarEndereco = async () => {
    if (salvandoRef.current) return;

    if (
      !cep.trim() ||
      !rua.trim() ||
      !numero.trim() ||
      !bairro.trim() ||
      !estado.trim()
    ) {
      mostrarAviso("Preencha os dados obrigatórios do endereço.");
      return;
    }

    if (cep.replace(/\D/g, "").length !== 8) {
      mostrarAviso("Informe um CEP válido.");
      return;
    }

    salvandoRef.current = true;
    setLoadingSalvar(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Erro",
          "Sessão expirada. Faça login novamente."
        );
        router.replace("/login" as any);
        return;
      }

      const bodyData = {
        nome_endereco: nomeLocal.trim() || "Endereço de entrega",
        cep_endereco: cep,
        rua_endereco: rua.trim(),
        numero_endereco: numero.trim(),
        complemento_endereco: complemento.trim(),
        ponto_referencia_endereco: pontoReferencia.trim(),
        bairro_endereco: bairro.trim(),
        cidade_endereco: estado.trim() || "São Paulo",
      };

      // Consultar os endereços existentes antes de cadastrar.
      const consulta = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!consulta.ok) {
        throw new Error(
          "Não foi possível verificar os endereços cadastrados."
        );
      }

      const dadosConsulta = await consulta.json();

      if (
        !dadosConsulta.success ||
        !Array.isArray(dadosConsulta.data)
      ) {
        throw new Error(
          "A lista de endereços não pôde ser verificada."
        );
      }

      const jaExiste = dadosConsulta.data.some(
        (endereco: any) => enderecoIgual(endereco, bodyData)
      );

      if (jaExiste) {
        mostrarAviso("Este endereço já está cadastrado!");
        return;
      }

      // Somente cadastrar se não existir outro endereço igual.
      const response = await fetch(`${API}/enderecos`, {
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
        // A tela anterior será atualizada pelo useFocusEffect.
        router.back();
      } else if (json.errors) {
        const primeiroErro = Object.values(json.errors)[0];
        const mensagem = Array.isArray(primeiroErro)
          ? String(primeiroErro[0])
          : "Verifique os campos preenchidos.";

        mostrarAviso(mensagem);
      } else {
        mostrarAviso(
          json.message || "Não foi possível salvar o endereço."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);

      mostrarAviso(
        "Não foi possível verificar ou salvar o endereço."
      );
    } finally {
      salvandoRef.current = false;
      setLoadingSalvar(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <View style={novoEnderecoStyle.espacoTopoCinza} />

        <View style={novoEnderecoStyle.containerForm}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={novoEnderecoStyle.scrollContent}
          >
            <View style={novoEnderecoStyle.tracinhoHeader} />

            <Pressable
              style={novoEnderecoStyle.btnVoltar}
              onPress={() => router.back()}
            >
              <Text style={novoEnderecoStyle.txtSetaVoltar}>
                ←
              </Text>
            </Pressable>

            <Text style={novoEnderecoStyle.titulo}>
              Informe seu novo endereço
            </Text>

            <View style={novoEnderecoStyle.form}>
              <TextInput
                style={novoEnderecoStyle.input}
                placeholder="Qual o nome do local? ex: casa, trabalho"
                placeholderTextColor="#888888"
                value={nomeLocal}
                onChangeText={setNomeLocal}
              />

              <View style={novoEnderecoStyle.inputContainerCep}>
                <TextInput
                  style={novoEnderecoStyle.input}
                  placeholder="Digite o Cep do local"
                  placeholderTextColor="#888888"
                  keyboardType="numeric"
                  maxLength={9}
                  value={cep}
                  onChangeText={handleCepChange}
                />

                {loadingCep && (
                  <ActivityIndicator
                    size="small"
                    color="#4A5D4E"
                    style={novoEnderecoStyle.loadingIndicator}
                  />
                )}
              </View>

              <TextInput
                style={novoEnderecoStyle.input}
                placeholder="Cidade / Estado"
                placeholderTextColor="#888888"
                value={estado}
                onChangeText={setEstado}
              />

              <TextInput
                style={novoEnderecoStyle.input}
                placeholder="Rua"
                placeholderTextColor="#888888"
                value={rua}
                onChangeText={setRua}
              />

              <View style={novoEnderecoStyle.linhaDupla}>
                <TextInput
                  style={[
                    novoEnderecoStyle.input,
                    novoEnderecoStyle.inputMetade,
                  ]}
                  placeholder="Número"
                  placeholderTextColor="#888888"
                  keyboardType="numeric"
                  value={numero}
                  onChangeText={setNumero}
                />

                <TextInput
                  style={[
                    novoEnderecoStyle.input,
                    novoEnderecoStyle.inputMetade,
                  ]}
                  placeholder="Complemento - opcional"
                  placeholderTextColor="#888888"
                  value={complemento}
                  onChangeText={setComplemento}
                />
              </View>

              <TextInput
                style={novoEnderecoStyle.input}
                placeholder="Ponto de referência"
                placeholderTextColor="#888888"
                value={pontoReferencia}
                onChangeText={setPontoReferencia}
              />

              <Pressable
                style={[
                  novoEnderecoStyle.btnSalvar,
                  loadingSalvar && { opacity: 0.6 },
                ]}
                onPress={handleSalvarEndereco}
                disabled={loadingSalvar}
              >
                {loadingSalvar ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={novoEnderecoStyle.txtSalvar}>
                    Salvar endereço
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>

        <BottomBar abaAtiva="config" />
      </ImageBackground>

      {/* Aviso acima de todos os elementos da tela */}
      {aviso !== "" && (
        <View
          pointerEvents="none"
          style={styles.avisoContainer}
        >
          <View style={styles.aviso}>
            <Text style={styles.avisoTexto}>
              {aviso}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avisoContainer: {
    position: "absolute",
    top: 45,
    left: 12,
    right: 12,
    zIndex: 9999,
    elevation: 20,
    alignItems: "center",
  },
  aviso: {
    backgroundColor: "#F4CCCC",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 11,
    maxWidth: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  avisoTexto: {
    color: "#8B2525",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
