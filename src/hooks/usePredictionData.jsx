import { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { CONFIG } from '../config';

export const usePredictionData = (timeRange = '24h') => {
  const { predictionData, loading, error, fetchPredictionData } = useData();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (predictionData) {
      // Filter data based on time range
      const now = new Date();
      const filterTime = new Date();

      switch (timeRange) {
        case '1h':
          filterTime.setHours(now.getHours() - 1);
          break;
        case '24h':
          filterTime.setHours(now.getHours() - 24);
          break;
        case '7d':
          filterTime.setDate(now.getDate() - 7);
          break;
        case '30d':
          filterTime.setDate(now.getDate() - 30);
          break;
        default:
          filterTime.setHours(now.getHours() - 24);
      }

      const filtered = predictionData.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= filterTime;
      });

      setFilteredData(filtered);
    }
  }, [predictionData, timeRange]);

  const refreshData = async () => {
    await fetchPredictionData();
  };

  return {
    data: filteredData,
    loading,
    error,
    refreshData,
    timeRange
  };
};
