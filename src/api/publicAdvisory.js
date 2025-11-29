/**
 * Public Advisory API Client
 */
import api from './axios';

/**
 * Get current day health advisory with AI predictions
 */
export const getCurrentAdvisory = async () => {
  try {
    const response = await api.get('/public-advisory/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current advisory:', error);
    throw error;
  }
};

/**
 * Get 7-day forecast
 */
export const getForecast = async (days = 7) => {
  try {
    const response = await api.get(`/public-advisory/forecast?days=${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Get current health risks
 */
export const getHealthRisks = async () => {
  try {
    const response = await api.get('/public-advisory/health-risks');
    return response.data;
  } catch (error) {
    console.error('Error fetching health risks:', error);
    throw error;
  }
};

/**
 * Get environmental factors
 */
export const getEnvironmentalFactors = async () => {
  try {
    const response = await api.get('/public-advisory/environmental-factors');
    return response.data;
  } catch (error) {
    console.error('Error fetching environmental factors:', error);
    throw error;
  }
};

/**
 * Get model information
 */
export const getModelInfo = async () => {
  try {
    const response = await api.get('/public-advisory/model-info');
    return response.data;
  } catch (error) {
    console.error('Error fetching model info:', error);
    throw error;
  }
};
