import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('inventory');

  const inventoryReports = [
    {
      id: 1,
      title: 'Monthly Inventory Summary',
      date: '2024-01-31',
      type: 'Summary',
      status: 'Generated',
      metrics: {
        totalItems: 15420,
        lowStockItems: 45,
        outOfStockItems: 12,
        totalValue: '$2,450,000'
      }
    },
    {
      id: 2,
      title: 'Stock Movement Report',
      date: '2024-01-30',
      type: 'Movement',
      status: 'Generated',
      metrics: {
        itemsReceived: 2340,
        itemsDispensed: 1890,
        itemsExpired: 23,
        netChange: 427
      }
    },
    {
      id: 3,
      title: 'Supplier Performance',
      date: '2024-01-28',
      type: 'Performance',
      status: 'Generated',
      metrics: {
        onTimeDeliveries: '94%',
        averageLeadTime: '3.2 days',
        qualityScore: '96%',
        totalSuppliers: 28
      }
    }
  ];

  const usageReports = [
    {
      id: 4,
      title: 'Department Usage Analysis',
      date: '2024-01-29',
      type: 'Usage',
      status: 'Generated',
      metrics: {
        emergencyDept: '32%',
        surgery: '28%',
        internalMedicine: '18%',
        pediatrics: '12%',
        others: '10%'
      }
    },
    {
      id: 5,
      title: 'High-Value Items Tracking',
      date: '2024-01-27',
      type: 'Tracking',
      status: 'Generated',
      metrics: {
        itemsOver1000: 156,
        totalValue: '$890,000',
        avgUsage: '85%',
        criticalItems: 23
      }
    }
  ];

  const renderReportDetails = (report) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{report.title}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-500">Date:</span>
            <span className="ml-2">{new Date(report.date).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Type:</span>
            <span className="ml-2">{report.type}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Status:</span>
            <span className="ml-2">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {report.status}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(report.metrics).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-xl font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Download PDF
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
          Export CSV
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
          Email Report
        </button>
      </div>
    </div>
  );

  const currentReports = selectedReport === 'inventory' ? inventoryReports : usageReports;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Reports</h1>
          <p className="mt-2 text-gray-600">Comprehensive reports on inventory status, usage, and performance</p>
        </div>

        {/* Report Type Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedReport('inventory')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedReport === 'inventory'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Inventory Reports
              </button>
              <button
                onClick={() => setSelectedReport('usage')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedReport === 'usage'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usage Reports
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Available Reports</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {currentReports.map(report => (
                  <div
                    key={report.id}
                    className="p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString()}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="lg:col-span-2">
            {currentReports.length > 0 ? (
              renderReportDetails(currentReports[0])
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Available</h3>
                <p className="text-gray-500">Reports will be generated automatically based on system activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Generate New Report */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Custom Report</h3>
          <p className="text-gray-600 mb-4">
            Create custom reports with specific date ranges, categories, or metrics.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
