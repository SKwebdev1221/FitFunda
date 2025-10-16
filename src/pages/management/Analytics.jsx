import React, { useState } from 'react';
import SurgeGraph from '../../components/dashboard/SurgeGraph';
import BedAvailabilityChart from '../../components/dashboard/BedAvailabilityChart';
import StaffReadinessCard from '../../components/dashboard/StaffReadinessCard';

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Hospital Analytics</h1>
          <p className="mt-2 text-gray-600">Data-driven insights for hospital performance and optimization</p>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Frame</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metric Focus</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Metrics</option>
                <option value="capacity">Capacity</option>
                <option value="efficiency">Efficiency</option>
                <option value="quality">Quality</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Avg. Wait Time</h3>
            <p className="text-3xl font-bold text-blue-600">23 min</p>
            <p className="text-sm text-green-600">↓ 12% from last week</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Patient Satisfaction</h3>
            <p className="text-3xl font-bold text-green-600">94%</p>
            <p className="text-sm text-green-600">↑ 3% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Bed Turnover Rate</h3>
            <p className="text-3xl font-bold text-orange-600">2.3</p>
            <p className="text-sm text-gray-500">per day average</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Cost per Patient</h3>
            <p className="text-3xl font-bold text-purple-600">$2,450</p>
            <p className="text-sm text-red-600">↑ 5% from last quarter</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Patient Surge Trends</h2>
            <SurgeGraph />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bed Utilization</h2>
            <BedAvailabilityChart />
          </div>
        </div>

        {/* Staff Analytics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Staff Performance Analytics</h2>
          <StaffReadinessCard />
        </div>

        {/* Department Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Emergency Department</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Response Time:</span>
                  <span className="text-sm font-medium">8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Patient Volume:</span>
                  <span className="text-sm font-medium">127/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Satisfaction:</span>
                  <span className="text-sm font-medium text-green-600">92%</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Surgery Department</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Operating Rooms:</span>
                  <span className="text-sm font-medium">95% utilized</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Surgery Time:</span>
                  <span className="text-sm font-medium">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate:</span>
                  <span className="text-sm font-medium text-green-600">98.2%</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Medical Ward</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bed Occupancy:</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Stay:</span>
                  <span className="text-sm font-medium">4.2 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Readmission Rate:</span>
                  <span className="text-sm font-medium text-red-600">8.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Export Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Export PDF Report
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Export Excel Data
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Schedule Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Custom Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
