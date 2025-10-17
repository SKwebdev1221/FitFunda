import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
const HospitalLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main St, Downtown',
      distance: '0.5 miles',
      phone: '(555) 123-4567',
      emergency: true,
      services: ['Emergency', 'Surgery', 'Cardiology', 'Pediatrics'],
      rating: 4.5,
      waitTime: '15 min'
    },
    {
      id: 2,
      name: 'Metro Medical Center',
      address: '456 Health Ave, Midtown',
      distance: '2.1 miles',
      phone: '(555) 234-5678',
      emergency: true,
      services: ['Emergency', 'Oncology', 'Neurology', 'Orthopedics'],
      rating: 4.2,
      waitTime: '30 min'
    },
    {
      id: 3,
      name: 'Community Health Clinic',
      address: '789 Care Blvd, Uptown',
      distance: '3.8 miles',
      phone: '(555) 345-6789',
      emergency: false,
      services: ['Primary Care', 'Dental', 'Mental Health', 'Vaccinations'],
      rating: 4.7,
      waitTime: '5 min'
    },
    {
      id: 4,
      name: 'Specialty Care Institute',
      address: '321 Medical Dr, Westside',
      distance: '4.2 miles',
      phone: '(555) 456-7890',
      emergency: false,
      services: ['Cardiology', 'Dermatology', 'Ophthalmology', 'ENT'],
      rating: 4.8,
      waitTime: '10 min'
    }
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Hospital</h1>
          <p className="mt-2 text-gray-600">Locate nearby hospitals and healthcare facilities</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by hospital name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hospital List */}
          <div className="space-y-4">
            {filteredHospitals.map(hospital => (
              <div
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital)}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedHospital?.id === hospital.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                      {hospital.emergency && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 {hospital.distance}</span>
                      <span>⏱️ {hospital.waitTime} wait</span>
                      <span>⭐ {hospital.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Call</p>
                    <p className="font-medium">{hospital.phone}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hospital.services.slice(0, 3).map(service => (
                    <span key={service} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {service}
                    </span>
                  ))}
                  {hospital.services.length > 3 && (
                    <span className="text-gray-500 text-xs">+{hospital.services.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hospitals found matching your search.</p>
              </div>
            )}
          </div>

          {/* Hospital Details/Map */}
          <div className="lg:sticky lg:top-8">
            {selectedHospital ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedHospital.name}</h2>

                {/* Mock Map */}
                <div className="bg-gray-200 h-48 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">{selectedHospital.address}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedHospital.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-medium">{selectedHospital.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Wait:</span>
                        <span className="font-medium">{selectedHospital.waitTime}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHospital.services.map(service => (
                        <span key={service} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                      Get Directions
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Hospital</h3>
                <p className="text-gray-500">Click on a hospital from the list to view details and get directions</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mt-12 bg-red-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-red-600 text-2xl">🚨</div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Services</h3>
              <p className="text-red-700 mb-3">
                If you are experiencing a medical emergency, call emergency services immediately or go to the nearest emergency room.
              </p>
              <div className="flex space-x-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Call Emergency: 911
                </button>
                <button className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200">
                  Find Nearest ER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocator;
