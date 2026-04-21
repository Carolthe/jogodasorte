import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  titulo: string;
  descricao: string;
  textoExtra?: string;
  textoBotao: string;
  onPress?: () => void;
};

export default function CardRifa(props: Props) {
  const {
    titulo,
    descricao,
    textoExtra,
    textoBotao,
    onPress,
  } = props;
  return (
    <View style={styles.container}>
      
      {/* Topo */}
      <View style={styles.row}>
        {/* <Image source={imagem} style={styles.imagem} /> */}

        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao}>{descricao}</Text>
        </View>
      </View>

      {/* Meio */}
      <Text style={styles.textoExtra}>{textoExtra}</Text>

      {/* Botão */}
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Text style={styles.botaoTexto}>{textoBotao}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 18,
    padding: 20,
    marginTop: 15,
    // borderWidth: 2,
    // borderColor: 'rgba(145, 34, 197, 0.51)',
    // shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 23,
  },

  imagem: {
    width: 40,
    height: 42,
    resizeMode: 'contain',
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  descricao: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 4,
  },

  textoExtra: {
    color: '#fefefe',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: '600',
  },

  botao: {
    backgroundColor: '#820AD1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',

    // glow botão leve
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});