import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
import SurgeGraph from '../../components/dashboard/SurgeGraph';
import Footer from '../../components/common/Footer';
const NurseDashboard = () => {
  const { user } = useAuth();
  const { alerts } = useAlerts();

  const nurseAlerts = alerts.filter(alert =>
    alert.type === 'patient_vitals' || alert.type === 'medication_due' || alert.type === 'shift_change'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Nurse Dashboard</h1>
          <p className="w mt-2 text-xs text-gray-600">Welcome back, Nurse {user?.name || 'Smith'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Assigned Patients</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="w text-sm text-gray-500">Currently under care</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Tasks Pending</h3>
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="w text-sm text-gray-500">Require attention</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Medications Administered</h3>
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="w text-sm text-gray-500">This shift</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Vital Signs Checked</h3>
            <p className="text-2xl font-bold text-purple-600">18</p>
            <p className="w text-sm text-gray-500">This shift</p>
          </div>
        </div>

        {/* Current Shift Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Current Shift Tasks</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Room 204 - John Smith</p>
                <p className="w text-sm text-gray-500">Blood pressure check, 9:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="w bg-red-100 text-red-700 px-1 py-2 rounded-full text-s">
                  Urgent
                </span>
                <button className="wbg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Room 206 - Sarah Johnson</p>
                <p className="w text-sm text-gray-500">Medication administration, 9:15 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="w bg-yellow-100 text-yellow-800 px-2 py-2 rounded-full text-s">
                  Due Soon
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Room 208 - Mike Davis</p>
                <p className="w text-sm text-gray-500">Wound dressing change, 9:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="w bg-green-100 text-green-800 px-2 py-2 rounded-full text-s">
                  Scheduled
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="w font-medium">Room 210 - Emma Wilson</p>
                <p className="w text-sm text-gray-500">Physical therapy assistance, 10:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="w bg-gray-100 text-gray-800 px-2 py-2 rounded-full text-s">
                  Pending
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Surge Predictions */}
        <div className="mb-8">
          <SurgeGraph timeRange="24h" />
        </div>

        {/* Alerts and Notifications */}
        {nurseAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              {nurseAlerts.map(alert => (
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
            <h3 className="text-base font-semibold text-gray-900 mb-2">Patient Care Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">View and manage patient care activities</p>
            <Link to="/nurse/tasks#top">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                View Tasks
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Medication Administration</h3>
            <p className="text-sm text-gray-600 mb-4">Track medication schedules and administration</p>
            <Link to="/nurse/medications">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                View Medications
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Shift Schedule</h3>
            <p className="text-sm text-gray-600 mb-4">Check your upcoming shifts</p>
            <Link to="/nurse/schedule#top">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm">
                View Schedule
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
