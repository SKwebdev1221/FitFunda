import React, { useState } from 'react';

const RoomOccupancyTable = ({ rooms = [], onAssign, onDischarge }) => {
  const [filterBy, setFilterBy] = useState('all'); // all, occupied, available
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toString().includes(searchTerm) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.patient?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === 'occupied') {
      return matchesSearch && room.occupied;
    } else if (filterBy === 'available') {
      return matchesSearch && !room.occupied;
    }

    return matchesSearch;
  });

  // Mock data for demonstration
  const mockRooms = [
    { id: 1, number: 'ICU-201', type: 'ICU', occupied: true, patient: 'John Smith', condition: 'Pneumonia', admissionDate: '2024-01-15' },
    { id: 2, number: 'ICU-202', type: 'ICU', occupied: false, patient: null, condition: null, admissionDate: null },
    { id: 3, number: 'MED-101', type: 'Medical', occupied: true, patient: 'Mary Davis', condition: 'Appendicitis', admissionDate: '2024-01-14' },
    { id: 4, number: 'SUR-105', type: 'Surgery', occupied: true, patient: 'Robert Brown', condition: 'Heart Surgery', admissionDate: '2024-01-10' },
    { id: 5, number: 'ORTH-302', type: 'Orthopedic', occupied: false, patient: null, condition: null, admissionDate: null }
  ];

  const displayRooms = rooms.length > 0 ? filteredRooms : mockRooms;

  const getStatusColor = (occupied) => {
    return occupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ICU': return 'bg-red-100 text-red-800';
      case 'Surgery': return 'bg-blue-100 text-blue-800';
      case 'Medical': return 'bg-green-100 text-green-800';
      case 'Orthopedic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Room Occupancy</h3>
          <div className="flex space-x-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Rooms</option>
              <option value="occupied">Occupied</option>
              <option value="available">Available</option>
            </select>
            <input
              type="text"
              placeholder="Search rooms..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admission Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {room.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(room.type)}`}>
                    {room.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.occupied)}`}>
                    {room.occupied ? 'Occupied' : 'Available'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.patient || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.condition || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.admissionDate ? new Date(room.admissionDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {room.occupied ? (
                    <button
                      onClick={() => onDischarge?.(room)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Discharge
                    </button>
                  ) : (
                    <button
                      onClick={() => onAssign?.(room)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Assign Patient
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Showing {displayRooms.length} rooms</span>
          <span>
            Occupied: {displayRooms.filter(r => r.occupied).length} |
            Available: {displayRooms.filter(r => !r.occupied).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomOccupancyTable;
