import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import React, { useState, useRef } from "react";

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';
import UploadedPhoto from '../comps/UploadedPhoto';

const OnboardingFinalizeProfile = ({ navigation })  => {
  const [image1, setImage1] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage1(result.uri);
    }
  };

  return (
    // <SafeAreaView style={mainStyles.container}>
    //   <StatusBar style="dark" />

    //   <Text style={onboardingStyles.homeTitleText}>Upload some pics</Text>

    //   <Button title="Pick an image from camera roll" onPress={pickImage} />
    //   {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

    // </SafeAreaView>

    <SafeAreaView>
            <StatusBar hidden={false} style={'dark'} /> 

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView style={mainStyles.scrollView}>
                    {/* <OnboardingHeader navigation={navigation} /> */}

                    

                </ScrollView>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
  );
}

export default OnboardingFinalizeProfile;