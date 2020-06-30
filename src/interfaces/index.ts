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
