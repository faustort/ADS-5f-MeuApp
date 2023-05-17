import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function BuscarTarefa() {
    const [nomeDaTarefa, setNomeDaTarefa] = useState("");
    const [produtos, setProdutos] = useState([]);


    async function queryProdutos() {
        try {
            const produtosRef = collection(db, "produtos");
            const queryProdutos = query(produtosRef, where("nomeDaTarefa", "==", nomeDaTarefa));
            const querySnapshot = await getDocs(queryProdutos);
            const produtos = [];
            querySnapshot.forEach((doc) => {
                produtos.push(doc.data());
            });
            setProdutos(produtos);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        queryProdutos(nomeDaTarefa);
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
                data={produtos}
                renderItem={({ item }) => <Text>{item.nomeDaTarefa}</Text>}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
