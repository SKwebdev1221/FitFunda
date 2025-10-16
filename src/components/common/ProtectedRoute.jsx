import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentRole, hasPermission } = useRole();
  const location = useLocation();

  // Show loading while checking authentication
  if (authLoading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
