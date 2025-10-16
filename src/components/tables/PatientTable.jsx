import React, { useState } from 'react';

const PatientTable = ({ patients = [], onView, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, admitted, discharged

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toString().includes(searchTerm);

    if (filterBy === 'admitted') {
      return matchesSearch && patient.status === 'Admitted';
    } else if (filterBy === 'discharged') {
      return matchesSearch && patient.status === 'Discharged';
    }

    return matchesSearch;
  });

  // Mock data for demonstration
  const mockPatients = [
    { id: 1001, name: 'John Smith', age: 45, condition: 'Pneumonia', status: 'Admitted', room: 'ICU-201', doctor: 'Dr. Johnson', admissionDate: '2024-01-15' },
    { id: 1002, name: 'Mary Davis', age: 32, condition: 'Appendicitis', status: 'Admitted', room: 'Surgery-105', doctor: 'Dr. Wilson', admissionDate: '2024-01-14' },
    { id: 1003, name: 'Robert Brown', age: 67, condition: 'Heart Surgery', status: 'Discharged', room: 'N/A', doctor: 'Dr. Patel', admissionDate: '2024-01-10' },
    { id: 1004, name: 'Lisa Garcia', age: 28, condition: 'Fracture', status: 'Admitted', room: 'Ortho-302', doctor: 'Dr. Chen', admissionDate: '2024-01-16' }
  ];

  const displayPatients = patients.length > 0 ? filteredPatients : mockPatients;

  const getStatusColor = (status) => {
    return status === 'Admitted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Patient Management</h3>
          <div className="flex space-x-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Patients</option>
              <option value="admitted">Admitted</option>
              <option value="discharged">Discharged</option>
            </select>
            <input
              type="text"
              placeholder="Search patients..."
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
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{patient.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.condition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onView?.(patient)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit?.(patient)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {displayPatients.length} patients
          {filterBy !== 'all' && ` (${filterBy === 'admitted' ? 'Admitted' : 'Discharged'})`}
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
