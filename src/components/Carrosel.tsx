import { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776873879/imagem_mobile_1_fihtrj.webp',
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776873879/imagem_mobile_2_chisid.webp',
];

export default function Carousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  // Avança o índice a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animação suave usando Animated.timing
  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: -index * width,
      duration: 800, // duração da animação em ms (mais suave)
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slider,
          { transform: [{ translateX: scrollX }] },
        ]}
      >
        {images.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.image} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    overflow: 'hidden',
    marginTop: 30,
  },
  slider: {
    flexDirection: 'row',
    width: width * images.length,
  },
  image: {
    width,
    height: 180,
    resizeMode: 'cover',
  },
});