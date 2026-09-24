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
import termosdeUsoSobrestyle from "@/styles/termosdeUsoSobrestyle";
 
export default function TermosUsoSobreScreen() {
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/fitbia/fundo-fitbia.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={[globalStyle.areaConteudo, { flex: 1 }]}>
          {/* Header com Voltar e Logo */}
          <View style={termosdeUsoSobrestyle.header}>
            <Pressable
              onPress={() => router.back()}
              style={termosdeUsoSobrestyle.btnVoltar}
            >
              <Image
                source={require("@/assets/images/fitbia/de-volta.png")}
                style={termosdeUsoSobrestyle.iconeVoltar}
              />
            </Pressable>
 
            <Text style={termosdeUsoSobrestyle.tituloTermos}>
              Termos e condições de uso
            </Text>
          </View>
 
          <View style={termosdeUsoSobrestyle.divisor} />
         
          <View style={termosdeUsoSobrestyle.conteudoTermos}>
            <View style={termosdeUsoSobrestyle.cardTermos}>
             
              {/* Cabeçalho do Card */}
              <View style={termosdeUsoSobrestyle.cabecalhoCard}>
                <Text style={termosdeUsoSobrestyle.titulo}>TERMOS DE USO</Text>
                <Image
                  source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
                  style={termosdeUsoSobrestyle.logoTopo}
                  resizeMode="contain"
                />
              </View>
 
              {/* Conteúdo com Scroll */}
              <ScrollView
                style={termosdeUsoSobrestyle.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={termosdeUsoSobrestyle.scrollContainer}
              >
                <Text style={termosdeUsoSobrestyle.texto}>
                  Última atualização: 10/08/2026{"\n\n"}
                  Bem-vindo(a) ao App Fitbia. Estes Termos de Uso estabelecem as regras para utilização do aplicativo e para a compra de marmitas congeladas disponibilizadas pela plataforma. Ao utilizar o aplicativo, realizar um cadastro ou efetuar um pedido, o usuário declara que leu e concorda com estes Termos de Uso.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>1. SOBRE O APLICATIVO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  O App Fitbia é uma plataforma destinada à divulgação e comercialização de marmitas congeladas, permitindo que os usuários consultem o cardápio, conheçam os produtos disponíveis e realizem pedidos.{"\n"}
                  As informações apresentadas no aplicativo poderão incluir descrição das refeições, ingredientes, peso, informações nutricionais, preço, validade e orientações de conservação e preparo.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>2. CADASTRO DO USUÁRIO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  Para realizar pedidos, o usuário poderá precisar fornecer informações pessoais, como nome, telefone e endereço de entrega.{"\n"}
                  O usuário se compromete a fornecer informações verdadeiras, completas e atualizadas, sendo responsável por eventuais problemas decorrentes de informações incorretas.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>3. PEDIDOS</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  O usuário poderá selecionar as marmitas disponíveis no aplicativo, escolher suas respectivas quantidades e confirmar o pedido.{"\n"}
                  Antes de finalizar a compra, o usuário deverá conferir os produtos selecionados, quantidade, valor total, endereço e demais informações apresentadas.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>4. PREÇOS</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  A disponibilidade das marmitas poderá variar conforme estoque e produção. Os preços e condições de pagamento são informados diretamente no aplicativo no momento da compra.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>5. PAGAMENTO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  As formas de pagamento são apresentadas durante a finalização do pedido. O usuário é responsável pela veracidade das informações fornecidas para a realização do pagamento.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>6. ENTREGA</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  As entregas são realizadas nos endereços cadastrados pelos usuários dentro da área de cobertura do App Fitbia, observando os prazos estimados informados na plataforma.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>7. CONSERVAÇÃO E CONSUMO DOS PRODUTOS</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  As marmitas congeladas deverão ser armazenadas e conservadas de acordo com as orientações apresentadas na embalagem e no aplicativo. O usuário deverá seguir corretamente as orientações de conservação, descongelamento, aquecimento e consumo dos produtos após o recebimento.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>8. CANCELAMENTOS E DEVOLUÇÕES</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  Solicitações de cancelamento, troca ou devolução deverão ser realizadas pelos canais de atendimento disponibilizados pelo App Fitbia. A possibilidade de cancelamento poderá depender do estágio de preparação e envio do pedido.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>9. RESPONSABILIDADE DO USUÁRIO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  O usuário se compromete a utilizar o aplicativo de forma adequada e de acordo com a legislação vigente. Também é responsável por manter seus dados de acesso seguros e pelas informações fornecidas durante o cadastro e realização dos pedidos.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>10. PRIVACIDADE E DADOS PESSOAIS</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  O App Fitbia poderá coletar e utilizar dados pessoais necessários para o funcionamento da plataforma, realização de pedidos, atendimento ao usuário e entrega dos produtos. O tratamento dos dados será realizado de acordo com a legislação aplicável e com a Política de Privacidade disponibilizada pelo aplicativo.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>11. DISPONIBILIDADE DO APLICATIVO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  O App Fitbia buscará manter o aplicativo disponível para utilização, porém poderão ocorrer interrupções temporárias decorrentes de manutenção, atualizações, falhas técnicas, problemas de conexão ou outros fatores fora do controle da plataforma.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>12. ALTERAÇÕES DOS TERMOS DE USO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  Os presentes Termos de Uso poderão ser atualizados ou modificados sempre que necessário para refletir alterações no funcionamento do aplicativo, nos serviços oferecidos ou na legislação aplicável. A versão atualizada será disponibilizada no aplicativo, acompanhada da respectiva data de atualização.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>13. ATENDIMENTO</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  Em caso de dúvidas, reclamações, solicitações ou problemas relacionados aos pedidos e ao aplicativo, o usuário poderá entrar em contato por meio dos canais de atendimento disponibilizados pelo App Fitbia.
                </Text>
 
                <Text style={termosdeUsoSobrestyle.subtitulo}>14. ACEITAÇÃO DOS TERMOS</Text>
                <Text style={termosdeUsoSobrestyle.texto}>
                  Ao criar uma conta, utilizar o aplicativo ou realizar um pedido, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde com alguma das condições apresentadas, deverá interromper a utilização do aplicativo e não realizar pedidos pela plataforma.
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
 