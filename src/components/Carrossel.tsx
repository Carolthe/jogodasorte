import { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  imagens: string[];
  intervalo?: number;
  altura?: number;
};

export default function Carrossel({
  imagens,
  intervalo = 3000,
  altura = 160,
}: Props) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const scrollRef    = useRef<ScrollView>(null);
  const arrastando   = useRef(false);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── inicia/reinicia o timer automático ──────────────────────────────────
  function iniciarTimer() {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (arrastando.current) return; // pausa enquanto arrasta

      setIndiceAtual((prev) => {
        const proximo = (prev + 1) % imagens.length;
        scrollRef.current?.scrollTo({ x: proximo * width, animated: true });
        return proximo;
      });
    }, intervalo);
  }

  useEffect(() => {
    iniciarTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [imagens.length, intervalo]);

  // ── detecta qual slide está visível após scroll manual ──────────────────
  function handleScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x      = e.nativeEvent.contentOffset.x;
    const indice = Math.round(x / width);
    setIndiceAtual(indice);
    arrastando.current = false;
    iniciarTimer(); // reinicia timer após soltar
  }

  return (
    <View style={[styles.wrapper, { height: altura }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={true}           // ✅ permite arrastar
        showsHorizontalScrollIndicator={false}
        style={{ width, height: altura }}
        onScrollBeginDrag={() => {
          arrastando.current = true;   // ✅ pausa o timer ao tocar
          if (timerRef.current) clearInterval(timerRef.current);
        }}
        onMomentumScrollEnd={handleScrollEnd} // ✅ detecta slide após soltar
        scrollEventThrottle={16}
      >
        {imagens.map((uri, i) => (
          <Image
            key={i}
            source={typeof uri === "string" ? { uri } : uri}
            style={[styles.imagem, { width, height: altura }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* DOTS */}
      <View style={styles.dots}>
        {imagens.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === indiceAtual && styles.dotAtivo]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "relative",
  },
  imagem: {
    borderRadius: 0,
  },
  dots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotAtivo: {
    backgroundColor: "#c9c9ca",
    width: 18,
  },
});