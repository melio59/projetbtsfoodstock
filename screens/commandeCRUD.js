import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const CommandeScreen = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'commandes');
      const json = await response.json();
      // Trie les commandes par date de la plus récente à la plus ancienne
      json.sort((a, b) => new Date(b.dateCommande) - new Date(a.dateCommande));
      setCommandes(json);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteCommande = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      await fetch(BASEURL + 'commandes/' + id, {
        method: 'DELETE',
      });

      setCommandes(commandes.filter((commande) => commande.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };


 const afficherTypeLivraison = (typeLivraison) => {
    if (typeLivraison == null) {
        return "EPSI";

    } else {
        return typeLivraison;
    }

}

  

  return (
    <View style={styles.container}>
      <FlatList
        data={commandes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Date de commande: {item.dateCommande}</Text>
            <Text style={styles.tableCell}>Statut: {item.status}</Text>
            <Text style={styles.tableCell}>ID: {afficherTypeLivraison(item.typeLivraison)}</Text>
            <Button
              title="Supprimer"
              onPress={() => deleteCommande(item.id)}
              color="#ADD1E6"
            />
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

export default CommandeScreen;
