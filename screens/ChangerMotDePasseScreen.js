import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
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
    <View>
      <TextInput
        placeholder="Ancien mot de passe"
        value={ancienMotDePasse}
        onChangeText={text => setAncienMotDePasse(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Nouveau mot de passe"
        value={nouveauMotDePasse}
        onChangeText={text => setNouveauMotDePasse(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmationNouveauMotDePasse}
        onChangeText={text => setConfirmationNouveauMotDePasse(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleChangementMotDePasse}>
        <Text>Changer le mot de passe</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangerMotDePasseScreen
