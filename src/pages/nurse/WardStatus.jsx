import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const WardStatus = () => {
  const [selectedWard, setSelectedWard] = useState('medical');

  const wards = {
    medical: {
      name: 'Medical Ward',
      capacity: 40,
      occupied: 35,
      patients: [
        { id: 1, name: 'John Smith', room: '201', condition: 'Stable', priority: 'Medium' },
        { id: 2, name: 'Sarah Johnson', room: '202', condition: 'Critical', priority: 'High' },
        { id: 3, name: 'Mike Davis', room: '203', condition: 'Improving', priority: 'Low' }
      ]
    },
    surgical: {
      name: 'Surgical Ward',
      capacity: 30,
      occupied: 28,
      patients: [
        { id: 4, name: 'Emma Wilson', room: '301', condition: 'Post-Op', priority: 'High' },
        { id: 5, name: 'Robert Brown', room: '302', condition: 'Stable', priority: 'Medium' }
      ]
    },
    icu: {
      name: 'Intensive Care Unit',
      capacity: 20,
      occupied: 18,
      patients: [
        { id: 6, name: 'Lisa Davis', room: 'ICU-1', condition: 'Critical', priority: 'High' },
        { id: 7, name: 'Tom Anderson', room: 'ICU-2', condition: 'Stable', priority: 'Medium' }
      ]
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Stable': return 'bg-yellow-100 text-yellow-800';
      case 'Improving': return 'bg-green-100 text-green-800';
      case 'Post-Op': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-l-red-400';
      case 'Medium': return 'border-l-yellow-400';
      case 'Low': return 'border-l-green-400';
      default: return 'border-l-gray-400';
    }
  };

  const currentWard = wards[selectedWard];
  const occupancyRate = Math.round((currentWard.occupied / currentWard.capacity) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ward Status</h1>
          <p className="mt-2 text-gray-600">Real-time monitoring of ward occupancy and patient status</p>
        </div>

        {/* Ward Selection */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {Object.entries(wards).map(([key, ward]) => (
              <button
                key={key}
                onClick={() => setSelectedWard(key)}
                className={`px-4 py-2 rounded-md font-medium ${
                  selectedWard === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {ward.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ward Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{currentWard.name}</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Occupancy</span>
                    <span>{currentWard.occupied}/{currentWard.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        occupancyRate > 90 ? 'bg-red-600' :
                        occupancyRate > 75 ? 'bg-yellow-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{occupancyRate}% occupied</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{currentWard.capacity - currentWard.occupied}</p>
                    <p className="text-sm text-gray-600">Available Beds</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{currentWard.patients.length}</p>
                    <p className="text-sm text-gray-600">Active Patients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium text-gray-900 mb-4">Patient Status Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Critical</span>
                  <span className="text-sm font-medium">
                    {currentWard.patients.filter(p => p.condition === 'Critical').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stable</span>
                  <span className="text-sm font-medium">
                    {currentWard.patients.filter(p => p.condition === 'Stable').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Improving</span>
                  <span className="text-sm font-medium">
                    {currentWard.patients.filter(p => p.condition === 'Improving').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Post-Op</span>
                  <span className="text-sm font-medium">
                    {currentWard.patients.filter(p => p.condition === 'Post-Op').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Current Patients</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add Patient
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {currentWard.patients.map(patient => (
                  <div key={patient.id} className={`p-6 ${getPriorityColor(patient.priority)} border-l-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">Room {patient.room}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(patient.condition)}`}>
                          {patient.condition}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View Chart</button>
                          <button className="text-green-600 hover:text-green-800 text-sm">Update Status</button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Vital Signs</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          <div>BP: 120/80</div>
                          <div>HR: 72 bpm</div>
                          <div>Temp: 98.6°F</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Medications</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          <div>Next: Amoxicillin 500mg</div>
                          <div>Due: 2:00 PM</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Care Plan</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          <div>Vital checks: Q4H</div>
                          <div>Ambulation: BID</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ward Alerts */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ward Alerts & Notifications</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">High Occupancy Alert</p>
                  <p className="text-sm text-red-700 mt-1">
                    {currentWard.name} is at {occupancyRate}% capacity. Consider patient transfers.
                  </p>
                  <p className="text-xs text-red-600 mt-2">Updated 5 minutes ago</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">Staffing Update</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Additional nurse assigned to cover evening shift.
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">Updated 15 minutes ago</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Equipment Maintenance</p>
                  <p className="text-sm text-blue-700 mt-1">
                    IV pump in Room 202 scheduled for maintenance tonight.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">Updated 1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardStatus;
