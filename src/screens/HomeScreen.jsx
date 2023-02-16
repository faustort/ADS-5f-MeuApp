import { Image, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          color: "tomato",
          fontSize: "34px",
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
