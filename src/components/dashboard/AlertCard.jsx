import React from 'react';
import { Link } from 'react-router-dom';

const AlertCard = ({ alert }) => {
  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-lg">{getAlertIcon(alert.type)}</span>
        </div>
        <div className="ml-3 flex-1">
          <h4 className="text-sm font-medium">{alert.title}</h4>
          <p className="text-sm mt-1">{alert.message}</p>
          <div className="mt-2 text-xs opacity-75">
            {new Date(alert.timestamp).toLocaleString()}
          </div>
        </div>
        {alert.action && (
          <div className="ml-3">
            <Link to="/management/analytics">
              <button className="text-sm font-medium underline hover:no-underline">
                {alert.action}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
