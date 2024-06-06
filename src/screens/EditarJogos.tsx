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
  const [errors, setErrors] = useState({}); // estado para armazenar erros

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

    let hasErrors = false;
    const newErrors = {};

    // Verificar se o nome do jogo já existe
    const response = await axios.get(`http://10.137.11.205:8000/api/check/unique`, {
      params: {
        nome: nome,
        id: jogo.id // ignorar o jogo que está sendo editado
      }
    });

    if (!response.data.status) {
      newErrors.nome = response.data.message;
      hasErrors = true;
    }

    if (!nome) {
      newErrors.nome = "O campo nome é obrigatório"
      hasErrors = true;
    } else if (nome.length < 5 || nome.length > 120) {
      newErrors.nome = "O campo nome deve ter entre 5 e 120 caracteres"
      hasErrors = true;
    }

    if (!preco) {
      newErrors.preco = "O campo preço é obrigatório"
      hasErrors = true;
    } else if (!/^\d+(\.\d{2})$/.test(preco)) {
      newErrors.preco = "O campo preço deve ter 2 casas decimais"
      hasErrors = true;
    }

    if (!descricao) {
      newErrors.descricao = "O campo descrição é obrigatório"
      hasErrors = true;
    } else if (descricao.length < 10 || descricao.length > 800) {
      newErrors.descricao = "O campo descrição deve ter entre 10 e 800 caracteres"
      hasErrors = true;
    }

    if (!classificacao) {
      newErrors.classificacao = "O campo classificação é obrigatório"
      hasErrors = true;
    } else if (classificacao.length < 5 || classificacao.length > 20) {
      newErrors.classificacao = "O campo classificação deve ter entre 5 e 20 caracteres"
      hasErrors = true;
    }

    if (!plataformas) {
      newErrors.plataformas = "O campo plataformas é obrigatório"
      hasErrors = true;
    } else if (plataformas.length < 3 || plataformas.length > 60) {
      newErrors.plataformas = "O campo plataformas deve ter entre 3 e 60 caracteres"
      hasErrors = true;
    }

    if (!desenvolvedor) {
      newErrors.desenvolvedor = "O campo desenvolvedor é obrigatório"
      hasErrors = true;
    } else if (desenvolvedor.length < 2 || desenvolvedor.length > 120) {
      newErrors.desenvolvedor = "O campo desenvolvedor deve ter entre 2 e 120 caracteres"
      hasErrors = true;
    }
    if (!distribuidora) {
      newErrors.distribuidora = "O campo distribuidora é obrigatório"
      hasErrors = true;
    } else if (distribuidora.length < 2 || distribuidora.length > 120) {
      newErrors.distribuidora = "O campo distribuidora deve ter entre 2 e 120 caracteres"
      hasErrors = true;
    }

    if (!categoria) {
      newErrors.categoria = "O campo categoria é obrigatório"
      hasErrors = true;
    } else if (categoria.length < 3 || categoria.length > 55) {
      newErrors.categoria = "O campo categoria deve ter entre 3 e 55 caracteres"
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

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
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Preço:"
            placeholderTextColor={'#000'}
            value={preco}
            onChangeText={(text) => setPreco(text)}
          />
          {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Descrição:"
            placeholderTextColor={'#000'}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />
          {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Classificação:"
            placeholderTextColor={'#000'}
            value={classificacao}
            onChangeText={(text) => setClassificacao(text)}
          />
          {errors.classificacao && <Text style={styles.errorText}>{errors.classificacao}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Plataformas:"
            placeholderTextColor={'#000'}
            value={plataformas}
            onChangeText={(text) => setPlataformas(text)}
          />
          {errors.plataformas && <Text style={styles.errorText}>{errors.plataformas}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Desenvolvedor:"
            placeholderTextColor={'#000'}
            value={desenvolvedor}
            onChangeText={(text) => setDesenvolvedor(text)}
          />
          {errors.desenvolvedor && <Text style={styles.errorText}>{errors.desenvolvedor}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Distribuidora:"
            placeholderTextColor={'#000'}
            value={distribuidora}
            onChangeText={(text) => setDistribuidora(text)}
          />
          {errors.distribuidora && <Text style={styles.errorText}>{errors.distribuidora}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Categoria:"
            placeholderTextColor={'#000'}
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
          />
          {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Atualizar Jogo</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Image
            source={require('../assets/images/note.png')}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Listagem')}>
          <Image
            source={require('../assets/images/checklist.png')}
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
    width: 40,
    height: 40
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
    color: 'red'
  },
});

export default EditarJogos;