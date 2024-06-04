import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { Image, View, Text } from "react-native-animatable";
//npm install react-native-animatable
import { useNavigation } from "@react-navigation/native";

function CadastroJogos(): React.JSX.Element {
  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [classificacao, setClassificacao] = useState<string>("");
  const [plataformas, setPlataformas] = useState<string>("");
  const [desenvolvedor, setDesenvolvedor] = useState<string>("");
  const [distribuidora, setDistribuidora] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const validateForm = () => {
    const newErrors: any = {};
  
    if (!nome) {
      newErrors.nome = "O campo nome é obrigatório";
    } else if (nome.length < 5 || nome.length > 120) {
      newErrors.nome = "O campo nome deve ter entre 5 e 120 caracteres";
    }

    if (!preco) {
      newErrors.preco = "O campo preço é obrigatório";
    } else if (!/^\d+(\.\d{2})$/.test(preco)) {
      newErrors.preco = "O campo preço deve ter 2 casas decimais";
    }
    
    if (!descricao) {
      newErrors.descricao = "O campo descrição é obrigatório";
    } else if (descricao.length < 10 || descricao.length > 800) {
      newErrors.descricao = "O campo descrição deve ter entre 10 e 800 caracteres";
    }
  
    if (!classificacao) {
      newErrors.classificacao = "O campo classificação é obrigatório";
    } else if (classificacao.length < 5 || classificacao.length > 20) {
      newErrors.classificacao = "O campo classificação deve ter entre 5 e 20 caracteres";
    }
  
    if (!plataformas) {
      newErrors.plataformas = "O campo plataformas é obrigatório";
    } else if (plataformas.length < 3 || plataformas.length > 60) {
      newErrors.plataformas = "O campo plataformas deve ter entre 3 e 60 caracteres";
    }
  
    if (!desenvolvedor) {
      newErrors.desenvolvedor = "O campo desenvolvedor é obrigatório";
    } else if (desenvolvedor.length < 2 || desenvolvedor.length > 120) {
      newErrors.desenvolvedor = "O campo desenvolvedor deve ter entre 2 e 120 caracteres";
    }
  
    if (!distribuidora) {
      newErrors.distribuidora = "O campo distribuidora é obrigatório";
    } else if (distribuidora.length < 2 || distribuidora.length > 120) {
      newErrors.distribuidora = "O campo distribuidora deve ter entre 2 e 120 caracteres";
    }
  
    if (!categoria) {
      newErrors.categoria = "O campo categoria é obrigatório";
    } else if (categoria.length < 3 || categoria.length > 55) {
      newErrors.categoria = "O campo categoria deve ter entre 3 e 55 caracteres";
    }
  
    setErrors(newErrors);
  
    return !Object.keys(newErrors).length;
  };


  const cadastrarJogos = async () => {
    if (validateForm()) {
      console.log('Formulário válido!');
      try {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
        formData.append('classificacao', classificacao);
        formData.append('plataformas', plataformas);
        formData.append('desenvolvedor', desenvolvedor);
        formData.append('distribuidora', distribuidora);
        formData.append('categoria', categoria);
  
        console.log('FormData:', formData);
  
        const response = await axios.post('http://10.137.11.205:8000/api/register/games', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response:', response);
        if (response.status === 200) {
          resetFields();
          console.log('Cadastro realizado com sucesso!');
        } else {
          console.log('Erro ao cadastrar:', response.status);
        }
      } catch (error) {
        console.log('Erro ao cadastrar:', error);
      }
    } else {
      console.log('Formulário inválido!');
    }
  };
  
  const resetFields = () => {
    setNome('');
    setPreco('');
    setDescricao('');
    setClassificacao('');
    setPlataformas('');
    setDesenvolvedor('');
    setDistribuidora('');
    setCategoria('');
    setErrors('');
  };
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={'#fff'}></StatusBar>
        <View style={styles.header}>
          <Image style={styles.imagem} source={require('../assets/images/logo.png')}></Image>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Nome:"
            placeholderTextColor={'#000'}
            value={nome}
            onChangeText={setNome}
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Preço:"
            placeholderTextColor={'#000'}
            value={preco}
            onChangeText={setPreco}
          />
          {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}

        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Descrição:"
            placeholderTextColor={'#000'}
            value={descricao}
            onChangeText={setDescricao}
          />
          {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Classificação:"
            placeholderTextColor={'#000'}
            value={classificacao}
            onChangeText={setClassificacao}
          />
          {errors.classificacao && <Text style={styles.errorText}>{errors.classificacao}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Plataformas:"
            placeholderTextColor={'#000'}
            value={plataformas}
            onChangeText={setPlataformas}
          />
          {errors.plataformas && <Text style={styles.errorText}>{errors.plataformas}</Text>}
        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Desenvolvedor:"
            placeholderTextColor={'#000'}
            value={desenvolvedor}
            onChangeText={setDesenvolvedor}
          />
          {errors.desenvolvedor && <Text style={styles.errorText}>{errors.desenvolvedor}</Text>}

        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Distribuidora:"
            placeholderTextColor={'#000'}
            value={distribuidora}
            onChangeText={setDistribuidora}
          />
          {errors.distribuidora && <Text style={styles.errorText}>{errors.distribuidora}</Text>}

        </View>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder="Categoria:"
            placeholderTextColor={'#000'}
            value={categoria}
            onChangeText={setCategoria}
          />
          {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}

        </View>

        <TouchableOpacity style={styles.button} onPress={cadastrarJogos}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    backgroundColor: "green",
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
  imageButtonText: {
    fontWeight: 'bold',
    marginTop: -40,
    marginLeft: 125
  },
  errorText: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'red'
  },

})

export default CadastroJogos;