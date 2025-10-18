import React from 'react';
import { useData } from '../../hooks/useData';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import SurgeGraph from '../../components/dashboard/SurgeGraph';
import AlertCard from '../../components/dashboard/AlertCard';
import RecommendationCard from '../../components/dashboard/RecommendationCard';
import BedAvailabilityChart from '../../components/dashboard/BedAvailabilityChart';
import StaffReadinessCard from '../../components/dashboard/StaffReadinessCard';
import Footer from '../../components/common/Footer';
const ManagementDashboard = () => {
  const { predictionData, bedData, staffData } = useData();
  const { alerts } = useAlerts();

  // Mock data for demonstration
  const mockAlerts = [
    {
      id: 1,
      title: 'High Patient Surge Expected',
      type: 'warning',
      message: 'AI predicts 40% increase in emergency admissions over next 24 hours',
      timestamp: new Date().toISOString(),
      action: 'View Details'
    },
    {
      id: 2,
      title: 'ICU Capacity Alert',
      type: 'critical',
      message: 'ICU bed occupancy at 95% - prepare contingency plans',
      timestamp: new Date().toISOString()
    }
  ];

  const mockRecommendations = [
    {
      id: 1,
      title: 'Staff Reallocation Recommended',
      description: 'Move 5 nurses from Medical ward to Emergency to handle expected surge',
      priority: 'high',
      action: 'Implement Plan'
    },
    {
      id: 2,
      title: 'Supply Procurement Alert',
      description: 'Order additional PPE supplies - current stock will last 3 days',
      priority: 'medium',
      action: 'Create Order'
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts.slice(0, 2) : mockAlerts;
  const displayRecommendations = mockRecommendations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-4xl font-bold text-gray-900">Management Dashboard</h1>
          <p className="w c mt-2 text-gray-600">Hospital-wide overview and readiness management</p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Total Beds</h3>
            <p className="text-3xl font-bold text-blue-600">290</p>
            <p className="text-sm text-gray-500">85% occupied</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Active Staff</h3>
            <p className="text-3xl font-bold text-green-600">245</p>
            <p className="text-sm text-gray-500">92% on duty</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Current Patients</h3>
            <p className="text-3xl font-bold text-orange-600">187</p>
            <p className="text-sm text-gray-500">+12% from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Cases</h3>
            <p className="text-3xl font-bold text-red-600">23</p>
            <p className="text-sm text-gray-500">Last 24 hours</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SurgeGraph />
          <BedAvailabilityChart />
        </div>

        {/* Staff Readiness */}
        <div className="mb-8">
          <StaffReadinessCard />
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {displayAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              {displayRecommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
