import { updateLivePrice } from '../redux/slices/cryptoSlice';
import { addNotification } from '../redux/slices/notificationsSlice';

let socket = null;

export const connectWebSocket = (store) => {
  // Close existing connection if any
  if (socket) {
    socket.close();
  }

  // Connect to CoinCap WebSocket
  socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin');

  socket.onopen = () => {
    console.log('WebSocket connection established');
    store.dispatch(
      addNotification({
        type: 'info',
        message: 'Real-time crypto updates connected',
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // Update prices in store
    Object.entries(data).forEach(([coinId, price]) => {
      store.dispatch(updateLivePrice({ coinId, price }));
      
      // Get previous price from store
      const state = store.getState();
      const prevPrice = state.crypto.cryptoData[coinId]?.current_price;
      
      // If price changed significantly (more than 0.5%), add notification
      if (prevPrice && Math.abs(parseFloat(price) - prevPrice) / prevPrice > 0.005) {
        store.dispatch(
          addNotification({
            type: 'price_alert',
            message: `${coinId.charAt(0).toUpperCase() + coinId.slice(1)} price changed to $${parseFloat(price).toFixed(2)}`,
            coinId,
            priceChange: parseFloat(price) - prevPrice,
          })
        );
      }
    });
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    store.dispatch(
      addNotification({
        type: 'error',
        message: 'WebSocket connection error',
      })
    );
  };

  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

// Simulate weather alerts
export const simulateWeatherAlert = (store) => {
  const cities = ['New York', 'London', 'Tokyo'];
  const alertTypes = ['Heavy Rain', 'Heat Wave', 'Storm Warning', 'High Winds'];
  
  setInterval(() => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    store.dispatch(
      addNotification({
        type: 'weather_alert',
        message: `${randomAlert} in ${randomCity}`,
        city: randomCity,
        severity: Math.floor(Math.random() * 3) + 1, // 1-3 severity
      })
    );
  }, 60000); // Simulate weather alert every minute
};