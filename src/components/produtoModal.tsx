
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
import { mostrarMensagemCarrinho } from "@/components/mensagemCarrinho";

const SERVIDOR = "http://localhost:8081";
const IMAGEM = `${SERVIDOR}/fitbia/images/produto`;
const CHAVE_CARRINHO = "@carrinho_fitbia";

export default function ProdutoModal({
  visible,
  onClose,
  produto,
}: {
  visible: boolean;
  onClose: () => void;
  produto: any;
}) {
  const [qtdPrincipal, setQtdPrincipal] = useState(1);
  const [observacao, setObservacao] = useState("");
  const [adicionaisSelecionados, setAdicionaisSelecionados] =
    useState<{ [key: number]: number }>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (visible) {
      setQtdPrincipal(1);
      setObservacao("");
      setAdicionaisSelecionados({});
    }
  }, [visible, produto]);

  if (!visible || !produto) return null;

  const gruposAdicionais =
    produto.grupos_adicionais ||
    produto.gruposAdicionais ||
    produto.grupos ||
    [];

  const contarSelecionadosNoGrupo = (
    grupo: any,
    selecionados: { [key: number]: number }
  ) => {
    const itens = grupo.adicionais || grupo.itens || [];

    return itens.reduce((total: number, adicional: any) => {
      const id = adicional.id_adicional || adicional.id;
      return total + (selecionados[id] || 0);
    }, 0);
  };

  const obterMaximo = (grupo: any) =>
    Number(
      grupo.qtd_max_grupo ??
      grupo.max_selecoes ??
      grupo.maximo ??
      grupo.limite ??
      grupo.max ??
      grupo.limite_maximo ??
      grupo.quantidade_maxima ??
      grupo.max_itens ??
      0
    );

  const handleToggleAdicional = (
    id: number,
    grupo: any
  ) => {
    const maximo = obterMaximo(grupo);

    setAdicionaisSelecionados((anterior) => {
      const novo = { ...anterior };

      if (novo[id]) {
        delete novo[id];
      } else {
        const total = contarSelecionadosNoGrupo(
          grupo,
          anterior
        );

        if (maximo > 0 && total >= maximo) {
          Alert.alert(
            "Limite atingido",
            `Pode selecionar no máximo ${maximo} item(ns) neste grupo.`
          );
          return anterior;
        }

        novo[id] = 1;
      }

      return novo;
    });
  };

  const handleMudarQtdAdicional = (
    id: number,
    delta: number,
    grupo: any
  ) => {
    const maximo = obterMaximo(grupo);

    setAdicionaisSelecionados((anterior) => {
      const atual = anterior[id] || 0;
      const novaQtd = atual + delta;

      if (novaQtd <= 0) {
        const novo = { ...anterior };
        delete novo[id];
        return novo;
      }

      if (delta > 0 && maximo > 0) {
        const total = contarSelecionadosNoGrupo(
          grupo,
          anterior
        );

        if (total >= maximo) {
          Alert.alert(
            "Limite atingido",
            `Pode selecionar no máximo ${maximo} item(ns) neste grupo.`
          );
          return anterior;
        }
      }

      return {
        ...anterior,
        [id]: novaQtd,
      };
    });
  };

  let totalAdicionais = 0;

  gruposAdicionais.forEach((grupo: any) => {
    const itens = grupo.adicionais || grupo.itens || [];

    itens.forEach((adicional: any) => {
      const id = adicional.id_adicional || adicional.id;
      const quantidade = adicionaisSelecionados[id] || 0;

      const preco = Number(
        adicional.preco_adicional ??
        adicional.preco ??
        0
      );

      totalAdicionais += preco * quantidade;
    });
  });

  const precoBase = Number(
    produto.preco_base_produto ??
    produto.preco_produto ??
    produto.preco ??
    0
  );

  const valorUnitario =
    precoBase + totalAdicionais;

  const valorTotal =
    valorUnitario * qtdPrincipal;

  const imagemUri = produto.foto_produto
    ? `${IMAGEM}/${produto.foto_produto}`
    : `${IMAGEM}/sem-imagem.png`;

  // Identifica a configuração do produto
  const gerarChave = (item: any) => {
    const adicionais = Object.entries(
      item.adicionaisSelecionados || {}
    )
      .filter(([_, qtd]) => Number(qtd) > 0)
      .sort(([a], [b]) => Number(a) - Number(b));

    return JSON.stringify({
      id: String(item.id),
      precoUnitario: Number(item.precoUnitario),
      observacao: String(item.observacao || "").trim(),
      adicionais,
    });
  };

  const handleConfirmarAdicao = async () => {
    if (salvando) return;

    setSalvando(true);

    try {
      const itemConfigurado = {
        cartItemId:
          Date.now().toString() +
          Math.random().toString(36).slice(2),

        id: produto.id_produto || produto.id,

        nome:
          produto.nome_produto ||
          produto.nome ||
          "Produto",

        precoUnitario: valorUnitario,

        descricao:
          produto.descricao_produto ||
          produto.descricao ||
          "",

        foto_produto: produto.foto_produto || "",

        quantidade: qtdPrincipal,

        observacao: observacao.trim(),

        valorTotal: valorTotal,

        adicionaisSelecionados: {
          ...adicionaisSelecionados,
        },
      };

      const carrinhoSalvo =
        await AsyncStorage.getItem(CHAVE_CARRINHO);

      const listaCarrinho: any[] = carrinhoSalvo
        ? JSON.parse(carrinhoSalvo)
        : [];

      const chaveNovo = gerarChave(itemConfigurado);

      const indiceExistente = listaCarrinho.findIndex(
        (item) => gerarChave(item) === chaveNovo
      );

      if (indiceExistente !== -1) {
        // Produto igual: soma as quantidades
        const existente = listaCarrinho[indiceExistente];

        const novaQuantidade =
          Number(existente.quantidade || 0) +
          qtdPrincipal;

        listaCarrinho[indiceExistente] = {
          ...existente,
          quantidade: novaQuantidade,
          valorTotal:
            Number(existente.precoUnitario) *
            novaQuantidade,
        };
      } else {
        // Produto novo ou configuração diferente
        listaCarrinho.push(itemConfigurado);
      }

      await AsyncStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(listaCarrinho)
      );

      onClose();

      router.push("/carrinho" as any);

      mostrarMensagemCarrinho(
        "Produto adicionado ao carrinho"
      );
    } catch (erro) {
      console.error(
        "Erro ao adicionar ao carrinho:",
        erro
      );

      Alert.alert(
        "Erro",
        "Não foi possível adicionar o produto."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={produtoModalStyle.overlay}>
        <Pressable
          style={produtoModalStyle.backdrop}
          onPress={onClose}
        />

        <View style={produtoModalStyle.sheetContainer}>
          <View style={produtoModalStyle.dragHandle} />

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
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
                  style={produtoModalStyle.btnMenos}
                  onPress={() =>
                    setQtdPrincipal((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                >
                  <Text style={produtoModalStyle.txtBtnMenos}>
                    −
                  </Text>
                </Pressable>

                <Text style={produtoModalStyle.txtQtd}>
                  {qtdPrincipal}
                </Text>

                <Pressable
                  style={produtoModalStyle.btnMais}
                  onPress={() =>
                    setQtdPrincipal((q) => q + 1)
                  }
                >
                  <Text style={produtoModalStyle.txtBtnMais}>
                    +
                  </Text>
                </Pressable>
              </View>

              <Text style={produtoModalStyle.precoBase}>
                R$ {precoBase.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <Text style={produtoModalStyle.descricao}>
              {produto.descricao_produto ||
                produto.descricao}
            </Text>

            {gruposAdicionais.map(
              (grupo: any, indexGrupo: number) => {
                const nomeGrupo =
                  grupo.nome_grupo_adicional ||
                  grupo.nome ||
                  grupo.titulo;

                const itens =
                  grupo.adicionais || grupo.itens || [];

                const maximo = obterMaximo(grupo);

                const totalGrupo =
                  contarSelecionadosNoGrupo(
                    grupo,
                    adicionaisSelecionados
                  );

                const limiteAtingido =
                  maximo > 0 && totalGrupo >= maximo;

                return (
                  <View
                    key={
                      grupo.id_grupo_adicional ||
                      grupo.id ||
                      indexGrupo
                    }
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
                        <Text
                          style={
                            produtoModalStyle.tituloAdicionais
                          }
                        >
                          {nomeGrupo}{" "}
                          {maximo
                            ? `(Máx: ${maximo})`
                            : ""}
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

                    {itens.map(
                      (adicional: any, indexAd: number) => {
                        const id =
                          adicional.id_adicional ||
                          adicional.id ||
                          indexAd;

                        const nome =
                          adicional.nome_adicional ||
                          adicional.nome;

                        const preco = Number(
                          adicional.preco_adicional ??
                          adicional.preco ??
                          0
                        );

                        const qtd =
                          adicionaisSelecionados[id] || 0;

                        return (
                          <View
                            key={id}
                            style={
                              produtoModalStyle.itemAdicional
                            }
                          >
                            <Pressable
                              style={
                                produtoModalStyle.checkboxArea
                              }
                              onPress={() =>
                                handleToggleAdicional(
                                  id,
                                  grupo
                                )
                              }
                            >
                              <View>
                                <Text
                                  style={
                                    produtoModalStyle.nomeAdicional
                                  }
                                >
                                  {nome}
                                </Text>

                                <Text
                                  style={
                                    produtoModalStyle.precoAdicional
                                  }
                                >
                                  + R$ {preco.toFixed(2).replace(".", ",")}
                                </Text>
                              </View>
                            </Pressable>

                            <View
                              style={
                                produtoModalStyle.controleQtdPequeno
                              }
                            >
                              <Pressable
                                style={
                                  produtoModalStyle.btnMenosPequeno
                                }
                                onPress={() =>
                                  handleMudarQtdAdicional(
                                    id,
                                    -1,
                                    grupo
                                  )
                                }
                              >
                                <Text
                                  style={
                                    produtoModalStyle.txtBtnMenosPequeno
                                  }
                                >
                                  −
                                </Text>
                              </Pressable>

                              <Text
                                style={
                                  produtoModalStyle.txtQtdPequeno
                                }
                              >
                                {qtd}
                              </Text>

                              <Pressable
                                style={[
                                  produtoModalStyle.btnMaisPequeno,
                                  limiteAtingido && {
                                    opacity: 0.4,
                                  },
                                ]}
                                onPress={() =>
                                  handleMudarQtdAdicional(
                                    id,
                                    1,
                                    grupo
                                  )
                                }
                              >
                                <Text
                                  style={
                                    produtoModalStyle.txtBtnMaisPequeno
                                  }
                                >
                                  +
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        );
                      }
                    )}
                  </View>
                );
              }
            )}

            <Text style={produtoModalStyle.tituloAdicionais}>
              Observações
            </Text>

            <TextInput
              style={produtoModalStyle.inputObservacoes}
              placeholder="Ex: Tirar a cebola, mandar molho à parte..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={observacao}
              onChangeText={setObservacao}
            />

            <View style={produtoModalStyle.rodape}>
              <Text style={produtoModalStyle.valorTotal}>
                R$ {valorTotal.toFixed(2).replace(".", ",")}
              </Text>

              <Pressable
                style={produtoModalStyle.btnAdicionar}
                onPress={handleConfirmarAdicao}
                disabled={salvando}
              >
                <Text
                  style={
                    produtoModalStyle.txtBtnAdicionar
                  }
                >
                  {salvando
                    ? "Adicionando..."
                    : "Adicionar ao carrinho"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
