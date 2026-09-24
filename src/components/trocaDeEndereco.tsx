import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import trocaDeEnderecoStyle from "@/styles/trocaDeEnderecoStyle";

interface Endereco {
  id: string;
  tipo: string;
  ruaLinha1: string;
  ruaLinha2: string;
  bairroCidade: string;
}

interface TrocaDeEnderecoProps {
  visible: boolean;
  onClose: () => void;
  onSelectAddress?: (id: string) => void;
}

const enderecosMock: Endereco[] = [
  {
    id: "1",
    tipo: "Trabalho",
    ruaLinha1: "Avenida Marechal",
    ruaLinha2: "Tito, 1500",
    bairroCidade: "São Miguel Paulista - São Paulo - SP",
  },
  {
    id: "2",
    tipo: "Trabalho",
    ruaLinha1: "Avenida Marechal",
    ruaLinha2: "Tito, 1500",
    bairroCidade: "São Miguel Paulista - São Paulo - SP",
  },
  {
    id: "3",
    tipo: "Trabalho",
    ruaLinha1: "Avenida Marechal",
    ruaLinha2: "Tito, 1500",
    bairroCidade: "São Miguel Paulista - São Paulo - SP",
  },

   {
    id: "4",
    tipo: "Trabalho",
    ruaLinha1: "Avenida Marechal",
    ruaLinha2: "Tito, 1500",
    bairroCidade: "São Miguel Paulista - São Paulo - SP",
  },
];

export default function TrocaDeEnderecoModal({
  visible,
  onClose,
  onSelectAddress,
}: TrocaDeEnderecoProps) {
  const [selectedId, setSelectedId] = useState<string>("1");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onSelectAddress) onSelectAddress(id);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={trocaDeEnderecoStyle.overlay}>
        <View style={trocaDeEnderecoStyle.modalContainer}>
          {/* Header com Título e Fechar */}
          <View style={trocaDeEnderecoStyle.headerModal}>
            <Text style={trocaDeEnderecoStyle.tituloModal}>Meus Endereços</Text>
            <Pressable style={trocaDeEnderecoStyle.btnFechar} onPress={onClose}>
              <Text style={trocaDeEnderecoStyle.txtFechar}>X</Text>
            </Pressable>
          </View>

          {/* Container interno com scroll limitado */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={trocaDeEnderecoStyle.scrollArea}
            contentContainerStyle={trocaDeEnderecoStyle.scrollContent}
            bounces={false}
          >
            {enderecosMock.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <Pressable
                  key={item.id}
                  style={trocaDeEnderecoStyle.cardEndereco}
                  onPress={() => handleSelect(item.id)}
                >
                  <View style={trocaDeEnderecoStyle.cardTopRow}>
                    <Text style={trocaDeEnderecoStyle.tituloCard}>
                      Endereço de entrega
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
                      <Text style={trocaDeEnderecoStyle.tipoEndereco}>
                        {item.tipo}
                      </Text>
                      <Text style={trocaDeEnderecoStyle.textoEndereco}>
                        {item.ruaLinha1}
                      </Text>
                      <Text style={trocaDeEnderecoStyle.textoEndereco}>
                        {item.ruaLinha2}
                      </Text>
                      <Text 
                        style={trocaDeEnderecoStyle.textoEnderecoSecundario}
                        numberOfLines={1}
                      >
                        {item.bairroCidade}
                      </Text>
                    </View>
                  </View>

                  <Pressable style={trocaDeEnderecoStyle.btnEditar}>
                    <Text style={trocaDeEnderecoStyle.txtEditar}>
                      Editar {">"}
                    </Text>
                  </Pressable>
                </Pressable>
              );
            })}

            {/* Adicionar Endereço dentro do fluxo de scroll */}
            <Pressable
              style={trocaDeEnderecoStyle.btnAddEndereco}
              onPress={() => {
                onClose();
                router.push("/adicionarEndereco");
              }}
            >
              <Text style={trocaDeEnderecoStyle.txtAddEndereco}>
                + Adicionar endereço
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}