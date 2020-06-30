import React from 'react';

import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {IWeather, IWeatherData} from '../interfaces';

interface Props {
  userAddress?: string;
  weather?: IWeather[];
  weatherData?: IWeatherData;
  isLoading: boolean;
}

const WeatherCard: React.FC<Props> = ({
  weather,
  weatherData,
  userAddress,
  isLoading,
}) => {
  function renderWeather(item: IWeather) {
    return (
      <View style={styles.weatherCard}>
        <Image
          style={styles.weatherIcon}
          resizeMode="contain"
          source={{uri: `http://openweathermap.org/img/wn/${item.icon}@2x.png`}}
        />

        <View style={styles.weatherInfo}>
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
      {isLoading && <ActivityIndicator style={styles.loader} color="#3F80F8" />}
      {!isLoading && (
        <FlatList
          keyExtractor={(_, index) => String(index)}
          data={weather}
          renderItem={({item}: {item: IWeather}) => renderWeather(item)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(87, 84, 83, 0.7)',
    borderRadius: 4,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  weatherIcon: {width: 70, height: 70, alignSelf: 'center'},
  loader: {width: 24, height: 24, alignSelf: 'center'},
  weatherInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  weatherData: {
    color: '#fff',
    fontSize: 16,
  },
  weatherDataCity: {
    color: '#fff',
    fontSize: 14,
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

export default WeatherCard;
