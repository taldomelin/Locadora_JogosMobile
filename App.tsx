import React from "react";
import CadastroJogos from "./src/screens/CadastroJogos";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cadastro" component={CadastroJogos} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;