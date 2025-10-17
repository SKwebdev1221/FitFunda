import React, { useState } from 'react';
import RoomOccupancyTable from '../../components/tables/RoomOccupancyTable';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const BedManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleAssignPatient = (room) => {
    // Handle patient assignment logic
    console.log('Assigning patient to room:', room);
    alert(`Assigning patient to ${room.number}`);
  };

  const handleDischargePatient = (room) => {
    // Handle patient discharge logic
    console.log('Discharging patient from room:', room);
    alert(`Discharging patient from ${room.number}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Bed Management</h1>
          <p className="mt-2 text-gray-600">Monitor and manage hospital bed occupancy and assignments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Beds</h3>
            <p className="text-3xl font-bold text-blue-600">290</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Occupied</h3>
            <p className="text-3xl font-bold text-red-600">245</p>
            <p className="text-sm text-gray-500">85% occupancy</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Available</h3>
            <p className="text-3xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Under Maintenance</h3>
            <p className="text-3xl font-bold text-yellow-600">8</p>
          </div>
        </div>

        {/* Room Occupancy Table */}
        <div className="bg-white rounded-lg shadow-md">
          <RoomOccupancyTable
            onAssign={handleAssignPatient}
            onDischarge={handleDischargePatient}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Add New Bed
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Emergency Bed Release
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Maintenance Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedManagement;
