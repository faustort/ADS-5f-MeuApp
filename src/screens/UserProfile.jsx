import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import styles from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile() {
    const [user, setUser] = useState(
        {
            nomeDaPessoa: "",
            emailDaPessoa: "",
            telefoneDaPessoa: "",
            enderecoDaPessoa: "",
            cepDaPessoa: "",
            bairroDaPessoa: "",
            cidadeDaPessoa: "",
            estadoDaPessoa: "",
        }
    )

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
            <View
                style={styles.containerInner}
            >
                <Text
                    style={
                        {

                            ...styles.textCenter,
                            fontWeight: 'bold',
                            marginBottom: 20
                        }
                    }
                    variant="titleLarge"
                >Edite seu perfil</Text>

                <TextInput
                    label="Nome"
                    value={user.nomeDaPessoa}
                    onChangeText={(text) => setUser(
                        {
                            ...user,
                            nomeDaPessoa: text
                        }
                    )}
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
                    label="CEP"
                    value={user.cepDaPessoa}
                    onChangeText={(text) => setUser({ ...user, cepDaPessoa: text })}
                />
                <TextInput
                    label="Endereço"
                    value={user.enderecoDaPessoa}
                    onChangeText={(text) => setUser({ ...user, enderecoDaPessoa: text })}
                />
                <TextInput
                    label="Cidade"
                    value={user.cidadeDaPessoa}
                    onChangeText={(text) => setUser({ ...user, cidadeDaPessoa: text })}
                />
                <TextInput
                    label="Estado"
                    value={user.estadoDaPessoa}
                    onChangeText={(text) => setUser({ ...user, estadoDaPessoa: text })}
                />
            </View>
        </View >
    )
}