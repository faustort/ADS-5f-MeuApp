import { Text, View } from "react-native";
import styles from "../utils/styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactScreen() {
  const [nomeDaPessoa, setNomeDaPessoa] = useState("")
  useEffect(() => {
    AsyncStorage.getItem("usuario")
      .then((retorno) => {
        const usuario = JSON.parse(retorno)
        setNomeDaPessoa(usuario.nome)
      })
  }, [])
  return (
    <View
      style={styles.container}
    >
      <Text>Oi sou a página de contato, {nomeDaPessoa}</Text>
    </View>
  );
}
