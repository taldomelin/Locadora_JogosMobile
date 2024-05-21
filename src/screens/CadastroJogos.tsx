import React, { useState } from "react";
import axios from "axios";
import { ImageBackground, View } from "react-native";

const  CadastroJogos: React.FC = () => {
    const [nome, setNome] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [classificacao, setClassificacao] = useState<string>('');
    const [plataformas, setPlataformas] = useState<string>('');
    const [desenvolvedor, setDesenvolvedor] = useState<string>('');
    const [distribuidora, setDistribuidora] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');

    const cadastrarJogos = async () => {
        try{
            const formData = new FormData();
            formData.append('nome',nome);
            formData.append('preco',preco);
            formData.append('descricao',descricao);
            formData.append('classificacao',classificacao);
            formData.append('plataformas',plataformas);
            formData.append('desenvolvedor',desenvolvedor);
            formData.append('distribuidora',distribuidora);
            formData.append('categoria',categoria);

            const response = await axios.post('http://10.137.11.205:8000/api/register/games', formData, {
                headers: {
                    'Content-Type': 'ultipart/form-data'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ImageBackground source={require('../assets/images/singup.jpg')} style={StyleSheet.ImageBackground} >
            <View style={StyleSheet.container}>
                <View style
            </View>
        </ImageBackground>
    )
}