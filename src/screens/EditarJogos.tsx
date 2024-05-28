import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

interface Props {
  route: any;
}

const EditarJogos: React.FC<Props> = ({ route }) => {
  const jogo = route.params.jogo ?? {}; // fornecer um objeto vazio como padrão
  const [nome, setNome] = useState(jogo.nome ?? ''); // fornecer um valor padrão vazio
  const [preco, setPreco] = useState(jogo.preco ?? '');
  const [descricao, setDescricao] = useState(jogo.descricao ?? '');
  const [classificacao, setClassificacao] = useState(jogo.classificacao ?? '');
  const [plataformas, setPlataformas] = useState(jogo.plataformas ?? '');
  const [desenvolvedor, setDesenvolvedor] = useState(jogo.desenvolvedor ?? '');
  const [distribuidora, setDistribuidora] = useState(jogo.distribuidora ?? '');
  const [categoria, setCategoria] = useState(jogo.categoria ?? '');
  const [error, setError] = useState(null); // estado para armazenar erros

  useEffect(() => {
    // lidar com a atualização do estado quando o componente é montado ou desmontado
  }, []);

  const handleUpdate = async () => {
    if (!jogo.id) {
      console.error("Jogo ID doesn't exist!");
      return;
    }
  
    const data = {
      nome,
      preco,
      descricao,
      classificacao,
      plataformas,
      desenvolvedor,
      distribuidora,
      categoria,
    };
    
    try {
      const response = await axios.put(`http://10.137.11.205:8000/api/update/game/${jogo.id}`, data);
  
      // Navegar para a página de listagem após a atualização ser concluída com sucesso
      navigation.navigate('Listagem');
    } catch (error) {
      console.error(error.response);
    }
  };
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <View style={styles.header}>
        <Image style={styles.imagem} source={require('../assets/images/logo.png')} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            placeholderTextColor={'#000'}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Preço:"
            placeholderTextColor={'#000'}
            value={preco}
            onChangeText={(text) => setPreco(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Descrição:"
            placeholderTextColor={'#000'}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Classificação:"
            placeholderTextColor={'#000'}
            value={classificacao}
            onChangeText={(text) => setClassificacao(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Plataformas:"
            placeholderTextColor={'#000'}
            value={plataformas}
            onChangeText={(text) => setPlataformas(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Desenvolvedor:"
            placeholderTextColor={'#000'}
            value={desenvolvedor}
            onChangeText={(text) => setDesenvolvedor(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Distribuidora:"
            placeholderTextColor={'#000'}
            value={distribuidora}
            onChangeText={(text) => setDistribuidora(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Categoria:"
            placeholderTextColor={'#000'}
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Atualizar Jogo</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Image 
            source={require('../assets/images/documento.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Listagem')}>
          <Image 
            source={require('../assets/images/menu.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9'
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 100,
    height: 10,
    marginTop: -35
  },
  footer: {
    backgroundColor: '#fff',
    marginTop: 5,
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 60,
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerIcon: {
    width: 30,
    height: 30
},
  form: {
    width: 360,
    marginLeft: 10,
    marginTop: -25,
  },
  input: {
    backgroundColor: 'transparent',
    marginTop: 32,
    fontWeight: 'bold',
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#000',
    color: '#000',
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10
  },
  imagem: {
    height: 100,
    width: 340,
    marginTop: -30,
    marginRight: 15,
    borderWidth: 5,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    height: 50,
    width: 250,
    marginLeft: 65,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'ed'
  },
});

export default EditarJogos;