import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const SurgeAlert = () => {
  const [alertLevel, setAlertLevel] = useState('moderate');

  const surgeAlerts = [
    {
      id: 1,
      type: 'Patient Surge',
      location: 'Emergency Department',
      predictedIncrease: '45%',
      timeframe: 'Next 2 hours',
      severity: 'High',
      timestamp: '2024-01-15 14:30',
      recommendations: [
        'Activate additional staff',
        'Prepare overflow beds',
        'Contact nearby hospitals for transfer capacity'
      ]
    },
    {
      id: 2,
      type: 'ICU Capacity Warning',
      location: 'Intensive Care Unit',
      predictedIncrease: '30%',
      timeframe: 'Next 4 hours',
      severity: 'Medium',
      timestamp: '2024-01-15 13:15',
      recommendations: [
        'Review discharge planning',
        'Prepare step-down unit beds',
        'Monitor ventilator availability'
      ]
    },
    {
      id: 3,
      type: 'Operating Room Backlog',
      location: 'Surgical Department',
      predictedIncrease: '25%',
      timeframe: 'Next 6 hours',
      severity: 'Low',
      timestamp: '2024-01-15 12:00',
      recommendations: [
        'Extend operating hours if possible',
        'Prioritize emergency procedures',
        'Coordinate with anesthesia team'
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'Low': return 'bg-green-100 text-green-800 border-green-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  const getAlertLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="h-font text-center text-3xl font-bold text-gray-900">Surge Alert Management</h1>
          <p className="w mt-2 text-center text-gray-600">Monitor and respond to patient surge predictions</p>
        </div>

        {/* Current Alert Level */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Alert Level</h2>
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${getAlertLevelColor(alertLevel)}`}></div>
            <span className="text-lg font-medium capitalize">{alertLevel} Alert</span>
            <select
              value={alertLevel}
              onChange={(e) => setAlertLevel(e.target.value)}
              className="ml-4 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Active Surge Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Active Surge Alerts</h2>
                <p className="text-sm text-gray-500 mt-1">3 active alerts requiring attention</p>
              </div>
              <div className="divide-y divide-gray-200">
                {surgeAlerts.map(alert => (
                  <div key={alert.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{alert.type}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="w font-medium">Location:</span> {alert.location}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="w font-medium">Predicted Increase:</span> {alert.predictedIncrease} within {alert.timeframe}
                        </p>
                        <p className="w text-xs text-gray-500">
                          Alert Time: {alert.timestamp}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {alert.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Surge Prediction Graph */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Load Prediction</h2>
          <div className="h-64 bg-gray-50 rounded-lg p-4">
            <div className="w-full h-full flex items-end justify-between relative">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between text-xs text-gray-500 pr-2 h-full">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>
              {/* Chart Bars */}
              <div className="flex-1 flex items-end justify-between h-full space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{ height: '45%' }}></div>
                  <span className="text-xs text-gray-600">00:00</span>
                  <span className="text-xs text-gray-400">45</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{ height: '32%' }}></div>
                  <span className="text-xs text-gray-600">04:00</span>
                  <span className="text-xs text-gray-400">32</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-orange-500 rounded-t mb-2" style={{ height: '78%' }}></div>
                  <span className="text-xs text-gray-600">08:00</span>
                  <span className="text-xs text-gray-400">78</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-red-500 rounded-t mb-2" style={{ height: '95%' }}></div>
                  <span className="text-xs text-gray-600">12:00</span>
                  <span className="text-xs text-gray-400">95</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-orange-500 rounded-t mb-2" style={{ height: '87%' }}></div>
                  <span className="text-xs text-gray-600">16:00</span>
                  <span className="text-xs text-gray-400">87</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{ height: '65%' }}></div>
                  <span className="text-xs text-gray-600">20:00</span>
                  <span className="text-xs text-gray-400">65</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-gray-600">Current Capacity</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">95%</p>
              <p className="text-sm text-gray-600">Predicted Peak (2h)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">110%</p>
              <p className="text-sm text-gray-600">Critical Threshold</p>
            </div>
          </div>
        </div>

        {/* Response Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Response Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700">
                Activate Surge Protocol
              </button>
              <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700">
                Call Additional Staff
              </button>
              <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700">
                Prepare Overflow Areas
              </button>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700">
                Contact Nearby Hospitals
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Resource Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available Beds</span>
                <span className="text-sm text-gray-600">23 / 120</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '19%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Staff on Duty</span>
                <span className="text-sm text-gray-600">45 / 60</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ventilators</span>
                <span className="text-sm text-gray-600">8 / 12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeAlert;
