import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { Header } from './screens/header';
import Footer from './screens/footer';
import categorieScreen from './screens/categorieScreen';
import ChangerMotDePasseScreen from './screens/ChangerMotDePasseScreen';
import FournisseurScreen from './screens/fournisseurCRUD';
import ArticleScreen from './screens/ArticleCRUD';
import CommandeScreen from './screens/commandeCRUD';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Categorie" component={categorieScreen} />
        <Stack.Screen name="ChangerMotDePasse" component={ChangerMotDePasseScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen name="Fournisseur" component={FournisseurScreen} />
        <Stack.Screen name="Commande" component={CommandeScreen} />


        


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
