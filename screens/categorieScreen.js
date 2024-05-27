import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const CategorieScreen = () => {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'categorie');
      const json = await response.json();
      setCategories(json);
      setNextId(json.length + 1);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addCategorie = async () => {
    if (nomCategorie.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un nom de catégorie valide.');
      return;
    }
  
    const BASEURL = 'http://127.0.0.1:8000/';
  
    try {
      await fetch(BASEURL + 'categorie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_categorie: nomCategorie, 
        }),
      }).then(response => response.json()).then(data => console.log(data));
  
      if (response.ok) {
        const json = await response.json();
        setCategories([...categories, { id: json.id, nomCategorie: json.nomCategorie }]);
        setNomCategorie('');
        setNextId(nextId + 1);
      } else {
        Alert.alert('Erreur', 'Impossible de créer la catégorie. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };

  const deleteCategorie = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      await fetch(BASEURL + 'categorie/' + id, {
        method: 'DELETE',
      });

      setCategories(categories.filter((categorie) => categorie.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const editCategorie = (id, nomCategorie) => {
    setEditingId(id);
    setNomCategorie(nomCategorie);
  };

  const updateCategorie = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'categorie/' + editingId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_categorie: nomCategorie,
        }),
      });

      const json = await response.json();
      setCategories(
        categories.map((categorie) => (categorie.id === editingId ? json : categorie))
      );
      setNomCategorie('');
      setEditingId(null);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nomCategorie}
        onChangeText={(text) => setNomCategorie(text)}
        placeholder="Nom de la catégorie"
      />
      {editingId ? (
        <Button title="Modifier la catégorie" onPress={updateCategorie} />
      ) : (
        <Button title="Ajouter une catégorie" onPress={addCategorie} />
      )}
      <FlatList
        data={categories}
        keyExtractor={(item, index) => item.id ? item.id.toString() : Date.now().toString() + index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>ID: {item.id}</Text>
            <Text style={styles.tableCell}>Nom: {item.nomCategorie}</Text>
            <Button title="Modifier" onPress={() => editCategorie(item.id, item.nomCategorie)} color="#ADD1E6" />
            <Button title="Supprimer" onPress={() => deleteCategorie(item.id)} color="#ADD1E6" />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
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

export default CategorieScreen;
