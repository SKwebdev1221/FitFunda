import React from 'react';
import { useData } from '../../hooks/useData';

const BedAvailabilityChart = () => {
  const { bedData, loading } = useData();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Bed Availability</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Mock data - in real app, use bedData from context
  const wards = [
    { name: 'Emergency', total: 50, occupied: 35, color: 'bg-red-500' },
    { name: 'ICU', total: 20, occupied: 18, color: 'bg-orange-500' },
    { name: 'Medical', total: 100, occupied: 75, color: 'bg-blue-500' },
    { name: 'Surgical', total: 80, occupied: 45, color: 'bg-green-500' },
    { name: 'Maternity', total: 40, occupied: 25, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Bed Availability</h3>
      <div className="space-y-4">
        {wards.map((ward) => {
          const available = ward.total - ward.occupied;
          const occupancyRate = (ward.occupied / ward.total) * 100;

          return (
            <div key={ward.name} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{ward.name}</span>
                  <span className="text-gray-600">
                    {ward.occupied}/{ward.total} ({Math.round(occupancyRate)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${ward.color}`}
                    style={{ width: `${occupancyRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-green-600">
                  {available} available
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span>Total Beds: {wards.reduce((sum, ward) => sum + ward.total, 0)}</span>
          <span>Available: {wards.reduce((sum, ward) => sum + (ward.total - ward.occupied), 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default BedAvailabilityChart;
