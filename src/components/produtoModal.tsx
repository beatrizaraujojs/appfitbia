import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import produtoModalStyle from "../styles/produtoModalStyle";

const SERVIDOR = "http://localhost:8081";
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;

export default function ProdutoModal({
  visible,
  onClose,
  produto,
}: {
  visible: boolean;
  onClose: () => void;
  produto: any;
}) {
  if (!produto) return null;

  const [qtdPrincipal, setQtdPrincipal] = useState(1);
  const [observacao, setObservacao] = useState("");
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    setQtdPrincipal(1);
    setObservacao("");
    setAdicionaisSelecionados({});
  }, [produto]);

  // Captura os grupos vindos do Laravel (snake_case)
  const gruposAdicionais = 
    produto.grupos_adicionais || 
    produto.gruposAdicionais || 
    produto.grupos || 
    [];

  // Conta quantos itens já foram selecionados num determinado grupo
  const contarSelecionadosNoGrupo = (grupo: any, adicionaisAtuais: { [key: number]: number }) => {
    const itensAdicionais = grupo.adicionais || grupo.itens || [];
    let totalGrupo = 0;
    itensAdicionais.forEach((adicional: any) => {
      const adId = adicional.id_adicional || adicional.id;
      if (adicionaisAtuais[adId]) {
        totalGrupo += adicionaisAtuais[adId];
      }
    });
    return totalGrupo;
  };

  const handleToggleAdicional = (idAdicional: number, grupo: any) => {
    console.log("--- GRUPO COMPLETO RECEBIDO ---", grupo);
    
    const maxPermitido = Number(
      grupo.max_selecoes || 
      grupo.maximo || 
      grupo.limite || 
      grupo.max || 
      grupo.limite_maximo || 
      grupo.quantidade_maxima || 
      0
    );

    console.log("Max permitido convertido:", maxPermitido);

    setAdicionaisSelecionados((prev) => {
      const novo = { ...prev };
      const jaSelecionado = !!novo[idAdicional];

      if (jaSelecionado) {
        delete novo[idAdicional];
      } else {
        if (maxPermitido > 0) {
          const totalAtualNoGrupo = contarSelecionadosNoGrupo(grupo, prev);
          console.log("Total atual no grupo:", totalAtualNoGrupo);
          
          if (totalAtualNoGrupo >= maxPermitido) {
            Alert.alert("Limite atingido", `Pode selecionar no máximo ${maxPermitido} item(ns) neste grupo.`);
            return prev;
          }
        }
        novo[idAdicional] = 1;
      }
      return novo;
    });
  };

  const handleMudarQtdAdicional = (idAdicional: number, delta: number, grupo: any) => {
    const maxPermitido = Number(
      grupo.max_selecoes || 
      grupo.maximo || 
      grupo.limite || 
      grupo.max || 
      grupo.limite_maximo || 
      grupo.quantidade_maxima || 
      0
    );

    setAdicionaisSelecionados((prev) => {
      const atual = prev[idAdicional] || 1;
      const novaQtd = atual + delta;
      const novo = { ...prev };

      if (novaQtd <= 0) {
        delete novo[idAdicional];
      } else {
        if (delta > 0 && maxPermitido > 0) {
          const totalAtualNoGrupo = contarSelecionadosNoGrupo(grupo, prev);
          if (totalAtualNoGrupo >= maxPermitido) {
            Alert.alert("Limite atingido", `Pode selecionar no máximo ${maxPermitido} item(ns) neste grupo.`);
            return prev;
          }
        }
        novo[idAdicional] = novaQtd;
      }
      return novo;
    });
  };

  // Cálculo Dinâmico do Total
  let totalAdicionais = 0;
  if (gruposAdicionais.length > 0) {
    gruposAdicionais.forEach((grupo: any) => {
      const itensAdicionais = grupo.adicionais || grupo.itens || [];
      itensAdicionais.forEach((adicional: any) => {
        const id = adicional.id_adicional || adicional.id;
        if (adicionaisSelecionados[id]) {
          const preco = Number(adicional.preco_adicional || adicional.preco || 0);
          totalAdicionais += preco * adicionaisSelecionados[id];
        }
      });
    });
  }

  const precoBase = Number(produto.preco_base_produto || produto.preco_produto || produto.preco || 0);
  const valorTotal = (precoBase + totalAdicionais) * qtdPrincipal;

  const imagemUri = !produto.foto_produto
    ? `${IMAGEM}/produto/sem-imagem.png`
    : `${IMAGEM}/${produto.foto_produto}`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={produtoModalStyle.overlay}>
        <Pressable style={produtoModalStyle.backdrop} onPress={onClose} />

        <View style={produtoModalStyle.sheetContainer}>
          <View style={produtoModalStyle.dragHandle} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Foto do Produto */}
            <Image
              source={{ uri: imagemUri }}
              style={produtoModalStyle.imagemProduto}
            />

            {/* Título e Contador Principal */}
            <Text style={produtoModalStyle.nomeProduto}>
              {produto.nome_produto || produto.nome}
            </Text>
            
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
                R\$ {precoBase.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            {/* Descrição */}
            <Text style={produtoModalStyle.descricao}>
              {produto.descricao_produto || produto.descricao}
            </Text>

            {/* Renderização Dinâmica de Grupos e Adicionais */}
            {gruposAdicionais.length > 0 && (
              <>
                {gruposAdicionais.map((grupo: any, indexGrupo: number) => {
                  const nomeGrupo = grupo.nome_grupo_adicional || grupo.nome || grupo.titulo;
                  const itensAdicionais = grupo.adicionais || grupo.itens || [];
                  const maxPermitido = 
                    grupo.max_selecoes || 
                    grupo.maximo || 
                    grupo.limite || 
                    grupo.max || 
                    grupo.limite_maximo || 
                    grupo.quantidade_maxima;

                  return (
                    <View key={grupo.id_grupo_adicional || grupo.id || indexGrupo}>
                      {nomeGrupo && (
                        <Text style={produtoModalStyle.tituloAdicionais}>
                          {nomeGrupo} {maxPermitido ? `(Máx: ${maxPermitido})` : ""}
                        </Text>
                      )}
                      
                      {itensAdicionais.map((adicional: any, indexAd: number) => {
                        const adId = adicional.id_adicional || adicional.id || indexAd;
                        const adNome = adicional.nome_adicional || adicional.nome;
                        const adPreco = Number(adicional.preco_adicional || adicional.preco || 0);
                        const isSelected = !!adicionaisSelecionados[adId];
                        const qtdAd = adicionaisSelecionados[adId] || 1;

                        return (
                          <View style={produtoModalStyle.itemAdicional} key={adId}>
                            <Pressable
                              style={produtoModalStyle.checkboxArea}
                              onPress={() => handleToggleAdicional(adId, grupo)}
                            >
                              <View
                                style={[
                                  produtoModalStyle.checkbox,
                                  isSelected && produtoModalStyle.checkboxChecado,
                                ]}
                              />
                              <View>
                                <Text style={produtoModalStyle.nomeAdicional}>
                                  {adNome}
                                </Text>
                                <Text style={produtoModalStyle.precoAdicional}>
                                  + R\$ {adPreco.toFixed(2).replace(".", ",")}
                                </Text>
                              </View>
                            </Pressable>

                            {isSelected && (
                              <View style={produtoModalStyle.controleQtdPequeno}>
                                <Pressable
                                  onPress={() => handleMudarQtdAdicional(adId, -1, grupo)}
                                  style={produtoModalStyle.btnMenosPequeno}
                                >
                                  <Text style={produtoModalStyle.txtBtnMenosPequeno}>−</Text>
                                </Pressable>
                                <Text style={produtoModalStyle.txtQtdPequeno}>{qtdAd}</Text>
                                <Pressable
                                  onPress={() => handleMudarQtdAdicional(adId, 1, grupo)}
                                  style={produtoModalStyle.btnMaisPequeno}
                                >
                                  <Text style={produtoModalStyle.txtBtnMaisPequeno}>+</Text>
                                </Pressable>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </>
            )}

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

            {/* Rodapé / Botão */}
            <View style={produtoModalStyle.rodape}>
              <Text style={produtoModalStyle.valorTotal}>
                R\$ {valorTotal.toFixed(2).replace(".", ",")}
              </Text>
              <Pressable 
                style={produtoModalStyle.btnAdicionar} 
                onPress={() => {
                  onClose();
                }}
              >
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