import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Rect, Circle, Mask, G } from "react-native-svg";
import { cores } from "@/styles/estilos";
 
const { width } = Dimensions.get("window");
 
interface DivisoriaCupomProps {
  color?: string;
  posicao?: "topo" | "rodape";
}
 
export default function DivisoriaOndulada({
  color,
  posicao = "topo",
}: DivisoriaCupomProps) {
  const fillColor = color || cores?.verdeFolha || "#2C5E3B";
 
  const totalCirculos = 16;
  const espacamento = width / totalCirculos;
  const raio = espacamento / 2.5;
 
  const renderCirculos = () => {
    const circulos = [];
    for (let i = 0; i <= totalCirculos; i++) {
      const cx = i * espacamento;
      // Invertemos a posição vertical para ajustar a borda do topo
      const cy = posicao === "topo" ? 16 : 0;
 
      circulos.push(
        <Circle
          key={i}
          cx={cx}
          cy={cy}
          r={raio}
          fill="black"
        />
      );
    }
    return circulos;
  };
 
  return (
    <View
      style={{
        width: "100%",
        height: 16,
        overflow: "hidden",
        marginBottom: posicao === "rodape" ? -2 : 0
      }}
    >
      <Svg height="18" width="100%" viewBox={`0 0 ${width} 16`}>
        <Mask id={`mask-${posicao}`}>
          <Rect x="0" y="0" width={width} height="16" fill="white" />
          <G>{renderCirculos()}</G>
        </Mask>
 
        <Rect
          x="0"
          y="0"
          width={width}
          height="16"
          fill={fillColor}
          mask={`url(#mask-${posicao})`}
        />
      </Svg>
    </View>
  );
}