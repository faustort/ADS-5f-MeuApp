import { Image, Text, useColorScheme, View } from "react-native";
import styles from "../utils/styles";
import themes from "../utils/theme";

export default function HomeScreen() {
  // const preferDarkMode = useColorScheme() === "dark";
  // const theme = preferDarkMode ? themes.dark : themes.light;

  return (
    <View>
      <View
        style={{
          flexBasis: "80%",
        }}
      >
        <Image
          source={{
            uri: "https://picsum.photos/300/300",
          }}
          style={{
            minWidth: "300px",
            height: "300px",
          }}
        />
      </View>
      <Text
        style={{
          fontSize: "22px",
        }}
      >
        Hola, bem vindo ao meu app
      </Text>
      <Aviso />
    </View>
  );
}

// é um componente em React Native
function Aviso() {
  return (
    <View style={{ backgroundColor: "yellow" }}>
      <Text>Oi eu sou um aviso!</Text>
    </View>
  );
}
