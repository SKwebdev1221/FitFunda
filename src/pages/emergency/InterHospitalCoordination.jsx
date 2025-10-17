import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const InterHospitalCoordination = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      distance: '0 km',
      type: 'Level I Trauma Center',
      capacity: {
        icu: { available: 5, total: 50 },
        medSurg: { available: 15, total: 200 },
        er: { available: 8, total: 30 }
      },
      specialties: ['Trauma', 'Cardiac', 'Neurosurgery'],
      contact: 'Dr. Emily Carter',
      phone: '+1 (555) 123-4567',
      lastUpdate: '2024-01-15 14:30',
      status: 'Normal'
    },
    {
      id: 2,
      name: 'Regional Medical Center',
      distance: '15 km',
      type: 'Level II Trauma Center',
      capacity: {
        icu: { available: 12, total: 40 },
        medSurg: { available: 25, total: 150 },
        er: { available: 12, total: 25 }
      },
      specialties: ['Emergency Medicine', 'Internal Medicine', 'Surgery'],
      contact: 'Dr. Michael Rodriguez',
      phone: '+1 (555) 234-5678',
      lastUpdate: '2024-01-15 14:25',
      status: 'High Capacity'
    },
    {
      id: 3,
      name: 'University Hospital',
      distance: '8 km',
      type: 'Academic Medical Center',
      capacity: {
        icu: { available: 3, total: 60 },
        medSurg: { available: 8, total: 250 },
        er: { available: 5, total: 35 }
      },
      specialties: ['Cardiology', 'Oncology', 'Pediatrics', 'Research'],
      contact: 'Dr. Sarah Johnson',
      phone: '+1 (555) 345-6789',
      lastUpdate: '2024-01-15 14:20',
      status: 'Critical'
    },
    {
      id: 4,
      name: 'Community Health Center',
      distance: '22 km',
      type: 'Community Hospital',
      capacity: {
        icu: { available: 8, total: 20 },
        medSurg: { available: 35, total: 100 },
        er: { available: 15, total: 20 }
      },
      specialties: ['Family Medicine', 'OB/GYN', 'General Surgery'],
      contact: 'Dr. David Lee',
      phone: '+1 (555) 456-7890',
      lastUpdate: '2024-01-15 14:15',
      status: 'Normal'
    }
  ];

  const transferRequests = [
    {
      id: 1,
      patient: 'John Smith',
      fromHospital: 'City General Hospital',
      toHospital: 'Regional Medical Center',
      reason: 'ICU bed needed for cardiac patient',
      priority: 'High',
      status: 'Pending Approval',
      requestedTime: '2024-01-15 14:00',
      estimatedTransfer: '2024-01-15 15:30'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      fromHospital: 'University Hospital',
      toHospital: 'City General Hospital',
      reason: 'Neurosurgery capabilities required',
      priority: 'Critical',
      status: 'Approved',
      requestedTime: '2024-01-15 13:30',
      estimatedTransfer: '2024-01-15 14:45'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'High Capacity': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'border-l-red-400 bg-red-50';
      case 'High': return 'border-l-orange-400 bg-orange-50';
      case 'Medium': return 'border-l-yellow-400 bg-yellow-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getCapacityPercentage = (available, total) => {
    return Math.round(((total - available) / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inter-Hospital Coordination</h1>
          <p className="mt-2 text-gray-600">Coordinate patient transfers and resource sharing across healthcare network</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hospital Network */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Hospital Network Status</h2>
                <p className="text-sm text-gray-600 mt-1">Real-time capacity and availability across the network</p>
              </div>
              <div className="divide-y divide-gray-200">
                {hospitals.map(hospital => (
                  <div
                    key={hospital.id}
                    onClick={() => setSelectedHospital(hospital)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 ${
                      selectedHospital?.id === hospital.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                          <p className="text-sm text-gray-600">{hospital.type} • {hospital.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(hospital.status)}`}>
                          {hospital.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          ICU: {hospital.capacity.icu.available}/{hospital.capacity.icu.total}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${getCapacityPercentage(hospital.capacity.icu.available, hospital.capacity.icu.total)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          Med/Surg: {hospital.capacity.medSurg.available}/{hospital.capacity.medSurg.total}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${getCapacityPercentage(hospital.capacity.medSurg.available, hospital.capacity.medSurg.total)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          ER: {hospital.capacity.er.available}/{hospital.capacity.er.total}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${getCapacityPercentage(hospital.capacity.er.available, hospital.capacity.er.total)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Hospital Details */}
          <div className="lg:col-span-1">
            {selectedHospital ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Hospital Details</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedHospital.name}</h3>
                    <p className="text-sm text-gray-600">{selectedHospital.type}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(selectedHospital.status)}`}>
                      {selectedHospital.status}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Capacity Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ICU Beds:</span>
                        <span>{selectedHospital.capacity.icu.available} available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Med/Surg Beds:</span>
                        <span>{selectedHospital.capacity.medSurg.available} available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ER Capacity:</span>
                        <span>{selectedHospital.capacity.er.available} available</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="text-sm text-gray-600">
                      <p>{selectedHospital.contact}</p>
                      <p>{selectedHospital.phone}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedHospital.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500">
                      Last updated: {selectedHospital.lastUpdate}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                    Request Transfer
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm">
                    Contact Hospital
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Hospital</h3>
                <p className="text-gray-500">Choose a hospital from the network to view detailed capacity and contact information</p>
              </div>
            )}
          </div>
        </div>

        {/* Transfer Requests */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Transfer Requests</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                New Transfer Request
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {transferRequests.map(request => (
              <div key={request.id} className={`p-6 ${getPriorityColor(request.priority)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{request.patient}</h3>
                    <p className="text-sm text-gray-600">
                      {request.fromHospital} → {request.toHospital}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{request.reason}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Priority:</span> {request.priority}
                  </div>
                  <div>
                    <span className="font-medium">Requested:</span> {new Date(request.requestedTime).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">ETA:</span> {new Date(request.estimatedTransfer).toLocaleString()}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  {request.status === 'Pending Approval' && (
                    <>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                        Deny
                      </button>
                    </>
                  )}
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                    View Details
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm">
                    Contact Teams
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Network Hospitals</h3>
            <p className="text-3xl font-bold text-blue-600">{hospitals.length}</p>
            <p className="text-sm text-gray-500">Connected facilities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Available ICU Beds</h3>
            <p className="text-3xl font-bold text-green-600">
              {hospitals.reduce((sum, h) => sum + h.capacity.icu.available, 0)}
            </p>
            <p className="text-sm text-gray-500">Across network</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Active Transfers</h3>
            <p className="text-3xl font-bold text-purple-600">{transferRequests.length}</p>
            <p className="text-sm text-gray-500">In progress</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Avg Response Time</h3>
            <p className="text-3xl font-bold text-orange-600">12m</p>
            <p className="text-sm text-gray-500">For transfer requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterHospitalCoordination;
