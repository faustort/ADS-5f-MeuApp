import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function UserProfileImagePicker(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {

        if (props.idUsuario == null) return;

        getDoc(doc(db, 'usuarios', props.idUsuario))
            .then(
                (retorno) => {
                    const usuario = retorno.data()
                    setImage(usuario.image)
                }
            );


    }, [props.idUsuario])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        const docRef = doc(db, 'usuarios', props.idUsuario);
        const updateTimestamp = await updateDoc(
            docRef,
            {
                image: result.assets[0].uri
            }
        );

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image
                source={{ uri: image }}
                style={
                    {
                        width: 100,
                        height: 100,
                        borderRadius: 100
                    }
                } />}
            <Button
                onPress={pickImage}

            ><Ionicons
                name="camera-outline"
                size={24}
                color="black"
            >
                </Ionicons></Button>
        </View>
    );
}