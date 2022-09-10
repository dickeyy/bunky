import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import ChoiceOption from '../comps/ChoiceOption';
import Spacer from '../comps/Spacer';

// Page
const ProfileCreationPage4= ({ navigation }) => {

    const [isExclusiveSelected1_1, setisExclusiveSelected1_1] = useState(false);
    const [isExclusiveSelected1_2, setisExclusiveSelected1_2] = useState(false);

    const [isExclusiveSelected2_1, setisExclusiveSelected2_1] = useState(false);
    const [isExclusiveSelected2_2, setisExclusiveSelected2_2] = useState(false);
    const [isExclusiveSelected2_3, setisExclusiveSelected2_3] = useState(false);

    const [isExclusiveSelected3_1, setisExclusiveSelected3_1] = useState(false);
    const [isExclusiveSelected3_2, setisExclusiveSelected3_2] = useState(false);

    const [isExclusiveSelected4_1, setisExclusiveSelected4_1] = useState(false);
    const [isExclusiveSelected4_2, setisExclusiveSelected4_2] = useState(false);

    const [isExclusiveSelected5_1, setisExclusiveSelected5_1] = useState(false);
    const [isExclusiveSelected5_2, setisExclusiveSelected5_2] = useState(false);
    const [isExclusiveSelected5_3, setisExclusiveSelected5_3] = useState(false);

    const [isExclusiveSelected6_1, setisExclusiveSelected6_1] = useState(false);
    const [isExclusiveSelected6_2, setisExclusiveSelected6_2] = useState(false);
    const [isExclusiveSelected6_3, setisExclusiveSelected6_3] = useState(false);

    const [isExclusiveSelected7_1, setisExclusiveSelected7_1] = useState(false);
    const [isExclusiveSelected7_2, setisExclusiveSelected7_2] = useState(false);
    const [isExclusiveSelected7_3, setisExclusiveSelected7_3] = useState(false);

    const [isExclusiveSelected8_1, setisExclusiveSelected8_1] = useState(false);
    const [isExclusiveSelected8_2, setisExclusiveSelected8_2] = useState(false);
    const [isExclusiveSelected8_3, setisExclusiveSelected8_3] = useState(false);

    const [bedTime, onChangeBedTime] = useState(null);
    const [wakeTime, onChangeWakeTime] = useState(null);
    const [isOkayWithGuests, setisOkayWithGuests] = useState(null);
    const [howOftenGuests, setHowOftenGuests] = useState(null);
    const [showerTime, setShowerTime] = useState(null);
    const [cookOrder, setCookORder] = useState(null);
    const [smoker, setSmoker] = useState(null);
    const [keepSpaceClean, setKeepSpaceClean] = useState(null);
    const [sleepNoise, setSleepNoise] = useState(null);
    const [lgbtComfortable, setLgbtComfortable] = useState(null);

    const exclusiveCheck_1 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected1_1 == true) {
                setisExclusiveSelected1_1(false);
                setisOkayWithGuests(null)
            } else if (isExclusiveSelected1_1 == false) {
                if (isExclusiveSelected1_2 == true) {
                    setisExclusiveSelected1_2(false);
                }
                setisExclusiveSelected1_1(true)
                setisOkayWithGuests('Yes')
            }
        } else if (id == 2) {
            if (isExclusiveSelected1_2 == true) {
                setisExclusiveSelected1_2(false);
                setisOkayWithGuests(null)
            } else if (isExclusiveSelected1_2 == false) {
                if (isExclusiveSelected1_1 == true) {
                    setisExclusiveSelected1_1(false);
                }
                setisExclusiveSelected1_2(true)
                setisOkayWithGuests('No')
            }
        }
    }

    const exclusiveCheck_2 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected2_1 == true) {
                setisExclusiveSelected2_1(false);
                setHowOftenGuests(null)
            } else if (isExclusiveSelected2_1 == false) {
                if (isExclusiveSelected2_2 == true || isExclusiveSelected2_3 == true) {
                    setisExclusiveSelected2_2(false);
                    setisExclusiveSelected2_3(false);
                }
                setisExclusiveSelected2_1(true)
                setHowOftenGuests('All the time')
            }
        } else if (id == 2) {
            if (isExclusiveSelected2_2 == true) {
                setisExclusiveSelected2_2(false);
                setHowOftenGuests(null)
            } else if (isExclusiveSelected2_2 == false) {
                if (isExclusiveSelected2_1 == true || isExclusiveSelected2_3 == true) {
                    setisExclusiveSelected2_1(false);
                    setisExclusiveSelected2_3(false);
                }
                setisExclusiveSelected2_2(true)
                setHowOftenGuests('Sometimes')
            }
        } else if (id == 3) {
            if (isExclusiveSelected2_3 == true) {
                setisExclusiveSelected2_3(false);
                setHowOftenGuests(null)
            } else if (isExclusiveSelected2_3 == false) {
                if (isExclusiveSelected2_2 == true || isExclusiveSelected2_1 == true) {
                    setisExclusiveSelected2_2(false);
                    setisExclusiveSelected2_1(false);
                }
                setisExclusiveSelected2_3(true)
                setHowOftenGuests('Never')
            }
        }
    }

    const exclusiveCheck_3 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected3_1 == true) {
                setisExclusiveSelected3_1(false);
                setShowerTime(null)
            } else if (isExclusiveSelected3_1 == false) {
                if (isExclusiveSelected3_2 == true) {
                    setisExclusiveSelected3_2(false);
                }
                setisExclusiveSelected3_1(true)
                setShowerTime('In the morning')
            }
        } else if (id == 2) {
            if (isExclusiveSelected3_2 == true) {
                setisExclusiveSelected3_2(false);
                setShowerTime(null)
            } else if (isExclusiveSelected3_2 == false) {
                if (isExclusiveSelected3_1 == true) {
                    setisExclusiveSelected3_1(false);
                }
                setisExclusiveSelected3_2(true)
                setShowerTime('At night')
            }
        }
    }

    const exclusiveCheck_4 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected4_1 == true) {
                setisExclusiveSelected4_1(false);
                setCookORder(null)
            } else if (isExclusiveSelected4_1 == false) {
                if (isExclusiveSelected4_2 == true) {
                    setisExclusiveSelected4_2(false);
                }
                setisExclusiveSelected4_1(true)
                setCookORder('Cook')
            }
        } else if (id == 2) {
            if (isExclusiveSelected4_2 == true) {
                setisExclusiveSelected4_2(false);
                setCookORder(null)
            } else if (isExclusiveSelected4_2 == false) {
                if (isExclusiveSelected4_1 == true) {
                    setisExclusiveSelected4_1(false);
                }
                setisExclusiveSelected4_2(true)
                setCookORder('Eat out / Order')
            }
        }
    }

    const exclusiveCheck_5 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected5_1 == true) {
                setisExclusiveSelected5_1(false);
                setSmoker(null)
            } else if (isExclusiveSelected5_1 == false) {
                if (isExclusiveSelected5_2 == true || isExclusiveSelected5_3 == true) {
                    setisExclusiveSelected5_2(false);
                    setisExclusiveSelected5_3(false);
                }
                setisExclusiveSelected5_1(true)
                setSmoker('All the time')
            }
        } else if (id == 2) {
            if (isExclusiveSelected5_2 == true) {
                setisExclusiveSelected5_2(false);
                setSmoker(null)
            } else if (isExclusiveSelected5_2 == false) {
                if (isExclusiveSelected5_1 == true || isExclusiveSelected5_3 == true) {
                    setisExclusiveSelected5_1(false);
                    setisExclusiveSelected5_3(false);
                }
                setisExclusiveSelected5_2(true)
                setSmoker('Sometimes')
            }
        } else if (id == 3) {
            if (isExclusiveSelected5_3 == true) {
                setisExclusiveSelected5_3(false);
                setSmoker(null)
            } else if (isExclusiveSelected5_3 == false) {
                if (isExclusiveSelected5_2 == true || isExclusiveSelected5_1 == true) {
                    setisExclusiveSelected5_2(false);
                    setisExclusiveSelected5_1(false);

                }
                setisExclusiveSelected5_3(true)
                setSmoker('Never')
            }
        }
    }

    const exclusiveCheck_6 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected6_1 == true) {
                setisExclusiveSelected6_1(false);
                setKeepSpaceClean(null)
            } else if (isExclusiveSelected6_1 == false) {
                if (isExclusiveSelected6_2 == true || isExclusiveSelected6_3 == true) {
                    setisExclusiveSelected6_2(false);
                    setisExclusiveSelected6_3(false);
                }
                setisExclusiveSelected6_1(true)
                setKeepSpaceClean('Important to me')
            }
        } else if (id == 2) {
            if (isExclusiveSelected6_2 == true) {
                setisExclusiveSelected6_2(false);
                setKeepSpaceClean(null)
            } else if (isExclusiveSelected6_2 == false) {
                if (isExclusiveSelected6_1 == true || isExclusiveSelected6_3 == true) {
                    setisExclusiveSelected6_1(false);
                    setisExclusiveSelected6_3(false);
                }
                setisExclusiveSelected6_2(true)
                setKeepSpaceClean('Somewhat important to me')
            }
        } else if (id == 3) {
            if (isExclusiveSelected6_3 == true) {
                setisExclusiveSelected6_3(false);
                setKeepSpaceClean(null)
            } else if (isExclusiveSelected6_3 == false) {
                if (isExclusiveSelected6_2 == true || isExclusiveSelected6_1 == true) {
                    setisExclusiveSelected6_2(false);
                    setisExclusiveSelected6_1(false);

                }
                setisExclusiveSelected6_3(true)
                setKeepSpaceClean('Not important to me')
            }
        }
    }

    const exclusiveCheck_7 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected7_1 == true) {
                setisExclusiveSelected7_1(false);
                setSleepNoise(null)
            } else if (isExclusiveSelected7_1 == false) {
                if (isExclusiveSelected7_2 == true || isExclusiveSelected7_3 == true) {
                    setisExclusiveSelected7_2(false);
                    setisExclusiveSelected7_3(false);
                }
                setisExclusiveSelected7_1(true)
                setSleepNoise('High')
            }
        } else if (id == 2) {
            if (isExclusiveSelected7_2 == true) {
                setisExclusiveSelected7_2(false);
                setSleepNoise(null)
            } else if (isExclusiveSelected7_2 == false) {
                if (isExclusiveSelected7_1 == true || isExclusiveSelected7_3 == true) {
                    setisExclusiveSelected7_1(false);
                    setisExclusiveSelected7_3(false);
                }
                setisExclusiveSelected7_2(true)
                setSleepNoise('Medium')
            }
        } else if (id == 3) {
            if (isExclusiveSelected7_3 == true) {
                setisExclusiveSelected7_3(false);
                setSleepNoise(null)
            } else if (isExclusiveSelected7_3 == false) {
                if (isExclusiveSelected7_2 == true || isExclusiveSelected7_1 == true) {
                    setisExclusiveSelected7_2(false);
                    setisExclusiveSelected7_1(false);

                }
                setisExclusiveSelected7_3(true)
                setSleepNoise('Low')
            }
        }
    }

    const exclusiveCheck_8 = (id) => {
        if (id == 1) {
            if (isExclusiveSelected8_1 == true) {
                setisExclusiveSelected8_1(false);
                setLgbtComfortable(null)
            } else if (isExclusiveSelected8_1 == false) {
                if (isExclusiveSelected8_2 == true || isExclusiveSelected8_3 == true) {
                    setisExclusiveSelected8_2(false);
                    setisExclusiveSelected8_3(false);
                }
                setisExclusiveSelected8_1(true)
                setLgbtComfortable('Very comfortable for me')
            }
        } else if (id == 2) {
            if (isExclusiveSelected8_2 == true) {
                setisExclusiveSelected8_2(false);
                setLgbtComfortable(null)
            } else if (isExclusiveSelected8_2 == false) {
                if (isExclusiveSelected8_1 == true || isExclusiveSelected8_3 == true) {
                    setisExclusiveSelected8_1(false);
                    setisExclusiveSelected8_3(false);
                }
                setisExclusiveSelected8_2(true)
                setLgbtComfortable('Somewhat comfortable for me')
            }
        } else if (id == 3) {
            if (isExclusiveSelected8_3 == true) {
                setisExclusiveSelected8_3(false);
                setLgbtComfortable(null)
            } else if (isExclusiveSelected8_3 == false) {
                if (isExclusiveSelected8_2 == true || isExclusiveSelected8_1 == true) {
                    setisExclusiveSelected8_2(false);
                    setisExclusiveSelected8_1(false);

                }
                setisExclusiveSelected8_3(true)
                setLgbtComfortable('Not comfortable for me')
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
      if (bedTime == null || wakeTime == null || sleepNoise == null || keepSpaceClean == null || lgbtComfortable == null || howOftenGuests == null || isOkayWithGuests == null || showerTime == null || cookOrder == null || smoker == null) {
        return
      }
      
      fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/onboard/set_living_data', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sessionId: sessionId,
            livingData: {
                bedTime: bedTime,
                wakeTime: wakeTime,
                okayWithGuests: isOkayWithGuests,
                howOftenHaveGuests: howOftenGuests,
                showerTime: showerTime,
                cookOrder: cookOrder,
                keepSpaceClean: keepSpaceClean,
                noiseLevel: sleepNoise,
                lgbtComfort: lgbtComfortable,
                smoker: smoker,
            }
          })
        
        }) .then((response) => response.json())
        .then((json) => {
          if (json.message == 'User updated') {
            navigation.navigate("ProfileCreation5")
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

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView style={mainStyles.scrollView}>

                    <Text style={onboardingStyles.homeTitleText2}>Tell us about how you live</Text>

                    <Text style={onboardingStyles.homeSubtitleText}>Don't be shy, people need to know who they are going to be living with.</Text>

                    <View style={onboardingStyles.questionaireContainer}>

                        <Text style={onboardingStyles.questionaireQuestion}>What time do you normally go to bed?</Text>  
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="10PM, 11PM, etc."
                            onChangeText={onChangeBedTime}
                            autoComplete='off'
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            textContentType='time'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>What time do you normally wake up?</Text>  
                        <TextInput
                            style={onboardingStyles.questionaireInput}
                            placeholder="9AM, 10AM, etc."
                            autoComplete='off'
                            onChangeText={onChangeWakeTime}
                            keyboardAppearance='light'
                            returnKeyType='next'
                            selectionColor='#6320EE'
                            cursorColor='#6320EE'
                            textContentType='time'
                            keyboardType='default'
                        />

                        <Text style={onboardingStyles.questionaireQuestion}>Are you okay with guests?</Text>  
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_1(1) }}>
                            <ChoiceOption selected={isExclusiveSelected1_1} text={'Yes!'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_1(2) }}>
                            <ChoiceOption selected={isExclusiveSelected1_2} text={'No'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>How often do you have guests?</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_2(1) }}>
                            <ChoiceOption selected={isExclusiveSelected2_1} text={'All the time'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_2(2) }}>
                            <ChoiceOption selected={isExclusiveSelected2_2} text={'Sometimes'} />
                        </Pressable>

                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_2(3) }}>
                            <ChoiceOption selected={isExclusiveSelected2_3} text={'Never'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>When do you shower?</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_3(1) }}>
                            <ChoiceOption selected={isExclusiveSelected3_1} text={'In the morning'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_3(2) }}>
                            <ChoiceOption selected={isExclusiveSelected3_2} text={'At night'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>Cook or eat out / order</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_4(1) }}>
                            <ChoiceOption selected={isExclusiveSelected4_1} text={'Cook'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_4(2) }}>
                            <ChoiceOption selected={isExclusiveSelected4_2} text={'Eat out / Order'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>Do you smoke?</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_5(1) }}>
                            <ChoiceOption selected={isExclusiveSelected5_1} text={'All the time'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_5(2) }}>
                            <ChoiceOption selected={isExclusiveSelected5_2} text={'Sometimes'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_5(3) }}>
                            <ChoiceOption selected={isExclusiveSelected5_3} text={'Never'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>Keeping my space clean is...</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_6(1) }}>
                            <ChoiceOption selected={isExclusiveSelected6_1} text={'Important to me'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_6(2) }}>
                            <ChoiceOption selected={isExclusiveSelected6_2} text={'Somewhat important to me'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_6(3) }}>
                            <ChoiceOption selected={isExclusiveSelected6_3} text={'Not important to me'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>When I sleep, the level of noise can be...</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_7(1) }}>
                            <ChoiceOption selected={isExclusiveSelected7_1} text={'High'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_7(2) }}>
                            <ChoiceOption selected={isExclusiveSelected7_2} text={'Medium'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_7(3) }}>
                            <ChoiceOption selected={isExclusiveSelected7_3} text={'Low'} />
                        </Pressable>

                        <Spacer height={15} />

                        <Text style={onboardingStyles.questionaireQuestion}>Living with a roommate(s) who is LGBTQIA+ is...</Text> 
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_8(1) }}>
                            <ChoiceOption selected={isExclusiveSelected8_1} text={'Very comfortable for me'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_8(2) }}>
                            <ChoiceOption selected={isExclusiveSelected8_2} text={'Somewhat comfortable for me'} />
                        </Pressable>
                        <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => { exclusiveCheck_8(3) }}>
                            <ChoiceOption selected={isExclusiveSelected8_3} text={'Not comfortable for me'} />
                        </Pressable>

                        <Spacer height={15} />

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

export default ProfileCreationPage4