import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  refreshInterval: 60000, // 60 seconds
};

const userPrefsSlice = createSlice({
  name: 'userPrefs',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const { toggleTheme, setRefreshInterval } = userPrefsSlice.actions;
export default userPrefsSlice.reducer;