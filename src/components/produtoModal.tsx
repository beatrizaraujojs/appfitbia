import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import produtoModalStyle, { ProdutoModalProps } from "../styles/produtoModalStyle";

export default function ProdutoModal({
  visible,
  onClose,
  produto,
}: ProdutoModalProps) {
  if (!produto) return null;

  const [qtdPrincipal, setQtdPrincipal] = useState(1);
  const [qtdArroz, setQtdArroz] = useState(1);
  const [qtdFilade, setQtdFilade] = useState(2);
  const [arrozSelected, setArrozSelected] = useState(false);
  const [filadeSelected, setFiladeSelected] = useState(false);
  const [observacao, setObservacao] = useState("");

  // Valorações dos adicionais
  const precoArroz = 5.0;
  const precoFilade = 18.0;

  // Cálculo Dinâmico do Total
  const totalAdicionais =
    (arrozSelected ? precoArroz * qtdArroz : 0) +
    (filadeSelected ? precoFilade * qtdFilade : 0);

  const valorTotal = (produto.preco + totalAdicionais) * qtdPrincipal;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={produtoModalStyle.overlay}>
        {/* Clique fora para fechar */}
        <Pressable style={produtoModalStyle.backdrop} onPress={onClose} />

        <View style={produtoModalStyle.sheetContainer}>
          {/* Tracinho indicador de arraste */}
          <View style={produtoModalStyle.dragHandle} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Foto do Produto */}
            <Image
              source={produto.imagem}
              style={produtoModalStyle.imagemProduto}
            />

            {/* Título e Contador Principal */}
            <Text style={produtoModalStyle.nomeProduto}>{produto.nome}</Text>
            <View style={produtoModalStyle.linhaQtdPreco}>
              <View style={produtoModalStyle.controleQtd}>
                <Pressable
                  onPress={() => setQtdPrincipal((q) => (q > 1 ? q - 1 : 1))}
                  style={produtoModalStyle.btnMenos}
                >
                  <Text style={produtoModalStyle.txtBtnMenos}>−</Text>
                </Pressable>
                <Text style={produtoModalStyle.txtQtd}>{qtdPrincipal}</Text>
                <Pressable
                  onPress={() => setQtdPrincipal((q) => q + 1)}
                  style={produtoModalStyle.btnMais}
                >
                  <Text style={produtoModalStyle.txtBtnMais}>+</Text>
                </Pressable>
              </View>
              <Text style={produtoModalStyle.precoBase}>
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            {/* Descrição */}
            <Text style={produtoModalStyle.descricao}>{produto.descricao}</Text>

            {/* Lista de Adicionais */}
            <Text style={produtoModalStyle.tituloAdicionais}>Adicionais</Text>

            {/* Adicional 1: Arroz Integral */}
            <View style={produtoModalStyle.itemAdicional}>
              <Pressable
                style={produtoModalStyle.checkboxArea}
                onPress={() => setArrozSelected(!arrozSelected)}
              >
                <View
                  style={[
                    produtoModalStyle.checkbox,
                    arrozSelected && produtoModalStyle.checkboxChecado,
                  ]}
                />
                <View>
                  <Text style={produtoModalStyle.nomeAdicional}>
                    Arroz Integral
                  </Text>
                  <Text style={produtoModalStyle.precoAdicional}>
                    + R$ 5,00
                  </Text>
                </View>
              </Pressable>

              <View style={produtoModalStyle.controleQtdPequeno}>
                <Pressable
                  onPress={() => setQtdArroz((q) => (q > 1 ? q - 1 : 1))}
                  style={produtoModalStyle.btnMenosPequeno}
                >
                  <Text style={produtoModalStyle.txtBtnMenosPequeno}>−</Text>
                </Pressable>
                <Text style={produtoModalStyle.txtQtdPequeno}>{qtdArroz}</Text>
                <Pressable
                  onPress={() => setQtdArroz((q) => q + 1)}
                  style={produtoModalStyle.btnMaisPequeno}
                >
                  <Text style={produtoModalStyle.txtBtnMaisPequeno}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Adicional 2: Filé de Tilápia */}
            <View style={produtoModalStyle.itemAdicional}>
              <Pressable
                style={produtoModalStyle.checkboxArea}
                onPress={() => setFiladeSelected(!filadeSelected)}
              >
                <View
                  style={[
                    produtoModalStyle.checkbox,
                    filadeSelected && produtoModalStyle.checkboxChecado,
                  ]}
                />
                <View>
                  <Text style={produtoModalStyle.nomeAdicional}>
                    Filé de tilápia
                  </Text>
                  <Text style={produtoModalStyle.precoAdicional}>
                    + R$ 18,00
                  </Text>
                </View>
              </Pressable>

              <View style={produtoModalStyle.controleQtdPequeno}>
                <Pressable
                  onPress={() => setQtdFilade((q) => (q > 1 ? q - 1 : 1))}
                  style={produtoModalStyle.btnMenosPequeno}
                >
                  <Text style={produtoModalStyle.txtBtnMenosPequeno}>−</Text>
                </Pressable>
                <Text style={produtoModalStyle.txtQtdPequeno}>{qtdFilade}</Text>
                <Pressable
                  onPress={() => setQtdFilade((q) => q + 1)}
                  style={produtoModalStyle.btnMaisPequeno}
                >
                  <Text style={produtoModalStyle.txtBtnMaisPequeno}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Campo de Observações */}
            <Text style={produtoModalStyle.tituloAdicionais}>Observações</Text>
            <TextInput
              style={produtoModalStyle.inputObservacoes}
              placeholder="Ex: Tirar a cebola, mandar molho à parte..."
              placeholderTextColor="#A0A0A0"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              value={observacao}
              onChangeText={setObservacao}
            />

            {/* Totalizador e Botão de Ação */}
            <View style={produtoModalStyle.rodape}>
              <Text style={produtoModalStyle.valorTotal}>
                R$ {valorTotal.toFixed(2).replace(".", ",")}
              </Text>
              <Pressable style={produtoModalStyle.btnAdicionar} onPress={onClose}>
                <Text style={produtoModalStyle.txtBtnAdicionar}>
                  Adicionar ao carrinho
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}