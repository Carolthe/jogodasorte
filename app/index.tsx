import Carousel from '@/src/components/Carrosel';
import Header from '@/src/components/Header';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CardPremio from '@/src/components/CardPremio';
import CardRifa from '@/src/components/CardRifa';
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter()
    return (
        <ScrollView style={styles.container}>
            <Header />
            <Carousel />
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
    }
});