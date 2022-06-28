import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let takePic = async () => {
    let options = {
        quality: 1,
        base64: true,
        exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if(photo){
    let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{
            setPhoto(undefined);
        })
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}></Image>
            {hasMediaLibraryPermission? <Button title="Save" onPress={savePhoto}/> : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)}></Button>
        </SafeAreaView>
    )
  }

  return (
      <Camera type={type} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text> Flip </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Take Pic" onPress={takePic}></Button>
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
    body:{
        flex: 1
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera:{
        width: "100%",
        height: "100%"
    },
    buttonContainer:{
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
})
