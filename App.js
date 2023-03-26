import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './components/home/home';
import Welcome from './components/welcome/welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Welcome">
        <Stack.Group screenOptions={{ headerStyle: styles.screen }} >

          <Stack.Screen name="Welcome" component = {Welcome} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component = {Home} options={{headerShown:false}}/>
          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
