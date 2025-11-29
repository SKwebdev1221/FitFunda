import React, { useState, useEffect } from 'react';
import { bedsAPI } from '../../api/beds';
import RoomOccupancyTable from '../../components/tables/RoomOccupancyTable';
import Navbar from '../../components/common/Navbar';

const BedManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [beds, setBeds] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const data = await bedsAPI.getAll();
      setBeds(data);

      // Calculate stats
      const occupied = data.filter(b => b.status === 'occupied').length;
      const maintenance = data.filter(b => b.status === 'maintenance').length;
      setStats({
        total: data.length,
        occupied: occupied,
        available: data.length - occupied - maintenance,
        maintenance: maintenance
      });
    } catch (error) {
      console.error('Failed to fetch beds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPatient = async (bed) => {
    console.log('Assigning patient to bed:', bed);
    alert(`Assigning patient to ${bed.bed_number || bed.number}`);
    // TODO: Implement assignment modal
  };

  const handleDischargePatient = async (bed) => {
    console.log('Discharging patient from bed:', bed);
    if (window.confirm(`Discharge patient from ${bed.bed_number || bed.number}?`)) {
      try {
        await bedsAPI.update(bed._id || bed.id, { status: 'available', patient_id: null });
        alert('Patient discharged successfully');
        fetchBeds();
      } catch (error) {
        console.error('Failed to discharge patient:', error);
        alert('Failed to discharge patient');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-4xl font-bold text-gray-900">Bed Management</h1>
          <p className="w c mt-2 text-gray-600">Monitor and manage hospital bed occupancy and assignments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Beds</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Occupied</h3>
            <p className="text-3xl font-bold text-red-600">{stats.occupied}</p>
            <p className="text-sm text-gray-500">
              {stats.total > 0 ? Math.round((stats.occupied / stats.total) * 100) : 0}% occupancy
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Available</h3>
            <p className="text-3xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Under Maintenance</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.maintenance}</p>
          </div>
        </div>

        {/* Room Occupancy Table */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading beds...</p>
            </div>
          ) : (
            <RoomOccupancyTable
              beds={beds}
              onAssign={handleAssignPatient}
              onDischarge={handleDischargePatient}
            />
          )}
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
