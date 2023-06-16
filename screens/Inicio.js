import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const Inicio = ({ navigation, route }) => {
  
  const [PontoTuristicos, setCarros] = useState([]);

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const response = await fetch('http://192.168.101.4:3000/PoitTuristic/');
      const data = await response.json();
      setCarros(data.cars);
    } catch (error) {
      console.error('Erro ao buscar os Ponto Turisticos:', error);
    }
  };

  const renderRecommendedCar = ({ item }) => {
    return (
      <Card
        style={styles.recommendedCard}
        onPress={() => navigation.navigate('Ponto', { item })}
      >
        <Image
          style={styles.recommendedImage}
          source={{ uri: item.picture }}
        />
        <Text style={styles.recommendedTitle}>{item.Nome}</Text>
        
      </Card>
    );
  };

  const renderCarCard = ({ item }) => {
    return (
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('Ponto', { item })}
      >
        <Image style={styles.cardImage} source={{ uri: item.picture }} />
        <Text style={styles.title}>{item.Nome}</Text>
        
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['rgb(132, 0, 255)', '#6bc1ff']}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Recomendados</Text>
          <FlatList
            data={PontoTuristicos} // Apenas um item para a lista horizontal
            keyExtractor={(item, index) => item._id}
            renderItem={renderRecommendedCar}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.sectionTitle}>Todos os Pontos Turisticos </Text>
          <FlatList
            data={PontoTuristicos} // Exclui o primeiro item para a lista vertical
            keyExtractor={(item, index) => item._id}
            numColumns={3}
            renderItem={renderCarCard}
          />
          <View style={styles.footer}>
            <FAB
              onPress={() => navigation.navigate('Map')}
              style={styles.fab1}
              small={false}
              icon="map"
              theme={{ colors: { accent: '#006aff' } }}
            />
            <FAB
              onPress={() => navigation.navigate('Perfil' )}
              style={styles.fab}
              small={false}
              icon="account"
              theme={{ colors: { accent: '#006aff' } }}
            />
            
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recommendedCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendedImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendedSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginRight: 8,
   flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab1: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
 
});

export default Inicio;
