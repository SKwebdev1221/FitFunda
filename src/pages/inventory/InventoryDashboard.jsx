import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';

const InventoryDashboard = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const inventoryAlerts = alerts.filter(alert =>
    alert.type === 'low_stock' || alert.type === 'supply_shortage' || alert.type === 'expiry_warning'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name || 'Inventory Manager'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Items</h3>
            <p className="text-3xl font-bold text-blue-600">2,847</p>
            <p className="text-sm text-gray-500">In inventory</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Items</h3>
            <p className="text-3xl font-bold text-orange-600">23</p>
            <p className="text-sm text-gray-500">Need replenishment</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-500">Awaiting delivery</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Expiring Soon</h3>
            <p className="text-3xl font-bold text-red-600">8</p>
            <p className="text-sm text-gray-500">Within 30 days</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Surgical Gloves - Size M</p>
                <p className="text-sm text-gray-500">Stock level updated: 450 → 380</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Stock Update
                </span>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Insulin Injection Pens</p>
                <p className="text-sm text-gray-500">New order placed: 200 units</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Order Placed
                </span>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Bandages - 4" x 4"</p>
                <p className="text-sm text-gray-500">Low stock alert: 15 remaining</p>
              </div>
              <div className="text-right">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Low Stock
                </span>
                <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Antibiotics - Amoxicillin</p>
                <p className="text-sm text-gray-500">Expiry warning: 30 days remaining</p>
              </div>
              <div className="text-right">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Expiry Warning
                </span>
                <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        {inventoryAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              {inventoryAlerts.map(alert => (
                <div key={alert.id} className="border-l-4 border-red-400 bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{alert.title}</p>
                      <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                      <p className="text-xs text-red-600 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stock Status</h3>
            <p className="text-gray-600 mb-4">View current inventory levels and alerts</p>
            <Link to="/inventory/stock">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Inventory
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Supply Orders</h3>
            <p className="text-gray-600 mb-4">Manage pending and completed orders</p>
            <Link to="/inventory/orders">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                View Orders
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-gray-600 mb-4">Generate inventory reports and insights</p>
            <Link to="/inventory/reports">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                View Reports
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
