import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { CONFIG } from '../config';

export const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [bedData, setBedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPredictionData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${CONFIG.API_BASE_URL}/predictions`);
      if (response.ok) {
        const data = await response.json();
        setPredictionData(data);
      } else {
        setError('Failed to fetch prediction data');
      }
    } catch (err) {
      setError('Network error while fetching predictions');
      console.error('Fetch prediction data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/staff`);
      if (response.ok) {
        const data = await response.json();
        setStaffData(data);
      }
    } catch (err) {
      console.error('Fetch staff data error:', err);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/inventory`);
      if (response.ok) {
        const data = await response.json();
        setInventoryData(data);
      }
    } catch (err) {
      console.error('Fetch inventory data error:', err);
    }
  };

  const fetchBedData = async () => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/beds`);
      if (response.ok) {
        const data = await response.json();
        setBedData(data);
      }
    } catch (err) {
      console.error('Fetch bed data error:', err);
    }
  };

  const refreshAllData = async () => {
    await Promise.all([
      fetchPredictionData(),
      fetchStaffData(),
      fetchInventoryData(),
      fetchBedData()
    ]);
  };

  useEffect(() => {
    refreshAllData();
    // Set up periodic refresh for real-time data
    const interval = setInterval(() => {
      fetchPredictionData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const value = {
    predictionData,
    staffData,
    inventoryData,
    bedData,
    loading,
    error,
    fetchPredictionData,
    fetchStaffData,
    fetchInventoryData,
    fetchBedData,
    refreshAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
