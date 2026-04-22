import { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  'https://image2url.com/r2/default/images/1774549024607-60300c3d-eff7-4752-9cd1-87c44f7ed346.webp',
  'https://image2url.com/r2/default/images/1774549157636-9f965893-34aa-4698-9b7b-e83b0ebe304c.webp',
  'https://image2url.com/r2/default/images/1774549219539-6199802e-4b0a-4a53-ae0c-0e2f27967282.webp',
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
    height: 270,
    overflow: 'hidden',
    marginTop: 30,
  },
  slider: {
    flexDirection: 'row',
    width: width * images.length,
  },
  image: {
    width,
    height: 270,
    resizeMode: 'cover',
  },
});