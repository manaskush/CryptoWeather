'use client';

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connectWebSocket, simulateWeatherAlert } from '../services/websocket';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Connect to WebSocket when app starts
    const socket = connectWebSocket(store);
    
    // Set up simulated weather alerts
    simulateWeatherAlert(store);

    // Set up notification subscription
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const notifications = state.notifications.notifications;
      
      if (notifications.length > 0) {
        const lastNotification = notifications[0]; // Most recent notification
        
        // Show toast for new notifications
        toast.info(lastNotification.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });

    return () => {
      // Clean up on unmount
      if (socket) socket.close();
      unsubscribe();
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className="min-h-screen bg-gray-950">
            <header className="bg-blue-300 shadow-sm py-4">
              <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="  flex-shrink-0 flex items-center">
                    <h1 className="text-4xl font-bold text-gray-900">CryptoWeather Nexus</h1>
                  </div>
                  <NotificationCenter />
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <footer className="bg-blue-400 border-t border-gray-200 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xl font-bold text-gray-900">
                  CryptoWeather Nexus Dashboard || I hope you liked the project &copy; {new Date().getFullYear()}
                </p>
              </div>
            </footer>
          </div>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}