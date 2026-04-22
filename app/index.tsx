import Header from '@/src/components/Header';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CardPremio from '@/src/components/CardPremio';
import CardRifa from '@/src/components/CardRifa';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';
import { Image, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776702735/primeiropremio_dqcya4.png',
  'https://res.cloudinary.com/do4p13i1a/image/upload/v1776702819/segundopremio_qb0la8.png',
];

export default function Home() {
    const router = useRouter()
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
        <ScrollView style={styles.container}>
            <Header />
             <View style={styles.container2}>
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
            <Text style={styles.text}>Concorra a R$ 20 Mil em Prêmios</Text>
            <View style={styles.containerCardPremio}>
            <CardPremio
                titulo="1º Prêmio"
                valor="R$ 15.000"
                imagem={require('@/src/assets/trofeu.png')}
            />
             <CardPremio
                titulo="2º Prêmio"
                valor="R$ 5.000"
                imagem={require('@/src/assets/trofeu2.png')}
            />
            </View>
            <View style={styles.containerCardRifa}>
            <CardRifa onPress={() => router.replace('/rifa')} titulo='Escolha um Número e' descricao='Tenha duas chances de ganhar' textoExtra='Cada Número custa apenas R$ 20:' textoBotao="Escolher"/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 180, backgroundColor: '#0e0e0e' },
    text: { color: '#fff', textAlign: 'center', marginTop: 30, paddingHorizontal: 25, fontSize: 22, fontWeight: 'bold' },
    containerCardPremio: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginTop: 15,
    },
    containerCardRifa: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container2: {
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