import { Image, Text, View } from "react-native";
import styles from "../utils/styles";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function HomeScreen() {
  const [user, setUser] = useState({});

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser({
          userUID: user.uid,
        })
      } else {
        console.log("Não há usuário logado")
      }
    })
    // forma utilizada para ser chamada ao desmontar o componente
    return () => unsub();

  }, []);// graças a este colchete que simbila a entrada do componente na tela

  useEffect(() => {
    if (!user?.userUID) return

    const usuariosRef = collection(db, "usuarios");

    const q = query(
        usuariosRef,
        where("userUID", "==", user.userUID)
      );
    
    getDocs(q)
      .then((querySnapshot) => {
        if(querySnapshot.empty) return

        const usuario = querySnapshot.docs[0].data();

        setUser(usuario)

      })

  }, [user?.userUID]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://picsum.photos/300/300",
          }}
          style={styles.image}
        />
      </View>
      <Text>Hola {user?.nomeDaPessoa}, bem vindo ao meu app</Text>
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
