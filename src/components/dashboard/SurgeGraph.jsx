import React from 'react';
import { usePredictionData } from '../../hooks/usePredictionData';

const SurgeGraph = ({ timeRange = '24h' }) => {
  const { data, loading, error } = usePredictionData(timeRange);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Patient Surge Predictions</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Patient Surge Predictions</h3>
        <div className="h-64 flex items-center justify-center text-red-600">
          Error loading prediction data
        </div>
      </div>
    );
  }

  // Mock chart data - in real app, use a charting library like Chart.js or Recharts
  const chartData = data || [
    { time: '00:00', patients: 45 },
    { time: '04:00', patients: 32 },
    { time: '08:00', patients: 78 },
    { time: '12:00', patients: 95 },
    { time: '16:00', patients: 87 },
    { time: '20:00', patients: 65 }
  ];

  const maxPatients = Math.max(...chartData.map(d => d.patients));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Patient Surge Predictions</h3>
      <div className="h-64">
        <div className="flex items-end justify-between h-full space-x-2">
          {chartData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="bg-blue-500 w-full rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${(point.patients / maxPatients) * 100}%`,
                  minHeight: '10px'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{point.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Peak predicted: {maxPatients} patients
      </div>
    </div>
  );
};

export default SurgeGraph;
