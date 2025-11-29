import React from 'react';
import { useData } from '../../hooks/useData';

const StaffReadinessCard = ({ data }) => {
  const { staffReadiness, loading } = useData();

  const displayData = data || staffReadiness;

  if (loading && !displayData?.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Staff Readiness</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const colorMap = {
    'Doctor': 'bg-blue-500',
    'Nurse': 'bg-green-500',
    'Technician': 'bg-purple-500',
    'Support': 'bg-orange-500',
    'Management': 'bg-gray-500'
  };

  const departments = displayData?.length > 0 ? displayData.map(dept => ({
    ...dept,
    color: colorMap[dept.name] || colorMap[dept.name.replace(/s$/, '')] || 'bg-gray-400' // Handle plurals roughly
  })) : [
    // Fallback mock data
    { name: 'Doctors', total: 45, onDuty: 32, available: 28, color: 'bg-blue-500' },
    { name: 'Nurses', total: 120, onDuty: 95, available: 85, color: 'bg-green-500' },
    { name: 'Technicians', total: 35, onDuty: 28, available: 25, color: 'bg-purple-500' },
    { name: 'Support Staff', total: 60, onDuty: 45, available: 40, color: 'bg-orange-500' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Staff Readiness</h3>
      <div className="space-y-4">
        {departments.map((dept) => {
          const readinessRate = dept.total > 0 ? (dept.available / dept.total) * 100 : 0;

          return (
            <div key={dept.name} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{dept.name}</span>
                <span className={`text-sm font-medium ${readinessRate > 80 ? 'text-green-600' :
                    readinessRate > 60 ? 'text-yellow-600' :
                      'text-red-600'
                  }`}>
                  {Math.round(readinessRate)}% ready
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <div className="font-medium">{dept.total}</div>
                  <div>Total</div>
                </div>
                <div>
                  <div className="font-medium">{dept.onDuty}</div>
                  <div>On Duty</div>
                </div>
                <div>
                  <div className="font-medium">{dept.available}</div>
                  <div>Available</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${dept.color}`}
                  style={{ width: `${readinessRate}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span>Total Staff: {departments.reduce((sum, dept) => sum + dept.total, 0)}</span>
          <span>Ready: {departments.reduce((sum, dept) => sum + dept.available, 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default StaffReadinessCard;
