import { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  imagens: string[];
  intervalo?: number; // ms entre slides (padrão 3s)
  altura?: number;    // altura do banner (padrão 160)
};

export default function Carrossel({
  imagens,
  intervalo = 3000,
  altura = 160,
}: Props) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      const proximo = (indiceAtual + 1) % imagens.length;

      // fade out → troca → fade in
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIndiceAtual(proximo);

        scrollRef.current?.scrollTo({
          x: proximo * width,
          animated: false,
        });

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, intervalo);

    return () => clearInterval(timer);
  }, [indiceAtual, imagens.length, intervalo]);

  return (
    <View style={[styles.wrapper, { height: altura }]}>
      <Animated.View style={[styles.animContainer, { opacity: fadeAnim }]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{ width, height: altura }}
        >
          {imagens.map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={[styles.imagem, { width, height: altura }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </Animated.View>

      {/* DOTS */}
      <View style={styles.dots}>
        {imagens.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === indiceAtual && styles.dotAtivo,
            ]}
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
  animContainer: {
    flex: 1,
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