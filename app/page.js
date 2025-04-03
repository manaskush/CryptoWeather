'use client';

import React from 'react';
import WeatherSection from '../components/Weather/WeatherSection';
import CryptoSection from '../components/Crypto/CryptoSection';
import NewsSection from '../components/News/NewsSection';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <WeatherSection />
      <CryptoSection />
      <NewsSection />
    </div>
  );
}