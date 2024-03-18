
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase';

const ButtonDeconnexion = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch(error => alert(error.message));
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Se déconnecter</Text>
    </TouchableOpacity>
  );
};

export default ButtonDeconnexion;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ADD8E6',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 16,
  },
});
