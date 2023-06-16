import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, Linking, Switch } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedTouristSpots, setSelectedTouristSpots] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getLocationPermission();
    loadTouristSpots();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização negada');
      return;
    }

    getCurrentLocation();
  };

  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
      setUserLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert('Erro ao obter a localização', error.message);
    }
  };

  const loadTouristSpots = () => {
    const touristSpots = [
      { name: 'Recife Antigo', latitude: -8.0636129, longitude: -34.8719446 },
      { name: 'Praia de Boa Viagem', latitude: -8.1236943, longitude: -34.9000476 },
      { name: 'Mercado de São José', latitude: -8.0624942, longitude: -34.8799971 },
      { name: 'Parque da Jaqueira', latitude: -8.0350462, longitude: -34.9040177 },
    ];

    setMarkers(touristSpots);
  };

  const handleCreateRoute = () => {
    if (selectedTouristSpots.length === 0) {
      Alert.alert('Selecione pelo menos um ponto turístico');
      return;
    }

    const coordinates = selectedTouristSpots
      .map(stop => `${stop.latitude},${stop.longitude}`)
      .join('/');

    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/${origin}/${coordinates}`;

    Linking.openURL(url);
  };

  const handleSwitchToggle = (spot) => {
    const isSelected = selectedTouristSpots.some(
      selectedSpot => selectedSpot.name === spot.name
    );

    if (isSelected) {
      setSelectedTouristSpots(prevSpots =>
        prevSpots.filter(selectedSpot => selectedSpot.name !== spot.name)
      );
    } else {
      setSelectedTouristSpots(prevSpots => [...prevSpots, spot]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1092,
            longitudeDelta: 0.0701,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Você está aqui"
          />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
            >
              <Callout>
                <Text>{marker.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
</View>
      <View style={styles.card}>
        <Text style={styles.modalTitle}>Pontos Turísticos</Text>

        {markers.map((spot, index) => (
          <View key={index} style={styles.switchContainer}>
            <Switch
              value={selectedTouristSpots.some(
                selectedSpot => selectedSpot.name === spot.name
              )}
              onValueChange={() => handleSwitchToggle(spot)}
            />
            <Text style={styles.switchLabel}>{spot.name}</Text>
          </View>
        ))}
        <View style={styles.bt}>
        <TouchableOpacity style={styles.button}  onPress={handleCreateRoute}>
                <Text style={styles.buttonText}>
                Criar rota
                </Text>
              </TouchableOpacity>
              </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#162397',
    overflow: 'hidden',
    
  },
  mapcontainer: {
    width:'100%',
    height:'70%',
    overflow:'hidden',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  map: {
    flex: 1,
    
  
  },
  card: { 
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchLabel: {
    marginLeft: 8,
  },
bt:{
  alignItems: 'center',
  justifyContent: 'center',
},

  buttonText: {
    color: '#FF7A00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#012758',
    borderColor: '#FFFAF5',
    borderWidth: 1,
    borderRadius:  20,
    width: '70%',
    height: 40,
  },
});

export default Map;
