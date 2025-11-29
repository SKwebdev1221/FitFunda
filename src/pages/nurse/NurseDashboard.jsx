import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlerts } from '../../hooks/useAlerts';
import Navbar from '../../components/common/Navbar';
// Temporarily disabled to debug
// import SurgeGraph from '../../components/dashboard/SurgeGraph';

const NurseDashboard = () => {
  const [error, setError] = React.useState(null);
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  
  let alerts = [];
  try {
    const alertsData = useAlerts();
    alerts = alertsData.alerts || [];
  } catch (err) {
    console.error('Alerts error:', err);
    alerts = [];
  }

  // Debug logging
  React.useEffect(() => {
    console.log('NurseDashboard rendered', { user, authLoading, isAuthenticated });
  }, [user, authLoading, isAuthenticated]);

  // Error boundary effect
  React.useEffect(() => {
    const handleError = (event) => {
      console.error('Global error caught:', event.error);
      setError(event.error?.message || 'An error occurred');
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Show error if there's a critical error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => {
              setError(null);
              window.location.reload();
            }} 
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Fallback if user is not loaded
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">User not found. Please log in again.</p>
        </div>
      </div>
    );
  }

  // Filter alerts safely
  const nurseAlerts = Array.isArray(alerts) 
    ? alerts.filter(alert => 
        alert && (
          alert.type === 'patient_vitals' || 
          alert.type === 'medication_due' || 
          alert.type === 'shift_change' ||
          alert.message?.toLowerCase().includes('patient') ||
          alert.message?.toLowerCase().includes('medication') ||
          alert.message?.toLowerCase().includes('shift')
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        {/* Debug info - remove after testing */}
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-xs">
          Debug: User={user?.name || 'none'}, Role={user?.role || 'none'}, Auth={isAuthenticated ? 'yes' : 'no'}
        </div>
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Nurse Dashboard</h1>
          <p className="mt-2 text-xs text-gray-600">Welcome back, Nurse {user?.name || 'Smith'}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Assigned Patients</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500">Currently under care</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Tasks Pending</h3>
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="text-sm text-gray-500">Require attention</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Medications Administered</h3>
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-500">This shift</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-base font-semibold text-gray-900">Vital Signs Checked</h3>
            <p className="text-2xl font-bold text-purple-600">18</p>
            <p className="text-sm text-gray-500">This shift</p>
          </div>
        </div>

        {/* Current Shift Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Current Shift Tasks</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Room 204 - John Smith</p>
                <p className="text-sm text-gray-500">Blood pressure check, 9:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                  Urgent
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Room 206 - Sarah Johnson</p>
                <p className="text-sm text-gray-500">Medication administration, 9:15 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Due Soon
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Room 208 - Mike Davis</p>
                <p className="text-sm text-gray-500">Wound dressing change, 9:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Scheduled
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Complete
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Room 210 - Emma Wilson</p>
                <p className="text-sm text-gray-500">Physical therapy assistance, 10:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Patient Surge Predictions</h3>
            <p className="text-gray-600">Chart temporarily disabled for debugging</p>
            {/* Temporarily disabled to debug */}
            {/* <SurgeGraph timeRange="24h" /> */}
          </div>
        </div>

        {/* Alerts and Notifications */}
        {nurseAlerts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              {nurseAlerts.map(alert => (
                <div key={alert.id || Math.random()} className="border-l-4 border-red-400 bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{alert.title || alert.type || 'Alert'}</p>
                      <p className="text-sm text-red-700 mt-1">{alert.message || 'No message available'}</p>
                      {alert.timestamp && (
                        <p className="text-xs text-red-600 mt-2">{alert.timestamp}</p>
                      )}
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
            <h3 className="text-base font-semibold text-gray-900 mb-2">🩺 Patient Care Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">View and manage patient care activities</p>
            <Link to="/nurse/tasks#top">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                View Tasks
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">💊 Medication Administration</h3>
            <p className="text-sm text-gray-600 mb-4">Track medication schedules and administration</p>
            <Link to="/nurse/medications">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                View Medications
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-2">📅 Shift Schedule</h3>
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
