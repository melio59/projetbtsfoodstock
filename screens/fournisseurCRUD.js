import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';

const FournisseurScreen = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [nomFournisseur, setNomFournisseur] = useState('');
  const [numeroTelephone, setNumeroTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [idFournisseur, setIdFournisseur] = useState('');
  const [editingFournisseur, setEditingFournisseur] = useState(null);

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'fournisseur');
      const json = await response.json();
      setFournisseurs(json);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteFournisseur = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      await fetch(BASEURL + 'fournisseur/' + id, {
        method: 'DELETE',
      });

      setFournisseurs(fournisseurs.filter((fournisseur) => fournisseur.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addFournisseur = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      console.log("Tentative d'ajout d'un fournisseur...");

      const newFournisseur = {
        id: idFournisseur,
        nomFournisseur,
        numeroTelephone,
        adresse,
      };

      const response = await fetch(BASEURL + 'fournisseur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFournisseur),
      });

      const json = await response.json();

      console.log("Données reçues du serveur après l'ajout :", json);

      setFournisseurs([...fournisseurs, newFournisseur]);
      setIdFournisseur('');
      setNomFournisseur('');
      setNumeroTelephone('');
      setAdresse('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du fournisseur:', error);
    }
  };

  const updateFournisseur = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'fournisseur/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomFournisseur,
          numeroTelephone,
          adresse,
        }),
      });

      const json = await response.json();

      
      setFournisseurs(fournisseurs.map((fournisseur) => (fournisseur.id === id ? json : fournisseur)));
      setEditingFournisseur(null);
      setNomFournisseur('');
      setNumeroTelephone('');
      setAdresse('');
    } catch (error) {
      console.error('Erreur lors de la modification du fournisseur:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="ID du fournisseur"
          value={idFournisseur}
          onChangeText={setIdFournisseur}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom du fournisseur"
          value={nomFournisseur}
          onChangeText={setNomFournisseur}
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          value={numeroTelephone}
          onChangeText={setNumeroTelephone}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          value={adresse}
          onChangeText={setAdresse}
        />
        {editingFournisseur ? (
          <Button title="Modifier le fournisseur" onPress={() => updateFournisseur(editingFournisseur.id)} />
        ) : (
          <Button title="Ajouter un fournisseur" onPress={addFournisseur} />
        )}
      </View>
      <FlatList
        data={fournisseurs}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
             <Text style={styles.tableCell}>ID: {item.id}</Text>
            <Text style={styles.tableCell}>Numéro de téléphone: {item.numeroTelephone}</Text>
            <Text style={styles.tableCell}>Nom du fournisseur: {item.nomFournisseur}</Text>
            <Text style={styles.tableCell}>Adresse: {item.adresse}</Text>
            <Button
              title="Modifier"
              onPress={() => {
                setEditingFournisseur(item);
                setNomFournisseur(item.nomFournisseur);
                setNumeroTelephone(item.numeroTelephone);
                setAdresse(item.adresse);
              }} color="#ADD1E6"
            />
            <Button title="Supprimer" onPress={() => deleteFournisseur(item.id)} color="#ADD1E6" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tableCell: {
    flex: 1,
    marginRight: 10,
  },
});

export default FournisseurScreen;
