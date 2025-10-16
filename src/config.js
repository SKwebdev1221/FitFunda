// Configuration constants and environment variables
export const CONFIG = {
  // API Base URLs
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',

  // Role definitions
  ROLES: {
    MANAGEMENT: 'management',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    INVENTORY: 'inventory',
    EMERGENCY: 'emergency',
    PATIENT: 'patient'
  },

  // Route paths
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ABOUT: '/about',
    CONTACT: '/contact',
    MANAGEMENT: '/management',
    DOCTOR: '/doctor',
    NURSE: '/nurse',
    INVENTORY: '/inventory',
    EMERGENCY: '/emergency',
    PATIENT: '/patient'
  },

  // Feature flags
  FEATURES: {
    ENABLE_REAL_TIME_ALERTS: true,
    ENABLE_PREDICTION_CHARTS: true,
    ENABLE_STAFF_SCHEDULING: true,
    ENABLE_INVENTORY_TRACKING: true
  },

  // UI Constants
  UI: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALERT_TIMEOUT: 5000 // 5 seconds
  }
};

export default CONFIG;
