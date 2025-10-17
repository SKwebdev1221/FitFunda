import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
const PatientQueue = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      condition: 'Chest Pain',
      priority: 'High',
      waitTime: '5 min',
      status: 'Waiting',
      symptoms: 'Sharp chest pain, shortness of breath'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      condition: 'Routine Check-up',
      priority: 'Low',
      waitTime: '15 min',
      status: 'Waiting',
      symptoms: 'Annual physical examination'
    },
    {
      id: 3,
      name: 'Mike Davis',
      age: 28,
      condition: 'Broken Arm',
      priority: 'Medium',
      waitTime: '8 min',
      status: 'In Room',
      symptoms: 'Fall injury, severe pain in left arm'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      age: 67,
      condition: 'Hypertension Follow-up',
      priority: 'Medium',
      waitTime: '22 min',
      status: 'Waiting',
      symptoms: 'Blood pressure monitoring'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Room': return 'bg-blue-100 text-blue-800';
      case 'Waiting': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Queue</h1>
          <p className="mt-2 text-gray-600">Manage your patient waiting list and consultations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Current Queue</h2>
                <p className="w text-sm text-gray-500 mt-1">4 patients waiting</p>
              </div>
              <div className="w divide-y divide-gray-200">
                {patients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedPatient?.id === patient.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{patient.name}</h3>
                        <span className="w text-sm text-gray-500">Age: {patient.age}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`w px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                          {patient.priority}
                        </span>
                        <span className={`w px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="w text-sm font-medium text-gray-700">{patient.condition}</p>
                        <p className="w text-sm text-gray-500">{patient.symptoms}</p>
                      </div>
                      <div className="text-right">
                        <p className="w text-sm font-medium text-gray-900">Wait: {patient.waitTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-1">
            {selectedPatient ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-lg font-medium text-gray-900">{selectedPatient.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <p className="mt-1 text-gray-900">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedPatient.priority)}`}>
                        {selectedPatient.priority}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <p className="mt-1 text-gray-900">{selectedPatient.condition}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                    <p className="mt-1 text-gray-700">{selectedPatient.symptoms}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Wait Time</label>
                      <p className="mt-1 text-gray-900">{selectedPatient.waitTime}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Start Consultation
                  </button>
                  <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
                    View Medical History
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                    Mark as Completed
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-500">Choose a patient from the queue to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Queue Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Patients</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Average Wait Time</h3>
            <p className="text-3xl font-bold text-orange-600">18m</p>
            <p className="text-sm text-gray-500">Per patient</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">High Priority</h3>
            <p className="text-3xl font-bold text-red-600">3</p>
            <p className="text-sm text-gray-500">Waiting</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">16</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;
