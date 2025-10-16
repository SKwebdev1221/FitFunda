import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONFIG } from '../config';

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

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token with API
          const response = await fetch(`${CONFIG.API_BASE_URL}/auth/validate`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth validation failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    // Temporary mock login for testing - bypass API call
    const mockUsers = {
      'management@test.com': { role: CONFIG.ROLES.MANAGEMENT, name: 'Management User' },
      'doctor@test.com': { role: CONFIG.ROLES.DOCTOR, name: 'Doctor User' },
      'nurse@test.com': { role: CONFIG.ROLES.NURSE, name: 'Nurse User' },
      'inventory@test.com': { role: CONFIG.ROLES.INVENTORY, name: 'Inventory User' },
      'emergency@test.com': { role: CONFIG.ROLES.EMERGENCY, name: 'Emergency User' },
      'patient@test.com': { role: CONFIG.ROLES.PATIENT, name: 'Patient User' }
    };

    const user = mockUsers[credentials.email];
    if (user && credentials.password === 'password') {
      const mockData = {
        token: 'mock-token',
        user: {
          id: 1,
          email: credentials.email,
          role: user.role,
          name: user.name
        }
      };
      localStorage.setItem('authToken', mockData.token);
      setUser(mockData.user);
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials. Use email like management@test.com and password "password"' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
