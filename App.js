import { Text, View } from "react-native";
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
function Aviso(){
  return(
    <View style={{backgroundColor:'yellow'}}>
      <Text>Oi eu sou um aviso!</Text>
    </View>
  )
}