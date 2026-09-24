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

import globalStyle from "@/styles/globalStyle";
import novoEnderecoStyle from "@/styles/novoEnderecoStyle";
import BottomBar from "@/components/BottomBar";

export default function AdicionarEnderecoScreen() {
  const [nomeLocal, setNomeLocal] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

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
        setEstado(data.uf || "");
        if (data.complemento) setComplemento(data.complemento);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar o CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        {/* Topo cinza translúcido */}
        <View style={novoEnderecoStyle.espacoTopoCinza} />

        {/* Card branco */}
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
                  maxLength={8}
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
                placeholder="Estado"
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
                onPress={() => router.back()}
              >
                <Text style={novoEnderecoStyle.txtSalvar}>
                  Salvar endereço
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* BottomBar flutuando fixa na parte inferior */}
        <BottomBar abaAtiva="config" />
      </ImageBackground>
    </View>
  );
}