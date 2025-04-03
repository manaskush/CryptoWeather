import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/WeatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import notificationsReducer from './slices/notificationsSlice';
import userPrefsReducer from './slices/userPrefsSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    notifications: notificationsReducer,
    userPrefs: userPrefsReducer,
  },
});