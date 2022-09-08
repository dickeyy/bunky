import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import React, { useState, useRef } from "react";
import {useRoute} from '@react-navigation/native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from './OnboardingHeader';
import ChoiceOption from './ChoiceOption';
import Spacer from './Spacer';
import Header from './Header';
import ProfileCard from './ProfileCard';
import Footer from './Footer';

const FullPageProfileView = (props)  => {
  return (

    <SafeAreaView>
        <StatusBar hidden={false} style={'dark'} /> 

        <ScrollView style={mainStyles.scrollView}>

            <View style={mainStyles.fullProfileImageContainer}>
                
                <Image source={{ uri: props.image }} style={mainStyles.fullProfileImage} />
                
                <Pressable onPress={props.navigation.navigate('Home', {id: props.id})}>
                    <View style={mainStyles.backIconContainer}>
                        <Image source={require("../assets/back-icon-2-white.png")} style={mainStyles.backIcon} />
                    </View>
                </Pressable>

            </View>

            <View style={mainStyles.fullProfileInfoContainer}>
                <Text style={mainStyles.fullProfileName}>{props.firstName}</Text>
                <Text style={mainStyles.fullProfileName}>{props.lastName}</Text>
            </View>

        </ScrollView>
    </SafeAreaView>
  );
}

export default FullPageProfileView;