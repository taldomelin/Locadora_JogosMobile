import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-animatable";

interface Jogos {
  nome: string;
  preco: string;
  descricao: string;
  classificacao: string;
  plataformas: string;
  desenvolvedor: string;
  distribuidora: string;
  categoria: string;
  id: number;
}

function ListagemJogos(): React.JSX.Element {
  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJogos, setFilteredJogos] = useState<Jogos[]>(jogos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://10.137.11.205:8000/api/return/all/games');
        if (Array.isArray(response.data.data)) {
          setJogos(response.data.data);
          setFilteredJogos(response.data.data);
        } else {
          // console.error('A API deve retornar um array de jogos');
        }
      } catch (error) {
        // console.error(`Erro: ${error.message}`);
        // if (error.response) {
        //   console.error(`Status: ${error.response.status} ${error.response.statusText}`);
        // }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredJogos(
      jogos.filter((jogo) => jogo.nome.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://10.137.11.205:8000/api/delete/game/${id}`);
      setJogos(jogos.filter((jogo) => jogo.id !== id));
      setFilteredJogos(filteredJogos.filter((jogo) => jogo.id !== id));
    } catch (error) {
      // console.error(`Erro: ${error.message}`);
      // if (error.response) {
      //   console.error(`Status: ${error.response.status} ${error.response.statusText}`);
      // }
    }
  };

  const renderItem = ({ item }: { item: Jogos }) => {
    return (
      <View style={styles.jogoContainer}>
        <Text style={styles.jogoText}>{`Nome: ${item.nome}`}</Text>
        <Text style={styles.jogoText}>{`Preço: ${item.preco}`}</Text>
        <Text style={styles.jogoText}>{`Descrição: ${item.descricao}`}</Text>
        <Text style={styles.jogoText}>{`Classificação: ${item.classificacao}`}</Text>
        <Text style={styles.jogoText}>{`Plataformas: ${item.plataformas}`}</Text>
        <Text style={styles.jogoText}>{`Desenvolvedor: ${item.desenvolvedor}`}</Text>
        <Text style={styles.jogoText}>{`Distribuidora: ${item.distribuidora}`}</Text>
        <Text style={styles.jogoText}>{`Categoria: ${item.categoria}`}</Text>
        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.botaoDeletar} onPress={() => handleDelete(item.id)}>
            <Text style={styles.botaoText}>Deletar</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate('Editar', { jogo: item })}>
  <Text style={styles.botaoText}>Editar</Text>
</TouchableOpacity>
        </View>
      </View>
    );
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'}></StatusBar>
      <View style={styles.header}>
        <Image style={styles.imagem} source={require('../assets/images/logo.png')}></Image>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredJogos}
          renderItem={renderItem}
          keyExtractor={(item) => item.nome}
          style={{ height: '70%' }}
        />
      )}
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
}
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
    marginTop: -35,
    marginBottom: 8
  },
  botaoDeletar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 42,
    width: '49%', // ajuste a largura para 50%
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoEditar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 42,
    width: '49%', // ajuste a largura para 50%
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoContainer: {
    flexDirection: 'row', // adicione essa propriedade
    justifyContent: 'space-between', // adicione essa propriedade
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  botaoText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#151f42'
  },
  jogoContainer: {
    marginBottom: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: 310,
    flex: 1,
  },
  imagem: {
    height: 100,
    width: 340,
    marginTop: -30,
    marginRight: 15,
    borderWidth: 5,
  },
  jogoText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff'

  }
});

export default ListagemJogos;