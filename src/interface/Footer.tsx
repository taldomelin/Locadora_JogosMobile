import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function Footer(): React.JSX.Element {

    const navigation = useNavigation();


    return(
        <View style={styles.footer}>
             <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Image source={require('../assets/images/lista.png')} style={styles.cadastroIcon}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuListe: {
        flexGrow: 1
    },
    footer: {
        paddingVertical: 5,
        backgroundColor: '#8FBC8F',
        marginTop: 100,
        alignItems: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    cadastroIcon: {
        width: 38,
        height: 38,
        marginBottom: 9,
        marginLeft: 260

    
    }
});

export default Footer;