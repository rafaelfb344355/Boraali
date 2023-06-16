import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Linking } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const Ponto = ({ navigation, route }) => {
  const { _id, Nome, descriçao, horario, valoringresso, picture } = route.params.item;

  const openCalendar = () => {
    // Substitua os valores pelos dados corretos para criar o evento no calendário
    const event = {
      title: Nome,
      startDate: new Date(),
      endDate: new Date(),
      location: "Local do evento"
    };
    const url = Platform.select({
      ios: `calshow:${event.startDate.getTime()}`,
      android: `content://com.android.calendar/time/${event.startDate.getTime()}`
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{ uri: picture }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{Nome}</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.description}>{descriçao}</Text>
          <Text style={styles.schedule}>Horário de Funcionamento: {horario}</Text>
          <Text style={styles.ticket}>Valor do Ingresso: R$ {valoringresso}</Text>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          icon="map"
          mode="contained"
          style={styles.button1}
          onPress={() => navigation.navigate('Map')}
        >
           <Text style={styles.buttontext1} >Ver no Mapa</Text>
        </Button>
        <Button
          icon="calendar-plus"
          mode="contained"
          style={styles.button2}
          onPress={openCalendar}
        >
         <Text style={styles.buttontext2} >Agendar</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: '90%',
    height:'50%',
    borderRadius: 10,
    marginBottom: 20
  },
  titleContainer: {
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitleContainer: {
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18
  },
  card: {
    width: '90%',
    marginBottom: 20
  },
  description: {
    marginBottom: 10
  },
  schedule: {
    marginBottom: 10
  },
  ticket: {
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button1: {
    borderRadius:  20,
    backgroundColor:'#012758',
    marginHorizontal: 10
  },
  button2: {
    borderRadius:  20,
    backgroundColor:'#FF7A00',
    marginHorizontal: 10
  },
  buttontext1: {
    color: '#FF7A00',
    fontWeight: 'bold',
  },
  buttontext2: {
    fontWeight: 'bold',
    color: '#012758'
    
  }
});

export default Ponto;
