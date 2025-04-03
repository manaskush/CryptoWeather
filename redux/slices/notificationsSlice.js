import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  // Keep a limited number of notifications (most recent 5)
  maxNotifications: 5,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
      
      // Trim notifications if they exceed the maximum
      if (state.notifications.length > state.maxNotifications) {
        state.notifications = state.notifications.slice(0, state.maxNotifications);
      }
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  clearNotification,
  clearAllNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;