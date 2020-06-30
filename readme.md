# Get User Weather App

This is a React Native project, that the app will get user location (lat/long), and return the weather, temperature and the address.

## Run the project

After clone the project, go to the project directory `cd /path/the/code` and run

```js
npm install

// or

yarn
```

After install node modules, if will run the project for `iOS`, you need to run the dependencies

```sh
cd ios/
pod install
cd ..
```
Now, go to [openweathermap](https://openweathermap.org/api), and create a free account, to get an API Key. After, go to [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/get-api-key) to get the API Key.
After create the both API Keys, go to the file `<ProjectDir>/src/constants/index.ts` and set the key on constants

```ts
export const WEATHER_API_KEY = '';
export const MAP_API_KEY = '';
```

Then, run the project

```
// ios
react-native run ios

// or

// android
react-native run android
```

## Libraries used
[@react-native-community/geolocation](https://github.com/react-native-community/react-native-geolocation) // get the user location (lat/long)

[axios](https://github.com/axios/axios) // use to request the weather on [openweathermap](https://openweathermap.org/)

[react-native-geocoding](https://github.com/marlove/react-native-geocoding#readme) // use lat and long to get the address using Google Maps Geocoding API
