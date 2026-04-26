import Header from '@/src/components/Header';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CardPremio from '@/src/components/CardPremio';
import CardRifa from '@/src/components/CardRifa';
import { useRouter } from 'expo-router';
import Carrossel from '@/src/components/Carrossel';

export default function Home() {
    const router = useRouter()
    const banners = [
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1777218413/2premio_yjegou.png",
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1777218413/1premio_egyakd.png",
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1777218414/doispremio_sfomuy.png",
    ];
    return (
        <ScrollView style={styles.container}>
            <Header />
            <Carrossel imagens={banners} intervalo={4000} altura={210} />
            <Text style={styles.text}>Concorra a Prêmios Incriveis</Text>
            <View style={styles.containerCardPremio}>
                <CardPremio
                    titulo="1º Prêmio"
                    valor="R$ 15.000"
                    imagem={require('@/src/assets/trofeu.png')}
                />
                <CardPremio
                    titulo="2º Prêmio"
                    valor="Viagem"
                    imagem={require('@/src/assets/trofeu2.png')}
                />
            </View>
            <View style={styles.containerCardRifa}>
                <CardRifa onPress={() => router.replace('/rifa')} titulo='Escolha um Número e tenha chance de ganhar dois prêmios' descricao='Tenha duas chances de ganhar' textoExtra='Cada Número custa apenas R$ 20:' textoBotao="Escolher" />
            </View>
            <Text style={styles.textInfo} onPress={() => router.replace('/info-rifa')}>Saber mais informações</Text>
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
    textInfo: {
        color: '#d1d1d1',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
    }
});