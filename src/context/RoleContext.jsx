import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CONFIG } from '../config';

export const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentRole, setCurrentRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setCurrentRole(user.role);
      // Set permissions based on role
      const rolePermissions = getRolePermissions(user.role);
      setPermissions(rolePermissions);
    } else {
      setCurrentRole(null);
      setPermissions([]);
    }
  }, [user, isAuthenticated]);

  const getRolePermissions = (role) => {
    const rolePermissions = {
      [CONFIG.ROLES.MANAGEMENT]: [
        'view_dashboard',
        'manage_staff',
        'view_analytics',
        'manage_beds',
        'view_reports'
      ],
      [CONFIG.ROLES.DOCTOR]: [
        'view_patients',
        'manage_schedule',
        'view_forecasts',
        'communicate'
      ],
      [CONFIG.ROLES.NURSE]: [
        'view_patients',
        'manage_care_tasks',
        'view_ward_status',
        'manage_schedule'
      ],
      [CONFIG.ROLES.INVENTORY]: [
        'view_stock',
        'manage_orders',
        'view_forecasts',
        'manage_suppliers'
      ],
      [CONFIG.ROLES.EMERGENCY]: [
        'view_alerts',
        'track_ambulance',
        'coordinate_response',
        'inter_hospital_comm'
      ],
      [CONFIG.ROLES.PATIENT]: [
        'view_health_advisory',
        'book_appointments',
        'view_reports',
        'locate_hospitals'
      ]
    };

    return rolePermissions[role] || [];
  };

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const switchRole = (newRole) => {
    // Only allow role switching if user has multiple roles
    if (user?.roles?.includes(newRole)) {
      setCurrentRole(newRole);
      const newPermissions = getRolePermissions(newRole);
      setPermissions(newPermissions);
    }
  };

  const value = {
    currentRole,
    permissions,
    hasPermission,
    switchRole
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};
