import React from "react";
import CadastroJogos from "./src/screens/CadastroJogos";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import JogosListagem from "./src/screens/ListagemJogos";

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Listagem" component={JogosListagem} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;