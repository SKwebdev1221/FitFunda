import React, { useState } from 'react';
import AlertTable from '../../components/tables/AlertTable';

const ReadinessReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAcknowledgeAlert = (alertId) => {
    console.log('Acknowledging alert:', alertId);
    alert('Alert acknowledged');
  };

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
    alert('Alert resolved');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Readiness Reports</h1>
          <p className="mt-2 text-gray-600">Monitor hospital readiness metrics and system alerts</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="capacity">Capacity</option>
                <option value="staff">Staff</option>
                <option value="supplies">Supplies</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Readiness Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Bed Readiness</h3>
            <p className="text-3xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-500">15 beds available</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Staff Readiness</h3>
            <p className="text-3xl font-bold text-blue-600">92%</p>
            <p className="text-sm text-gray-500">318 staff ready</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Supply Readiness</h3>
            <p className="text-3xl font-bold text-yellow-600">78%</p>
            <p className="text-sm text-gray-500">12 items low</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Equipment Status</h3>
            <p className="text-3xl font-bold text-red-600">65%</p>
            <p className="text-sm text-gray-500">8 units offline</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Alert Management */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">System Alerts</h2>
            <p className="text-gray-600">Monitor and manage critical system alerts</p>
          </div>
          <AlertTable
            onAcknowledge={handleAcknowledgeAlert}
            onResolve={handleResolveAlert}
          />
        </div>

        {/* Report Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Report Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Generate PDF Report
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Export to Excel
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Schedule Automated Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessReports;
