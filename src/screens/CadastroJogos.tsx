import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { Image, View, Text } from "react-native-animatable";
import Footer from "../interface/Footer";

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
          } else if (!/^\d+(\.\d{1,2})?$/.test(preco)) {
            newErrors.preco = "O campo preço deve ser um número decimal com no máximo 2 casas decimais";
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
        if (validateForm()){    
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('preco',preco);
            formData.append('descricao', descricao);
            formData.append('classificacao', classificacao);
            formData.append('plataformas', plataformas);
            formData.append('desenvolvedor', desenvolvedor);
            formData.append('distribuidora', distribuidora);
            formData.append('categoria', categoria);

            console.log(formData)

            const response = await axios.post("http://10.137.11.205:8000/api/register/games", formData);
         console.log(response.data)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors){
                setErrors(error.response.data.errors);
            } else{
                console.log(error);
            }
        }
    }

}
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={'#CAD49D'}></StatusBar>
            <View style={styles.header}>
                <Image style={styles.imagem} resizeMode="contain" source={require('../assets/imagem/logos.png')}></Image>
            </View>

            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Nome:"
                    placeholderTextColor={'white'}
                    value={nome}
                    onChangeText={setNome}
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Preço:"
                    placeholderTextColor={'white'}
                    value={preco}
                    onChangeText={setPreco}
                />
                {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}
               
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Descrição:"
                    placeholderTextColor={'white'}
                    value={descricao}
                    onChangeText={setDescricao}
                />
                {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
                
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Classificação:"
                    placeholderTextColor={'white'}
                    value={classificacao}
                    onChangeText={setClassificacao}
                />
                {errors.classificacao && <Text style={styles.errorText}>{errors.classificacao}</Text>}
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Plataformas:"
                    placeholderTextColor={'white'}
                    value={plataformas}
                    onChangeText={setPlataformas}
                />
                {errors.plataformas && <Text style={styles.errorText}>{errors.plataformas}</Text>}
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Desenvolvedor:"
                    placeholderTextColor={'white'}
                    value={desenvolvedor}
                    onChangeText={setDesenvolvedor}
                />
                {errors.desenvolvedor && <Text style={styles.errorText}>{errors.desenvolvedor}</Text>}
                
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Distribuidora:"
                    placeholderTextColor={'white'}
                    value={distribuidora}
                    onChangeText={setDistribuidora}
                />
                {errors.distribuidora && <Text style={styles.errorText}>{errors.distribuidora}</Text>}
                
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Categoria:"
                    placeholderTextColor={'white'}
                    value={categoria}
                    onChangeText={setCategoria}
                />
                {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}
                
            </View>
            
            <TouchableOpacity style={styles.button} onPress={cadastrarJogos}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Footer/>
            </ScrollView>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#484538'
    },
    header: {
        backgroundColor: '#CAD49D',
        alignItems: 'center',
        paddingVertical: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 100,
        height: 10,
        marginTop: -35
    },
    form: {
        width: 360,
        marginLeft: 10,
        marginTop: -25,

    },
    input: {
        backgroundColor: '#D2B48C',
        marginTop: 40,
        fontWeight: 'bold',
        height: 42,
        borderRadius: 15,
        color: 'white',
        paddingLeft: 3,
        marginLeft: 10,
        marginRight: 10
    },
    imagem: {
        height: 150,
        width: 150,
        marginTop: -60,
        marginRight: 15,
        borderRadius: 50,
        marginLeft: -20
    },
    button: {
        backgroundColor: "white",
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 20,
        height: 50,
        width: 250,
        marginLeft: 65,
    },
    buttonText: {
        color: "#2E8B57",
        fontWeight: "bold",
        textAlign: "center",
    },
    imageButtonText: {
        color: '#3CB371',
        fontWeight: 'bold',
        marginTop: -40,
        marginLeft: 125
    },
    errorText: {
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white'
    },

})

export default CadastroJogos;