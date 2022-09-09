import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useState, useRef } from "react";
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';

// Page
const HomePurposeOnboardingPage = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    const [enterCode, setEnterCode] = useState(false);
    const [code, setCode] = useState("");

    const checkNumber = (navigation) => {
        if (value == "") {
          return
        }

        const checkValid = phoneInput.current?.isValidNumber(Number(formattedValue));
        setValid(checkValid ? checkValid : false);

        // https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/auth/send_phone_code

        fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/auth/send_phone_code', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            number: formattedValue
          })

        }).then((response) => response.json())
        .then((json) => {

          if (json != null) {
            setEnterCode(true);
          } else {
            Alert.alert("Error", "There was an error sending the verification code. Please try again later.")
          }

        })
        .catch((error) => {
          console.error(error);
        });
    }

    const verifyCode = (navigation) => {
      if (code == "") {
        return
      }

      fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/auth/verify_phone_code', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: formattedValue,
          code: code
        })

      }).then((response) => response.json())
      .then((json) => {
        
        if (json.verification_check.status === 'approved') {
          navigation.navigate('ProfileCreation1');
        } else {
          Alert.alert("Error", "There was an error verifying the code. Please try again later.")
        }

      })
      .catch((error) => {
        console.error(error);
      });
    }

  return (
    <>

    {!enterCode ? (
      <SafeAreaView style={mainStyles.container} >

      <StatusBar hidden={true} /> 

        <Text style={onboardingStyles.homeTitleText}>What's your phone number?</Text>

        <View>

            <PhoneInput
            defaultValue={value}
            defaultCode="US"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withLightTheme
            withShadow
            containerStyle={onboardingStyles.homePhoneInput}
            textContainerStyle={onboardingStyles.homePhoneInputText}
            textInputProps={{ autoComplete: "tel", returnKeyType: "done" , textContentType:'telephoneNumber'}}
          />

        </View>

        <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { checkNumber(navigation, formattedValue) }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
        </Pressable>

    </SafeAreaView>
    ) : (
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
            onChangeText={(text) => setCode(text)}
            autoFocus={true}
          />

          <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { verifyCode(navigation) }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
          </Pressable>

        </View>

    </SafeAreaView>
    )}

    </>
  );
}

export default HomePurposeOnboardingPage