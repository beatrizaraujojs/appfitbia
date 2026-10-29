
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyle";
import validarTokenStyle from "@/styles/validarToken";

const API = "http://localhost:8081/api/v1";

export default function ValidarTokenScreen() {
  const params = useLocalSearchParams();
  const email = String(params.email || "");

  const [codigo, setCodigo] = useState("");
  const [validando, setValidando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const [segundos, setSegundos] = useState(120);

  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const inputRef = useRef<TextInput>(null);

  // Travas para impedir requisições duplicadas
  const reenvioEmAndamento = useRef(false);
  const validacaoEmAndamento = useRef(false);

  // Contagem regressiva de 2 minutos
  useEffect(() => {
    if (segundos <= 0) return;

    const intervalo = setInterval(() => {
      setSegundos((anterior) => Math.max(0, anterior - 1));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [segundos]);

  const tempoFormatado =
    `${Math.floor(segundos / 60)}:` +
    `${String(segundos % 60).padStart(2, "0")}`;

  // Validar o código informado
  async function validarCodigo() {
    if (
      validacaoEmAndamento.current ||
      reenvioEmAndamento.current
    ) {
      return;
    }

    setMensagemErro("");
    setMensagemSucesso("");

    if (segundos <= 0) {
      setMensagemErro(
        "O código expirou. Solicite um novo código."
      );
      return;
    }

    if (codigo.length !== 4) {
      setMensagemErro("Informe os quatro dígitos.");
      return;
    }

    if (!email) {
      setMensagemErro(
        "E-mail não identificado. Solicite um novo código."
      );
      return;
    }

    // Bloqueia imediatamente novas validações
    validacaoEmAndamento.current = true;
    setValidando(true);

    try {
      const resposta = await fetch(`${API}/senha/validar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          codigo,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        setMensagemErro(
          json.message || "Código inválido ou expirado."
        );
        return;
      }

      if (!json.reset_token) {
        setMensagemErro(
          "Não foi possível confirmar o código."
        );
        return;
      }

      router.replace({
        pathname: "/redefinirSenha",
        params: {
          email,
          resetToken: json.reset_token,
        },
      });
    } catch (erro) {
      setMensagemErro(
        "Não foi possível validar o código. Tente novamente."
      );
    } finally {
      validacaoEmAndamento.current = false;
      setValidando(false);
    }
  }

  // Reenviar código somente após os 2 minutos
  async function reenviarCodigo() {
    // Bloqueia cliques repetidos imediatamente
    if (
      segundos > 0 ||
      reenvioEmAndamento.current ||
      validacaoEmAndamento.current
    ) {
      return;
    }

    setMensagemErro("");
    setMensagemSucesso("");

    if (!email) {
      setMensagemErro(
        "E-mail não identificado. Volte e solicite um novo código."
      );
      return;
    }

    // Ativa a trava antes da requisição
    reenvioEmAndamento.current = true;
    setReenviando(true);

    try {
      const resposta = await fetch(`${API}/senha/solicitar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok) {
        setMensagemErro(
          json.message || "Não foi possível reenviar o código."
        );
        return;
      }

      // Reinicia a tela após o reenvio
      setCodigo("");
      setSegundos(120);
      setMensagemErro("");
      setMensagemSucesso("Token reenviado");
    } catch (erro) {
      setMensagemErro(
        "Não foi possível reenviar o código. Tente novamente."
      );
    } finally {
      // Libera a trava após a resposta do servidor
      reenvioEmAndamento.current = false;
      setReenviando(false);
    }
  }

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <View style={validarTokenStyle.conteudo}>
            <Image
              source={require("@/assets/images/fitbia/logo-fitbia.svg")}
              style={validarTokenStyle.logo}
              resizeMode="contain"
            />

            <Text style={validarTokenStyle.titulo}>
              Validar código
            </Text>

            <Text style={validarTokenStyle.subtitulo}>
              Informe o código de 4 dígitos enviado
              {"\n"}para seu e-mail cadastrado
            </Text>

            <Text style={validarTokenStyle.label}>
              Código de verificação:
            </Text>

            {/* Quadradinhos do código */}
            <Pressable
              style={validarTokenStyle.codigoContainer}
              onPress={() => inputRef.current?.focus()}
            >
              {[0, 1, 2, 3].map((indice) => (
                <View
                  key={indice}
                  style={[
                    validarTokenStyle.quadrado,
                    codigo.length === indice &&
                      validarTokenStyle.quadradoAtivo,
                  ]}
                >
                  <Text style={validarTokenStyle.digito}>
                    {codigo[indice] || ""}
                  </Text>
                </View>
              ))}
            </Pressable>

            {/* Campo de digitação */}
            <TextInput
              ref={inputRef}
              value={codigo}
              onChangeText={(valor) => {
                setCodigo(
                  valor.replace(/\D/g, "").slice(0, 4)
                );
                setMensagemErro("");
                setMensagemSucesso("");
              }}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
              caretHidden
              style={validarTokenStyle.inputOculto}
              editable={
                segundos > 0 &&
                !validando &&
                !reenviando
              }
            />

            {/* Mensagem de erro em vermelho */}
            {mensagemErro !== "" && (
              <Text
                style={{
                  color: "#D32F2F",
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 13,
                }}
              >
                {mensagemErro}
              </Text>
            )}

            {/* Mensagem de sucesso em verde */}
            {mensagemSucesso !== "" && (
              <Text
                style={{
                  color: "#2E7D32",
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {mensagemSucesso}
              </Text>
            )}

            {/* Tempo de validade */}
            <Text style={validarTokenStyle.tempo}>
              {segundos > 0
                ? `Código válido por ${tempoFormatado}`
                : "O tempo de utilização terminou."}
            </Text>

            {/* Botão validar */}
            <Pressable
              style={[
                validarTokenStyle.btnValidar,
                (validando ||
                  reenviando ||
                  codigo.length !== 4 ||
                  segundos === 0) && {
                  opacity: 0.5,
                },
              ]}
              onPress={validarCodigo}
              disabled={
                validando ||
                reenviando ||
                codigo.length !== 4 ||
                segundos === 0
              }
            >
              {validando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={validarTokenStyle.txtValidar}>
                  Validar código
                </Text>
              )}
            </Pressable>

            {/* Reenviar somente após 2 minutos */}
            {segundos === 0 && (
              <Pressable
                style={[
                  validarTokenStyle.btnReenviar,
                  reenviando && { opacity: 0.5 },
                ]}
                onPress={reenviarCodigo}
                disabled={reenviando || validando}
              >
                {reenviando ? (
                  <ActivityIndicator color="#385039" />
                ) : (
                  <Text style={validarTokenStyle.txtReenviar}>
                    Reenviar código
                  </Text>
                )}
              </Pressable>
            )}

            {/* Voltar ao login */}
            <Pressable
              style={validarTokenStyle.btnVoltar}
              onPress={() => router.replace("/login")}
              disabled={reenviando || validando}
            >
              <Text style={validarTokenStyle.txtVoltar}>
                Voltar ao Login
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
