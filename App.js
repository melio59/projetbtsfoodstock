// App.js
import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import StockagePageCRUD from './screens/StockagePageCRUD';
import Footer from './screens/footer';
import StockagePage from './screens/StockagePage';
import HomePageScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StockageCRUD" component={StockagePageCRUD} />
        <Stack.Screen name="Stockage" component={StockagePage} />
        <Stack.Screen name="HomeScreen" component={HomePageScreen} />

        

      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://example.com/your-background-image.jpg' }} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StockageCRUD')}
          >
            <Text style={styles.buttonText}>Accéder au crud</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Stockage')}
          >
            <Text style={styles.buttonText}>Accéder à la page de stockage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
