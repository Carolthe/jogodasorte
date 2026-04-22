import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images: string[] = [
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776874710/p1_vpbbr8.webp',
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776874709/p2_wauoka.webp',
];

export default function Carrosel() {
  const flatListRef = useRef<FlatList<string> | null>(null);
  const indexRef = useRef<number>(0);

  const [_, setTick] = useState(0); // só para re-render leve (opcional)

  // pré-carregar imagens
  useEffect(() => {
    images.forEach(uri => {
      Image.prefetch(uri);
    });
  }, []);

  // autoplay mais lento e sem múltiplos intervals
  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % images.length;

      flatListRef.current?.scrollToIndex({
        index: indexRef.current,
        animated: true,
      });

      setTick(t => t + 1);
    }, 6000); // ⬅️ MAIS LENTO (6 segundos)

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    marginTop: 30,
  },
  image: {
    width,
    height: 180,
    resizeMode: 'cover',
  },
});