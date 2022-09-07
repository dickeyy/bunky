import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, SafeAreaView, Pressable } from 'react-native';

// Import Styles
import mainStyles from '../styles/mainStyle';
import onboardingStyles from '../styles/onboardingStyle';

// Import Comps
import OnboardingHeader from '../comps/OnboardingHeader';
import Spacer from '../comps/Spacer';

const Separator = () => (
    <View style={mainStyles.separator} />
);

const PurposeSelectionPage = ({ navigation }) => {
  return (
    <SafeAreaView style={mainStyles.container}>

      <StatusBar hidden={true} /> 

        <OnboardingHeader navigation={navigation} />

        <View style={onboardingStyles.purposeTitleContainer}> 

            <Text style={onboardingStyles.purposeTitleText}>What kind of <Text style={onboardingStyles.underline}>roommate</Text> are you looking for?</Text>
    
        </View>

        <Separator />
        
        <View style={onboardingStyles.purposeButtonContainer}>

            <Pressable style={onboardingStyles.purposeButton} onPress={() => navigation.navigate('DormPurposeOnboarding')}>
                <Image source={require('../assets/school-icon.png')} style={onboardingStyles.selectionIcon} />
                <Text style={onboardingStyles.selectionText}>College / Dorm</Text>
            </Pressable>

            <Spacer height={15} />

            <Pressable style={onboardingStyles.purposeButton} onPress={() => navigation.navigate('HomePurposeOnboarding')}>
                <Image source={require('../assets/home-icon.png')} style={onboardingStyles.selectionIcon} />
                <Text style={onboardingStyles.selectionText}>Apt. / House</Text>
            </Pressable>

        </View>

    </SafeAreaView>
  );
}

export default PurposeSelectionPage