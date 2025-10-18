import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const ForecastedNeeds = () => {
  const forecasts = [
    {
      item: 'Surgical Gloves - Size M',
      currentStock: 380,
      forecastedDemand: 450,
      timeframe: 'Next 30 days',
      confidence: 'High',
      recommendedOrder: 200,
      unit: 'pairs',
      supplier: 'MedSupply Inc.',
      lastOrdered: '2024-01-10'
    },
    {
      item: 'Insulin Injection Pens',
      currentStock: 245,
      forecastedDemand: 300,
      timeframe: 'Next 30 days',
      confidence: 'High',
      recommendedOrder: 100,
      unit: 'pens',
      supplier: 'PharmaCorp',
      lastOrdered: '2024-01-08'
    },
    {
      item: 'Bandages - 4" x 4"',
      currentStock: 15,
      forecastedDemand: 150,
      timeframe: 'Next 14 days',
      confidence: 'Medium',
      recommendedOrder: 200,
      unit: 'pieces',
      supplier: 'HealthCare Plus',
      lastOrdered: '2024-01-12'
    },
    {
      item: 'Blood Pressure Cuffs',
      currentStock: 28,
      forecastedDemand: 80,
      timeframe: 'Next 30 days',
      confidence: 'High',
      recommendedOrder: 60,
      unit: 'units',
      supplier: 'MedTech Solutions',
      lastOrdered: '2024-01-05'
    },
    {
      item: 'Antibiotics - Amoxicillin',
      currentStock: 67,
      forecastedDemand: 120,
      timeframe: 'Next 21 days',
      confidence: 'Medium',
      recommendedOrder: 80,
      unit: 'bottles',
      supplier: 'Generic Pharma',
      lastOrdered: '2024-01-07'
    }
  ];

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStockStatus = (current, forecasted) => {
    const ratio = current / forecasted;
    if (ratio < 0.5) return { status: 'Critical', color: 'bg-red-500' };
    if (ratio < 0.8) return { status: 'Low', color: 'bg-yellow-500' };
    return { status: 'Adequate', color: 'bg-green-500' };
  };

  const totalRecommendedValue = forecasts.reduce((sum, item) => sum + item.recommendedOrder, 0);
  const highConfidenceItems = forecasts.filter(item => item.confidence === 'High').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Forecasted Needs</h1>
          <p className="w c mt-2 text-gray-600">AI-powered demand forecasting for medical supplies</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Items to Order</h3>
            <p className="text-3xl font-bold text-blue-600">{forecasts.length}</p>
            <p className="text-sm text-gray-500">Based on forecasts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Units</h3>
            <p className="text-3xl font-bold text-green-600">{totalRecommendedValue}</p>
            <p className="text-sm text-gray-500">Recommended order</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">High Confidence</h3>
            <p className="text-3xl font-bold text-purple-600">{highConfidenceItems}</p>
            <p className="text-sm text-gray-500">Forecasts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Critical Items</h3>
            <p className="text-3xl font-bold text-red-600">
              {forecasts.filter(item => getStockStatus(item.currentStock, item.forecastedDemand).status === 'Critical').length}
            </p>
            <p className="text-sm text-gray-500">Need immediate attention</p>
          </div>
        </div>

        {/* Forecast Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Demand Forecasts</h2>
            <p className="text-sm text-gray-600 mt-1">Predicted needs based on historical data and trends</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forecasted Demand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommended Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forecasts.map((item, index) => {
                  const stockStatus = getStockStatus(item.currentStock, item.forecastedDemand);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.item}</div>
                          <div className="text-sm text-gray-500">{item.supplier}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.currentStock} {item.unit}</div>
                        <div className="text-xs text-gray-500">Last ordered: {new Date(item.lastOrdered).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.forecastedDemand} {item.unit}</div>
                        <div className="text-xs text-gray-500">{item.timeframe}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stockStatus.status === 'Critical' ? 'bg-red-100 text-red-800' :
                          stockStatus.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {stockStatus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.recommendedOrder} {item.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          <button className="text-green-600 hover:text-green-900">Order Now</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forecast Accuracy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Forecast Accuracy</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Accuracy</span>
                <span className="text-lg font-bold text-green-600">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '89%' }}></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-gray-600">Surgical Supplies</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">87%</p>
                  <p className="text-sm text-gray-600">Medications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">91%</p>
                  <p className="text-sm text-gray-600">Equipment</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">85%</p>
                  <p className="text-sm text-gray-600">Consumables</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Seasonal Trends</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Winter Respiratory</span>
                <span className="text-sm font-medium text-blue-600">+25% demand</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Summer Trauma</span>
                <span className="text-sm font-medium text-green-600">+15% demand</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Holiday Staffing</span>
                <span className="text-sm font-medium text-purple-600">+30% demand</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Flu Season</span>
                <span className="text-sm font-medium text-orange-600">+40% demand</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium text-gray-900 mb-2">Next Peak Period</h3>
              <p className="text-sm text-gray-600">Flu season expected in 6 weeks</p>
              <div className="mt-2 bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-700 font-medium">Action Required:</p>
                <p className="text-sm text-red-600">Increase antiviral stock by 50%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Smart Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Immediate Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Order surgical gloves - high priority</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Restock bandages - critical level</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Increase insulin inventory</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Prepare for flu season supplies</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Strategic Planning</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Negotiate bulk contracts with suppliers</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Implement automated reordering</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Review supplier performance metrics</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Update emergency stock levels</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mr-3">
              Generate Order Plan
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastedNeeds;
