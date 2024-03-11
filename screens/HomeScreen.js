import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { auth } from '../firebase'
import { EleveCollection } from '../firestore'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [eleveData, setEleveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await EleveCollection;
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEleveData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <FlatList
        data={eleveData}
        renderItem={({item}) => <Text>Nom : {item.Nom} Prenom : {item.Prenom}</Text>}
        keyExtractor={item => item.id}
      />
      {console.log('test')}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: 'ADD8E6',
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
})
