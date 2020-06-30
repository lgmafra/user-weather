import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure().useReactNative().connect();

  tron.clear();

  console.log = tron.log;
  console.warn = tron.warn;
}
