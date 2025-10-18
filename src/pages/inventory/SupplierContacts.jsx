import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const SupplierContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const suppliers = [
    {
      id: 1,
      name: 'MedSupply Inc.',
      category: 'Medical Supplies',
      contact: 'John Anderson',
      phone: '+1 (555) 123-4567',
      email: 'john.anderson@medsupply.com',
      address: '123 Medical Plaza, Healthcare City, HC 12345',
      rating: 4.8,
      status: 'Active',
      lastOrder: '2024-01-15',
      specialties: ['Surgical Gloves', 'Syringes', 'Bandages'],
      contractEnd: '2024-12-31'
    },
    {
      id: 2,
      name: 'PharmaCorp',
      category: 'Pharmaceuticals',
      contact: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      email: 'sarah.johnson@pharmacorp.com',
      address: '456 Pharma Avenue, Medical District, MD 23456',
      rating: 4.9,
      status: 'Active',
      lastOrder: '2024-01-14',
      specialties: ['Insulin', 'Antibiotics', 'Vaccines'],
      contractEnd: '2024-11-30'
    },
    {
      id: 3,
      name: 'HealthCare Plus',
      category: 'Medical Supplies',
      contact: 'Mike Davis',
      phone: '+1 (555) 345-6789',
      email: 'mike.davis@healthcareplus.com',
      address: '789 Care Street, Wellness Valley, WV 34567',
      rating: 4.6,
      status: 'Active',
      lastOrder: '2024-01-12',
      specialties: ['Bandages', 'Gauze', 'Wound Care'],
      contractEnd: '2024-10-15'
    },
    {
      id: 4,
      name: 'MedTech Solutions',
      category: 'Medical Equipment',
      contact: 'Emily Chen',
      phone: '+1 (555) 456-7890',
      email: 'emily.chen@medtech.com',
      address: '321 Tech Boulevard, Innovation Park, IP 45678',
      rating: 4.7,
      status: 'Active',
      lastOrder: '2024-01-13',
      specialties: ['Blood Pressure Monitors', 'IV Equipment', 'Diagnostic Tools'],
      contractEnd: '2025-01-15'
    },
    {
      id: 5,
      name: 'Generic Pharma',
      category: 'Pharmaceuticals',
      contact: 'Robert Wilson',
      phone: '+1 (555) 567-8901',
      email: 'robert.wilson@genericpharma.com',
      address: '654 Generic Lane, Cost-Saving City, CC 56789',
      rating: 4.4,
      status: 'Under Review',
      lastOrder: '2024-01-07',
      specialties: ['Generic Medications', 'Over-the-Counter Drugs'],
      contractEnd: '2024-08-30'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const categories = ['all', ...new Set(suppliers.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Supplier Contacts</h1>
          <p className="w c mt-2 text-gray-600">Manage supplier relationships and contact information</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search suppliers, contacts, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{supplier.category}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm">{getRatingStars(supplier.rating)}</span>
                    <span className="text-sm text-gray-600">({supplier.rating})</span>
                  </div>
                </div>
                <div className="text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit Contact
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <span className="font-medium w-16">Contact:</span>
                  <span>{supplier.contact}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-16">Phone:</span>
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-16">Email:</span>
                  <span className="text-blue-600">{supplier.email}</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="font-medium w-16">Address:</span>
                  <span className="flex-1">{supplier.address}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">Specialties:</span>
                  <span className="text-sm text-gray-500">Last order: {new Date(supplier.lastOrder).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {supplier.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Contract ends: {new Date(supplier.contractEnd).toLocaleDateString()}</span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800">Call</button>
                    <button className="text-blue-600 hover:text-blue-800">Email</button>
                    <button className="text-purple-600 hover:text-purple-800">Order</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Suppliers</h3>
            <p className="text-3xl font-bold text-blue-600">{suppliers.length}</p>
            <p className="text-sm text-gray-500">Active partners</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Active Contracts</h3>
            <p className="text-3xl font-bold text-green-600">
              {suppliers.filter(s => s.status === 'Active').length}
            </p>
            <p className="text-sm text-gray-500">Currently active</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
            <p className="text-3xl font-bold text-purple-600">
              {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">Out of 5 stars</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Under Review</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {suppliers.filter(s => s.status === 'Under Review').length}
            </p>
            <p className="text-sm text-gray-500">Need attention</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Supplier Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">📦</span>
                </div>
                <div>
                  <p className="font-medium">Order delivered from MedSupply Inc.</p>
                  <p className="text-sm text-gray-500">Surgical gloves - 1000 pairs</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📞</span>
                </div>
                <div>
                  <p className="font-medium">Contact update for PharmaCorp</p>
                  <p className="text-sm text-gray-500">New account manager assigned</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">⚠️</span>
                </div>
                <div>
                  <p className="font-medium">Contract review for Generic Pharma</p>
                  <p className="text-sm text-gray-500">Performance metrics below threshold</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">⭐</span>
                </div>
                <div>
                  <p className="font-medium">Rating update for MedTech Solutions</p>
                  <p className="text-sm text-gray-500">Improved to 4.7 stars</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Add New Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierContacts;
