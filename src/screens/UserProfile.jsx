import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        AsyncStorage.getItem("usuario")
            .then(
                (retorno) => {
                    const usuario = JSON.parse(retorno)
                    setUser(usuario)
                }
            )

    }, [])

    return (
        <View
            style={styles.container}
        >
            <Text>Olá, sou a página de perfil do usuário</Text>
            <TextInput
                label="Nome"
                value={user.nomeDaPessoa}
                onChangeText={(text) => setUser({ ...user, nomeDaPessoa: text })}
            />
            <TextInput
                label="E-mail"
                value={user.emailDaPessoa}
                onChangeText={(text) => setUser({ ...user, emailDaPessoa: text })}
                disabled={true}
            />
            <TextInput
                label="Telefone"
                value={user.telefoneDaPessoa}
                onChangeText={(text) => setUser({ ...user, telefoneDaPessoa: text })}
            />
            <TextInput
                label="Endereço"
                value={user.enderecoDaPessoa}
                onChangeText={(text) => setUser({ ...user, enderecoDaPessoa: text })}
            />
            <TextInput
                label="CEP"
                value={user.cepDaPessoa}
                onChangeText={(text) => setUser({ ...user, cepDaPessoa: text })}
            />
        </View>
    )
}