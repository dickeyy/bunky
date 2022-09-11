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

const HomePage = ({ navigation, id })  => {

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
        console.log(value);
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

    React.useEffect(() => {
      if (longitude !== null && latitude !== null && locUpdated === false) {

        updateLocation()
      }
    }, [longitude, latitude])


    const getUser = () => {
      const request = axios.get('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/fetch/user/XKWiab9B8WyKAsdsDe1aLr', {
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

    const updateLocation = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Error", "Permission to access location was denied");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        let regionName = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        const cityState = regionName[0].city + ", " + regionName[0].region

        var dis = getPreciseDistance(
          { latitude: latitude, longitude: longitude },
          { latitude: location.coords.latitude, longitude: location.coords.longitude }
        );

        const disMiles = dis / 1.60934

        setDistance(Math.round(disMiles))

        setLocUpdated(true)
    }

  return (

    <>
      {fullPage ? (
        
        <SafeAreaView>
        <StatusBar hidden={false} style={'dark'} /> 

        <ScrollView style={mainStyles.scrollView}>

            <View style={mainStyles.fullProfileImageContainer}>
                
                <Image source={{ uri:image }} style={mainStyles.fullProfileImage} />
                {/* <View style={mainStyles.profileImageNumIndicator2}>
                </View> */}
                
                <Pressable onPress={() => { setFullPage(false) }}>
                    <View style={mainStyles.backIconContainer}>
                        <Image source={require("../assets/back-icon-2-white.png")} style={mainStyles.backIcon} />
                    </View>
                </Pressable>

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

                <Text style={mainStyles.aboutMeHeader}>About Me</Text>

                {jobTitle ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/job-icon.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>{jobTitle} at {company}</Text>
                  </View> 
                ) : null }

                {school ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/school-icon-2.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>{school}</Text>
                  </View> 
                ) : null }

                {gender ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/account-icon.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>
                      {orientation ? (
                          <Text style={mainStyles.fullProfileJob}>{orientation} </Text>
                      ) : null }
                      {gender}
                    </Text>
                  </View> 
                ) : null }

                {location ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/location-icon.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>Lives in {location}</Text>
                  </View> 
                ) : null }

                {distance ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/trip-icon.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>About {distance} mile(s) away</Text>
                  </View> 
                ) : null }

                {bio ? (
                  <View style={mainStyles.fullProfileInfoRow3}>
                    <Image source={require("../assets/star-icon.png")} style={mainStyles.jobIcon} />
                    <Text style={mainStyles.fullProfileJob}>{bio}</Text>
                  </View> 
                ) : null }

                <Spacer height={15} />
                <Line />
                <Spacer height={10} />
                  
                <Text style={mainStyles.aboutMeHeader}>How I Live</Text>

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>Do I smoke?</Text>
                  <Text style={mainStyles.fullProfileJob}>{smoker}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>What time do I go to bed?</Text>
                  <Text style={mainStyles.fullProfileJob}>{bedTime}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>What time do I wake up?</Text>
                  <Text style={mainStyles.fullProfileJob}>{wakeUpTime}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>Am I okay with guests?</Text>
                  <Text style={mainStyles.fullProfileJob}>{okayWithGuests}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>How often do I have guests?</Text>
                  <Text style={mainStyles.fullProfileJob}>{howOftenHaveGuests}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>When do I shower?</Text>
                  <Text style={mainStyles.fullProfileJob}>{showerTime}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>Would I rather cook or order?</Text>
                  <Text style={mainStyles.fullProfileJob}>{cookOrder}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>How important is it to keep my space clean?</Text>
                  <Text style={mainStyles.fullProfileJob}>{keepSpaceClean}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>How loud can it be while I sleep?</Text>
                  <Text style={mainStyles.fullProfileJob}>{noiseLevel}</Text>
                </View> 

                <View style={mainStyles.fullProfileInfoRow4}>
                  <Text style={mainStyles.fullProfileQuestionTitle}>How comfortable am I with living with someone in the LGBTQIA+ community?</Text>
                  <Text style={mainStyles.fullProfileJob}>{lgbtComfort}</Text>
                </View> 

                <Spacer height={30} />

            </View>

            </ScrollView>
        </SafeAreaView>

      ) : (

        <View style={mainStyles.container}>
        <StatusBar hidden={false} style={'dark'} /> 
        
        <Header navigation={navigation} style={mainStyles.header}/>

        {loading ? (
          <View style={mainStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <ProfileCard image={image} firstName={firstName} age={age} lastName={lastName} pronouns={pronouns} id={id} navigation={navigation} isVerified={verified}/>

            <Pressable style={mainStyles.infoIconButton} onPress={() => { setFullPage(true) }}>
              <Image style={mainStyles.infoIcon} source={require('../assets/info-icon.png')} />
            </Pressable>

            <View style={mainStyles.likeContainer}>
              <Pressable>
                <Image source={require('../assets/dislike-icon.png')} style={mainStyles.dislikeIcon} />
              </Pressable>

              <Pressable onPress={() => { getUser() }}>
                <Image source={require('../assets/like-icon.png')} style={mainStyles.likeIcon} />
              </Pressable>
            </View>
          </>
        )}

        <Footer navigation={navigation} route={route.name}/>

    </View>
      )}
    </>
  );
}

export default HomePage;