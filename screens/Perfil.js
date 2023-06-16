import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const UserProfile = ({ navigation, route }) => {
  const { userId } = route.params;

  console.log('ID do usuário:', userId);

  const [user, setUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    console.log('ID do :', id);
    try {
      const response = await fetch('http://192.168.101.4:3000/user/'+ id);
      const data = await response.json();
      console.log('ID do :', data);
      setUser(data.user);
    } catch (error) {
      console.error(error); // Exibe o erro no console
      Alert.alert('Erro ao buscar o usuário');
    }
  };

  const deleteProfile = (id, navigation) => {
    fetch(`http://192.168.101.4:3000/user/delete/${id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(deletedCar => {
        Alert.alert(`${deletedCar.modelo} foi deletado!`);
        navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('Alguma coisa deu errado');
      });
  };

  const editProfile = (id, newData) => {
    fetch(`http://192.168.101.4:3000/user/update/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(() => {
        Alert.alert('Perfil atualizado com sucesso');
      })
      .catch(err => {
        Alert.alert('Não foi possível atualizar o perfil');
      });
  };

  const openEditModal = (field) => {
    setSelectedField(field);
    setEditModalVisible(true);
  };

  const handleFieldChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const saveFieldChanges = () => {
    editProfile(user._id, user);
    setEditModalVisible(false);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgb(132, 0, 255)', '#6bc1ff']} style={{ height: '20%' }} />
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Nome: {user.Nome}</Text><Button
          icon="account-edit"
          mode="contained"
          onPress={() => openEditModal("Nome")}
        >
          Editar Nome
        </Button>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Senha: {user.Senha}</Text>
          <Button
          icon="account-edit"
          mode="contained"
          onPress={() => openEditModal("Senha")}
        >
          Editar Senha
        </Button>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Score: {user.Score}</Text>
          <Button
          icon="account-edit"
          mode="contained"
          onPress={() => openEditModal("Score")}
        >
          Editar Score
        </Button>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => deleteProfile(user._id, navigation)}
        >
          Excluir Perfil
        </Button>
        <Button
          icon="home"
          mode="contained"
          onPress={() => navigation.navigate('Inicio')}
        >
          Home
        </Button>
      </View>
      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar {selectedField}</Text>
          <TextInput
            value={user[selectedField]}
            onChangeText={(text) => handleFieldChange(selectedField, text)}
            style={styles.input}
          />
          <Button onPress={saveFieldChanges}>Salvar</Button>
          <Button onPress={() => setEditModalVisible(false)}>Cancelar</Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    marginTop: 10,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
    padding: 10,
    width: '90%',
  },
  cardContent: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardText: {
    marginRight:100,
    color:'black',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UserProfile;
