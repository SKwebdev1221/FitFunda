import React from 'react';
import { usePredictionData } from '../../hooks/usePredictionData';

const SurgeGraph = ({ timeRange = '24h' }) => {
  const { data, loading } = usePredictionData(timeRange);

  // Mock data fallback
  const mockSurgeData = [
    { time: '00:00', patients: 45, reason: 'Normal nighttime baseline', insight: 'Standard overnight activity', preparation: 'Maintain regular staffing' },
    { time: '04:00', patients: 32, reason: 'Early morning dip', insight: 'Lowest activity period', preparation: 'Minimal emergency response needed' },
    { time: '08:00', patients: 78, reason: 'Morning commute accidents', insight: 'Traffic-related injuries peak', preparation: 'Extra orthopedic staff on standby' },
    { time: '12:00', patients: 95, reason: 'Diwali pollution surge', insight: 'Fireworks causing respiratory issues - PM2.5 levels 3x normal', preparation: 'Stock up on inhalers, prepare respiratory isolation beds' },
    { time: '16:00', patients: 87, reason: 'Post-lunch digestive cases', insight: 'Food-related emergencies from festive meals', preparation: 'Gastroenterology team ready for food poisoning cases' },
    { time: '20:00', patients: 65, reason: 'Evening festivities', insight: 'Firework injuries and alcohol-related incidents', preparation: 'Trauma team on high alert, toxicology ready' }
  ];

  const chartData = data || mockSurgeData;

  // === 0-based Y-axis scaling ===
  const minPatients = 0;
  const maxPatients = Math.max(...chartData.map(d => d.patients));
  const yAxisStep = Math.ceil(maxPatients / 5);

  const peakSurge = chartData.reduce((max, current) =>
    current.patients > max.patients ? current : max
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Patient Surge Predictions</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live AI Predictions</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end mb-6">
        {/* Y Axis */}
        <div className="flex flex-col justify-between pr-3 text-xs text-gray-400 font-medium h-full">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>{Math.round(yAxisStep * (5 - i))}</span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-between h-full space-x-3 relative">
          {chartData.map((point, index) => {
            const heightPercent = Math.min(((point.patients / maxPatients) * 100) * 1.3, 100); // boosted scaling
            const color =
              point.reason.includes('Diwali') ? 'from-red-400 to-red-600' :
              point.patients > 80 ? 'from-orange-400 to-orange-600' :
              'from-blue-400 to-blue-600';

            return (
              <div key={index} className="flex flex-col items-center group relative">
                <div
                  className={`w-6 sm:w-8 rounded-t-xl bg-gradient-to-t ${color} shadow-md hover:shadow-lg transition-all duration-300`}
                  style={{ height: `${Math.max(heightPercent, 5)}%`, minHeight: '5px' }}
                  title={`${point.time}: ${point.patients} patients - ${point.reason}`}
                ></div>
                <span className="text-xs text-gray-700 mt-2 font-medium">{point.time}</span>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {`${point.patients} pts - ${point.reason}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peak Surge */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl mb-5 border-l-4 border-red-500 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Surge Breakdown */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-800">Surge Breakdown:</h4>
        {chartData.slice(-3).map((point, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  point.reason.includes('Diwali') ? 'bg-red-500' :
                  point.patients > 80 ? 'bg-orange-500' : 'bg-blue-500'
                }`}
              ></span>
              <span className="text-gray-600">{point.time}:</span>
              <span className="font-medium">{point.reason}</span>
            </div>
            <span className="font-semibold text-gray-800">{point.patients} pts</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center text-sm">
        <span className="text-gray-600">Next 24h Prediction:</span>
        <span className="font-semibold text-blue-600">
          {chartData.reduce((sum, p) => sum + p.patients, 0)} total patients expected
        </span>
      </div>
    </div>
  );
};

export default SurgeGraph;
