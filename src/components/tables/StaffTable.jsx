import React, { useState } from 'react';

const StaffTable = ({ staff = [], onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredStaff = staff.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    const aValue = a[sortBy].toLowerCase();
    const bValue = b[sortBy].toLowerCase();

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Mock data for demonstration
  const mockStaff = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Doctor', department: 'Emergency', status: 'On Duty', shift: 'Day' },
    { id: 2, name: 'Nurse Mike Chen', role: 'Nurse', department: 'ICU', status: 'On Duty', shift: 'Night' },
    { id: 3, name: 'Dr. Emily Davis', role: 'Doctor', department: 'Surgery', status: 'Available', shift: 'Day' },
    { id: 4, name: 'Nurse Lisa Wong', role: 'Nurse', department: 'Medical', status: 'Off Duty', shift: 'Night' }
  ];

  const displayStaff = staff.length > 0 ? sortedStaff : mockStaff;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Staff Management</h3>
          <input
            type="text"
            placeholder="Search staff..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('role')}
              >
                Role {sortBy === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('department')}
              >
                Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shift
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayStaff.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    person.status === 'On Duty'
                      ? 'bg-green-100 text-green-800'
                      : person.status === 'Available'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {person.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.shift}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit?.(person)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(person.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {displayStaff.length} staff members
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
