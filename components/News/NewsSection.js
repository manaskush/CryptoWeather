import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCryptoNews } from '../../redux/slices/newsSlice';

const NewsSection = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const refreshInterval = useSelector((state) => state.userPrefs.refreshInterval) || 60000; // Default 60s

  useEffect(() => {
    dispatch(fetchCryptoNews());

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      dispatch(fetchCryptoNews());
    }, refreshInterval * 2); // Refresh news less frequently

    return () => clearInterval(intervalId);
  }, [dispatch, refreshInterval]);

  if (loading && articles.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold  text-blue-900 mb-4">Crypto News</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-black rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold  text-blue-900 mb-4">Crypto News</h2>

      {error && (
        <div className="bg-red-900 border-l-4 border-red-500 text-red-300 p-4 mb-4">
          Error loading news: {error.message}
        </div>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.article_id || article.title} className="bg-black text-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {new Date(article.pubDate).toLocaleDateString()} • {article.source_id}
            </p>
            <p className="text-gray-300 mb-2">{article.description}</p>
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-500 text-sm font-medium transition"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>

      {articles.length === 0 && !loading && !error && (
        <div className="text-center p-8 bg-blue-900 rounded-lg">
          <p className="text-gray-300">No news articles available</p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
