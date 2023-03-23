import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import styles from "../utils/styles";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";

// Create a reference to the 'tarefas' collection
const tarefasRef = collection(getFirestore(app), "tarefas");

export default function TasksAdd() {
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);

  const saveTask = (task) => {
    setLoading(true);
    addDoc(tarefasRef, task)
      .then((docRef) => {
        console.log("Task saved with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error saving task: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddTask = () => {
    if (taskName?.trim()) {
      const task = { name: taskName.trim(), completed: false };
      saveTask(task);
      setTaskName("");
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TextInput
        label="Task name"
        value={taskName}
        onChangeText={setTaskName}
        style={{ flex: 0.75 }}
        // right={}
      />
      {/* <Icon name="plus" style={{ flex: 0.25 }}></Icon> */}
      {/* <Button style={{ flex: 0.25 }} mode="contained" onPress={handleAddTask}>      </Button> */}
      {loading && <ActivityIndicator />}
    </View>
  );
}
