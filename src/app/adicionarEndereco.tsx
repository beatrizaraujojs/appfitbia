import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyle from "@/styles/globalStyle";
import novoEnderecoStyle from "@/styles/novoEnderecoStyle";
import BottomBar from "@/components/BottomBar";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

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

  const handleCepChange = async (text: string) => {
    const cepLimpo = text.replace(/\D/g, "");
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      try {
        setLoadingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
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
    if (!cep || !rua || !numero) {
      Alert.alert("Atenção", "Preencha pelo menos o CEP, a Rua e o Número.");
      return;
    }

    try {
      setLoadingSalvar(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        router.replace("/login" as any);
        return;
      }

      const bodyData = {
        nome_endereco: nomeLocal || "Endereço de entrega",
        cep_endereco: cep,
        rua_endereco: rua,
        numero_endereco: numero,
        complemento_endereco: complemento,
        ponto_referencia_endereco: pontoReferencia,
        bairro_endereco: bairro,
        cidade_endereco: estado || "São Paulo",
      };

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
        Alert.alert("Sucesso", "Endereço cadastrado com sucesso!");
        router.back();
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
    } finally {
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
              <Text style={novoEnderecoStyle.txtSetaVoltar}>←</Text>
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
                style={novoEnderecoStyle.btnSalvar}
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
    </View>
  );
}