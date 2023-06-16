import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import Home from './screens/Home';
import Inicio from './screens/Inicio';
import Map from './screens/Map';
import Ponto from './screens/Ponto';
import Login from './screens/Login';
import Cadastro from './screens/CreateUser';
import Perfil from './screens/Perfil';
const store = createStore(reducer);

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'Home', headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTintColor: '#162397',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil', headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTintColor: '#162397',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, }} />
        <Stack.Screen name="Ponto" component={Ponto} options={{ title: 'Ponto Turistuco', headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTintColor: '#162397',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, }} />
        <Stack.Screen name="Map" component={Map} options={{ title: 'Criar roteiro', headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTintColor: '#162397',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, }} />
      </Stack.Navigator>
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
