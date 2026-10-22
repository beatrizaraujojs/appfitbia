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
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  if (!visible || !produto) return null;

  const [qtdPrincipal, setQtdPrincipal] = useState(1);
  const [observacao, setObservacao] = useState("");
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    if (visible) {
      setQtdPrincipal(1);
      setObservacao("");
      setAdicionaisSelecionados({});
    }
  }, [visible, produto]);

  const gruposAdicionais =
    produto.grupos_adicionais ||
    produto.gruposAdicionais ||
    produto.grupos ||
    [];

  const contarSelecionadosNoGrupo = (
    grupo: any,
    adicionaisAtuais: { [key: number]: number },
  ) => {
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
    const maxPermitido = Number(
      grupo.qtd_max_grupo ||
        grupo.max_selecoes ||
        grupo.maximo ||
        grupo.limite ||
        grupo.max ||
        grupo.limite_maximo ||
        grupo.quantidade_maxima ||
        grupo.max_itens ||
        0,
    );

    setAdicionaisSelecionados((prev) => {
      const novo = { ...prev };
      const jaSelecionado = !!novo[idAdicional];

      if (jaSelecionado) {
        delete novo[idAdicional];
      } else {
        if (maxPermitido > 0) {
          const totalAtualNoGrupo = contarSelecionadosNoGrupo(grupo, prev);

          if (totalAtualNoGrupo >= maxPermitido) {
            Alert.alert(
              "Limite atingido",
              `Pode selecionar no máximo ${maxPermitido} item(ns) no total deste grupo.`,
            );
            return prev;
          }
        }
        novo[idAdicional] = 1;
      }
      return novo;
    });
  };

  const handleMudarQtdAdicional = (
    idAdicional: number,
    delta: number,
    grupo: any,
  ) => {
    const maxPermitido = Number(
      grupo.qtd_max_grupo ||
        grupo.max_selecoes ||
        grupo.maximo ||
        grupo.limite ||
        grupo.max ||
        grupo.limite_maximo ||
        grupo.quantidade_maxima ||
        grupo.max_itens ||
        0,
    );

    setAdicionaisSelecionados((prev) => {
      const atualItem = prev[idAdicional] || 0;
      const novaQtdItem = atualItem + delta;

      if (delta < 0) {
        if (novaQtdItem <= 0) {
          const novo = { ...prev };
          delete novo[idAdicional];
          return novo;
        }
        return {
          ...prev,
          [idAdicional]: novaQtdItem,
        };
      }

      if (delta > 0 && maxPermitido > 0) {
        const totalAtualNoGrupo = contarSelecionadosNoGrupo(grupo, prev);
        if (totalAtualNoGrupo >= maxPermitido) {
          Alert.alert(
            "Limite atingido",
            `Pode selecionar no máximo ${maxPermitido} item(ns) no total deste grupo.`,
          );
          return prev;
        }
      }

      return {
        ...prev,
        [idAdicional]: novaQtdItem,
      };
    });
  };

  let totalAdicionais = 0;
  if (gruposAdicionais.length > 0) {
    gruposAdicionais.forEach((grupo: any) => {
      const itensAdicionais = grupo.adicionais || grupo.itens || [];
      itensAdicionais.forEach((adicional: any) => {
        const id = adicional.id_adicional || adicional.id;
        if (adicionaisSelecionados[id]) {
          const preco = Number(
            adicional.preco_adicional || adicional.preco || 0,
          );
          totalAdicionais += preco * adicionaisSelecionados[id];
        }
      });
    });
  }

  const precoBase = Number(
    produto.preco_base_produto || produto.preco_produto || produto.preco || 0,
  );
  const valorUnitarioComAdicionais = precoBase + totalAdicionais;
  const valorTotalItem = valorUnitarioComAdicionais * qtdPrincipal;

  const imagemUri = !produto.foto_produto
    ? `${IMAGEM}/produto/sem-imagem.png`
    : `${IMAGEM}/${produto.foto_produto}`;

  const handleConfirmarAdicao = async () => {
    try {
      const itemConfigurado = {
        cartItemId: Date.now().toString(),
        id: produto.id_produto || produto.id || 1,
        nome: produto.nome_produto || produto.nome || "Produto",
        precoUnitario: valorUnitarioComAdicionais,
        descricao: produto.descricao_produto || produto.descricao || "",
        foto_produto: produto.foto_produto || "",
        quantidade: qtdPrincipal,
        observacao: observacao,
        valorTotal: valorTotalItem,
      };

      const carrinhoSalvo = await AsyncStorage.getItem("@carrinho_fitbia");
      let listaCarrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

      listaCarrinho.push(itemConfigurado);

      await AsyncStorage.setItem("@carrinho_fitbia", JSON.stringify(listaCarrinho));
      
      onClose();
      router.push("/carrinho" as any);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      Alert.alert("Erro", "Não foi possível adicionar o produto ao carrinho.");
    }
  };

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
            <Image
              source={{ uri: imagemUri }}
              style={produtoModalStyle.imagemProduto}
            />

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

            <Text style={produtoModalStyle.descricao}>
              {produto.descricao_produto || produto.descricao}
            </Text>

            {gruposAdicionais.length > 0 && (
              <>
                {gruposAdicionais.map((grupo: any, indexGrupo: number) => {
                  const nomeGrupo =
                    grupo.nome_grupo_adicional || grupo.nome || grupo.titulo;
                  const itensAdicionais = grupo.adicionais || grupo.itens || [];
                  const maxPermitido = Number(
                    grupo.qtd_max_grupo ||
                      grupo.max_selecoes ||
                      grupo.maximo ||
                      grupo.limite ||
                      grupo.max ||
                      grupo.limite_maximo ||
                      grupo.quantidade_maxima ||
                      grupo.max_itens ||
                      0,
                  );

                  const totalNoGrupo = contarSelecionadosNoGrupo(
                    grupo,
                    adicionaisSelecionados,
                  );
                  const limiteAtingido =
                    maxPermitido > 0 && totalNoGrupo >= maxPermitido;

                  return (
                    <View
                      key={grupo.id_grupo_adicional || grupo.id || indexGrupo}
                    >
                      {nomeGrupo && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 12,
                            marginBottom: 8,
                          }}
                        >
                          <Text style={produtoModalStyle.tituloAdicionais}>
                            {nomeGrupo}{" "}
                            {maxPermitido ? `(Máx: ${maxPermitido})` : ""}
                          </Text>
                          {limiteAtingido && (
                            <Text
                              style={{
                                color: "#d9534f",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              Limite máximo atingido!
                            </Text>
                          )}
                        </View>
                      )}

                      {itensAdicionais.map(
                        (adicional: any, indexAd: number) => {
                          const adId =
                            adicional.id_adicional || adicional.id || indexAd;
                          const adNome =
                            adicional.nome_adicional || adicional.nome;
                          const adPreco = Number(
                            adicional.preco_adicional || adicional.preco || 0,
                          );
                          const qtdAd = adicionaisSelecionados[adId] || 0;

                          return (
                            <View
                              style={produtoModalStyle.itemAdicional}
                              key={adId}
                            >
                              <Pressable
                                style={produtoModalStyle.checkboxArea}
                                onPress={() =>
                                  handleToggleAdicional(adId, grupo)
                                }
                              >
                                <View>
                                  <Text style={produtoModalStyle.nomeAdicional}>
                                    {adNome}
                                  </Text>
                                  <Text
                                    style={produtoModalStyle.precoAdicional}
                                  >
                                    + R\$ {adPreco.toFixed(2).replace(".", ",")}
                                  </Text>
                                </View>
                              </Pressable>

                              <View
                                style={produtoModalStyle.controleQtdPequeno}
                              >
                                <Pressable
                                  onPress={() =>
                                    handleMudarQtdAdicional(adId, -1, grupo)
                                  }
                                  style={produtoModalStyle.btnMenosPequeno}
                                >
                                  <Text
                                    style={produtoModalStyle.txtBtnMenosPequeno}
                                  >
                                    −
                                  </Text>
                                </Pressable>
                                <Text style={produtoModalStyle.txtQtdPequeno}>
                                  {qtdAd}
                                </Text>
                                <Pressable
                                  onPress={() => {
                                    const totalNoGrupoAtual =
                                      contarSelecionadosNoGrupo(
                                        grupo,
                                        adicionaisSelecionados,
                                      );
                                    if (
                                      maxPermitido > 0 &&
                                      totalNoGrupoAtual >= maxPermitido
                                    ) {
                                      Alert.alert(
                                        "Limite atingido",
                                        `Pode selecionar no máximo ${maxPermitido} item(ns) no total deste grupo.`,
                                      );
                                      return;
                                    }
                                    handleMudarQtdAdicional(adId, 1, grupo);
                                  }}
                                  style={[
                                    produtoModalStyle.btnMaisPequeno,
                                    limiteAtingido && { opacity: 0.4 },
                                  ]}
                                >
                                  <Text
                                    style={produtoModalStyle.txtBtnMaisPequeno}
                                  >
                                    +
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          );
                        },
                      )}
                    </View>
                  );
                })}
              </>
            )}

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

            <View style={produtoModalStyle.rodape}>
              <Text style={produtoModalStyle.valorTotal}>
                R\$ {valorTotalItem.toFixed(2).replace(".", ",")}
              </Text>
              <Pressable
                style={produtoModalStyle.btnAdicionar}
                onPress={handleConfirmarAdicao}
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