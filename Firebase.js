import * as firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCymweep7DpB3MLzxOPDtMguNbMd6fmLjE",
    authDomain: "conta-list.firebaseapp.com",
    databaseURL: "https://conta-list-default-rtdb.firebaseio.com",
    projectId: "conta-list",
    storageBucket: "conta-list.appspot.com",
    messagingSenderId: "805712675071",
    appId: "1:805712675071:web:d03e6ed7882d66d60f0cca"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const contaDB = firebaseApp.database().ref().child("Conta");