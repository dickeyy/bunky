import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef } from "react";
import PhoneInput from 'react-native-phone-number-input';

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

    const checkNumber = (navigation) => {
        const checkValid = phoneInput.current?.isValidNumber(Number(value));
        setValid(checkValid ? checkValid : false);

        // if (value !== "") {
            navigation.navigate('ProfileCreation1');
        // }
    }

  return (
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

        <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { checkNumber(navigation) }}>
            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
        </Pressable>

    </SafeAreaView>
  );
}

export default HomePurposeOnboardingPage