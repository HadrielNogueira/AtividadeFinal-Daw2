import React, {Component} from 'react';
import {firebaseApp, contaDB} from './Firebase.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default class Grafico extends Component {
  state = {
    nome: "",
    valor: "",
    proxima_key: 1,
    conta: []
  }

  componentDidMount(){
    this.listarContas();
  }

  listarContas = () => {
    var contaTemp = [];
    contaDB.on("value", (conta) => {
      conta.forEach((conta) => {
        contaTemp.push({
          key: conta.key,
          nome: conta.val().nome,
          valor: conta.val().valor
        });
      });
      this.setState({ conta: contaTemp});
    });
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Gráfico</Text>
      </SafeAreaView>
    );
  }

}
