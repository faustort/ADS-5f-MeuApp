import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function BuscarTarefa() {
    const [nomeDaTarefa, setNomeDaTarefa] = useState("");
    const [tarefas, setTarefas] = useState([]);


    async function buscarTarefas() {
        try {
            const tarefasRef = collection(db, "tarefas");
            const queryTarefas = query(tarefasRef, where("nomeDaTarefa", "==", nomeDaTarefa));
            const querySnapshot = await getDocs(queryTarefas);

            const tarefasEncontradas = querySnapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            )
            );
            console.log(tarefasEncontradas);
            setTarefas(tarefasEncontradas);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarTarefas();
    }, [nomeDaTarefa]);

    return (
        <View>
            <Text>Home Screen</Text>
            <TextInput
                label="Nome do Produto"
                value={nomeDaTarefa}
                onChangeText={setNomeDaTarefa}
            />
            <FlatList
                data={tarefas}
                renderItem={({ item }) => <Text>{item.nomeDaTarefa}</Text>}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
