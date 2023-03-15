import { Image, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "../utils/styles";


export function SplashScreen({ navigation }) {

    setTimeout(
        () => {
            navigation.navigate("RegisterScreen");
        }, 3000
    )

    return (
        <View
            style={styles.container}
        >

            <Image
                source={{ uri: "https://picsum.photos/200" }}
                style={{ width: 200, height: 200, borderRadius: 999 }}
            />
            <ActivityIndicator />
            <Text>Aguarde</Text>
        </View>
    )
}

