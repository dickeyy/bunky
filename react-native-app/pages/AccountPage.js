import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from "react-native-crypto-js";
import axios from 'axios';
import * as Location from 'expo-location';
import { getPreciseDistance, convertDistance } from 'geolib';

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
import FullPageProfileView from '../comps/FullPageProfileViewPage';
import Line from '../comps/Line';

const AccountPage = ({ navigation, id })  => {

  const [loading, setLoading] = useState(true);

  // Personal Info
  const [uId, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [company, setCompany] = useState(null)
  const [school, setSchool] = useState(null);
  const [age, setAge] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [gender, setGender] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [verified, setVerified] = useState(null);

  // Roomate questionaire info
  const [bedTime, setBedTime] = useState(null)
  const [wakeUpTime, setWakeUpTime] = useState(null)
  const [okayWithGuests, setOkayWithGuests] = useState(null)
  const [howOftenHaveGuests, setHowOftenHaveGuests] = useState(null)
  const [showerTime , setShowerTime] = useState(null)
  const [cookOrder, setCookOrder] = useState(null)
  const [keepSpaceClean, setKeepSpaceClean] = useState(null)
  const [noiseLevel, setNoiseLevel] = useState(null)
  const [lgbtComfort, setLgbtComfort] = useState(null)
  const [smoker, setSmoker] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locUpdated, setLocUpdated] = useState(false);

  const [fullPage, setFullPage] = useState(false);

  const route = useRoute();

  const [sessionId, setSessionId] = React.useState("");

    const getSessionId = async () => {
      try {
        const value = await AsyncStorage.getItem('@session_id')
        if(value !== null) {
          return value
        }
      } catch(e) {
        Alert.alert("Error", "There was an error getting your session. Please try again later.")
      }
    }
  
    React.useEffect(() => {

      getSessionId().then((value) => {
        setSessionId(value)

        if (value === null) {
          navigation.navigate("Onboarding")
        } 
      })
    }, [])

    const decrypt = (text, password) => {
      var data = CryptoJS.AES.decrypt(text, password);
      var decryptedData = data.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    }

    React.useEffect(() => {
      if (sessionId !== "") {
        getUser()
      }
    }, [sessionId])

    const getUser = () => {
      const request = axios.get('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/fetch/me', {
        headers: {
          'Authorization': sessionId
          }
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data
              const user = data.doc
              
              var masterPass = decrypt(data.masterPass, user.encryptPassword)
              var encryptPassword = decrypt(user.encryptPassword, masterPass)

              setFirstName(decrypt(user.firstName, encryptPassword))
              setLastName(decrypt(user.lastName, encryptPassword))
              setBio(decrypt(user.personalData.bio, encryptPassword))
              setLocation(decrypt(user.locationData.cityState, encryptPassword))
              setAge(decrypt(user.personalData.age, encryptPassword))
              setVerified(user.isVerified)
              setPronouns(decrypt(user.personalData.pronouns, encryptPassword))
              setGender(decrypt(user.personalData.gender, encryptPassword))
              setOrientation(decrypt(user.personalData.sexuality, encryptPassword))
              setJobTitle(decrypt(user.personalData.jobTitle, encryptPassword))
              setCompany(decrypt(user.personalData.company, encryptPassword))
              setSchool(decrypt(user.personalData.school, encryptPassword))

              setBedTime(decrypt(user.livingData.bedTime, encryptPassword))
              setWakeUpTime(decrypt(user.livingData.wakeTime, encryptPassword))
              setOkayWithGuests(decrypt(user.livingData.okayWithGuests, encryptPassword))
              setHowOftenHaveGuests(decrypt(user.livingData.howOftenHaveGuests, encryptPassword))
              setShowerTime(decrypt(user.livingData.showerTime, encryptPassword))
              setCookOrder(decrypt(user.livingData.cookOrder, encryptPassword))
              setKeepSpaceClean(decrypt(user.livingData.keepSpaceClean, encryptPassword))
              setNoiseLevel(decrypt(user.livingData.noiseLevel, encryptPassword))
              setLgbtComfort(decrypt(user.livingData.lgbtComfort, encryptPassword))
              setSmoker(decrypt(user.livingData.smoker, encryptPassword))

              setLatitude(decrypt(user.locationData.latitude, encryptPassword))
              setLongitude(decrypt(user.locationData.longitude, encryptPassword))

              var imageUrl = decrypt(user.pictures.location, encryptPassword)

              setImage(imageUrl)

              setLoading(false)

            } else {
              Alert.alert("Error", "There was an error getting user profile. Please try again later.")
            }
          })
          .catch((error) => {
            console.log(error)
          })
    }
    

    const logoutUser = () => {
      fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/auth/logout', {
        method: 'GET',
        headers: {
          'Authorization': sessionId,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Session deleted') {
          AsyncStorage.removeItem('@session_id').then(() => {
            navigation.navigate("Onboarding1")
          })
        } else {
          Alert.alert("Error", "There was an error logging out. Please try again later.")
        }
      })
    }

  return (
    <>

       {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        
        <SafeAreaView>
        <StatusBar hidden={false} style={'dark'} /> 
        

        <ScrollView style={mainStyles.ScrollView}>

            <View style={mainStyles.accountProfileImageContainer}>

                
                <Image source={{ uri:image }} style={mainStyles.accountProfileImage} />
                {/* <View style={mainStyles.profileImageNumIndicator2}>
                </View> */}

            </View>

            <View style={mainStyles.fullProfileInfoContainer}>

                <View style={mainStyles.fullProfileInfoRow1}>
                  <Text style={mainStyles.fullProfileName}>{firstName}</Text>

                  {verified ?
        
                    <Image source={require('../assets/verified-icon.png')} style={mainStyles.profileCardVerified2} />
                    :
                  null }

                </View>
                
                <View style={mainStyles.fullProfileInfoRow2}>
                  <Text style={mainStyles.fullProfileAge}>{age}</Text>
                  <Text style={mainStyles.fullProfilePronouns}>{pronouns}</Text>
                </View>

                <Spacer height={15} />
                <Line />
                <Spacer height={10} />

                <View style={mainStyles.accountButtonRow}>

                    <Pressable>
                        <View style={mainStyles.settingsProfileButton}>
                            <Image source={require('../assets/settings-icon.png')} style={mainStyles.settingsProfileIcon} />
                        </View>
                        <Text style={mainStyles.settingsProfileText}>Settings</Text>
                    </Pressable>

                    <Pressable>
                        <View style={mainStyles.editProfileButton}>
                            <Image source={require('../assets/edit-icon.png')} style={mainStyles.editProfileIcon} />
                        </View>
                        <Text style={mainStyles.settingsProfileText}>Edit Profile</Text>
                    </Pressable>

                    <Pressable>
                        <View style={mainStyles.settingsProfileButton}>
                            <Image source={require('../assets/info-icon-2.png')} style={mainStyles.settingsProfileIcon} />
                        </View>
                        <Text style={mainStyles.settingsProfileText}>Info</Text>
                    </Pressable>


                </View>

                <Spacer height={50} />
                
                <View style={mainStyles.accountButtonRow}>
                <Pressable style={mainStyles.logoutButton} onPress={() => { logoutUser() }}>
                    <Text style={mainStyles.logoutButtonText}>Log Out</Text>
                </Pressable>
                </View>

            </View>

            </ScrollView>
            <Spacer height={120} />
            <Footer navigation={navigation} route={route.name}/>
        </SafeAreaView>
      )}
      <Header navigation={navigation} style={mainStyles.headerScrollView}/>
      <Footer navigation={navigation} route={route.name}/>
    </>
  );
}

export default AccountPage;