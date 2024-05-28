import React from "react";
import { FlatList } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import CadastroJogos from "./src/screens/CadastroJogos";
import ListagemJogos from "./src/screens/ListagemJogos";
import EditarJogos from "./src/screens/EditarJogos";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Cadastro' component={CadastroJogos} options={{headerShown: false}}/>
      <Stack.Screen name='Listagem' component={ListagemJogos} options={{headerShown: false}}/>
      <Stack.Screen name='Editar' component={EditarJogos} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;