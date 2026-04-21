import React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
  titulo?: string;
  valor?: string;
  imagem: ImageSourcePropType;
};

export default function CardPremio({
  titulo = '1º Prêmio',
  valor = 'R$ 15.000',
  imagem,
}: Props) {
  return (
    <View style={styles.card}>
      {/* <Image source={imagem} style={styles.image} resizeMode="contain" /> */}

      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    elevation: 3, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: 160,
    marginVertical: 8,
  },
  image: {
  
    marginRight: 12,
  },
  info: {
    flexDirection: 'column',
  },
  titulo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  valor: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 4,
    fontWeight: 'bold'
  },
});