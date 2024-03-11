// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT6eUmSajgRPH4xsoxGi1cwSbMWZsKUbU",
  authDomain: "reactnativee-5b278.firebaseapp.com",
  projectId: "reactnativee-5b278",
  storageBucket: "reactnativee-5b278.appspot.com",
  messagingSenderId: "1014746105146",
  appId: "1:1014746105146:web:d852b51c7174fbd354fc03"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth, app };