import React, { createContext, useContext, useState, useCallback } from 'react';

export const AlertContext = createContext();

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const alert = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };

    setAlerts(prev => [...prev, alert]);

    // Auto-remove alert after duration
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Convenience methods for different alert types
  const success = useCallback((message, duration) => addAlert(message, 'success', duration), [addAlert]);
  const error = useCallback((message, duration) => addAlert(message, 'error', duration), [addAlert]);
  const warning = useCallback((message, duration) => addAlert(message, 'warning', duration), [addAlert]);
  const info = useCallback((message, duration) => addAlert(message, 'info', duration), [addAlert]);

  const value = {
    alerts,
    addAlert,
    removeAlert,
    clearAllAlerts,
    success,
    error,
    warning,
    info
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};
