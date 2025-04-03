import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteCrypto } from '../../redux/slices/cryptoSlice';

const CryptoCard = ({ cryptoData }) => {
  const dispatch = useDispatch();
  const favoriteCryptos = useSelector((state) => state.crypto.favoriteCryptos);
  const isFavorite = favoriteCryptos.includes(cryptoData?.id);

  if (!cryptoData) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-5 min-h-36 animate-pulse">
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-3"></div>
        <div className="h-10 bg-gray-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-800 rounded w-1/4"></div>
      </div>
    );
  }

  const priceChange = cryptoData.price_change_percentage_24h;
  const isPriceUp = priceChange > 0;

  return (
    <div className="bg-gray-900 border border-gray-800 text-white rounded-xl shadow-lg p-5 transition duration-300 hover:shadow-blue-900/30 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <Link href={`/crypto/${cryptoData.id}`} className="group flex items-center transition-colors">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-sm group-hover:bg-blue-500/30 transition-all duration-300"></div>
            <img 
              src={cryptoData.image} 
              alt={cryptoData.name} 
              className="w-10 h-10 relative z-10"
            />
          </div>
          <div className="ml-3">
            <div className="font-bold text-lg group-hover:text-blue-400 transition-colors">{cryptoData.name}</div>
            <div className="text-gray-400 text-sm">{cryptoData.symbol.toUpperCase()}</div>
          </div>
        </Link>
        
        <button
          onClick={() => dispatch(toggleFavoriteCrypto(cryptoData.id))}
          className="focus:outline-none p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <svg className="w-5 h-5 fill-current text-blue-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current text-gray-500 hover:text-blue-500 transition-colors" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-end">
        <div>
          <div className="text-2xl font-bold">${cryptoData.current_price.toLocaleString()}</div>
          <div className={`flex items-center ${isPriceUp ? 'text-blue-400' : 'text-red-500'} font-medium`}>
            {isPriceUp ? (
              <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
            {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>
        
        <div className="px-3 py-1 rounded-full bg-gray-800 text-sm text-blue-400 font-medium">
          Rank #{cryptoData.market_cap_rank || "N/A"}
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-800 grid grid-cols-2 gap-2 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500">Market Cap</span>
          <span className="text-white font-medium">${cryptoData.market_cap.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">24h Volume</span>
          <span className="text-white font-medium">${cryptoData.total_volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;