import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const SupplyOrders = () => {
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: 1,
      item: 'Surgical Gloves - Size M',
      supplier: 'MedSupply Inc.',
      quantity: 1000,
      unit: 'pairs',
      status: 'Pending',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-18',
      totalCost: 250.00,
      urgency: 'Medium'
    },
    {
      id: 2,
      item: 'Insulin Injection Pens',
      supplier: 'PharmaCorp',
      quantity: 200,
      unit: 'pens',
      status: 'Approved',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-17',
      totalCost: 1200.00,
      urgency: 'High'
    },
    {
      id: 3,
      item: 'Bandages - 4" x 4"',
      supplier: 'HealthCare Plus',
      quantity: 500,
      unit: 'pieces',
      status: 'Delivered',
      orderDate: '2024-01-12',
      expectedDelivery: '2024-01-15',
      totalCost: 150.00,
      urgency: 'Low'
    },
    {
      id: 4,
      item: 'Blood Pressure Cuffs',
      supplier: 'MedTech Solutions',
      quantity: 50,
      unit: 'units',
      status: 'In Transit',
      orderDate: '2024-01-13',
      expectedDelivery: '2024-01-16',
      totalCost: 750.00,
      urgency: 'Medium'
    }
  ];

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Approved': return '✅';
      case 'In Transit': return '🚚';
      case 'Delivered': return '📦';
      case 'Cancelled': return '❌';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supply Orders</h1>
          <p className="mt-2 text-gray-600">Manage and track medical supply orders</p>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-md ${filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter('in transit')}
              className={`px-4 py-2 rounded-md ${filter === 'in transit' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              In Transit
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-4 py-2 rounded-md ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Delivered
            </button>
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            New Order
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{getStatusIcon(order.status)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.item}</div>
                          <div className="text-sm text-gray-500">Order #{order.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.quantity} {order.unit}
                      </div>
                      <div className={`text-xs ${getUrgencyColor(order.urgency)}`}>
                        {order.urgency} Priority
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Ordered: {new Date(order.orderDate).toLocaleDateString()}</div>
                      <div>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        {order.status === 'Pending' && (
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                        )}
                        {order.status === 'Approved' && (
                          <button className="text-purple-600 hover:text-purple-900">Track</button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approval</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'Pending').length}
            </p>
            <p className="text-sm text-gray-500">Awaiting review</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">In Transit</h3>
            <p className="text-3xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'In Transit').length}
            </p>
            <p className="text-sm text-gray-500">On the way</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Delivered').length}
            </p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Order #2 Approved</p>
                <p className="text-sm text-gray-500">Insulin Injection Pens - 200 pens from PharmaCorp</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Approved
                </span>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Order #4 Shipped</p>
                <p className="text-sm text-gray-500">Blood Pressure Cuffs - 50 units from MedTech Solutions</p>
              </div>
              <div className="text-right">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  In Transit
                </span>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Order #3 Delivered</p>
                <p className="text-sm text-gray-500">Bandages - 500 pieces from HealthCare Plus</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Delivered
                </span>
                <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyOrders;
