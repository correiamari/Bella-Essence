import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './telas/TelaLogin';
import TelaCadastro from './telas/TelaCadastro';
import TelaHome from './telas/TelaHome';
import { onAuthStateChanged } from 'firebase/auth';
import { autenticacao } from './config/firebaseConfig';

const Camadas = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const desinscrever = onAuthStateChanged(autenticacao, (usuarioAtual) => {
      setUsuario(usuarioAtual);
    });
    return desinscrever;
  }, []);

  return (
    <NavigationContainer>
      <Camadas.Navigator>
        {usuario ? (
          <Camadas.Screen name="Home" component={TelaHome} options={{ headerShown: false }} />
        ) : (
          <>
            <Camadas.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
            <Camadas.Screen name="Cadastro" component={TelaCadastro} options={{ headerShown: false }} />
          </>
        )}
      </Camadas.Navigator>
    </NavigationContainer>
  );
}