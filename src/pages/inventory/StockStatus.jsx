import React, { useState } from 'react';

const StockStatus = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryItems = [
    {
      id: 1,
      name: 'Surgical Gloves - Size M',
      category: 'PPE',
      currentStock: 380,
      minStock: 500,
      maxStock: 1000,
      unit: 'pairs',
      supplier: 'MedSupply Inc.',
      lastUpdated: '2024-01-15',
      status: 'Low Stock'
    },
    {
      id: 2,
      name: 'Bandages - 4" x 4"',
      category: 'Wound Care',
      currentStock: 15,
      minStock: 100,
      maxStock: 500,
      unit: 'pieces',
      supplier: 'HealthCare Plus',
      lastUpdated: '2024-01-14',
      status: 'Critical'
    },
    {
      id: 3,
      name: 'Insulin Injection Pens',
      category: 'Medications',
      currentStock: 245,
      minStock: 200,
      maxStock: 600,
      unit: 'pens',
      supplier: 'PharmaCorp',
      lastUpdated: '2024-01-15',
      status: 'Normal'
    },
    {
      id: 4,
      name: 'Blood Pressure Cuffs',
      category: 'Equipment',
      currentStock: 28,
      minStock: 50,
      maxStock: 150,
      unit: 'units',
      supplier: 'MedTech Solutions',
      lastUpdated: '2024-01-13',
      status: 'Low Stock'
    },
    {
      id: 5,
      name: 'Antibiotics - Amoxicillin',
      category: 'Medications',
      currentStock: 67,
      minStock: 100,
      maxStock: 300,
      unit: 'bottles',
      supplier: 'Generic Pharma',
      lastUpdated: '2024-01-12',
      status: 'Low Stock'
    },
    {
      id: 6,
      name: 'Syringes - 10ml',
      category: 'Equipment',
      currentStock: 450,
      minStock: 200,
      maxStock: 800,
      unit: 'pieces',
      supplier: 'MedSupply Inc.',
      lastUpdated: '2024-01-15',
      status: 'Normal'
    }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesFilter = filter === 'all' ||
      (filter === 'low' && item.status === 'Low Stock') ||
      (filter === 'critical' && item.status === 'Critical') ||
      (filter === 'normal' && item.status === 'Normal');

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockPercentage = (current, min, max) => {
    const percentage = (current / max) * 100;
    return Math.min(percentage, 100);
  };

  const getStockBarColor = (current, min) => {
    if (current <= min) return 'bg-red-500';
    if (current <= min * 1.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Status</h1>
          <p className="mt-2 text-gray-600">Monitor inventory levels and stock alerts</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-md ${filter === 'critical' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-md ${filter === 'low' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setFilter('normal')}
              className={`px-4 py-2 rounded-md ${filter === 'normal' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Normal
            </button>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Min: {item.minStock} | Max: {item.maxStock}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getStockBarColor(item.currentStock, item.minStock)}`}
                              style={{ width: `${getStockPercentage(item.currentStock, item.minStock, item.maxStock)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Update</button>
                        <button className="text-green-600 hover:text-green-900">Order</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Items</h3>
            <p className="text-3xl font-bold text-blue-600">{inventoryItems.length}</p>
            <p className="text-sm text-gray-500">In inventory</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Normal Stock</h3>
            <p className="text-3xl font-bold text-green-600">
              {inventoryItems.filter(item => item.status === 'Normal').length}
            </p>
            <p className="text-sm text-gray-500">Items</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {inventoryItems.filter(item => item.status === 'Low Stock').length}
            </p>
            <p className="text-sm text-gray-500">Items</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Critical</h3>
            <p className="text-3xl font-bold text-red-600">
              {inventoryItems.filter(item => item.status === 'Critical').length}
            </p>
            <p className="text-sm text-gray-500">Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockStatus;
