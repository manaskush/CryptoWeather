import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteCity } from '../../redux/slices/weatherSlice';

const WeatherCard = ({ city, data }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector((state) => state.weather.favoriteCities);
  const isFavorite = favoriteCities.includes(city);

  if (!data) {
    return (
      <div className="bg-blue-900 rounded-lg shadow-md p-4 min-h-36 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-10 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 text-white rounded-lg shadow-md p-4 transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <Link href={`/city/${city}`} className="text-lg font-semibold hover:text-red-500 transition-colors">
          {city}
        </Link>
        <button
          onClick={() => dispatch(toggleFavoriteCity(city))}
          className="text-red-500 focus:outline-none"
        >
          {isFavorite ? (
            <svg className="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current text-gray-400 hover:text-red-500 transition" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex items-center mt-2">
        <span className="text-3xl font-bold">{Math.round(data.main.temp)}°C</span>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-14 h-14"
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-300">
        <p>{data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
