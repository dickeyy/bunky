import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';

const OnboardingLocationPage = ({ navigation })  => {

  const [sessionId, setSessionId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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

    const [loc, setLocation] = useState("");

    const shareLocation = async () => {
        setIsLoading(true)

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Error", "Permission to access location was denied");
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});
        let regionName = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        const cityState = regionName[0].city + ", " + regionName[0].region
        setLocation(cityState);

        fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/onboard/set_location', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                location: cityState,
                longitude: String(location.coords.longitude),
                latitude: String(location.coords.latitude),
            })
        }) .then((response) => response.json())
        .then((json) => {
            if (json.message == 'User updated') {
                navigation.navigate("Home")
            } else {
                console.log(json)
                Alert.alert("Error", "There was an error verifying the session data. Please try again later.")
            }
        }
        )
    }
  

  return (

    <SafeAreaView>
            <StatusBar hidden={false} style={'dark'} /> 

                    <View style={onboardingStyles.homeNameInputContainer}>

                        <Text style={onboardingStyles.homeTitleText2}>Share your location with us</Text>

                    <Text style={onboardingStyles.homeSubtitleText}>So we can match you with people close to your current location!</Text>

                      {isLoading ? (
                        <View style={onboardingStyles.homeNameInputContainer}>
                          <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                      ) : (
                        <Pressable disabled={isLoading} style={onboardingStyles.homePhoneInputButton} onPress={() => { shareLocation() }}>
                            <Text style={onboardingStyles.homePhoneInputButtonText}>Share Location</Text>
                        </Pressable>
                      )}

                      {/* <Pressable disabled={isLoading} style={onboardingStyles.homePhoneInputButton} onPress={() => { shareLocation() }}>
                            <Text style={onboardingStyles.homePhoneInputButtonText}>Share Location</Text>
                        </Pressable> */}

                    </View>

    </SafeAreaView>
  );
}

export default OnboardingLocationPage;