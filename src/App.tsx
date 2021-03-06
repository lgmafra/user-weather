import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import './config/ReactotronConfig';

import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import api from './services/api';
import {AxiosResponse} from 'axios';

import {IWeather, IWeatherData} from './interfaces';
import WeatherCard from './components/WeatherCard';
import {MAP_API_KEY, WEATHER_API_KEY} from './constants';

const App = () => {
  const [error, setError] = useState<GeolocationError | string>();
  const [coords, setCoords] = useState<GeolocationResponse>();
  const [weather, setWeather] = useState<IWeather[]>();
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [userAddress, setUserAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function GetUserLocation() {
    Geolocation.getCurrentPosition(
      (info) => setCoords(info),
      (err) => setError(err),
    );
  }

  useEffect(() => {
    try {
      Geocoder.init(MAP_API_KEY);

      GetUserLocation();
    } catch (err) {
      console.log('err', err);
      setIsLoading(false);
      setError(
        'Falha ao carregar Google Maps Geocoding API. Verifique a API Key',
      );
    }
  }, []);
  console.log(error);
  async function GetUserWeather() {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await api.get(
        `weather?lat=${coords?.coords.latitude}&lon=${coords?.coords.longitude}&appid=${WEATHER_API_KEY}&lang=pt_br&units=metric`,
      );

      if (response.status === 200) {
        setWeather(response.data.weather);
        setWeatherData(response.data);

        const address = await Geocoder.from(
          coords?.coords.latitude,
          coords?.coords.longitude,
        );

        setUserAddress(address?.results[0]?.formatted_address);
      }
    } catch (err) {
      setError('Falha ao carregar API openweather. Verifique a API Key');
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (coords) {
      GetUserWeather();
    }
  }, [coords]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={GetUserLocation}>
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>

          <View>
            {error && <Text style={styles.error}>{error}</Text>}
            {!error && (
              <WeatherCard
                isLoading={isLoading}
                weather={weather}
                weatherData={weatherData}
                userAddress={userAddress}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ddd'},
  sectionContainer: {
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
  },
  refreshButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#3F80F8',
    marginBottom: 20,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center',
  },
});

export default App;
