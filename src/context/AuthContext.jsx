import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token with API and get user details
          const userData = await authAPI.validateToken();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth validation failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for logout events from axios interceptor
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials.email, credentials.password);
      
      if (!data || !data.access_token) {
        return {
          success: false,
          error: 'Invalid response from server. Please try again.'
        };
      }
      
      localStorage.setItem('authToken', data.access_token);

      // After login, validate token to get user details
      const userData = await authAPI.validateToken();
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.detail || error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else {
        // Error in setting up the request
        errorMessage = error.message || errorMessage;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      // Auto login after register or just return success
      return { success: true, user: response };
    } catch (error) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.detail || error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else {
        // Error in setting up the request
        errorMessage = error.message || errorMessage;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
