import { Modal, View, Text, ScrollView, Pressable, Image } from "react-native";
 
import termosUsoStyle from "@/styles/termosUsoStyle";
 
interface TermosUsoProps {
  visible: boolean;
  onClose: () => void;
}
 
export default function TermosUsoModal({ visible, onClose }: TermosUsoProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={termosUsoStyle.sobrepor}>
        <View style={termosUsoStyle.conteudo}>
          <View style={termosUsoStyle.cabecalho}>
            <Text style={termosUsoStyle.titulo}>TERMOS DE USO</Text>
 
            <Pressable onPress={onClose} style={termosUsoStyle.btnFechar}>
              <Text style={termosUsoStyle.iconeFechar}>✕</Text>
            </Pressable>
          </View>
 
          <ScrollView style={termosUsoStyle.scroll}>
            <Text style={termosUsoStyle.texto}>
              Última atualização: 10/08/2026 <br />
              Bem-vindo(a) ao App Fitbia. Estes Termos de Uso estabelecem as
              regras para utilização do aplicativo e para a compra de marmitas
              congeladas disponibilizadas pela plataforma. Ao utilizar o
              aplicativo, realizar um cadastro ou efetuar um pedido, o usuário
              declara que leu e concorda com estes Termos de Uso.
            </Text>
            <Text style={termosUsoStyle.subtitulo}>1. SOBRE O APLICATIVO</Text>
            <Text style={termosUsoStyle.texto}>
              Aos criar a conta e ao utilizar o aplicativo TheGusta, você
              declara que leu, compreendeu e concorda com os Termos de Uso.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>2. CADASTRO DO USUÁRIO</Text>
            <Text style={termosUsoStyle.texto}>
              Para utilizar o aplicativo é necessario se cadastrar.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>3. PEDIDOS</Text>
            <Text style={termosUsoStyle.texto}>
              O usuario é responsavel por manter a confidencialidade de todos os
              seus dados de acesso
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>4. PREÇOS</Text>
            <Text style={termosUsoStyle.texto}>
              O Aplicativo TheGusta poderá ser utilizado para fazer pedidos,
              verificar produtos e cadastrar informações pessoais.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>5. PAGAMENTO</Text>
            <Text style={termosUsoStyle.texto}>
              A disponibilidade de produtos pode variar. Informações
              relacionadas a descrição do produto, preços e ingredientes serão
              apresentados no aplicativo.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>6. ENTREGA</Text>
            <Text style={termosUsoStyle.texto}>
              As formas de pagamento são apresentadas durante a finalização do
              pedido. O usuario é responsavel pela veracidade das informações
              fornecidas para a realização do pagamentos.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              7. CONSERVAÇÃO E CONSUMO DOS PRODUTOS
            </Text>
            <Text style={termosUsoStyle.texto}>
              As marmitas congeladas deverão ser armazenadas e conservadas de
              acordo com as orientações apresentadas na embalagem e no
              aplicativo. O usuário deverá seguir corretamente as orientações de
              conservação, descongelamento, aquecimento e consumo dos produtos
              após o recebimento.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              8. CANCELAMENTOS E DEVOLUÇÕES
            </Text>
            <Text style={termosUsoStyle.texto}>
              Solicitações de cancelamento, troca ou devolução deverão ser
              realizadas pelos canais de atendimento disponibilizados pelo App
              Fitbia. A possibilidade de cancelamento poderá depender do estágio
              de preparação e envio do pedido.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              9. RESPONSABILIDADE DO USUÁRIO
            </Text>
            <Text style={termosUsoStyle.texto}>
              O usuário se compromete a utilizar o aplicativo de forma adequada
              e de acordo com a legislação vigente. Também é responsável por
              manter seus dados de acesso seguros e pelas informações fornecidas
              durante o cadastro e realização dos pedidos.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              10. PRIVACIDADE E DADOS PESSOAIS
            </Text>
            <Text style={termosUsoStyle.texto}>
              O App Fitbia poderá coletar e utilizar dados pessoais necessários
              para o funcionamento da plataforma, realização de pedidos,
              atendimento ao usuário e entrega dos produtos. O tratamento dos
              dados será realizado de acordo com a legislação aplicável e com a
              Política de Privacidade disponibilizada pelo aplicativo.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              11. DISPONIBILIDADE DO APLICATIVO
            </Text>
            <Text style={termosUsoStyle.texto}>
              O App Fitbia buscará manter o aplicativo disponível para
              utilização, porém poderão ocorrer interrupções temporárias
              decorrentes de manutenção, atualizações, falhas técnicas,
              problemas de conexão ou outros fatores fora do controle da
              plataforma.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              12. ALTERAÇÕES DOS TERMOS DE USO
            </Text>
            <Text style={termosUsoStyle.texto}>
              Os presentes Termos de Uso poderão ser atualizados ou modificados
              sempre que necessário para refletir alterações no funcionamento do
              aplicativo, nos serviços oferecidos ou na legislação aplicável. A
              versão atualizada será disponibilizada no aplicativo, acompanhada
              da respectiva data de atualização.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>13. ATENDIMENTO</Text>
            <Text style={termosUsoStyle.texto}>
              Em caso de dúvidas, reclamações, solicitações ou problemas
              relacionados aos pedidos e ao aplicativo, o usuário poderá entrar
              em contato por meio dos canais de atendimento disponibilizados
              pelo App Fitbia.
            </Text>
 
            <Text style={termosUsoStyle.subtitulo}>
              14. ACEITAÇÃO DOS TERMOS
            </Text>
            <Text style={termosUsoStyle.texto}>
              Ao criar uma conta, utilizar o aplicativo ou realizar um pedido, o
              usuário declara que leu, compreendeu e concorda com estes Termos
              de Uso. Caso não concorde com alguma das condições apresentadas,
              deverá interromper a utilização do aplicativo e não realizar
              pedidos pela plataforma.
            </Text>
          </ScrollView>
          <Image
            source={require("@/assets/images/fitbia/FITBIA LOGO (1).svg")}
            style={termosUsoStyle.logo}
          />
        </View>
      </View>
    </Modal>
  );
}