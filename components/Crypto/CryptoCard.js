import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteCrypto } from '../../redux/slices/cryptoSlice';

const CryptoCard = ({ cryptoData }) => {
  const dispatch = useDispatch();
  const favoriteCryptos = useSelector((state) => state.crypto.favoriteCryptos);
  const isFavorite = favoriteCryptos.includes(cryptoData.id);

  if (!cryptoData) {
    return (
      <div className="bg-blue-900 rounded-lg shadow-md p-4 min-h-36 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-10 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    );
  }

  const priceChange = cryptoData.price_change_percentage_24h;
  const isPriceUp = priceChange > 0;

  return (
    <div className="bg-blue-900 text-white rounded-lg shadow-md p-4 transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <Link href={`/crypto/${cryptoData.id}`} className="flex items-center hover:text-red-500 transition-colors">
          <img 
            src={cryptoData.image} 
            alt={cryptoData.name} 
            className="w-8 h-8 mr-2"
          />
          <div>
            <div className="font-semibold">{cryptoData.name}</div>
            <div className="text-gray-300 text-sm">{cryptoData.symbol.toUpperCase()}</div>
          </div>
        </Link>
        
        <button
          onClick={() => dispatch(toggleFavoriteCrypto(cryptoData.id))}
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
      
      <div className="mt-4">
        <div className="text-2xl font-semibold">${cryptoData.current_price.toLocaleString()}</div>
        <div className={`inline-flex items-center ${isPriceUp ? 'text-green-400' : 'text-red-500'}`}>
          {isPriceUp ? (
            <svg className="w-4 h-4 fill-current mr-1 text-green-400" viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current mr-1 text-red-500" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          )}
          {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-300">
        <div>Market Cap: ${cryptoData.market_cap.toLocaleString()}</div>
        <div>24h Vol: ${cryptoData.total_volume.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CryptoCard;
