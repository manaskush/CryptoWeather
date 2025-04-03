'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData, fetchWeatherForecast } from '@redux/slices/weatherSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CityDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cityId = params.id;
  const weatherData = useSelector((state) => state.weather.weatherData[cityId]);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (cityId) {
      dispatch(fetchWeatherData(cityId));
      dispatch(fetchWeatherForecast(cityId));
    }
  }, [dispatch, cityId]);

  if (loading || !weatherData) {
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
        Error loading weather data: {error.message}
      </div>
    );
  }

  // Format forecast data for chart
  const forecastData = weatherData.forecast?.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    description: item.weather[0].description,
  }));

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{cityId} Weather</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>

        {weatherData.current && (
          <div className="flex flex-col md:flex-row md:items-center p-4 mb-6 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                alt={weatherData.current.weather[0].description}
                className="w-20 h-20"
              />
              <div className="ml-4">
                <div className="text-4xl font-bold">{Math.round(weatherData.current.main.temp)}°C</div>
                <div className="text-lg text-gray-700 capitalize">{weatherData.current.weather[0].description}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:ml-auto">
              <div className="p-2">
                <div className="text-sm text-gray-500">Feels Like</div>
                <div className="font-semibold">{Math.round(weatherData.current.main.feels_like)}°C</div>
              </div>
              <div className="p-2">
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="font-semibold">{weatherData.current.main.humidity}%</div>
              </div>
              <div className="p-2">
                <div className="text-sm text-gray-500">Wind</div>
                <div className="font-semibold">{(weatherData.current.wind.speed * 3.6).toFixed(1)} km/h</div>
              </div>
              <div className="p-2">
                <div className="text-sm text-gray-500">Pressure</div>
                <div className="font-semibold">{weatherData.current.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        )}

        {weatherData.forecast && (
          <div>
            <h2 className="text-xl font-semibold mb-4">24-Hour Forecast</h2>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={forecastData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h2 className="text-xl font-semibold mb-4">Detailed Forecast</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forecastData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.temperature}°C</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.humidity}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}