import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  coins: ['bitcoin', 'ethereum', 'dogecoin'],
  cryptoData: {},
  favoriteCryptos: [],
  loading: false,
  error: null,
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const coins = state.crypto.coins.join(',');
      
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&sparkline=true`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async (coinId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    toggleFavoriteCrypto: (state, action) => {
      const coin = action.payload;
      if (state.favoriteCryptos.includes(coin)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(c => c !== coin);
      } else {
        state.favoriteCryptos.push(coin);
      }
    },
    updateLivePrice: (state, action) => {
      const { coinId, price } = action.payload;
      if (state.cryptoData[coinId]) {
        state.cryptoData[coinId].current_price = parseFloat(price);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(coin => {
          state.cryptoData[coin.id] = coin;
        });
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        const coin = action.payload;
        state.cryptoData[coin.id] = {
          ...state.cryptoData[coin.id],
          details: coin,
        };
      });
  },
});

export const { toggleFavoriteCrypto, updateLivePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;