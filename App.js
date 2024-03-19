import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StockagePage from './screens/StockagePage';
import { Header } from './screens/header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stockage" component={StockagePage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
