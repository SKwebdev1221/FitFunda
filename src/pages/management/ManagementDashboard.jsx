import React, { useEffect, useState } from 'react';
import { useData } from '../../hooks/useData';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import SurgeGraph from '../../components/dashboard/SurgeGraph';
import AlertCard from '../../components/dashboard/AlertCard';
import RecommendationCard from '../../components/dashboard/RecommendationCard';
import BedAvailabilityChart from '../../components/dashboard/BedAvailabilityChart';
import StaffReadinessCard from '../../components/dashboard/StaffReadinessCard';
import { dashboardAPI } from '../../api/dashboard';
import { externalAPI } from '../../api/external';

const ManagementDashboard = () => {
  const { predictionData, bedData, staffData } = useData();
  const { alerts } = useAlerts();
  const [stats, setStats] = useState(null);
  const [dashboardAlerts, setDashboardAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, alertsData, recsData, weatherData, aqiData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getAlerts(),
          dashboardAPI.getRecommendations(),
          externalAPI.getWeather('Delhi'),
          externalAPI.getAQI('Delhi')
        ]);
        setStats(statsData);
        setDashboardAlerts(alertsData);
        setRecommendations(recsData);
        setWeather(weatherData);
        setAqi(aqiData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
            <p className="text-3xl font-bold text-blue-600">{stats?.total_beds || 0}</p>
            <p className="text-sm text-gray-500">Total capacity</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Active Staff</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.active_staff || 0}</p>
            <p className="text-sm text-gray-500">Currently on duty</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Current Patients</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.current_patients || 0}</p>
            <p className="text-sm text-gray-500">Admitted</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Cases</h3>
            <p className="text-3xl font-bold text-red-600">{stats?.emergency_cases || 0}</p>
            <p className="text-sm text-gray-500">Active cases</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SurgeGraph data={predictionData} />
          <BedAvailabilityChart data={bedData} />
        </div>

        {/* Staff Readiness */}
        <div className="mb-8">
          <StaffReadinessCard data={staffData} />
        </div>

        {/* Environmental Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Factors (Delhi)</h3>
            {weather && aqi ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="text-2xl font-bold text-blue-700">{weather.main?.temp}°C</p>
                  <p className="text-sm text-gray-500 capitalize">{weather.weather?.[0]?.description}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Air Quality Index</p>
                  <p className="text-2xl font-bold text-orange-700">{aqi.data?.aqi}</p>
                  <p className="text-sm text-gray-500">PM2.5: {aqi.data?.iaqi?.pm25?.v}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading environmental data...</p>
            )}
          </div>
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {dashboardAlerts.length > 0 ? (
                dashboardAlerts.map(alert => (
                  <AlertCard key={alert.id || alert._id} alert={alert} />
                ))
              ) : (
                <p className="text-gray-500">No active alerts</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map(rec => (
                  <RecommendationCard key={rec.id || rec._id} recommendation={rec} />
                ))
              ) : (
                <p className="text-gray-500">No recommendations at this time</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
