import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionSpecs, createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './components/home/home';
import Welcome from './components/welcome/welcome';
import paletteColor from './components/PaletteColor/paletteColor';
import MakeQuestion from './components/home/question';
import NewCard from './components/cards/newCard'
import ReviewCard from './components/reviewCard/reviewCard';
import ShowLearnedCards from './components/AllLearnedCards/learnedCard';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer >

        <Stack.Navigator initialRouteName = "Welcome" screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal', 
          presentation:'modal'
        }}
        >
          <Stack.Group >
          
            <Stack.Screen name="Welcome" component = {Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component = {Home} options={{headerShown:false}}/>
            <Stack.Screen name="makeQuestion" component = {MakeQuestion} options={{headerShown:false}}/>
            <Stack.Screen name="newCard" component = {NewCard} options={{headerShown:false}}/>
            <Stack.Screen name="ReviewCard" component = {ReviewCard} options={{headerShown:false}}/>
            <Stack.Screen name="showLearnedCards" component = {ShowLearnedCards} options={{headerShown:false}}/>

          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
