
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type Listener = (mensagem: string) => void;

const listeners = new Set<Listener>();
let temporizador: ReturnType<typeof setTimeout> | null = null;

export function mostrarMensagemCarrinho(
  texto = "Produto adicionado ao carrinho"
) {
  listeners.forEach((listener) => listener(texto));
}

export default function MensagemCarrinho() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const receberMensagem = (texto: string) => {
      setMensagem(texto);

      if (temporizador) {
        clearTimeout(temporizador);
      }

      temporizador = setTimeout(() => {
        setMensagem("");
        temporizador = null;
      }, 2500);
    };

    listeners.add(receberMensagem);

    return () => {
      listeners.delete(receberMensagem);

      if (listeners.size === 0 && temporizador) {
        clearTimeout(temporizador);
        temporizador = null;
      }
    };
  }, []);

  if (!mensagem) return null;

  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={styles.mensagem}>
        <Text style={styles.texto}>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    elevation: 10,
  },

  mensagem: {
    backgroundColor: "#B8C7B9",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 5,
    maxWidth: "90%",
    alignItems: "center",
  },

  texto: {
    color: "#26823C",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
});
