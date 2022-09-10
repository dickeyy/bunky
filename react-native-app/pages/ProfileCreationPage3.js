import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';

// Page
const ProfileCreationPage3 = ({ navigation }) => {

    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);
    const [isSelected5, setIsSelected5] = useState(false);
    const [isSelected6, setIsSelected6] = useState(false);
    const [isSelected7, setIsSelected7] = useState(false);
    const [isSelected8, setIsSelected8] = useState(false);
    const [isSelected9, setIsSelected9] = useState(false);

    const [birthdayEntered, onChangeBirthday] = React.useState(null);
    const [birthYear, setBirthYear] = React.useState(null);
    const [birthMonth, setBirthMonth] = React.useState(null);
    const [birthDay, setBirthDay] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [pronouns, onChangePronouns] = React.useState(null);
    const [gender, onChangeGender] = React.useState(null);
    const [sexuality, setSexuality] = React.useState(null);
    const [jobTitle, onChangeJobTItle] = React.useState(null);
    const [company, onChangeCompany] = React.useState(null);
    const [school, onChangeSchool] = React.useState(null);
    const [bio, onChangeBio] = React.useState(null);

    const checkSelect = (id) => {
        
        if (id == 1) {
            if (isSelected1 == true) {
                setIsSelected1(false);
            } else if (isSelected1 == false) {
                setIsSelected1(true);
                setSexuality("Straight")
            }
        } else if (id == 2) {
            if (isSelected2 == true) {
                setIsSelected2(false);
            } else if (isSelected2 == false) {
                setIsSelected2(true);
                setSexuality("Gay")
            }
        } else if (id == 3) {
            if (isSelected3 == true) {
                setIsSelected3(false);
            } else if (isSelected3 == false) {
                setIsSelected3(true);
                setSexuality("Lesbian")
            }
        } else if (id == 4) {
            if (isSelected4 == true) {
                setIsSelected4(false);
            } else if (isSelected4 == false) {
                setIsSelected4(true);
                setSexuality("Queer")
            }
        } else if (id == 5) {
            if (isSelected5 == true) {
                setIsSelected5(false);
            } else if (isSelected5 == false) {
                setIsSelected5(true);
                setSexuality("Asexual")
            }
        } else if (id == 6) {
            if (isSelected6 == true) {
                setIsSelected6(false);
            } else if (isSelected6 == false) {
                setIsSelected6(true);
                setSexuality("Bisexual")
            }
        } else if (id == 7) {
            if (isSelected7 == true) {
                setIsSelected7(false);
            } else if (isSelected7 == false) {
                setIsSelected7(true);
                setSexuality("Demisexual")
            }
        } else if (id == 8) {
            if (isSelected8 == true) {
                setIsSelected8(false);
            } else if (isSelected8 == false) {
                setIsSelected8(true);
                setSexuality("Pansexual")
            }
        } else if (id == 9) {
            if (isSelected9 == true) {
                setIsSelected9(false);
            } else if (isSelected9 == false) {
                setIsSelected9(true);
                setSexuality("Questioning")
            }
        }

    }

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
  
    React.useEffect(() => {
      getSessionId().then((value) => {
        setSessionId(value)
      })
    }, [])
  
    const setData = (navigation) => {
      if (birthdayEntered == null ) {
        return
      }

        setBirthYear(birthdayEntered.substring(0, 4))
        setBirthMonth(birthdayEntered.substring(4, 6))
        setBirthDay(birthdayEntered.substring(6, 8))

        let ageFromString = new AgeFromDate(new Date(birthYear, birthMonth - 1, birthDay)).age;;
        setAge(ageFromString)
      
      fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/onboard/set_user_data', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId: sessionId,
            userData: {
                age: age,
                pronouns: pronouns,
                jobTitle: jobTitle,
                company: company,
                school: school,
                bio: bio,
                gender: gender,
                sexuality: sexuality
            }
          })
        
        }) .then((response) => response.json())
        .then((json) => {
          if (json.message == 'User updated') {
            navigation.navigate("ProfileCreation4")
          } else {
            Alert.alert("Error", "There was an error updating your data. Please try again later.")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <SafeAreaView>
            <StatusBar hidden={false} style={'dark'} /> 

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView style={mainStyles.scrollView}>

                    <Text style={onboardingStyles.homeTitleText2}>Tell us about yourself</Text>

                    <Text style={onboardingStyles.homeSubtitleText}>Don't be shy, people need to know who they are going to be living with.</Text>

                    <View style={onboardingStyles.questionaireContainer}>

                        <Text style={onboardingStyles.questionaireQuestion}>When's your birthday? *</Text>  
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="YYYY-MM-DD"
                            onChangeText={onChangeBirthday}
                            autoComplete='birthdate-full'
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            textContentType='date'
                            keyboardType='numeric'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What are your pronouns?</Text> 
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="He/Him She/Her They/Them etc."
                            onChangeText={onChangePronouns}
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What gender do you identify with?</Text>
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="Man, Woman, etc."
                            onChangeText={onChangeGender}
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What is your sexual identity?</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(1) }}>
                            <ChoiceOption selected={isSelected1} text={'Straight'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(2) }}>
                            <ChoiceOption selected={isSelected2} text={'Gay'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(3) }}>
                            <ChoiceOption selected={isSelected7} text={'Lesbian'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(4) }}>
                            <ChoiceOption selected={isSelected3} text={'Queer'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(5) }}>
                            <ChoiceOption selected={isSelected4} text={'Asexual'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(6) }}>
                            <ChoiceOption selected={isSelected5} text={'Bisexual'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(7) }}>
                            <ChoiceOption selected={isSelected6} text={'Demisexual'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(8) }}>
                            <ChoiceOption selected={isSelected8} text={'Pansexual'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { checkSelect(9) }}>
                            <ChoiceOption selected={isSelected9} text={'Questioning'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>What is your job title?</Text> 
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="Doctor, Lawyer, Cashier, etc."
                            onChangeText={onChangeJobTItle}
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What company do you work at?</Text> 
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="Google, Apple, Target, etc."
                            keyboardAppearance='light'
                            onChangeText={onChangeCompany}
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What school do you go to?</Text> 
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="Harvard, Yale, etc."
                            keyboardAppearance='light'
                            onChangeText={onChangeSchool}
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>Personal Bio</Text> 
                        <TextInput
                            style={onboardingStyles.questionaireInput2}
                            placeholder="I'm really cool"
                            multiline
                            onChangeText={onChangeBio}
                            numberOfLines={4}
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            keyboardType='default'
                        />

                        <Pressable style={onboardingStyles.homePhoneInputButton} onPress={() => { setData(navigation) }}>
                            <Text style={onboardingStyles.homePhoneInputButtonText}>Next</Text>
                        </Pressable>

                        <Spacer height={25} />
                    
                    </View>

                </ScrollView>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
    );

}

export default ProfileCreationPage3