'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCryptoDetails } from '../../../redux/slices/cryptoSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CryptoDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const coinId = params.id;
  const coinData = useSelector((state) => state.crypto.cryptoData[coinId]);
  const loading = useSelector((state) => state.crypto.loading);
  const error = useSelector((state) => state.crypto.error);

  useEffect(() => {
    if (coinId) {
      dispatch(fetchCryptoDetails(coinId));
    }
  }, [dispatch, coinId]);

  if (loading || !coinData) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        Error loading crypto data: {error.message}
      </div>
    );
  }

  // Format price data for chart
  const priceData = coinData.sparkline_in_7d?.price
    ? coinData.sparkline_in_7d.price
        .filter((_, i) => i % 12 === 0) // Sample every 12 hours
        .map((price, index) => ({
          time: `Day ${Math.floor(index / 2) + 1}${index % 2 === 0 ? ' AM' : ' PM'}`,
          price: parseFloat(price.toFixed(2)),
        }))
    : [];

  const isPriceUp = coinData.price_change_percentage_24h > 0;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {coinData.image && (
              <img src={coinData.image} alt={coinData.name} className="w-10 h-10 mr-3" />
            )}
            <h1 className="text-2xl font-bold text-gray-800">
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </h1>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center p-4 mb-6 bg-gray-50 rounded-lg">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl font-bold">${coinData.current_price?.toLocaleString()}</div>
            <div className={`text-lg ${isPriceUp ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {isPriceUp ? (
                <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              )}
              {Math.abs(coinData.price_change_percentage_24h).toFixed(2)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:ml-auto">
            <div className="p-2">
              <div className="text-sm text-gray-500">Market Cap</div>
              <div className="font-semibold">${coinData.market_cap?.toLocaleString()}</div>
            </div>
            <div className="p-2">
              <div className="text-sm text-gray-500">Volume (24h)</div>
              <div className="font-semibold">${coinData.total_volume?.toLocaleString()}</div>
            </div>
            <div className="p-2">
              <div className="text-sm text-gray-500">Circulating Supply</div>
              <div className="font-semibold">{coinData.circulating_supply?.toLocaleString()} {coinData.symbol?.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {coinData.details && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About {coinData.name}</h2>
            <div 
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ 
                __html: coinData.details.description?.en?.slice(0, 300) + '...' 
              }}
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Price History (7 Days)</h2>
          {priceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip formatter={(value) => ['$' + value, 'Price']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                  name="Price (USD)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No price history data available</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Additional Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Price Changes</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">1h</span>
                  <span className={coinData.price_change_percentage_1h_in_currency > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coinData.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h</span>
                  <span className={coinData.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coinData.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">7d</span>
                  <span className={coinData.price_change_percentage_7d_in_currency > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coinData.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">30d</span>
                  <span className={coinData.price_change_percentage_30d_in_currency > 0 ? 'text-green-600' : 'text-red-600'}>
                    {coinData.price_change_percentage_30d_in_currency?.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Market Data</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap Rank</span>
                  <span className="font-semibold">#{coinData.market_cap_rank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">All-Time High</span>
                  <span className="font-semibold">${coinData.ath?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">All-Time Low</span>
                  <span className="font-semibold">${coinData.atl?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Supply</span>
                  <span className="font-semibold">
                    {coinData.max_supply ? coinData.max_supply.toLocaleString() : 'Unlimited'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}