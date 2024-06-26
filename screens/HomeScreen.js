import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import ChangerMotDePasseScreen from './ChangerMotDePasseScreen';

const HomePageScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleStockagePage = () => {
    navigation.navigate("Article"); 
  }

  const handleStockagePage2 = () => {
    navigation.navigate("Categorie"); 
  }
  const handleStockagePage3 = () => {
    navigation.navigate("Fournisseur"); 
  }

  const handleStockagePage4 = () => {
    navigation.navigate("Commande"); 
  }

  const handleChangementMotDePasse = () => {
    navigation.navigate("ChangerMotDePasse");
  }

  return (
    <ImageBackground
      source={require('../assets/imgfood.png')} 
      style={styles.container}
    >
      <View style={styles.navbar}>
        
        <View style={styles.navLinks}>
          <Text style={styles.navLink}>Accueil</Text>
          <Text style={styles.navLink}>Stockage</Text>
          <Text style={styles.navLink}>Commande</Text>
          <Text style={styles.navLink}>Panier</Text>
          <Text style={styles.navLink}>Mon profil</Text>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStockagePage} style={styles.button}>
          <Text style={styles.buttonText}>Voir le stockage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStockagePage2} style={styles.button}>
          <Text style={styles.buttonText}>Voir les catégories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStockagePage3} style={styles.button}>
          <Text style={styles.buttonText}>Voir les fournisseurs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStockagePage4} style={styles.button}>
          <Text style={styles.buttonText}>Voir les commandes</Text>
        </TouchableOpacity>
        {auth.currentUser && (
          <TouchableOpacity onPress={handleChangementMotDePasse} style={styles.button}>
            <Text style={styles.buttonText}>Changer le mot de passe</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={[styles.button, styles.commandButton]}>
        <Text style={styles.buttonText}>Passer une commande</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  navLinks: {
    flexDirection: 'row',
  },
  navLink: {
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
  },
  content: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#ADD8E6',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, 
  },
  commandButton: {
    marginTop: 40,
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 13,
  },
});
