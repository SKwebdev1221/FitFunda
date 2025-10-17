import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const AmbulanceTracking = () => {
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const ambulances = [
    {
      id: 'AMB-001',
      status: 'In Transit',
      location: 'Downtown Hospital',
      destination: 'City General Hospital',
      eta: '15 minutes',
      driver: 'John Smith',
      paramedic: 'Sarah Johnson',
      patient: 'Jane Doe (Cardiac Emergency)',
      priority: 'High',
      lastUpdate: '2024-01-15 14:30'
    },
    {
      id: 'AMB-002',
      status: 'At Scene',
      location: '123 Main Street',
      destination: 'Emergency Department',
      eta: '5 minutes',
      driver: 'Mike Davis',
      paramedic: 'Emily Chen',
      patient: 'John Wilson (Trauma)',
      priority: 'Critical',
      lastUpdate: '2024-01-15 14:25'
    },
    {
      id: 'AMB-003',
      status: 'Available',
      location: 'Central Station',
      destination: null,
      eta: null,
      driver: 'Robert Brown',
      paramedic: 'Lisa Wong',
      patient: null,
      priority: null,
      lastUpdate: '2024-01-15 14:20'
    },
    {
      id: 'AMB-004',
      status: 'Maintenance',
      location: 'Service Center',
      destination: null,
      eta: null,
      driver: null,
      paramedic: null,
      patient: null,
      priority: null,
      lastUpdate: '2024-01-15 13:00'
    },
    {
      id: 'AMB-005',
      status: 'Returning',
      location: 'City General Hospital',
      destination: 'Central Station',
      eta: '10 minutes',
      driver: 'Tom Anderson',
      paramedic: 'Maria Garcia',
      patient: null,
      priority: 'Low',
      lastUpdate: '2024-01-15 14:15'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'At Scene': return 'bg-red-100 text-red-800';
      case 'Returning': return 'bg-purple-100 text-purple-800';
      case 'Maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'border-l-red-400 bg-red-50';
      case 'High': return 'border-l-orange-400 bg-orange-50';
      case 'Medium': return 'border-l-yellow-400 bg-yellow-50';
      case 'Low': return 'border-l-green-400 bg-green-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return '✅';
      case 'In Transit': return '🚑';
      case 'At Scene': return '🏥';
      case 'Returning': return '↩️';
      case 'Maintenance': return '🔧';
      default: return '❓';
    }
  };

  const activeAmbulances = ambulances.filter(amb => amb.status !== 'Maintenance');
  const availableCount = ambulances.filter(amb => amb.status === 'Available').length;
  const inServiceCount = ambulances.filter(amb => ['In Transit', 'At Scene'].includes(amb.status)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ambulance Tracking</h1>
          <p className="mt-2 text-gray-600">Real-time monitoring of ambulance fleet and emergency response</p>
        </div>

        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Fleet</h3>
            <p className="text-3xl font-bold text-blue-600">{ambulances.length}</p>
            <p className="text-sm text-gray-500">Active vehicles</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Available</h3>
            <p className="text-3xl font-bold text-green-600">{availableCount}</p>
            <p className="text-sm text-gray-500">Ready for dispatch</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">In Service</h3>
            <p className="text-3xl font-bold text-red-600">{inServiceCount}</p>
            <p className="text-sm text-gray-500">Currently responding</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
            <p className="text-3xl font-bold text-purple-600">8.5m</p>
            <p className="text-sm text-gray-500">Average today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ambulance List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Fleet Status</h2>
                <p className="text-sm text-gray-600 mt-1">Click on an ambulance for detailed tracking</p>
              </div>
              <div className="divide-y divide-gray-200">
                {ambulances.map(ambulance => (
                  <div
                    key={ambulance.id}
                    onClick={() => setSelectedAmbulance(ambulance)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 ${getPriorityColor(ambulance.priority)} ${
                      selectedAmbulance?.id === ambulance.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getStatusIcon(ambulance.status)}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{ambulance.id}</h3>
                          <p className="text-sm text-gray-600">{ambulance.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ambulance.status)}`}>
                          {ambulance.status}
                        </span>
                        {ambulance.eta && (
                          <p className="text-sm text-gray-500 mt-1">ETA: {ambulance.eta}</p>
                        )}
                      </div>
                    </div>

                    {ambulance.patient && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{ambulance.patient}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                          <span>Driver: {ambulance.driver}</span>
                          <span>Paramedic: {ambulance.paramedic}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Ambulance Details */}
          <div className="lg:col-span-1">
            {selectedAmbulance ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Ambulance Details</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedAmbulance.id}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(selectedAmbulance.status)}`}>
                      {selectedAmbulance.status}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Current Location</h4>
                    <p className="text-sm text-gray-600">{selectedAmbulance.location}</p>
                  </div>

                  {selectedAmbulance.destination && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Destination</h4>
                      <p className="text-sm text-gray-600">{selectedAmbulance.destination}</p>
                      {selectedAmbulance.eta && (
                        <p className="text-sm text-blue-600 mt-1">ETA: {selectedAmbulance.eta}</p>
                      )}
                    </div>
                  )}

                  {selectedAmbulance.patient && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                      <p className="text-sm text-gray-600">{selectedAmbulance.patient}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Crew</h4>
                    <div className="text-sm text-gray-600">
                      <p>Driver: {selectedAmbulance.driver || 'Not assigned'}</p>
                      <p>Paramedic: {selectedAmbulance.paramedic || 'Not assigned'}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Last Update</h4>
                    <p className="text-sm text-gray-600">{selectedAmbulance.lastUpdate}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                    View on Map
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm">
                    Contact Crew
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">
                    Update Status
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Ambulance</h3>
                <p className="text-gray-500">Choose an ambulance from the list to view detailed information</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Dispatch */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Dispatch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quick Dispatch</h3>
              <div className="space-y-3">
                <button className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700">
                  🚨 Critical Emergency
                </button>
                <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700">
                  🚑 High Priority
                </button>
                <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700">
                  🚐 Medium Priority
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Dispatch History</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>AMB-002 dispatched to downtown accident</span>
                  <span className="text-gray-500">14:25</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>AMB-001 en route to cardiac emergency</span>
                  <span className="text-gray-500">14:15</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>AMB-005 returned to station</span>
                  <span className="text-gray-500">13:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Average Response</span>
                <span className="text-sm font-medium">8.5 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fastest Today</span>
                <span className="text-sm font-medium text-green-600">4.2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Slowest Today</span>
                <span className="text-sm font-medium text-red-600">15.7 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Coverage</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Coverage Area</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Population Served</span>
                <span className="text-sm font-medium">750K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Calls Handled</span>
                <span className="text-sm font-medium">127 today</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Vehicles Operational</span>
                <span className="text-sm font-medium text-green-600">80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Next Maintenance</span>
                <span className="text-sm font-medium">AMB-004</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fuel Efficiency</span>
                <span className="text-sm font-medium">12.5 mpg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
