import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCryptoData } from '../../redux/slices/cryptoSlice';
import CryptoCard from './CryptoCard';

const CryptoSection = () => {
  const dispatch = useDispatch();
  const { cryptoData, loading, error, favoriteCryptos } = useSelector((state) => state.crypto);
  const refreshInterval = useSelector((state) => state.userPrefs.refreshInterval);

  useEffect(() => {
    dispatch(fetchCryptoData());

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      dispatch(fetchCryptoData());
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [dispatch, refreshInterval]);

  const renderFavorites = () => {
    if (favoriteCryptos.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Favorite Cryptocurrencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteCryptos.map((coinId) => (
            <CryptoCard
              key={`fav-${coinId}`}
              cryptoData={cryptoData[coinId]}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl text-blue-900 font-bold mb-4">Cryptocurrency</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          Error loading crypto data: {error.message}
        </div>
      )}
      
      {renderFavorites()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(cryptoData).map((coin) => (
          <CryptoCard key={coin.id} cryptoData={coin} />
        ))}
      </div>
    </div>
  );
};

export default CryptoSection;