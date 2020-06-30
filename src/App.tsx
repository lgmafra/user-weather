import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import './config/ReactotronConfig';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

import api, {API_KEY} from './services/api';
import {AxiosResponse} from 'axios';

export interface IWeather {
  id: Number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  coord: {
    lat: Number;
    lon: Number;
  };
  weather: IWeather;
  name: string;
}

const App = () => {
  const [error, setError] = useState<GeolocationError>();
  const [coords, setCoords] = useState<GeolocationResponse>();
  const [weather, setWeather] = useState<IWeather[]>();
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => setCoords(info),
      (err) => setError(err),
    );
  }, []);

  async function GetUserLocation() {
    setIsLoading(true);
    const response: AxiosResponse = await api.get(
      `weather?lat=-14.795577&lon=-39.289474&appid=${API_KEY}`,
    );

    if (response.status === 200) {
      setWeather(response.data.weather);
      setWeatherData(response.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (coords) {
      GetUserLocation();
    }
  }, [coords]);

  function renderWeather(item: IWeather) {
    console.log('item', item);
    return (
      <View style={styles.weatherCard}>
        <Text>{weatherData?.name}</Text>
        <Text>{item?.main}</Text>
        <Text>{item?.description}</Text>

        <Image
          style={styles.weatherIcon}
          resizeMode="contain"
          source={{uri: `http://openweathermap.org/img/wn/${item.icon}@2x.png`}}
        />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={GetUserLocation}>
            <Text>Refresh</Text>
          </TouchableOpacity>

          {isLoading && (
            <ActivityIndicator style={styles.loader} color="blue" />
          )}
          {!isLoading && (
            <FlatList
              keyExtractor={(_, index) => String(index)}
              data={weather}
              renderItem={({item}: {item: IWeather}) => renderWeather(item)}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  weatherCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
  },
  weatherIcon: {width: 100, height: 100},
  loader: {width: 24, height: 24},
});

export default App;
