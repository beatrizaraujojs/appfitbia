import React from "react";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 
import BottomBar from "@/components/BottomBar";
import globalStyle from "@/styles/globalStyle";
import duvidasFrequentesStyle from "@/styles/duvidasFrequentes";
 
export default function DuvidasFrequentesScreen() {
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={[globalStyle.areaConteudo, { flex: 1 }]}>
          {/* Header com Voltar e Logo */}
          <View style={duvidasFrequentesStyle.header}>
            <Pressable
              onPress={() => router.back()}
              style={duvidasFrequentesStyle.btnVoltar}
            >
              <Image
                source={require("@/assets/images/fitbia/de-volta.png")}
                style={duvidasFrequentesStyle.iconeVoltar}
              />
            </Pressable>
 
            <Text style={duvidasFrequentesStyle.tituloTermos}>
              Dúvidas frequentes
            </Text>
          </View>
 
          <View style={duvidasFrequentesStyle.divisor} />
 
          <View style={duvidasFrequentesStyle.conteudoTermos}>
            <View style={duvidasFrequentesStyle.cardTermos}>
              {/* Cabeçalho do Card */}
              <View style={duvidasFrequentesStyle.cabecalhoCard}>
                <Text style={duvidasFrequentesStyle.titulo}>
                  Tudo o que você precisa saber
                </Text>
                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={duvidasFrequentesStyle.logoTopo}
                  resizeMode="contain"
                />
              </View>
 
              {/* Conteúdo com Scroll */}
              <ScrollView
                style={duvidasFrequentesStyle.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={duvidasFrequentesStyle.scrollContainer}
              >
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  Como funciona a entrega dos pedidos?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  Nossas entregas são feitas de segunda a sexta-feira, em
                  horários comerciais. Os pedidos agendados até as 18h são
                  entregues no dia seguinte ou na data escolhida por você no
                  fechamento do pedido.
                </Text>
 
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  Qual o prazo de validade das refeições?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  As nossas refeições duram até 3 dias mantidas sob refrigeração
                  na geladeira (entre 2°C e 5°C) e até 30 dias se guardadas
                  diretamente no congelador ou freezer a partir da data de
                  fabricação carimbada na etiqueta.
                </Text>
 
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  Como devo aquecer as marmitas?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  Nossas embalagens são 100% livres de BPA e podem ir direto ao
                  micro-ondas. Basta abrir ligeiramente a tampa e aquecer por 3
                  a 5 minutos (se estiver congelada) ou 1 a 2 minutos (se já
                  estiver descongelada).
                </Text>
 
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  Posso alterar ou cancelar meu pedido após a finalização?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  Alterações ou cancelamentos podem ser solicitados através dos
                  nossos canais de atendimento, desde que o pedido ainda não
                  tenha entrado em estágio de produção ou separação na cozinha.
                </Text>
 
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  Quais são as formas de pagamento aceitas?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  Aceitamos pagamentos via PIX, cartões de crédito e débito
                  diretamente pelo aplicativo no momento de fechar o seu pedido.
                </Text>
 
                <Text style={duvidasFrequentesStyle.subtitulo}>
                  As marmitas contêm informações sobre alérgenos?
                </Text>
                <Text style={duvidasFrequentesStyle.texto}>
                  Sim, todas as descrições dos pratos no cardápio e os rótulos
                  contêm a lista detalhada de ingredientes, destacando a
                  possível presença de glúten, lactose e outros alérgenos
                  comuns.
                </Text>
              </ScrollView>
            </View>
          </View>
 
          <BottomBar abaAtiva="config" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
 
 