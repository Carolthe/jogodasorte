import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const images: string[] = [
  'https://image2url.com/r2/default/images/1774549024607-60300c3d-eff7-4752-9cd1-87c44f7ed346.webp',
  'https://image2url.com/r2/default/images/1774549157636-9f965893-34aa-4698-9b7b-e83b0ebe304c.webp',
  'https://image2url.com/r2/default/images/1774549219539-6199802e-4b0a-4a53-ae0c-0e2f27967282.webp',
];

export default function Carrosel(){
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState<number>(0);
  const [width, setWidth] = useState<number>(
    Dimensions.get('window').width
  );

  // 🔥 garante width correto (fix do deploy)
  useEffect(() => {
    const updateWidth = ({ window }: { window: any }) => {
      setWidth(window.width);
    };

    const subscription = Dimensions.addEventListener('change', updateWidth);

    return () => {
      subscription?.remove?.();
    };
  }, []);

  // 🔥 pré-carrega imagens (evita tela em branco no deploy)
  useEffect(() => {
    images.forEach((img) => {
      Image.prefetch(img);
    });
  }, []);

  // 🔥 troca automática de slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 animação suave
  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: -index * width,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [index, width]);

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {images.map((uri, i) => (
          <Image key={i} source={{ uri }} style={{ width, height: 270 }} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    overflow: 'hidden',
    marginTop: 30,
  },
  slider: {
    flexDirection: 'row',
  },
});