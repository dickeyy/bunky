import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput } from 'react-native';
import React, { useState, useRef } from "react";

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';

const Separator = () => (
  <View style={{ height: 20 }} />
);

// Page
const ProfileCreationPage2 = ({ navigation }) => {

  const [username, onChangeUsername] = React.useState("");

  return (
    <SafeAreaView style={mainStyles.container} >

      <StatusBar hidden={true} /> 

        <Text style={onboardingStyles.homeTitleText}>What should we call you?</Text>

        <Separator />

        <View style={onboardingStyles.homeNameInputContainer}>

          <TextInput 
            style={onboardingStyles.homeNameInput} 
            placeholder="Username" 
            onChangeText={onChangeUsername}
            autoComplete='name'
            keyboardAppearance='light'
            returnKeyType='done'
            selectionColor='#6320EE'
            cursorColor='#6320EE'
            textContentType='username'
          />

          <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { navigation.navigate('ProfileCreation3') }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
          </Pressable>

        </View>

    </SafeAreaView>
  );
}

export default ProfileCreationPage2