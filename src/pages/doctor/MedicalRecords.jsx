import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const MedicalRecords = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      lastVisit: '2024-01-15',
      condition: 'Hypertension',
      status: 'Active',
      records: [
        {
          id: 1,
          date: '2024-01-15',
          type: 'Consultation',
          doctor: 'Dr. Sarah Johnson',
          summary: 'Blood pressure check. Medication adjusted.',
          details: {
            vitals: { bp: '140/90', heartRate: 78, weight: '180 lbs' },
            medications: ['Lisinopril 10mg daily', 'Amlodipine 5mg daily'],
            notes: 'Patient reports improved energy levels. Continue current regimen.'
          }
        },
        {
          id: 2,
          date: '2023-12-20',
          type: 'Lab Results',
          doctor: 'Dr. Michael Chen',
          summary: 'Blood work shows improved cholesterol levels.',
          details: {
            tests: [
              { name: 'Total Cholesterol', value: '210 mg/dL', status: 'Improved' },
              { name: 'LDL', value: '130 mg/dL', status: 'Normal' },
              { name: 'HDL', value: '45 mg/dL', status: 'Good' }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      lastVisit: '2024-01-10',
      condition: 'Diabetes Type 2',
      status: 'Active',
      records: [
        {
          id: 3,
          date: '2024-01-10',
          type: 'Consultation',
          doctor: 'Dr. Emily Davis',
          summary: 'HbA1c levels stable. Diet counseling provided.',
          details: {
            vitals: { glucose: '145 mg/dL', weight: '150 lbs' },
            medications: ['Metformin 500mg twice daily'],
            notes: 'Patient maintaining good control. Encourage continued monitoring.'
          }
        }
      ]
    },
    {
      id: 3,
      name: 'Mike Davis',
      age: 58,
      gender: 'Male',
      lastVisit: '2024-01-08',
      condition: 'Coronary Artery Disease',
      status: 'Critical',
      records: [
        {
          id: 4,
          date: '2024-01-08',
          type: 'Emergency',
          doctor: 'Dr. Robert Wilson',
          summary: 'Chest pain evaluation. Admitted for observation.',
          details: {
            vitals: { bp: '160/95', heartRate: 95, pain: '6/10' },
            medications: ['Aspirin 325mg', 'Nitroglycerin 0.4mg SL', 'Heparin IV'],
            notes: 'ECG shows ST elevation. Transferred to cath lab.'
          }
        }
      ]
    },
    {
      id: 4,
      name: 'Emma Wilson',
      age: 28,
      gender: 'Female',
      lastVisit: '2024-01-05',
      condition: 'Pregnancy',
      status: 'Active',
      records: [
        {
          id: 5,
          date: '2024-01-05',
          type: 'Prenatal Visit',
          doctor: 'Dr. Lisa Park',
          summary: '20-week prenatal check. Fetal development normal.',
          details: {
            vitals: { bp: '110/70', weight: '140 lbs' },
            gestationalAge: '20 weeks',
            notes: 'Ultrasound shows healthy fetus. All measurements appropriate for gestational age.'
          }
        }
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="w c mt-2 text-gray-600">Access and manage patient medical histories</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Patients ({filteredPatients.length})</h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedPatient?.id === patient.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <span className={`w px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
                    <p className="text-sm text-gray-600">{patient.condition}</p>
                    <p className="text-xs text-gray-400 mt-1">Last visit: {patient.lastVisit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.gender}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Condition:</span>
                      <span className="ml-2">{selectedPatient.condition}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Last Visit:</span>
                      <span className="ml-2">{selectedPatient.lastVisit}</span>
                    </div>
                  </div>
                </div>

                {/* Medical Records */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold">Medical Records</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {selectedPatient.records.map(record => (
                      <div key={record.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{record.type}</h4>
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {record.date}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Doctor:</span> {record.doctor}
                            </p>
                            <p className="text-sm text-gray-700">{record.summary}</p>
                          </div>
                          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-sm">
                            View Details
                          </button>
                        </div>

                        {/* Record Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          {record.details.vitals && (
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Vitals</h5>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                {Object.entries(record.details.vitals).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {record.details.medications && (
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Medications</h5>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {record.details.medications.map((med, index) => (
                                  <li key={index}>{med}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {record.details.tests && (
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Test Results</h5>
                              <div className="space-y-2">
                                {record.details.tests.map((test, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{test.name}:</span>
                                    <span className={test.status === 'Improved' || test.status === 'Good' || test.status === 'Normal' ? 'text-green-600' : 'text-gray-900'}>
                                      {test.value} ({test.status})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {record.details.notes && (
                            <div>
                              <h5 className="font-medium mb-2">Notes</h5>
                              <p className="text-sm text-gray-700">{record.details.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                      Add New Record
                    </button>
                    <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                      Update Patient Info
                    </button>
                    <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
                      Schedule Appointment
                    </button>
                    <button className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700">
                      Print Records
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-500">Choose a patient from the list to view their medical records</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
