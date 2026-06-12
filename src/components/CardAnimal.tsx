import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
} from "react-native";

type AnimalCardProps = {
  numero: number;
  nome: string;
  imagem: ImageSourcePropType;
  dezenas: number[];

  selected?: boolean;
  disabled?: boolean; // reservado
  sold?: boolean; // vendido
  onPress?: () => void;
};

export default function CardAnimal({
  numero,
  nome,
  imagem,
  dezenas,
  selected = false,
  disabled = false,
  sold = false,
  onPress,
}: AnimalCardProps) {
  const bloqueado = disabled || sold;

  return (
    <Pressable
      onPress={bloqueado ? undefined : onPress}
      style={[
        styles.container,
        selected && styles.selected,
        disabled && styles.disabled,
        sold && styles.sold,
      ]}
    >
      {/* VENDIDO */}
      {sold && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>VENDIDO</Text>
        </View>
      )}

      {/* RESERVADO */}
      {disabled && !sold && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>RESERVADO</Text>
        </View>
      )}

      <View style={styles.topContainer}>
        <View style={styles.numeroCircle}>
          <Text style={styles.numero}>{numero}</Text>
        </View>

        <Image source={imagem} style={styles.imagem} resizeMode="contain" />

        <View style={styles.dezenasContainer}>
          {dezenas.map((dezena, index) => (
            <Text key={index} style={styles.dezena}>
              {dezena}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.nomeContainer}>
        <Text style={styles.nome}>{nome.toUpperCase()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 145,
    backgroundColor: "#1a1a2e",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  topContainer: {
    flexDirection: "row",
    height: 100,
    position: "relative",
  },

  numeroCircle: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 10,
  },

  numero: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  imagem: {
    flex: 1,
    height: "70%",
    marginTop: 25,
    marginLeft: 30,
  },

  dezenasContainer: {
    width: 35,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#737373",
  },

  dezena: {
    color: "#e7c91f",
    fontSize: 18,
    fontWeight: "bold",
  },

  nomeContainer: {
    backgroundColor: "#007ACC",
    paddingVertical: 4,
    alignItems: "center",
  },

  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  selected: {
    borderColor: "#007ACC",
  },

  disabled: {
    opacity: 0.4,
  },

  sold: {
    opacity: 0.25,
  },

  overlay: {
    position: "absolute",
    zIndex: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});