import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import React, { useState, useRef } from "react";
import {useRoute} from '@react-navigation/native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';
import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import Footer from '../comps/Footer';

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

  const route = useRoute();


  return (

    <View style={mainStyles.container}>
        <StatusBar hidden={false} style={'dark'} /> 
        
        <Header navigation={navigation}/>
        <ProfileCard />
        <Footer navigation={navigation} route={route.name}/>

    </View>
  );
}

export default OnboardingFinalizeProfile;