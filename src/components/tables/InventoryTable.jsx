import React, { useState } from 'react';

const InventoryTable = ({ inventory = [], onEdit, onRestock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, low, out

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === 'low') {
      return matchesSearch && item.quantity <= item.minThreshold;
    } else if (filterBy === 'out') {
      return matchesSearch && item.quantity === 0;
    }

    return matchesSearch;
  });

  // Mock data for demonstration
  const mockInventory = [
    { id: 1, name: 'Surgical Masks', category: 'PPE', quantity: 500, unit: 'pieces', minThreshold: 100, supplier: 'MedSupply Inc.' },
    { id: 2, name: 'Paracetamol', category: 'Medication', quantity: 25, unit: 'packs', minThreshold: 50, supplier: 'PharmaCorp' },
    { id: 3, name: 'Bandages', category: 'Wound Care', quantity: 0, unit: 'boxes', minThreshold: 20, supplier: 'MedSupply Inc.' },
    { id: 4, name: 'Gloves', category: 'PPE', quantity: 200, unit: 'pairs', minThreshold: 100, supplier: 'SafeHands Ltd.' }
  ];

  const displayInventory = inventory.length > 0 ? filteredInventory : mockInventory;

  const getStatusColor = (item) => {
    if (item.quantity === 0) return 'bg-red-100 text-red-800';
    if (item.quantity <= item.minThreshold) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (item) => {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= item.minThreshold) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Inventory Management</h3>
          <div className="flex space-x-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <input
              type="text"
              placeholder="Search inventory..."
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
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item)}`}>
                    {getStatusText(item)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit?.(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRestock?.(item)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {displayInventory.length} inventory items
          {filterBy !== 'all' && ` (${filterBy === 'low' ? 'Low Stock' : 'Out of Stock'})`}
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
