import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from '../../redux/slices/weatherSlice';
import WeatherCard from './WeatherCard';

const WeatherSection = () => {
  const dispatch = useDispatch();
  const { cities, weatherData, loading, error, favoriteCities } = useSelector((state) => state.weather);
  const refreshInterval = useSelector((state) => state.userPrefs.refreshInterval);

  useEffect(() => {
    // Fetch weather data for all cities
    cities.forEach((city) => {
      dispatch(fetchWeatherData(city));
    });

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      cities.forEach((city) => {
        dispatch(fetchWeatherData(city));
      });
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [dispatch, cities, refreshInterval]);

  const renderFavorites = () => {
    if (favoriteCities.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Favorite Cities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteCities.map((city) => (
            <WeatherCard
              key={`fav-${city}`}
              city={city}
              data={weatherData[city]?.current}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl text-blue-900 font-bold mb-4">Weather</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          Error loading weather data: {error.message}
        </div>
      )}
      
      {renderFavorites()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cities.map((city) => (
          <WeatherCard
            key={city}
            city={city}
            data={weatherData[city]?.current}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherSection;