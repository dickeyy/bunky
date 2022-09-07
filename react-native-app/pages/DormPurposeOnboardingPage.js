import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable } from 'react-native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';

const Separator = () => (
    <View style={mainStyles.separator} />
);

const DormPurposeOnboardingPage = ({ navigation }) => {
  return (
    <SafeAreaView style={mainStyles.container}>

      <StatusBar hidden={true} /> 

        <OnboardingHeader navigation={navigation} />

        <View style={onboardingStyles.dormTitleContainer}>
            <Text style={onboardingStyles.dormTitleText}>Coming Soon...</Text>
        </View>
        
        <View style={onboardingStyles.dormSubtitleContainer}>
            <Text style={onboardingStyles.dormSubtitleText}>We're working on this feature right now. Check back soon!</Text>
        </View>

    </SafeAreaView>
  );
}

export default DormPurposeOnboardingPage