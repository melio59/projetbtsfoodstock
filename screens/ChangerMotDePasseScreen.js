import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { auth } from '../firebase'

const ChangerMotDePasseScreen = () => {
  const [ancienMotDePasse, setAncienMotDePasse] = useState('')
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmationNouveauMotDePasse, setConfirmationNouveauMotDePasse] = useState('')

  const handleChangementMotDePasse = () => {
    const utilisateur = auth.currentUser

    if (!utilisateur) {
      alert('Vous devez être connecté pour changer votre mot de passe')
      return
    }

    if (nouveauMotDePasse !== confirmationNouveauMotDePasse) {
      alert('Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas')
      return
    }

    utilisateur.updatePassword(nouveauMotDePasse)
      .then(() => {
        console.log('Mot de passe modifié avec succès')
      })
      .catch(error => {
        alert(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ancien mot de passe"
        value={ancienMotDePasse}
        onChangeText={text => setAncienMotDePasse(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={nouveauMotDePasse}
        onChangeText={text => setNouveauMotDePasse(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmationNouveauMotDePasse}
        onChangeText={text => setConfirmationNouveauMotDePasse(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleChangementMotDePasse}>
        <Text style={styles.buttonText}>Changer le mot de passe</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ADD1E6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ChangerMotDePasseScreen
