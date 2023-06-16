import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.101.4:3000/User/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { userId } = response.data;
        navigation.navigate('Perfil', { userId });
        Alert.alert('Login bem-sucedido');
        // Executar ação desejada após o login
      } else {
        Alert.alert('Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro ao fazer login');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Cadastrar-se" onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Seguir sem login" onPress={() => navigation.navigate('Inicio')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});
