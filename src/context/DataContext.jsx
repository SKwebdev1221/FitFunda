import React, { createContext, useContext, useState, useEffect } from 'react';
import { dashboardAPI } from '../api/dashboard';
import { staffAPI } from '../api/staff';
import { inventoryAPI } from '../api/inventory';
import { bedsAPI } from '../api/beds';
import { useAuth } from './AuthContext';

export const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [predictionData, setPredictionData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [staffReadiness, setStaffReadiness] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [bedData, setBedData] = useState([]);
  const [bedStats, setBedStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPredictionData = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardAPI.getPredictions();
      setPredictionData(data);
    } catch (err) {
      // Don't show error if it's a 401 (user not authenticated)
      if (err.response?.status !== 401) {
        setError('Network error while fetching predictions');
        console.error('Fetch prediction data error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffData = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await staffAPI.getAll();
      setStaffData(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Fetch staff data error:', err);
      }
    }
  };

  const fetchStaffReadiness = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await staffAPI.getReadiness();
      setStaffReadiness(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Fetch staff readiness error:', err);
      }
    }
  };

  const fetchInventoryData = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await inventoryAPI.getAll();
      setInventoryData(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Fetch inventory data error:', err);
      }
    }
  };

  const fetchBedData = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await bedsAPI.getAll();
      setBedData(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Fetch bed data error:', err);
      }
    }
  };

  const fetchBedStats = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await bedsAPI.getStats();
      setBedStats(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Fetch bed stats error:', err);
      }
    }
  };

  const refreshAllData = async () => {
    await Promise.all([
      fetchPredictionData(),
      fetchStaffData(),
      fetchStaffReadiness(),
      fetchInventoryData(),
      fetchBedData(),
      fetchBedStats()
    ]);
  };

  useEffect(() => {
    // Only fetch data if user is authenticated and auth check is complete
    if (!authLoading && isAuthenticated) {
      refreshAllData();

      // Set up periodic refresh for real-time data
      const interval = setInterval(() => {
        if (isAuthenticated) {
          fetchPredictionData();
          fetchBedStats();
          fetchStaffReadiness();
        }
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, authLoading]);

  const value = {
    predictionData,
    staffData,
    staffReadiness,
    inventoryData,
    bedData,
    bedStats,
    loading,
    error,
    fetchPredictionData,
    fetchStaffData,
    fetchStaffReadiness,
    fetchInventoryData,
    fetchBedData,
    fetchBedStats,
    refreshAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
