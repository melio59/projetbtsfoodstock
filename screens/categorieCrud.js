import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const CategorieScreen = () => {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'categorie');
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addCategorie = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'categorie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_categorie: nomCategorie,
        }),
      });

      const json = await response.json();
      setCategories([...categories, json]);
      setNomCategorie('');
    } catch (error) {
      console.error('Erreur:', error);
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

  const updateCategorie = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'categorie/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_categorie: nomCategorie,
        }),
      });

      const updatedCategorie = await response.json();
      setCategories(
        categories.map((categorie) => (categorie.id === id ? { ...categorie, ...updatedCategorie } : categorie))
      );
      setNomCategorie('');
      setEditingId(null);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (categorie) => {
    setNomCategorie(categorie.nom_categorie);
    setEditingId(categorie.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nomCategorie}
        onChangeText={(text) => setNomCategorie(text)}
        placeholder="Nom de la catégorie"
      />
      <Button
        title={editingId ? "Mettre à jour la catégorie" : "Ajouter une catégorie"}
        onPress={editingId ? () => updateCategorie(editingId) : addCategorie}
      />
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.nom_categorie}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Supprimer" onPress={() => deleteCategorie(item.id)} color="red" />
              <Button title="Modifier" onPress={() => handleEdit(item)} color="orange" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formContainer: {
    marginVertical: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  tableCell: {
    flex: 1,
    marginRight: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default CategorieScreen;
