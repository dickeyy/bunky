import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
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
import FullPageProfileView from '../comps/FullPageProfileViewPage';
import Line from '../comps/Line';

const HomePage = ({ navigation, id })  => {

  // Personal Info
  const [uId, setId] = useState(null);
  const [image, setImage] = useState('https://i.imgur.com/ji6KXLI.jpg');
  const [firstName, setFirstName] = useState('Kyle');
  const [lastName, setLastName] = useState('Dickey');
  const [bio, setBio] = useState('I am really cool!');
  const [location, setLocation] = useState('Flagstaff, AZ');
  const [distance, setDistance] = useState('1 Mile Away');
  const [jobTitle, setJobTitle] = useState('Cashier');
  const [company, setCompany] = useState('Target')
  const [school, setSchool] = useState('Northern Arizona University');
  const [age, setAge] = useState('18');
  const [pronouns, setPronouns] = useState('He / Him');
  const [gender, setGender] = useState('Man');
  const [orientation, setOrientation] = useState('Straight');

  // Roomate questionaire info
  const [bedTime, setBedTime] = useState('12 AM')
  const [wakeUpTime, setWakeUpTime] = useState('9 AM')
  const [okayWithGuests, setOkayWithGuests] = useState('Yes')
  const [showerTime , setShowerTime] = useState('Morning')
  const [cookOrder, setCookOrder] = useState('Order')
  const [keepSpaceClean, setKeepSpaceClean] = useState('Very important to me')
  const [noiseLevel, setNoiseLevel] = useState('High')
  const [lgbtComfort, setLgbtComfort] = useState('Very comfortable')
  const [smoker, setSmoker] = useState('Never');

  const [fullPage, setFullPage] = useState(false);

  const route = useRoute();

  return (

    <>
      {fullPage ? (
        
        <SafeAreaView>
        <StatusBar hidden={false} style={'dark'} /> 

        <ScrollView style={mainStyles.scrollView}>

            <View style={mainStyles.fullProfileImageContainer}>
                
                <Image source={{ uri:image }} style={mainStyles.fullProfileImage} />
                
                <Pressable onPress={() => { setFullPage(false) }}>
                    <View style={mainStyles.backIconContainer}>
                        <Image source={require("../assets/back-icon-2-white.png")} style={mainStyles.backIcon} />
                    </View>
                </Pressable>

            </View>

            <View style={mainStyles.fullProfileInfoContainer}>

                <View style={mainStyles.fullProfileInfoRow1}>
                  <Text style={mainStyles.fullProfileName}>{firstName}</Text>
                  <Text style={mainStyles.fullProfileAge}>{age}</Text>
                </View>
                
                <View style={mainStyles.fullProfileInfoRow2}>
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
        
        <Header navigation={navigation}/>
        <ProfileCard image={image} firstName={firstName} age={age} lastName={lastName} pronouns={pronouns} id={id} navigation={navigation}/>

        <Pressable style={mainStyles.infoIconButton} onPress={() => { setFullPage(true) }}>
          <Image style={mainStyles.infoIcon} source={require('../assets/info-icon.png')} />
        </Pressable>

        <Footer navigation={navigation} route={route.name}/>

        <View style={mainStyles.likeContainer}>
          <Pressable>
            <Image source={require('../assets/dislike-icon.png')} style={mainStyles.dislikeIcon} />
          </Pressable>

          <Pressable>
            <Image source={require('../assets/like-icon.png')} style={mainStyles.likeIcon} />
          </Pressable>
        </View>

    </View>
      )}
    </>
  );
}

export default HomePage;