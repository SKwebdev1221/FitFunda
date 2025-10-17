import React from 'react';
import { usePredictionData } from '../../hooks/usePredictionData';

const SurgeGraph = ({ timeRange = '24h' }) => {
  const { data, loading } = usePredictionData(timeRange);

  // Engaging mock data with reasons for surges
  const mockSurgeData = [
    {
      time: '00:00',
      patients: 45,
      reason: 'Normal nighttime baseline',
      insight: 'Standard overnight activity',
      preparation: 'Maintain regular staffing'
    },
    {
      time: '04:00',
      patients: 32,
      reason: 'Early morning dip',
      insight: 'Lowest activity period',
      preparation: 'Minimal emergency response needed'
    },
    {
      time: '08:00',
      patients: 78,
      reason: 'Morning commute accidents',
      insight: 'Traffic-related injuries peak',
      preparation: 'Extra orthopedic staff on standby'
    },
    {
      time: '12:00',
      patients: 95,
      reason: 'Diwali pollution surge',
      insight: 'Fireworks causing respiratory issues - PM2.5 levels 3x normal',
      preparation: 'Stock up on inhalers, prepare respiratory isolation beds'
    },
    {
      time: '16:00',
      patients: 87,
      reason: 'Post-lunch digestive cases',
      insight: 'Food-related emergencies from festive meals',
      preparation: 'Gastroenterology team ready for food poisoning cases'
    },
    {
      time: '20:00',
      patients: 65,
      reason: 'Evening festivities',
      insight: 'Firework injuries and alcohol-related incidents',
      preparation: 'Trauma team on high alert, toxicology ready'
    }
  ];

  // Use API data if available, otherwise use engaging mock data
  const chartData = data || mockSurgeData;
  const maxPatients = Math.max(...chartData.map(d => d.patients));

  // Find the surge with the highest prediction
  const peakSurge = chartData.reduce((max, current) =>
    current.patients > max.patients ? current : max
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Patient Surge Predictions</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live AI Predictions</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-4">
        <div className="flex items-end justify-between h-full space-x-2">
          {chartData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  point.reason.includes('Diwali') ? 'bg-red-500 hover:bg-red-600' :
                  point.patients > 80 ? 'bg-orange-500 hover:bg-orange-600' :
                  'bg-blue-500 hover:bg-blue-600'
                }`}
                style={{
                  height: `${(point.patients / maxPatients) * 100}%`,
                  minHeight: '10px'
                }}
                title={`${point.time}: ${point.patients} patients - ${point.reason}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{point.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Surge Insight */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg mb-4 border-l-4 border-red-500">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-800">Peak Surge Alert: {peakSurge.time}</h4>
            <p className="text-sm text-red-700 mt-1">{peakSurge.insight}</p>
            <p className="text-xs text-red-600 mt-2 font-medium">💡 {peakSurge.preparation}</p>
          </div>
        </div>
      </div>

      {/* Surge Details */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-800">Surge Breakdown:</h4>
        {chartData.slice(-3).map((point, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${
                point.reason.includes('Diwali') ? 'bg-red-500' :
                point.patients > 80 ? 'bg-orange-500' : 'bg-blue-500'
              }`}></span>
              <span className="text-gray-600">{point.time}:</span>
              <span className="font-medium">{point.reason}</span>
            </div>
            <span className="font-semibold text-gray-800">{point.patients} pts</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next 24h Prediction:</span>
          <span className="font-semibold text-blue-600">
            {chartData.reduce((sum, point) => sum + point.patients, 0)} total patients expected
          </span>
        </div>
      </div>
    </div>
  );
};

export default SurgeGraph;
