import Header from '@/src/components/Header';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CardPremio from '@/src/components/CardPremio';
import CardRifa from '@/src/components/CardRifa';
import { useRouter } from 'expo-router';
import Carrossel from '@/src/components/Carrossel';

export default function Home() {
    const router = useRouter()
    const banners = [
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1777997062/ChatGPT_Image_5_05_2026_16_57_38_qpoufs.png",
        // "https://res.cloudinary.com/do4p13i1a/image/upload/v1777997062/ChatGPT_Image_5_05_2026_16_59_47_ut3pnq.png",
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1778070334/ChatGPT_Image_6_05_2026_13_24_31_kpezlq.png",
        "https://res.cloudinary.com/do4p13i1a/image/upload/v1777997062/ChatGPT_Image_5_05_2026_17_03_28_sylept.png",
    ];
    return (
        <ScrollView style={styles.container}>
            <Header />
            <Carrossel imagens={banners} intervalo={4000} altura={210} />
            <Text style={styles.text}>Sorteio realizado assim que a banca fecha</Text>
            {/* <Text style={styles.descricao}>Concorra e ganhe</Text> */}
            <View style={styles.containerCardPremio}>
                <CardPremio
                    titulo="1º Prêmio"
                    valor="R$ 100,00"
                    imagem={require('@/src/assets/trofeu.png')}
                />
                {/* <CardPremio
                    titulo="2º ao 5º"
                    valor="R$ 50,00"
                     tipo="outros"
                    imagem={require('@/src/assets/trofeu2.png')}
                /> */}
                
            </View>
            <View style={styles.containerCardRifa}>
                <CardRifa onPress={() => router.replace('/rifa')} titulo='Escolha o seu número e concorra' descricao='Tenha duas chances de ganhar' textoExtra='Cada Número custa apenas R$ 1,0' textoBotao="Escolher" />
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
    descricao: {
        color: '#b6b4b4',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '500',
        marginHorizontal: 20,
    },
    textInfo: {
        color: '#d1d1d1',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
    }
});