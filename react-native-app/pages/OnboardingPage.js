import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef } from "react";

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

const OnboardingPage = ({ navigation }) => {
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
      getSessionId().then((value) => {
        setSessionId(value)

        if (value !== null) {
          navigation.navigate('Home')
        }
      })

  return (
    <SafeAreaView style={mainStyles.container}>

      <StatusBar hidden={true} /> 

      <Image source={require('../assets/circle-bg.png')} style={{ justifyContent: 'center' }}></Image>

      <View style={onboardingStyles.titleContainer}>

        <Text style={onboardingStyles.titleText}>Welcome to</Text>
        <Text style={onboardingStyles.titleTextHighlight}>Bunky</Text>

      </View>

      <View style={onboardingStyles.buttonContainer}>

        <Pressable onPress={() => navigation.navigate('PurposeSelection')}>

          <Text style={onboardingStyles.getStartedButton}>Get Started</Text>

        </Pressable>

      </View>

    </SafeAreaView>
  );
}

export default OnboardingPage