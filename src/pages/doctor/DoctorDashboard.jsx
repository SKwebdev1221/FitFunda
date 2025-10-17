import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SurgeGraph from '../../components/dashboard/SurgeGraph';
const DoctorDashboard = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const doctorAlerts = alerts.filter(alert =>
    alert.type === 'patient_critical' || alert.type === 'shift_change'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, Dr. {user?.name || 'Doctor'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Today's Patients</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-500">8 remaining</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Critical Cases</h3>
            <p className="text-3xl font-bold text-red-600">3</p>
            <p className="text-sm text-gray-500">Require immediate attention</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Completed Consultations</h3>
            <p className="text-3xl font-bold text-green-600">16</p>
            <p className="text-sm text-gray-500">This week</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Avg. Consultation Time</h3>
            <p className="text-3xl font-bold text-purple-600">18m</p>
            <p className="text-sm text-gray-500">Per patient</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">John Smith - Follow-up</p>
                <p className="w text-sm text-gray-500">9:00 AM - 9:30 AM</p>
              </div>
              <span className="w bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Sarah Johnson - Initial Consultation</p>
                <p className="w text-sm text-gray-500">9:30 AM - 10:00 AM</p>
              </div>
              <span className="w bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Mike Davis - Emergency</p>
                <p className="w text-sm text-gray-500">10:00 AM - 10:30 AM</p>
              </div>
              <span className="w bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                Urgent
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="w font-medium">Emma Wilson - Check-up</p>
                <p className="w text-sm text-gray-500">10:30 AM - 11:00 AM</p>
              </div>
              <span className="w bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        {doctorAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              {doctorAlerts.map(alert => (
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

        {/* Patient Surge Predictions */}
        <div className="mb-8">
          <SurgeGraph timeRange="24h" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Queue</h3>
            <p className="text-gray-600 mb-4">View and manage patient waiting list</p>
            <Link to="/doctor/patients#top">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Queue
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h3>
            <p className="text-gray-600 mb-4">Access patient medical histories</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              View Records
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shift Schedule</h3>
            <p className="text-gray-600 mb-4">Check your upcoming shifts</p>
            <Link to="/doctor/schedule#top">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                View Schedule
              </button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DoctorDashboard;
