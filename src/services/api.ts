import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const API_KEY = 'cdee4de3a3fd42d7b87ffc9d6b5e22f0';

export default api;
