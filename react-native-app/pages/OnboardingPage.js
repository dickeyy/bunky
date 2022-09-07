import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable } from 'react-native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

const Separator = () => (
  <View style={mainStyles.separator} />
);

const OnboardingPage = ({ navigation }) => {
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