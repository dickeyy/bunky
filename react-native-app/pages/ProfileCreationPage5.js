import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';
import UploadedPhoto from '../comps/UploadedPhoto';

const ProfileCreationPage5 = ({ navigation })  => {
  const [image1, setImage1] = useState(null);
  const [imageType, setImageType] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      limits: { fileSize: 5555555 },
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {

      if (result.type === "image") {
        setImage1(result.uri);
        setImageType(result.uri.substring(result.uri.length - 3))
      } else {
        Alert.alert("Error", "Please select an image.")
      }
    }
  };

  const [sessionId, setSessionId] = React.useState("");

    const getSessionId = async () => {
      try {
        const value = await AsyncStorage.getItem('@session_id')
        if(value !== null) {
          return value
        }
      } catch(e) {
        console.log(e)
        Alert.alert("Error", "There was an error getting your session. Please try again later.")
      }
    }
  
    React.useEffect(() => {
      getSessionId().then((value) => {
        setSessionId(value)
      })
    }, [])

  // upload photo to api using multipart/form-data named image and send session data
  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image1,
      type: `image/${imageType}`,
      name: `image.${imageType}`,
    });

    const request = fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/onboard/upload_profile_pic', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${sessionId}`
      },
      body: formData
    }).then((response) => response.json())
    .then((json) => {
      if (json) {
        navigation.navigate("OnboardingLocation")
      } else {
        console.log(json)
        Alert.alert("Error", "There was an error updating your data. Please try again later.")
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (

    <SafeAreaView>
            <StatusBar hidden={false} style={'dark'} /> 

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView style={mainStyles.scrollView}>

                    <Text style={onboardingStyles.homeTitleText2}>Choose your first profile pic</Text>

                    <Text style={onboardingStyles.homeSubtitleText}>You can add more later, we just need one for now. (Tap to delete it)</Text>

                    <View style={onboardingStyles.photosContainer}>
                    {image1 && 
                        <View style={onboardingStyles.photosContainer}>
                          <Pressable onPress={() => { setImage1(null) }}>
                            <Image source={{ uri: image1 }} style={onboardingStyles.uploadedImage} />
                          </Pressable>

                          <Pressable onPress={() => { uploadPhoto(navigation) }} style={onboardingStyles.homePhoneInputButton}>
                            <Text style={onboardingStyles.homePhoneInputButtonText}>Finish</Text>
                          </Pressable>
                        </View>
                    }

                    {!image1 && 
                      <Pressable onPress={pickImage} style={onboardingStyles.homePhoneInputButton} >
                        <Text style={onboardingStyles.homePhoneInputButtonText}>Tap to upload</Text>
                      </Pressable> 
                    }
                    </View>

                </ScrollView>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
  );
}

export default ProfileCreationPage5;