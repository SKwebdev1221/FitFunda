import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const EmergencyDashboard = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const emergencyAlerts = alerts.filter(alert =>
    alert.type === 'emergency' || alert.type === 'surge_alert' || alert.type === 'ambulance_dispatch'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Response Dashboard</h1>
          <p className="w mt-2 text-gray-600">Welcome back, {user?.name || 'Emergency Coordinator'}</p>
        </div>

        {/* Critical Alerts Banner */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Active Emergency:</strong> Mass casualty incident at City Hospital. Multiple ambulances dispatched.
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendation Box */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">AI Recommendation: Burn Patient Surge Preparedness</h3>
              <p className="text-blue-700 mb-3">
                Based on Diwali firework incident patterns, keep 3 ambulances ready for burn patients.
                Expected surge in burn cases by 45% due to firework-related accidents in the next 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                  Prepare Ambulances
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 font-medium">
                  View Surge Details
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Active Emergencies</h3>
            <p className="text-3xl font-bold text-red-600">3</p>
            <p className="w text-sm text-gray-500">Currently responding</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Available Ambulances</h3>
            <p className="text-3xl font-bold text-green-600">7</p>
            <p className="w text-sm text-gray-500">Out of 12 total</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
            <p className="text-3xl font-bold text-blue-600">8.5m</p>
            <p className="w text-sm text-gray-500">Average today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Inter-Hospital Transfers</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="w text-sm text-gray-500">This week</p>
          </div>
        </div>

        {/* Active Incidents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Incidents</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 bg-red-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-800">Mass Casualty Incident</h3>
                  <p className="text-sm text-red-700">City Hospital - Multiple victims from vehicle accident</p>
                  <p className="text-xs text-red-600 mt-1">Started: 2 hours ago</p>
                </div>
                <div className="text-right">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    Critical
                  </span>
                  <p className="text-sm font-medium text-red-800 mt-1">5 Ambulances</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-yellow-800">Cardiac Arrest</h3>
                  <p className="text-sm text-yellow-700">Downtown Office Building - Floor 15</p>
                  <p className="text-xs text-yellow-600 mt-1">Started: 45 minutes ago</p>
                </div>
                <div className="text-right">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    High Priority
                  </span>
                  <p className="text-sm font-medium text-yellow-800 mt-1">2 Ambulances</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-400 bg-orange-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-orange-800">Industrial Accident</h3>
                  <p className="text-sm text-orange-700">Manufacturing Plant - Chemical exposure</p>
                  <p className="text-xs text-orange-600 mt-1">Started: 1 hour ago</p>
                </div>
                <div className="text-right">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Medium Priority
                  </span>
                  <p className="text-sm font-medium text-orange-800 mt-1">1 Ambulance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambulance Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Ambulance Fleet Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w text-sm font-medium">Ambulance 1</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w text-sm font-medium">Ambulance 2</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">In Transit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w text-sm font-medium">Ambulance 3</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">At Scene</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w text-sm font-medium">Ambulance 4</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w text-sm font-medium">Ambulance 5</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Transporting</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Response Protocols</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Trauma Response</h3>
                  <p className="text-sm text-gray-600">Level 1 activation</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                  onClick={() => alert('Trauma Response Protocol Activated!')}
                >
                  Activate
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Mass Casualty</h3>
                  <p className="text-sm text-gray-600">Multi-agency response</p>
                </div>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
                  onClick={() => alert('Mass Casualty Protocol is already Active!')}
                >
                  Active
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Chemical Spill</h3>
                  <p className="text-sm text-gray-600">Hazmat team coordination</p>
                </div>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-sm"
                  onClick={() => alert('Chemical Spill Protocol Activated!')}
                >
                  Standby
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        {emergencyAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Emergency Alerts</h2>
            <div className="space-y-4">
              {emergencyAlerts.map(alert => (
                <div key={alert.id} className="border-l-4 border-red-400 bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{alert.title}</p>
                      <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                      <p className="text-xs text-red-600 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Surge Alerts</h3>
            <p className="text-gray-600 mb-4">Monitor and respond to patient surge predictions</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => alert('Viewing Surge Alerts...')}
            >
              View Alerts
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ambulance Tracking</h3>
            <p className="text-gray-600 mb-4">Track ambulance locations and status in real-time</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => alert('Tracking Ambulance Fleet...')}
            >
              Track Fleet
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inter-Hospital Coordination</h3>
            <p className="text-gray-600 mb-4">Coordinate patient transfers between facilities</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={() => alert('Coordinating Inter-Hospital Transfers...')}
            >
              Coordinate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
