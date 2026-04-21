import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Header() {
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.replace('/')}>
                <Image
                    source={require('@/src/assets/logo.png')}
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <View style={styles.actions}>
                {user ? (
                    <TouchableOpacity style={styles.botaoSair} onPress={() => { logout(); router.replace('/'); }}>
                        <Text style={styles.sairText}>Sair</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={styles.botaoEntrar} onPress={() => router.push('/login')}>
                            <Text style={styles.entrarText}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoCriarConta} onPress={() => router.push('/registro')}>
                            <Text style={styles.criarContaText}>Criar Conta</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#1a1a2e',
    },
    logoImage: {
        width: 25,
        height: 25,

    }, actions: { flexDirection: 'row', gap: 16 },
    sairText: {
        color: 'white',
    },
    entrarText: {
        color: 'white'
    },
    criarContaText: {
        color: 'white',
        paddingHorizontal: 10,
    },
    botaoSair: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    botaoEntrar: {
        backgroundColor: '#820AD1',
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    botaoCriarConta: {
        backgroundColor: '#22c55e00',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
});