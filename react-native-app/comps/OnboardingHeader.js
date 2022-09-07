import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable } from 'react-native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

const OnboardingHeader = ({ navigation }) => {
  return (
    <View style={onboardingStyles.headerContainer}>

        <Pressable onPress={() => navigation.navigate('Onboarding1')} >
            <Image source={require('../assets/back-arrow.png')} style={onboardingStyles.backIcon} />
        </Pressable>

    </View>
  );
}

export default OnboardingHeader