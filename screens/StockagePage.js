import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const StockagePage = () => {
  const [produits, setProduits] = useState([]);
  const [nomProduit, setNomProduit] = useState('');
  const [categorie, setCategorie] = useState('');
  const [datePeremption, setDatePeremption] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [id, setId] = useState(1);
  const [editing, setEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleAddProduit = () => {
    const nouveauProduit = {
      id: id,
      nomProduit: nomProduit,
      categorie: categorie,
      datePeremption: datePeremption,
      prixUnitaire: prixUnitaire
    };
    setProduits([...produits, nouveauProduit]);
    setId(id + 1);
    setNomProduit('');
    setCategorie('');
    setDatePeremption('');
    setPrixUnitaire('');
  };

  const handleDeleteProduit = (id) => {
    const nouveauxProduits = produits.filter((produit) => produit.id !== id);
    setProduits(nouveauxProduits);
  };

  const handleEditProduit = (item) => {
    setEditing(true);
    setItemToEdit(item);
    setNomProduit(item.nomProduit);
    setCategorie(item.categorie);
    setDatePeremption(item.datePeremption);
    setPrixUnitaire(item.prixUnitaire);
  };

  const handleSaveModifications = () => {
    const nouveauxProduits = produits.map((produit) =>
      produit.id === itemToEdit.id
        ? {
            ...produit,
            nomProduit: nomProduit,
            categorie: categorie,
            datePeremption: datePeremption,
            prixUnitaire: prixUnitaire
          }
        : produit
    );
    setProduits(nouveauxProduits);
    setEditing(false);
    setItemToEdit(null);
    setNomProduit('');
    setCategorie('');
    setDatePeremption('');
    setPrixUnitaire('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCell}>ID</Text>
        <Text style={styles.tableCell}>Produit</Text>
        <Text style={styles.tableCell}>Catégorie</Text>
        <Text style={styles.tableCell}>Date de péremption</Text>
        <Text style={styles.tableCell}>Prix unitaire</Text>
        <Text style={styles.tableCell} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={nomProduit}
          onChangeText={setNomProduit}
          placeholder="Nom du produit"
        />
        <TextInput
          style={styles.input}
          value={categorie}
          onChangeText={setCategorie}
          placeholder="Catégorie"
        />
        <TextInput
          style={styles.input}
          value={datePeremption}
          onChangeText={setDatePeremption}
          placeholder="Date de péremption"
        />
        <TextInput
          style={styles.input}
          value={prixUnitaire}
          onChangeText={setPrixUnitaire}
          placeholder="Prix unitaire"
        />
        <Button title="Ajouter un produit" onPress={handleAddProduit} />
      </View>
      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.nomProduit}</Text>
            <Text style={styles.tableCell}>{item.categorie}</Text>
            <Text style={styles.tableCell}>{item.datePeremption}</Text>
            <Text style={styles.tableCell}>{item.prixUnitaire}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Supprimer"
                onPress={() => handleDeleteProduit(item.id)}
                color="red"
              />
              <Button title="Modifier" onPress={() => handleEditProduit(item)} color="orange" />
            </View>
          </View>
        )}
      />
      {editing && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={nomProduit}
            onChangeText={setNomProduit}
            placeholder="Nom du produit"
          />
          <TextInput
            style={styles.input}
            value={categorie}
            onChangeText={setCategorie}
            placeholder="Catégorie"
          />
          <TextInput
            style={styles.input}
            value={datePeremption}
            onChangeText={setDatePeremption}
            placeholder="Date de péremption"
          />
          <TextInput
            style={styles.input}
            value={prixUnitaire}
            onChangeText={setPrixUnitaire}
            placeholder="Prix unitaire"
          />
          <Button title="Enregistrer les modifications" onPress={handleSaveModifications} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10
  },
  tableCell: {
    flex: 1,
    marginRight: 10
  },
  formContainer: {
    marginVertical: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default StockagePage;
