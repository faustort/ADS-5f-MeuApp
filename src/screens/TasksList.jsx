import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { app } from "../config/firebase";
import { List, TouchableRipple } from "react-native-paper";

const tarefasRef = collection(getFirestore(app), "tarefas");

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(tarefasRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // exclude a task 
  function excludeTask(id) {
    console.log("Excluindo tarefa", id);
    deleteDoc(doc(db, "tarefas", id))
      .then(() => {
        console.log("Tarefa excluída com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao excluir tarefa", error);
      });
  }


  const renderItem = ({ item }) => (
    <View>
      <List.Item
        title={item.titulo}
        description={item.titulo}
        onPress={() => console.log('Pressionado')}
        left={(props) => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableRipple onPress={() => excludeTask(item.id)} ><List.Icon {...props} icon="delete" /></TouchableRipple> 
            <List.Icon {...props} icon="check" onPress={() => console.log('t')} />
          </View>
        )}
      />
    </View>
  );


  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScrollView>
  );
}
