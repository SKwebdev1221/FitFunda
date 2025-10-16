import { useState, useEffect, useCallback } from 'react';
import { useAlerts } from '../context/AlertContext';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { error: showError } = useAlerts();

  const fetchData = useCallback(async (fetchUrl = url, fetchOptions = options) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers
        },
        ...fetchOptions
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while fetching data';
      setError(errorMessage);
      showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options, showError]);

  useEffect(() => {
    if (url && options.autoFetch !== false) {
      fetchData();
    }
  }, [fetchData, url, options.autoFetch]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    fetchData
  };
};
