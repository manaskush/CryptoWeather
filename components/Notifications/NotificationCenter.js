import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification, clearAllNotifications } from '../../redux/slices/notificationsSlice';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price_alert':
        return (
          <div className="p-2 rounded-full bg-gray-800 text-blue-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'weather_alert':
        return (
          <div className="p-2 rounded-full bg-gray-800 text-blue-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'news_alert':
        return (
          <div className="p-2 rounded-full bg-gray-800 text-blue-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-800 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNotificationTypeClass = (type) => {
    switch (type) {
      case 'price_alert':
        return 'border-l-4 border-blue-600';
      case 'weather_alert':
        return 'border-l-4 border-blue-500';
      case 'news_alert':
        return 'border-l-4 border-blue-400';
      default:
        return 'border-l-4 border-gray-600';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 focus:outline-none"
        aria-label="Notification Center"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-700 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto border border-gray-700">
          <div className="p-3 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-100">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={() => dispatch(clearAllNotifications())}
                  className="text-xs text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400 flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`${getNotificationTypeClass(notification.type)} p-3 hover:bg-gray-800 transition-colors duration-200`}
                >
                  <div className="flex items-start">
                    {getNotificationIcon(notification.type)}
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-200">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                    <button
                      onClick={() => dispatch(clearNotification(notification.id))}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                      aria-label="Dismiss notification"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;