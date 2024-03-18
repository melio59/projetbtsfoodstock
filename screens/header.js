
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.navContainer}>
        <Text style={styles.navItem}>Accueil</Text>
        <Text style={styles.navItem}>Stockage</Text>
        <Text style={styles.navItem}>Commande</Text>
        <Text style={styles.navItem}>Panier</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ADD1E6', 
  },
  logo: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
  navContainer: {
    flexDirection: 'row',
  },
  navItem: {
    marginLeft: 10,
    color: '#ecf0f1', // You can change the text color
  },
});

export default Header;
