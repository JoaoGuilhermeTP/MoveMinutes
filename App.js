import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Biblioteca para gerenciar a navegação no app
import { createStackNavigator } from '@react-navigation/stack'; // Cria um sistema de navegação em pilha (Stack Navigation)
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Garante que o conteúdo respeite a área segura do dispositivo
import HomeScreen from './screens/HomeScreen'; // Tela principal do app
import AddExerciseScreen from './screens/AddExerciseScreen'; // Tela para adicionar exercícios

const Stack = createStackNavigator(); // Cria o navegador de pilha

export default function App() {
  return (
    // Provedor de área segura que ajusta o conteúdo com base no dispositivo (como notch ou barra de status)
    <SafeAreaProvider>
      {/* Contêiner principal para gerenciar toda a navegação */}
      <NavigationContainer>
        {/* Configuração do navegador de pilha */}
        <Stack.Navigator>
          {/* Tela inicial do app (HomeScreen), sem exibir o cabeçalho padrão */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} // Oculta o cabeçalho padrão
          />
          {/* Tela para adicionar exercícios, também sem cabeçalho padrão */}
          <Stack.Screen
            name="Add Exercise"
            component={AddExerciseScreen}
            options={{ headerShown: false }} // Oculta o cabeçalho padrão
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
