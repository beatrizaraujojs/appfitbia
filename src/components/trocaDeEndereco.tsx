import React, { useState, useCallback } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import trocaDeEnderecoStyle from "@/styles/trocaDeEnderecoStyle";

const SERVIDOR = "http://localhost:8081";
const API = `${SERVIDOR}/api/v1`;

interface TrocaDeEnderecoProps {
  visible: boolean;
  onClose: () => void;
  onSelecionarEndereco?: (endereco: any) => void;
}

export default function TrocaDeEnderecoModal({
  visible,
  onClose,
  onSelecionarEndereco,
}: TrocaDeEnderecoProps) {
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (visible) {
        carregarEnderecos();
      }
    }, [visible])
  );

  async function carregarEnderecos() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        setEnderecos(json.data);
        if (json.data.length > 0 && selectedId === null) {
          setSelectedId(json.data[0].id_endereco);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar endereços no modal:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = (item: any) => {
    setSelectedId(item.id_endereco);
    if (onSelecionarEndereco) {
      onSelecionarEndereco(item);
    }
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={trocaDeEnderecoStyle.overlay}>
        <View style={[trocaDeEnderecoStyle.modalContainer, { width: "92%", maxHeight: "90%", padding: 22 }]}>
          {/* Header com Título e Fechar */}
          <View style={trocaDeEnderecoStyle.headerModal}>
            <Text style={[trocaDeEnderecoStyle.tituloModal, { fontSize: 20 }]}>Meus Endereços</Text>
            <Pressable style={trocaDeEnderecoStyle.btnFechar} onPress={onClose} hitSlop={15}>
              <Text style={trocaDeEnderecoStyle.txtFechar}>X</Text>
            </Pressable>
          </View>

          {/* Container interno com scroll */}
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginVertical: 40 }} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={trocaDeEnderecoStyle.scrollArea}
              contentContainerStyle={[trocaDeEnderecoStyle.scrollContent, { paddingBottom: 30 }]}
              bounces={false}
            >
              {enderecos.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#666", marginVertical: 30, fontSize: 16 }}>
                  Nenhum endereço cadastrado.
                </Text>
              ) : (
                enderecos.map((item) => {
                  const isSelected = item.id_endereco === selectedId;
                  const nomeLocalCard = item.nome_endereco || "Endereço de entrega";
                  const rua = item.rua_endereco || "";
                  const numeroCard = item.numero_endereco ? `Nº ${item.numero_endereco}` : "S/N";
                  const complementoCard = item.complemento_endereco ? ` (${item.complemento_endereco})` : "";
                  const bairroCard = item.bairro_endereco ? `${item.bairro_endereco} - ` : "";
                  const cidadeCard = item.cidade_endereco || "São Paulo";

                  return (
                    <Pressable
                      key={item.id_endereco}
                      style={[trocaDeEnderecoStyle.cardEndereco, { padding: 16, marginBottom: 15 }]}
                      onPress={() => handleSelect(item)}
                    >
                      <View style={trocaDeEnderecoStyle.cardTopRow}>
                        <Text style={[trocaDeEnderecoStyle.tituloCard, { fontSize: 16 }]}>
                          {nomeLocalCard}
                        </Text>
                        <View
                          style={[
                            trocaDeEnderecoStyle.radioOuter,
                            isSelected && trocaDeEnderecoStyle.radioOuterSelected,
                          ]}
                        />
                      </View>

                      <View style={trocaDeEnderecoStyle.cardBody}>
                        <Image
                          source={require("@/assets/images/fitbia/endereco.png")}
                          style={trocaDeEnderecoStyle.iconePin}
                          resizeMode="contain"
                        />

                        <View style={trocaDeEnderecoStyle.infoConteudo}>
                          <Text style={trocaDeEnderecoStyle.textoEndereco}>
                            {rua}
                          </Text>
                          <Text style={trocaDeEnderecoStyle.textoEndereco}>
                            {numeroCard}{complementoCard}
                          </Text>
                          {item.ponto_referencia_endereco ? (
                            <Text style={trocaDeEnderecoStyle.textoEndereco}>
                              Ref: {item.ponto_referencia_endereco}
                            </Text>
                          ) : null}
                          <Text 
                            style={trocaDeEnderecoStyle.textoEnderecoSecundario}
                            numberOfLines={1}
                          >
                            {bairroCard}{cidadeCard}
                          </Text>
                        </View>
                      </View>

                      {/* Botão de Editar que fecha o modal e redireciona para a tela de endereços */}
                      <Pressable 
                        onPress={() => {
                          onClose();
                          router.push("/enderecos" as any);
                        }}
                        style={{ alignSelf: "flex-end", marginTop: 8 }}
                        hitSlop={10}
                      >
                        <Text style={trocaDeEnderecoStyle.txtEditar}>Editar &gt;</Text>
                      </Pressable>
                    </Pressable>
                  );
                })
              )}

              {/* Adicionar Endereço */}
              <Pressable
                style={[trocaDeEnderecoStyle.btnAddEndereco, { paddingVertical: 14, marginTop: 10 }]}
                onPress={() => {
                  onClose();
                  router.push("/adicionarEndereco" as any);
                }}
              >
                <Text style={[trocaDeEnderecoStyle.txtAddEndereco, { fontSize: 16 }]}>
                  + Adicionar endereço
                </Text>
              </Pressable>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}