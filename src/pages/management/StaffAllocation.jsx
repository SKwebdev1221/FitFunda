import React, { useState, useEffect } from 'react';
import { staffAPI } from '../../api/staff';
import StaffTable from '../../components/tables/StaffTable';
import Navbar from '../../components/common/Navbar';

const StaffAllocation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    onDuty: 0,
    offDuty: 0,
    vacancies: 0
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const data = await staffAPI.getAll();
      setStaff(data);

      // Calculate stats
      const onDuty = data.filter(s => s.status === 'On Duty').length;
      setStats({
        total: data.length,
        onDuty: onDuty,
        offDuty: data.length - onDuty,
        vacancies: 12 // Mock vacancy count
      });
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStaff = async (staffMember) => {
    console.log('Editing staff:', staffMember);
    alert(`Editing ${staffMember.name}`);
    // TODO: Implement edit modal
  };

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffAPI.delete(staffId);
        alert('Staff member deleted');
        fetchStaff(); // Refresh list
      } catch (error) {
        console.error('Failed to delete staff:', error);
        alert('Failed to delete staff member');
      }
    }
  };

  const filteredStaff = selectedDepartment === 'all'
    ? staff
    : staff.filter(s => s.department?.toLowerCase() === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-4xl font-bold text-gray-900">Staff Allocation</h1>
          <p className="w c mt-2 text-gray-600">Manage staff scheduling, assignments, and department allocation</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Staff</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">On Duty</h3>
            <p className="text-3xl font-bold text-green-600">{stats.onDuty}</p>
            <p className="text-sm text-gray-500">{stats.total > 0 ? Math.round((stats.onDuty / stats.total) * 100) : 0}% present</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Off Duty</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.offDuty}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Vacancies</h3>
            <p className="text-3xl font-bold text-red-600">{stats.vacancies}</p>
          </div>
        </div>

        {/* Department Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Staff Directory</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="emergency">Emergency</option>
              <option value="icu">ICU</option>
              <option value="medical">Medical</option>
              <option value="surgery">Surgery</option>
              <option value="nursing">Nursing</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading staff...</p>
            </div>
          ) : (
            <StaffTable
              staff={filteredStaff}
              onEdit={handleEditStaff}
              onDelete={handleDeleteStaff}
            />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Staff Management Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Add New Staff
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Schedule Shifts
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Reassign Staff
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAllocation;
