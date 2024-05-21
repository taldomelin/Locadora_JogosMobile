import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { Image, View, Text } from "react-native-animatable";

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
        }
    
        if (!preco) {
          newErrors.preco = "O campo preço é obrigatório";
        }
    
        if (!descricao) {
          newErrors.descricao = "O campo descrição é obrigatório";
        }
    
        if (!classificacao) {
          newErrors.classificacao = "O campo classificação é obrigatório";
        }
    
        if (!plataformas) {
          newErrors.plataformas = "O campo plataformas é obrigatório";
        }
    
        if (!desenvolvedor) {
          newErrors.desenvolvedor = "O campo desenvolvedor é obrigatório";
        }
    
        if (!distribuidora) {
          newErrors.distribuidora = "O campo distribuidora é obrigatório";
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

            const response = await axios.post('http://10.137.11.205:8000/api/register/games', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
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
            <StatusBar backgroundColor={'white'}></StatusBar>
            <View style={styles.header}>
                <Image style={styles.imagem} resizeMode="contain" source={require('../assets/images/logoJogos.png')}></Image>
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
            <View style={styles.footer}>

            </View>
            </ScrollView>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E8B57'
    },
    header: {
        backgroundColor: '#98FB98',
        alignItems: 'center',
        paddingVertical: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 100,
        height: 10,
        marginTop: -35
    },
    footer: {
        paddingVertical: 50,
        backgroundColor: '#98FB98',
        marginTop: 20,
        alignItems: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

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
        borderColor: '#fff',
        color: 'white',
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10
    },
    imagem: {
        height: 100,
        width: 100,
        marginTop: -30,
        marginRight: 15,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#3CB371'
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