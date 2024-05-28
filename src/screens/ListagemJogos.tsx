import axios from "axios";
import React, { useEffect, useState } from "react";
import {  FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import Footer from "../interface/Footer";


function JogosListagem(): React.JSX.Element {
    const [jogos, setJogos] = useState<Jogos[]>([]);
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
    

      const renderJogosItem = ({ item }: { item: Jogos }) => (
        <View style={styles.jogosContainer}>
            <Text style={styles.textJogos}>{`Nome:     ${item.nome}`}</Text>
            <Text style={styles.textPreco}>{`Preço:      ${item.preco}`}</Text>
            <Text style={styles.textJogos}>{`Descrição: ${item.descricao}`}</Text>
            <Text style={styles.textJogos}>{`Classificação:      ${item.classificacao}`}</Text>
            <Text style={styles.textJogos}>{`Plataformas:       ${item.plataformas}`}</Text>
            <Text style={styles.textJogos}>{`Desenvolvedor:  ${item.desenvolvedor}`}</Text>
            <Text style={styles.textJogos}>{`Distribuidora:      ${item.distribuidora}`}</Text>
            <Text style={styles.textJogos}>{`Categoria:            ${item.categoria}`}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => handleDelete(item.id)}>
          <Text style={styles.botaoText}>Deletar</Text>
        </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#CAD49D'} barStyle='light-content'></StatusBar>
            <View style={styles.header}>
            <Image style={styles.imagem} resizeMode="contain" source={require('../assets/images/logos.png')}></Image>
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={jogos}
            renderItem={renderJogosItem}
            keyExtractor={(item) => item.nome}
            />
            <Footer />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#484538'
    },
    header: {
        backgroundColor: '#067451',
        alignItems: 'center',
        paddingVertical: 80,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        height: 10,
        marginTop: -35
    },
    imagem: {
        height: 130,
        width: 130,
        marginTop: -60,
        marginRight: 15,
        borderRadius: 50,
        marginLeft: -20
    },
    menuList: {
        flexGrow: 1
    },
    textJogos: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 1,
        marginRight: 200
    },
    textPreco: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginRight: 296
    },
    jogosContainer: {
    marginTop: 20,
    backgroundColor: '#8FD694',
    padding: 5,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    width: 370,
    height: 580,
    flexDirection: 'column',
    justifyContent: 'space-between'
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      botao: {
        backgroundColor: '#6F8F72',
        padding: 10,
        borderRadius: 15,
        marginTop: 12,
        height: 42,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
})

export default JogosListagem;