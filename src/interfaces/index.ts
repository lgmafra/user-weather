import {GeolocationResponse} from '@react-native-community/geolocation';

export interface IWeather {
  id: Number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  coords: GeolocationResponse;
  weather: IWeather;
  name: string;
  main: {
    temp: Number;
    humidity: Number;
  };
}
