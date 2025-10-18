import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const InventoryDashboard = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const inventoryAlerts = alerts.filter(alert =>
    alert.type === 'low_stock' || alert.type === 'supply_shortage' || alert.type === 'expiry_warning'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="w c mt-2 text-gray-600">Welcome back, {user?.name || 'Inventory Manager'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Items</h3>
            <p className="text-3xl font-bold text-blue-600">2,847</p>
            <p className="w text-sm text-gray-500">In inventory</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Items</h3>
            <p className="text-3xl font-bold text-orange-600">23</p>
            <p className="w text-sm text-gray-500">Need replenishment</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="w text-sm text-gray-500">Awaiting delivery</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Expiring Soon</h3>
            <p className="text-3xl font-bold text-red-600">8</p>
            <p className="w text-sm text-gray-500">Within 30 days</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Surgical Gloves - Size M</p>
                <p className="w text-sm text-gray-500">Stock level updated: 450 → 380</p>
              </div>
              <div className="text-right">
                <span className="w bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Stock Update
                </span>
                <p className="text-xs text-gray-500 !mt-2">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Insulin Injection Pens</p>
                <p className="w text-sm text-gray-500">New order placed: 200 units</p>
              </div>
              <div className="text-right">
                <span className="w bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Order Placed
                </span>
                <p className="text-xs text-gray-500 !mt-2">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Bandages - 4" x 4"</p>
                <p className="w text-sm text-gray-500">Low stock alert: 15 remaining</p>
              </div>
              <div className="text-right">
                <span className="w bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Low Stock
                </span>
                <p className="text-xs text-gray-500 !mt-2">6 hours ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="w font-medium">Antibiotics - Amoxicillin</p>
                <p className="w text-sm text-gray-500">Expiry warning: 30 days remaining</p>
              </div>
              <div className="text-right">
                <span className="w bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Expiry Warning
                </span>
                <p className="text-xs text-gray-500 !mt-2">8 hours ago</p>
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

        {/* Predictive Stock Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">🚨 Predictive Stock Recommendations</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI-Driven Surge Preparation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Diwali Pollution Respiratory Surge */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-red-800">Respiratory Medications</h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">CRITICAL</span>
              </div>
              <p className="text-sm text-red-700 mb-3">Diwali fireworks expected to cause 3x normal respiratory cases</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Inhalers (Albuterol)</span>
                    <span className="font-medium">45/120 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '37.5%'}}></div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Need +75 units immediately</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Steroid Inhalers</span>
                    <span className="font-medium">28/80 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Need +52 units</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Oxygen Masks</span>
                    <span className="font-medium">67/150 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '44.7%'}}></div>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">Need +83 units</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium">
                🚨 Place Emergency Order
              </button>
            </div>

            {/* Firework Injury Supplies */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-orange-800">Trauma & Burn Supplies</h3>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">HIGH</span>
              </div>
              <p className="text-sm text-orange-700 mb-3">Firework-related injuries expected to surge during evening festivities</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Burn Dressings</span>
                    <span className="font-medium">23/60 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '38.3%'}}></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Need +37 units</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bandages (Large)</span>
                    <span className="font-medium">89/150 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '59.3%'}}></div>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">Need +61 units</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pain Medications</span>
                    <span className="font-medium">156/200 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Need +44 units</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm font-medium">
                📦 Order Supplies
              </button>
            </div>

            {/* Gastrointestinal Cases */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-800">GI Medications</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">MEDIUM</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">Festive meals may cause digestive issues and food poisoning</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Anti-nausea Meds</span>
                    <span className="font-medium">45/80 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '56.25%'}}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Need +35 units</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IV Fluids</span>
                    <span className="font-medium">78/120 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-indigo-600 mt-1">Need +42 units</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Electrolyte Solutions</span>
                    <span className="font-medium">92/150 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '61.3%'}}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Need +58 units</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                🛒 Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-800">AI Insight</span>
            </div>
            <p className="text-sm text-gray-600">
              Based on Diwali pollution predictions, respiratory cases may increase by 300% during peak festival hours.
              Pre-positioning critical medications now will prevent supply shortages during the surge.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="c text-lg font-semibold text-gray-900 mb-2">📦 Stock Status</h3>
            <p className="w c text-gray-600 mb-4">View current inventory levels and alerts</p>
            <div className="flex justify-center">
            <Link to="/inventory/stock#top">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Inventory
              </button>
            </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">🛒 Supply Orders</h3>
            <p className="w text-gray-600 mb-4 text-center">Manage pending and completed orders</p>
            <div class="flex justify-center">
            <Link to="/inventory/orders#top">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                View Orders
              </button>
            </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="c text-lg font-semibold text-gray-900 mb-2">📈 Reports & Analytics</h3>
            <p className="w c text-gray-600 mb-4">Generate inventory reports and insights</p>
            <div className="flex justify-center">
            <Link to="/inventory/reports#top">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                View Reports
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
