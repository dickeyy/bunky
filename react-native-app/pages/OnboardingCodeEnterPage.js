import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef } from "react";
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import Spacer from '../comps/Spacer';

// Page
const OnboardingCodeEnterPage = ({ navigation, phoneNumber }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    const verifyCode = (navigation) => {
      if (value == "") {
        return
      }

      console.log(phoneNumber)


      fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/auth/verify_phone_code', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: phoneNumber,
          code: value
        })

      }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        // if (json != null) {
        //   navigation.navigate('ProfileCreation1');
        // }

      })
      .catch((error) => {
        console.error(error);
      });
    }

  return (
    <SafeAreaView style={mainStyles.container} >

      <StatusBar hidden={true} /> 

        <Text style={onboardingStyles.homeTitleText4}>Enter the code that was sent to you.</Text>
        <View style={onboardingStyles.codeEnterContainer}> 

            <TextInput 
            style={onboardingStyles.homeNameInput2} 
            placeholder="123456" 
            autoComplete='sms-otp'
            keyboardAppearance='light'
            returnKeyType='done'
            selectionColor='#6320EE'
            cursorColor='#6320EE'
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            onChangeText={(text) => setValue(text)}
            autoFocus={true}
          />

          <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { verifyCode(navigation) }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
          </Pressable>

        </View>

    </SafeAreaView>
  );
}

export default OnboardingCodeEnterPage;