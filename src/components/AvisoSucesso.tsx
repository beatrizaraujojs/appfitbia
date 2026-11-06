import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Props = {
  mensagem: string;
  visivel: boolean;
};

export default function AvisoSucesso({
  mensagem,
  visivel,
}: Props) {
  const [mostrar, setMostrar] = useState(visivel);

  useEffect(() => {
    setMostrar(visivel);
  }, [visivel]);

  if (!mostrar) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 12,
        left: 8,
        right: 8,
        alignItems: "center",
        zIndex: 999,
        elevation: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#C8D9C9",
          borderRadius: 5,
          paddingHorizontal: 12,
          paddingVertical: 10,
          maxWidth: "100%",
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
          style={{
            color: "#285C38",
            fontSize: 11,
            textAlign: "center",
          }}
        >
          {mensagem}
        </Text>
      </View>
    </View>
  );
}
