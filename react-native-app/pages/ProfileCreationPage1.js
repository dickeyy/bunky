import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';

// Page
const ProfileCreationPage1 = ({ navigation }) => {

  const [firstName, onChangeFirstName] = React.useState("");
  const [lastName, onChangeLastName] = React.useState("");
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

  const setData = (navigation) => {
    if (firstName == "" || lastName == "") {
      return
    }
    
    fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/onboard/add_name', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: sessionId,
          firstName: firstName,
          lastName: lastName
        })
      
      }) .then((response) => response.json())
      .then((json) => {
        if (json.message == 'User updated') {
          navigation.navigate("ProfileCreation2")
        } else {
          Alert.alert("Error", "There was an error verifying the session data. Please try again later.")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={mainStyles.container} >

      <StatusBar hidden={true} /> 

        <Text style={onboardingStyles.homeTitleText}>What's your name?</Text>

        <View style={onboardingStyles.homeNameInputContainer}>

          <TextInput 
            style={onboardingStyles.homeNameInput} 
            placeholder="First Name" 
            onChangeText={onChangeFirstName}
            autoComplete='name'
            keyboardAppearance='light'
            returnKeyType='next'
            selectionColor='#6320EE'
            cursorColor='#6320EE'
            textContentType='givenName'
          />

          <TextInput 
            style={onboardingStyles.homeNameInput} 
            placeholder="Last Name" 
            onChangeText={onChangeLastName}
            autoComplete='name'
            keyboardAppearance='light'
            returnKeyType='done'
            selectionColor='#6320EE'
            cursorColor='#6320EE'
            textContentType='familyName'
          />

          <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { setData(navigation) }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
          </Pressable>

        </View>

    </SafeAreaView>
  );
}

export default ProfileCreationPage1