import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onAplicarCupom?: (codigo: string, desconto: number) => void;
}

const SERVIDOR = "http://localhost:8081"; // Alinha com a porta do teu projeto

export default function AdicionarCupomModal({
  visible,
  onClose,
  onAplicarCupom,
}: ModalProps) {
  const [cupom, setCupom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAplicar = async () => {
    if (!cupom.trim()) {
      Alert.alert("Atenção", "Digite um código de cupom.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${SERVIDOR}/api/v1/cupons/validar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ codigo: cupom }),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        Alert.alert("Sucesso", `Cupom ${json.data.codigo} aplicado! Desconto de ${json.data.desconto}%.`);
        
        if (onAplicarCupom) {
          onAplicarCupom(json.data.codigo, json.data.desconto);
        }
        
        setCupom("");
        onClose();
      } else {
        Alert.alert("Erro", json.message || "Cupom não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor para validar o cupom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Botão Fechar (X) */}
          <Pressable style={styles.btnFechar} onPress={onClose}>
            <Text style={styles.txtFechar}>X</Text>
          </Pressable>

          {/* Ícone do topo */}
          <View style={styles.circuloIcone}>
            <Image
              source={require("@/assets/images/fitbia/promo-code.png")}
              style={styles.iconeCupom}
            />
          </View>

          {/* Título e Textos */}
          <Text style={styles.titulo}>Adicionar cupom</Text>
          <Text style={styles.subtitulo}>Você tem um cupom de desconto?</Text>
          <Text style={styles.descricao}>
            Insira o código abaixo para aplicar seu benefício.
          </Text>

          {/* Input do Cupom */}
          <TextInput
            style={styles.input}
            placeholder="Digite seu código"
            placeholderTextColor="#A0A0A0"
            value={cupom}
            onChangeText={setCupom}
            autoCapitalize="none"
          />

          {/* Botão Aplicar com Ícone de Tag */}
          <Pressable 
            style={[styles.btnAplicar, loading && { opacity: 0.7 }]} 
            onPress={handleAplicar}
            disabled={loading}
          >
            <Image
              source={require("@/assets/images/fitbia/prince-tag-bege.png")}
              style={styles.iconeBtnTag}
              resizeMode="contain"
            />
            <Text style={styles.txtBtnAplicar}>
              {loading ? "A validar..." : "Aplicar cupom"}
            </Text>
          </Pressable>

          {/* Divisor */}
          <View style={styles.linhaDivisoria} />

          {/* Banner Informativo (Rodapé do Modal com Ícone de Presente) */}
          <View style={styles.cardInfo}>
            <View style={styles.circuloInfoIcone}>
              <Image
                source={require("@/assets/images/fitbia/gift (1).png")}
                style={styles.iconePresente}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textoInfoContainer}>
              <Text style={styles.tituloInfo}>Não possui um cupom?</Text>
              <Text style={styles.descInfo}>
                Fique de olho nas nossas ofertas e promoções!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#FAF9F6",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  btnFechar: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 8,
    zIndex: 1,
  },
  txtFechar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3B2D",
  },
  circuloIcone: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E2EBE0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  iconeCupom: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3B2D",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 13,
    color: "#7A7A7A",
    textAlign: "center",
  },
  descricao: {
    fontSize: 13,
    color: "#7A7A7A",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
  },
  btnAplicar: {
    width: "100%",
    height: 50,
    backgroundColor: "#2B3A28",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  iconeBtnTag: {
    width: 20,
    height: 20,
  },
  txtBtnAplicar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linhaDivisoria: {
    width: "100%",
    height: 1,
    backgroundColor: "#EBEBEB",
    marginVertical: 20,
  },
  cardInfo: {
    width: "100%",
    backgroundColor: "#E2EBE0",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  circuloInfoIcone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#C9DBC5",
    justifyContent: "center",
    alignItems: "center",
  },
  iconePresente: {
    width: 24,
    height: 24,
  },
  textoInfoContainer: {
    flex: 1,
  },
  tituloInfo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2D3B2D",
    marginBottom: 2,
  },
  descInfo: {
    fontSize: 11,
    color: "#555555",
    lineHeight: 14,
  },
});