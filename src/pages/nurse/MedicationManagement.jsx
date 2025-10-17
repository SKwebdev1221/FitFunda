import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';

const MedicationManagement = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample medication data
  const medications = [
    {
      id: 1,
      patientName: 'John Smith',
      room: '204',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '08:00',
      status: 'pending',
      priority: 'high',
      notes: 'Take with food'
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      room: '206',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00',
      status: 'administered',
      priority: 'medium',
      notes: 'Monitor blood sugar'
    },
    {
      id: 3,
      patientName: 'Mike Davis',
      room: '208',
      medication: 'Warfarin',
      dosage: '5mg',
      frequency: 'Once daily',
      time: '18:00',
      status: 'overdue',
      priority: 'high',
      notes: 'Check INR levels'
    },
    {
      id: 4,
      patientName: 'Emma Wilson',
      room: '210',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      time: '12:00',
      status: 'pending',
      priority: 'medium',
      notes: 'Complete full course'
    },
    {
      id: 5,
      patientName: 'Robert Brown',
      room: '212',
      medication: 'Insulin',
      dosage: '10 units',
      frequency: 'Before meals',
      time: '07:30',
      status: 'pending',
      priority: 'high',
      notes: 'Check blood sugar before administration'
    }
  ];

  const filteredMedications = medications.filter(med => {
    if (filterStatus === 'all') return true;
    return med.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'administered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-yellow-400';
      case 'low': return 'border-l-green-400';
      default: return 'border-l-gray-400';
    }
  };

  const handleAdminister = (medicationId) => {
    // In a real app, this would update the medication status
    console.log('Administering medication:', medicationId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Medication Management</h1>
          <p className="w mt-2 text-xs text-gray-600">Track and administer patient medications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Total Medications</h3>
            <p className="text-2xl font-bold text-blue-600">{medications.length}</p>
            <p className="w text-sm text-gray-500">Scheduled today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {medications.filter(m => m.status === 'pending').length}
            </p>
            <p className="w text-sm text-gray-500">Awaiting administration</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Administered</h3>
            <p className="text-2xl font-bold text-green-600">
              {medications.filter(m => m.status === 'administered').length}
            </p>
            <p className="w text-sm text-gray-500">Completed today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">
              {medications.filter(m => m.status === 'overdue').length}
            </p>
            <p className="w text-sm text-gray-500">Require immediate attention</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-lg font-semibold">Medication Schedule</h2>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Medications</option>
                <option value="pending">Pending</option>
                <option value="administered">Administered</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medication List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Medications</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredMedications.map(medication => (
              <div key={medication.id} className={`p-6 border-l-4 ${getPriorityColor(medication.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {medication.patientName}
                      </h4>
                      <span className="w text-sm text-gray-500">Room {medication.room}</span>
                      <span className={`w px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                        {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="w text-sm font-medium text-gray-900">{medication.medication}</p>
                        <p className="w text-sm text-gray-600">{medication.dosage}</p>
                      </div>
                      <div>
                        <p className="w text-sm text-gray-600">Frequency: {medication.frequency}</p>
                        <p className="w text-sm text-gray-600">Time: {medication.time}</p>
                      </div>
                      <div>
                        <p className="w text-sm text-gray-600">Notes: {medication.notes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    {medication.status === 'pending' || medication.status === 'overdue' ? (
                      <button
                        onClick={() => handleAdminister(medication.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                      >
                        Administer
                      </button>
                    ) : (
                      <span className="w text-sm text-green-600 font-medium">✓ Administered</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/nurse/tasks#top" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Patient Care Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">View and manage patient care activities</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
              View Tasks
            </button>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Medication Inventory</h3>
            <p className="text-sm text-gray-600 mb-4">Check medication stock levels</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
              View Inventory
            </button>
          </div>

          <Link to="/nurse/schedule#top" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Shift Schedule</h3>
            <p className="text-sm text-gray-600 mb-4">Check your upcoming shifts</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm">
              View Schedule
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicationManagement;
