import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import sairStyle from "../styles/sairStyle";

interface ModalSairProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalSair({
  visible,
  onClose,
  onConfirm,
}: ModalSairProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={sairStyle.overlay}>
        <View style={sairStyle.card}>
          {/* Botão X */}
          <Pressable style={sairStyle.btnFechar} onPress={onClose}>
            <Text style={sairStyle.txtFechar}>X</Text>
          </Pressable>

          {/* Mensagens */}
          <Text style={sairStyle.titulo}>Quer mesmo sair?</Text>
          <Text style={sairStyle.subtitulo}>
            Você terá que logar novamente para entrar no aplicativo FitBia.
          </Text>

          {/* Botões de Ação */}
          <View style={sairStyle.acoes}>
            <Pressable style={sairStyle.btnCancelar} onPress={onClose}>
              <Text style={sairStyle.txtCancelar}>Cancelar</Text>
            </Pressable>

            <Pressable style={sairStyle.btnSair} onPress={onConfirm}>
              <Text style={sairStyle.txtSair}>Sair</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}