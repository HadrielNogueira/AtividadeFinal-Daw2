import React, {Component} from 'react';
import {firebaseApp, contaDB} from './Firebase.js';
import Grafico from "./Grafico.js";
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
  lista: {
    width: "100%",
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 20,
    width: "42.5%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  botao: {
    width: "7%"
  },
  input: {
    height: 40,
    padding: 2,
    borderColor: "#000000",
    borderWidth: 1,
    width: "47%",
  }
});

export default class Cadastro extends Component {
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

  adcionar = () => {
    if (this.state.nome.length > 0) {

      var conta = {
          nome: this.state.nome,
          valor: this.state.valor
      };

      contaDB.push(conta);

      this.listarContas();

    }
  }

  excluir = (key) =>{
    
      contaDB.child(key).remove();
      this.listarContas();
    
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Lista de Contas</Text>
          <View style={styles.itemContainer}>
            <TextInput style={styles.input} placeholder="Nome" value={this.state.nome} onChangeText={ (nome) => this.setState({nome: nome})}/>
            <TextInput style={styles.input} placeholder="Valor" keyboardType={'numeric'} value={this.state.valor} onChangeText={ (valor) => this.setState({valor: valor})}/>
            <Button style={styles.botao} title="+" onPress={this.adcionar}/>
          </View>
          <FlatList style={styles.lista} data={this.state.conta} renderItem={
              ({ item, index}) =>
                  <View style={styles.itemContainer}>
                    <Text style={styles.item}>Conta:{item.nome}</Text>
                    <Text style={styles.item}>Valor:{item.valor}</Text>
                    <Button style={styles.botao} title="X" color="#FF0000" onPress ={() => this.excluir(item.key) } />
                  </View>
          }/>
          
      </SafeAreaView>
    );
  }

}
