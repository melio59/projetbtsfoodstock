import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StockagePage from './screens/StockagePage';
import { Header } from './screens/header';
import Footer from './screens/footer';
import categorieScreen from './screens/categorieScreen';
import ChangerMotDePasseScreen from './screens/ChangerMotDePasseScreen';
import EmployeeCRUD from './screens/EmployeeCRUD';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stockage" component={StockagePage} />
        <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Categorie" component={categorieScreen} />
        <Stack.Screen name="ChangerMotDePasse" component={ChangerMotDePasseScreen} />
        <Stack.Screen name="test" component={EmployeeCRUD} />


        


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
