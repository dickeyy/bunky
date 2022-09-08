import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Pages
import OnboardingPage from './pages/OnboardingPage';
import PurposeSelectionPage from './pages/PurposeSelectionPage';
import HomePurposeOnboardingPage from './pages/HomePurposeOnboardingPage';
import DormPurposeOnboardingPage from './pages/DormPurposeOnboardingPage';
import ProfileCreationPage1 from './pages/ProfileCreationPage1';
import ProfileCreationPage2 from './pages/ProfileCreationPage2';
import ProfileCreationPage3 from './pages/ProfileCreationPage3';
import ProfileCreationPage4 from './pages/ProfileCreationPage4';
import ProfileCreationPage5 from './pages/ProfileCreationPage5';
import OnBoardingFinalizeProfilePage from './pages/OnBoardingFinalizeProfilePage';
import HomePage from './pages/HomePage';
import FullPageProfileViewPage from './comps/FullPageProfileViewPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="Onboarding1"
          component={OnboardingPage}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="PurposeSelection"
          component={PurposeSelectionPage}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="HomePurposeOnboarding"
          component={HomePurposeOnboardingPage}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="DormPurposeOnboarding"
          component={DormPurposeOnboardingPage}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="ProfileCreation1"
          component={ProfileCreationPage1}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="ProfileCreation2"
          component={ProfileCreationPage2}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="ProfileCreation3"
          component={ProfileCreationPage3}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="ProfileCreation4"
          component={ProfileCreationPage4}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="ProfileCreation5"
          component={ProfileCreationPage5}
          options={{ headerShown: false, animation: 'fade' }}
        />

        <Stack.Screen
          name="FullPageProfileView"
          component={FullPageProfileViewPage}
          options={{ headerShown: false, animation: 'none' }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;