import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';

const PatientPortal = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const patientAlerts = alerts.filter(alert =>
    alert.type === 'health_advisory' || alert.type === 'appointment_reminder'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Patient Portal</h1>
          <p className="mt-2 text-xs text-gray-600 w">Welcome back, {user?.name || 'Patient'}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-sm text-gray-600 mb-4">Schedule a visit with your doctor</p>
            <Link to="/patient/appointments">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                Book Now
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">View Reports</h3>
            <p className="w text-sm text-gray-600 mb-4">Access your medical records</p>
            <Link to="/patient/reports#top">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                View Reports
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Health Advisories</h3>
            <p className="w text-sm text-gray-600 mb-4">Latest health information</p>
            <Link to="/patient/advisory#top">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm">
                View Advisories
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="  space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="w font-medium">Appointment with Dr. Smith</p>
                <p className="w text-sm text-gray-500">Tomorrow at 10:00 AM</p>
              </div>
              <span className="w bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Upcoming
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="w font-medium">Lab Results Available</p>
                <p className="w text-sm text-gray-500">Blood work from last week</p>
              </div>
              <span className="w bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="w font-medium">Prescription Refill</p>
                <p className="w text-sm text-gray-500">Due in 3 days</p>
              </div>
              <span className="w bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Health Alerts */}
        {patientAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Health Alerts</h2>
            <div className="space-y-4">
              {patientAlerts.map(alert => (
                <div key={alert.id} className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-800">{alert.title}</p>
                      <p className="text-sm text-yellow-700 mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPortal;
