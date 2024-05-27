import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const ArticleScreen = () => {
  const [articles, setArticles] = useState([]);
  const [nomArticle, setNomArticle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [datePeremp, setDatePeremp] = useState('');
  const [prix, setPrix] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const [stock, setStock] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'article');
      const json = await response.json();
      setArticles(json);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addArticle = async () => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: nomArticle,
          description: description,
          images: images,
          date_peremp: datePeremp, 
          prix: prix,
          id_categorie: idCategorie,
          stock: stock,
        }),
      });

      const json = await response.json();
      setArticles([...articles, json]);
      setNomArticle('');
      setDescription('');
      setImages('');
      setDatePeremp('');
      setPrix('');
      setIdCategorie('');
      setStock('');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteArticle = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      await fetch(BASEURL + 'article/' + id, {
        method: 'DELETE',
      });

      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const updateArticle = async (id) => {
    const BASEURL = 'http://127.0.0.1:8000/';

    try {
      const response = await fetch(BASEURL + 'article/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: nomArticle,
          description: description,
          images: images,
          date_peremp: datePeremp,
          prix: prix,
          id_categorie: idCategorie,
          stock: stock,
        }),
      });

      const updatedArticle = await response.json();
      setArticles(
        articles.map((article) => (article.id === id ? { ...article, ...updatedArticle } : article))
      );
      setNomArticle('');
      setDescription('');
      setImages('');
      setDatePeremp('');
      setPrix('');
      setIdCategorie('');
      setStock('');
      setEditingId(null);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (article) => {
    setNomArticle(article.nom);
    setDescription(article.description);
    setImages(article.images);
    setDatePeremp(formatDate(article.datePeremp));
    setPrix(article.prix);
    setIdCategorie(article.idCategorie);
    setStock(article.stock);
    setEditingId(article.id);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nomArticle}
        onChangeText={(text) => setNomArticle(text)}
        placeholder="Nom de l'article"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={images}
        onChangeText={(text) => setImages(text)}
        placeholder="URL des images"
      />
      <TextInput
        style={styles.input}
        value={datePeremp}
        onChangeText={(text) => setDatePeremp(text)}
        placeholder="Date de péremption"
      />
      <TextInput
        style={styles.input}
        value={prix}
        onChangeText={(text) => setPrix(text)}
        placeholder="Prix"
      />
      <TextInput
        style={styles.input}
        value={idCategorie}
        onChangeText={(text) => setIdCategorie(text)}
        placeholder="ID de la catégorie"
      />
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={(text) => setStock(text)}
        placeholder="Stock"
      />
      <Button
        title={editingId ? "Mettre à jour l'article" : "Ajouter un article"}
        onPress={editingId ? () => updateArticle(editingId) : addArticle}
      />
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>id: {item.id}</Text>
            <Text style={styles.tableCell}> Nom: {item.nom}</Text>
            <Text style={styles.tableCell}>Description: {item.description}</Text>
            <Text style={styles.tableCell}>{item.images}</Text>
            <Text style={styles.tableCell}>Date de péremption: {formatDate(item.datePeremp)}</Text>
            <Text style={styles.tableCell}>Prix unitaire: {item.prix}€</Text>
            <Text style={styles.tableCell}>{item.idCategorie}</Text>
            <Text style={styles.tableCell}>Stock: {item.stock}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Supprimer" onPress={() => deleteArticle(item.id)} color="#ADD1E6" />
              <Button title="Modifier" onPress={() => handleEdit(item)} color="#ADD1E6" />
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

export default ArticleScreen;
