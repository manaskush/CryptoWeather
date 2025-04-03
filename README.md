# CryptoWeather Nexus

## Overview
CryptoWeather Nexus is a multi-page dashboard that combines real-time weather data, cryptocurrency information, and live notifications via WebSocket. The project was built using modern web technologies and deployed publicly.

## Tech Stack
- **Framework:** Next.js (v13+)
- **State Management:** Redux (with Redux Thunk for async logic)
- **Styling:** Tailwind CSS
- **Data Fetching:** OpenWeatherMap API, CoinGecko API, NewsData.io
- **Real-Time Updates:** CoinCap WebSocket for live price updates
- **Deployment:** Vercel

## Features
- **Dashboard Page:**
  - Weather: Temperature, humidity, and conditions for three predefined cities
  - Cryptocurrency: Live price, 24h change, and market cap for three cryptocurrencies
  - News: Top five crypto-related headlines
- **Detail Pages:**
  - City details: Weather history with charts/tables
  - Crypto details: Historical pricing and extended metrics
- **Real-Time Notifications:**
  - WebSocket-based price alerts for BTC/ETH
  - Simulated weather alerts
- **User Preferences:**
  - Favorite cities and cryptocurrencies stored using Redux state
  - Persisted across sessions
- **Responsive UI:**
  - Adaptable layout from mobile to desktop
  - Interactive UI with clear hover and focus states

## How I Built It
1. **Project Setup:** Initialized a Next.js project and configured Redux for global state management.
2. **API Integrations:** Implemented API calls for weather, crypto prices, and news using Next.js server-side functions.
3. **WebSocket Implementation:** Connected to CoinCap WebSocket for real-time crypto price updates.
4. **State Management:** Used Redux to store API responses, handle loading states, and manage user preferences.
5. **UI Development:** Designed responsive layouts using Tailwind CSS and created reusable components.
6. **Error Handling:** Implemented fallback UI for API failures and real-time updates.
7. **Deployment:** Deployed the app on Vercel and managed API keys securely through environment variables.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/manaskush/CryptoWeather.git
   cd CryptoWeather
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```sh
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
   NEXT_PUBLIC_CRYPTO_API_KEY=your_api_key
   NEXT_PUBLIC_NEWS_API_KEY=your_api_key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Build and deploy:
   ```sh
   npm run build
   vercel deploy
   ```

## Live Deployment
[Live Demo](https://crypto-weather-blond.vercel.app/)

## Challenges Faced & Solutions
- **Module Not Found Errors:** Fixed incorrect import paths and ensured all dependencies were installed properly.
- **WebSocket Integration:** Managed connection lifecycle properly to avoid memory leaks.
- **Data Sync Issues:** Implemented periodic API calls and handled rate limits gracefully.
- **UI Responsiveness:** Used Tailwind CSS utility classes to ensure smooth adaptation across devices.

## Repository
[GitHub Repo](https://github.com/manaskush/CryptoWeather)

The project is live please check it and thankyou for this opportunity and I would like to express my interest in working with the company Thanks again for reviewing this. 

Manas Kush