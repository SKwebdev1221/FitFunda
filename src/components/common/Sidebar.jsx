import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import { CONFIG } from '../../config';

const Sidebar = () => {
  const { currentRole } = useRole();
  const location = useLocation();

  const getNavigationItems = () => {
    const basePath = `/${currentRole}`;

    switch (currentRole) {
      case CONFIG.ROLES.MANAGEMENT:
        return [
          { path: `${basePath}`, label: 'Dashboard', icon: '📊' },
          { path: `${basePath}/beds`, label: 'Bed Management', icon: '🛏️' },
          { path: `${basePath}/staff`, label: 'Staff Allocation', icon: '👥' },
          { path: `${basePath}/reports`, label: 'Readiness Reports', icon: '📋' },
          { path: `${basePath}/analytics`, label: 'Analytics', icon: '📈' }
        ];

      case CONFIG.ROLES.DOCTOR:
        return [
          { path: `${basePath}`, label: 'Dashboard', icon: '📊' },
          { path: `${basePath}/patients`, label: 'Patient Queue', icon: '👥' },
          { path: `${basePath}/schedule`, label: 'Shift Schedule', icon: '📅' },
          { path: `${basePath}/forecasts`, label: 'Disease Forecast', icon: '🔮' },
          { path: `${basePath}/communication`, label: 'Communication', icon: '💬' }
        ];

      case CONFIG.ROLES.NURSE:
        return [
          { path: `${basePath}`, label: 'Dashboard', icon: '📊' },
          { path: `${basePath}/tasks`, label: 'Patient Care Tasks', icon: '📋' },
          { path: `${basePath}/schedule`, label: 'Shift Schedule', icon: '📅' },
          { path: `${basePath}/ward`, label: 'Ward Status', icon: '🏥' }
        ];

      case CONFIG.ROLES.INVENTORY:
        return [
          { path: `${basePath}`, label: 'Dashboard', icon: '📊' },
          { path: `${basePath}/stock`, label: 'Stock Status', icon: '📦' },
          { path: `${basePath}/orders`, label: 'Supply Orders', icon: '📋' },
          { path: `${basePath}/forecasts`, label: 'Forecasted Needs', icon: '🔮' },
          { path: `${basePath}/suppliers`, label: 'Supplier Contacts', icon: '📞' }
        ];

      case CONFIG.ROLES.EMERGENCY:
        return [
          { path: `${basePath}`, label: 'Dashboard', icon: '📊' },
          { path: `${basePath}/alerts`, label: 'Surge Alerts', icon: '🚨' },
          { path: `${basePath}/ambulance`, label: 'Ambulance Tracking', icon: '🚑' },
          { path: `${basePath}/protocol`, label: 'Response Protocol', icon: '📋' },
          { path: `${basePath}/coordination`, label: 'Inter-Hospital Coordination', icon: '🤝' }
        ];

      case CONFIG.ROLES.PATIENT:
        return [
          { path: `${basePath}`, label: 'Portal', icon: '🏠' },
          { path: `${basePath}/advisory`, label: 'Health Advisory', icon: '🏥' },
          { path: `${basePath}/appointments`, label: 'Appointment Booking', icon: '📅' },
          { path: `${basePath}/reports`, label: 'My Reports', icon: '📄' },
          { path: `${basePath}/locator`, label: 'Hospital Locator', icon: '📍' }
        ];

      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold capitalize">{currentRole} Panel</h2>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
