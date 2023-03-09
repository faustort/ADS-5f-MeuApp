import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/firebase";

import styles from "../utils/styles";
export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [error, setError] = useState("");

    function handleRegister() {
        console.log("Registrando usuário")
        if (checkIfPasswordsMatch()) {
            console.log("As senhas coincidem");
        } else {
            console.log("As senhas não coincidem");
        }
        if (checkPasswordLenght()) {
            console.log("As senhas são grandonas");
        } else {
            console.log("As senhas são muito pequenas");
        }

        createUserWithEmailAndPassword(auth, email, senha).then(
            (userCredential) => {
                console.log(userCredential, "Usuário registrado com sucesso");
            }
        ).catch((error) => {

            setError(error.message); // mostra a mensagem original do Firebase
            const errorCode = error.code; // obtém o código de erro do Firebase
            switch (errorCode) { // verifica qual é o código de erro
                case 'auth/email-already-in-use':
                    setError('Esse email já está em uso por outro usuário.'); // mostra uma mensagem humanizada
                    break;
                case 'auth/invalid-email':
                    setError('Esse email não é válido.');
                    break;
                case 'auth/weak-password':
                    setError('Essa senha é muito fraca.');
                    break;
                default:
                    setError('Ocorreu um erro ao registrar o usuário.');
            }
        });

    }

    function checkIfPasswordsMatch() {
        return senha === confirmarSenha;
    }

    function checkPasswordLenght() {
        return senha.length >= 6;
    }

    return (
        <View
            style={styles.container}
        >
            <Paragraph>Faça o seu Registro</Paragraph>
            <HelperText type="error"> {error} </HelperText>
            <View>
                <Paragraph>E-mail</Paragraph>
                <TextInput
                    mode="outlined"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <Paragraph>Senha</Paragraph>

                <TextInput
                    mode="flat"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={passwordVisible}
                    right={() => (
                        <Icon
                            name={passwordVisible ? "eye" : "eye-off"}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        />)
                    }

                />
            </View>
            <View>
                <Paragraph>Confirme sua Senha</Paragraph>
                <TextInput
                    mode="outlined"
                    placeholder="Confirme a Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={true}
                />
                <HelperText type="error" visible={!checkIfPasswordsMatch}>Não conferem</HelperText>

            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    mode="contained"
                    onPress={handleRegister}
                >Registrar</Button>

            </View>
        </View>
    )
}


