import { useState } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "../utils/styles";
import { useFocusEffect } from "@react-navigation/native";

export function SplashScreen({ navigation }) {
  useFocusEffect(() => {
    //check if user has logged in before using firebase
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("MTBNavigation");
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        // source={require("../../assets/icon.png")}
        style={{ width: 200, height: 200, borderRadius: 999 }}
      />
      <ActivityIndicator />
      <Text>Aguarde</Text>
    </View>
  );
}
