import { collection, endAt, getDocs, query, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { db } from "../config/firebase";

export default function AulaTaskBuscar({ routes, navigation }) {
    const [busca, setBusca] = useState("");
    const [resultadoTarefas, setResultadoTarefas] = useState([]);

    async function buscarTarefa() {
        try {
            const tarefasRef = collection(db, 'tarefas')
            const queryTarefas = query(
                tarefasRef,
                where('nomeDaTarefa', '>=', busca),
                where('nomeDaTarefa', '<=', busca + "\uf8ff")
            )
            const querySnapshot = await getDocs(queryTarefas)
            const tarefas = querySnapshot.docs.map(doc => doc.data())
            setResultadoTarefas(tarefas)

        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        buscarTarefa();
        console.log(busca)
    }, [busca])

    return (
        <View>
            <Text>Buscar Tarefa</Text>
            <TextInput
                label="Buscar"
                value={busca}
                onChangeText={setBusca}
            />
            <FlatList
                data={resultadoTarefas}
                renderItem={({ item }) => (
                    <Text id={item.id}>{item.nomeDaTarefa}</Text>
                )}
            />
        </View>
    )
}