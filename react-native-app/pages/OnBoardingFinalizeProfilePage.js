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

const OnboardingFinalizeProfile = ({ navigation })  => {

  const [image, setImage] = useState('https://i.imgur.com/ji6KXLI.jpg');
  const [name, setName] = useState('Kyle Dickey');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [job, setJob] = useState('');
  const [school, setSchool] = useState('');
  const [age, setAge] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [gender, setGender] = useState('');
  const [orientation, setOrientation] = useState('');


  return (

    <SafeAreaView>
      <StatusBar hidden={false} style={'dark'} /> 

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={mainStyles.scrollView}>
            
              <View style={onboardingStyles.profileContainer}>

                <Text style={onboardingStyles.homeTitleText2}>Finalize Your Profile</Text>

                <Image source={{uri: image}} style={onboardingStyles.profileImage} />

                <Text style={onboardingStyles.profileName}>{name}</Text>

              </View>

            </ScrollView>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default OnboardingFinalizeProfile;