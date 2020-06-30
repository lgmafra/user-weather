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

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import api, {API_KEY} from './services/api';
import {AxiosResponse} from 'axios';

export interface IWeather {
  id: Number;
  main: string;
  description: string;
  icon: string;
}

export interface ICoords {
  coords: {
    latitude: Number;
    longitude: Number;
    altitudeAccuracy: Number;
  };
}

export interface IWeatherData {
  coords: ICoords;
  weather: IWeather;
  name: string;
  main: {
    temp: Number;
    humidity: Number;
  };
}

const App = () => {
  const [error, setError] = useState<any>();
  const [coords, setCoords] = useState<ICoords>();
  const [weather, setWeather] = useState<IWeather[]>();
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [userAddress, setUserAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Geocoder.init('AIzaSyBdhMldpIw54_eVYHzSAqFqnxDm2qubzSE');

    Geolocation.getCurrentPosition(
      (info) => setCoords(info),
      (err) => setError(err),
    );

    GetUserLocation();
  }, []);

  async function GetUserLocation() {
    setIsLoading(true);
    const response: AxiosResponse = await api.get(
      `weather?lat=-14.795577&lon=-39.289474&appid=${API_KEY}&lang=pt_br&units=metric`,
    );

    if (response.status === 200) {
      setWeather(response.data.weather);
      setWeatherData(response.data);

      const address = await Geocoder.from(
        coords?.coords.latitude,
        coords?.coords.longitude,
      );

      setUserAddress(address?.results[0]?.formatted_address);

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
        <Image
          style={styles.weatherIcon}
          resizeMode="contain"
          source={{uri: `http://openweathermap.org/img/wn/10d@2x.png`}}
        />

        <View style={styles.weatherInfo}>
          {/* <Text style={[styles.weatherDataCity]}>{weatherData?.name}</Text> */}
          <Text style={[styles.weatherDataCity]}>{userAddress}</Text>
          <Text style={styles.weatherData}>{item?.description}</Text>
        </View>

        <View style={styles.weatherTemp}>
          <Text
            style={styles.weatherDataTemp}>{`${weatherData?.main.temp}°`}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={GetUserLocation}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>

          <View>
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
  weatherCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(87, 84, 83, 0.7)',
    borderRadius: 4,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  weatherIcon: {width: 70, height: 70, alignSelf: 'center'},
  loader: {width: 24, height: 24, alignSelf: 'center'},
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
  weatherInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  weatherData: {
    color: '#fff',
    fontSize: 14,
  },
  weatherDataCity: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  weatherTemp: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  weatherDataTemp: {
    color: '#fff',
    fontSize: 24,
  },
});

export default App;
