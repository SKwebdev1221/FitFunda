import React, { useState } from 'react';

const AlertTable = ({ alerts = [], onAcknowledge, onResolve }) => {
  const [filterBy, setFilterBy] = useState('all'); // all, active, resolved
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAlerts = alerts.filter(alert => {
    if (filterBy === 'active') {
      return alert.status === 'active';
    } else if (filterBy === 'resolved') {
      return alert.status === 'resolved';
    }
    return true;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    let aValue, bValue;

    if (sortBy === 'timestamp') {
      aValue = new Date(a.timestamp);
      bValue = new Date(b.timestamp);
    } else {
      aValue = a[sortBy].toLowerCase();
      bValue = b[sortBy].toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Mock data for demonstration
  const mockAlerts = [
    { id: 1, title: 'High Patient Surge Expected', type: 'warning', message: 'AI predicts 40% increase in emergency admissions', timestamp: '2024-01-16T10:30:00Z', status: 'active', priority: 'high' },
    { id: 2, title: 'ICU Bed Shortage', type: 'critical', message: 'Only 2 ICU beds remaining', timestamp: '2024-01-16T09:15:00Z', status: 'active', priority: 'critical' },
    { id: 3, title: 'Staff Shortage Alert', type: 'warning', message: '3 nurses called in sick in Medical ward', timestamp: '2024-01-16T08:45:00Z', status: 'resolved', priority: 'medium' },
    { id: 4, title: 'Supply Low: Paracetamol', type: 'info', message: 'Stock below minimum threshold', timestamp: '2024-01-16T07:20:00Z', status: 'active', priority: 'low' }
  ];

  const displayAlerts = alerts.length > 0 ? sortedAlerts : mockAlerts;

  const getTypeColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Alert Management</h3>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('title')}
              >
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('timestamp')}
              >
                Time {sortBy === 'timestamp' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                  <div className="text-sm text-gray-500">{alert.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(alert.type)}`}>
                    {alert.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {alert.status === 'active' ? (
                    <>
                      <button
                        onClick={() => onAcknowledge?.(alert.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => onResolve?.(alert.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Resolve
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {displayAlerts.length} alerts
          {filterBy !== 'all' && ` (${filterBy === 'active' ? 'Active' : 'Resolved'})`}
        </div>
      </div>
    </div>
  );
};

export default AlertTable;
