import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cities: ['New York', 'London', 'Tokyo'],
  weatherData: {},
  favoriteCities: [],
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      return { city, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeatherForecast',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      return { city, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter(c => c !== city);
      } else {
        state.favoriteCities.push(city);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.weatherData[city] = {
          ...state.weatherData[city],
          current: data,
        };
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.weatherData[city] = {
          ...state.weatherData[city],
          forecast: data,
        };
      });
  },
});

export const { toggleFavoriteCity } = weatherSlice.actions;
export default weatherSlice.reducer;