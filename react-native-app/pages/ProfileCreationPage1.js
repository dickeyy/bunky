import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput } from 'react-native';
import React, { useState, useRef } from "react";

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';

const Separator = () => (
  <View style={{ width: 100 }} />
);

// Page
const ProfileCreationPage1 = ({ navigation }) => {

  const [firstName, onChangeFirstName] = React.useState("");
  const [lastName, onChangeLastName] = React.useState("");

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

          <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { navigation.navigate('ProfileCreation2') }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
          </Pressable>

        </View>

    </SafeAreaView>
  );
}

export default ProfileCreationPage1