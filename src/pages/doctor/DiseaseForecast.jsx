import React from 'react';

const DiseaseForecast = () => {
  const forecasts = [
    {
      disease: 'Influenza',
      predictedCases: 45,
      confidence: 'High',
      timeframe: 'Next 2 weeks',
      riskLevel: 'Medium',
      preventiveMeasures: [
        'Increase vaccine distribution',
        'Monitor fever clinics',
        'Prepare isolation wards'
      ]
    },
    {
      disease: 'COVID-19 Variants',
      predictedCases: 23,
      confidence: 'Medium',
      timeframe: 'Next month',
      riskLevel: 'Low',
      preventiveMeasures: [
        'Continue vaccination campaigns',
        'Maintain testing capacity',
        'Stock up on antivirals'
      ]
    },
    {
      disease: 'RSV',
      predictedCases: 67,
      confidence: 'High',
      timeframe: 'Next week',
      riskLevel: 'High',
      preventiveMeasures: [
        'Prepare pediatric wards',
        'Increase RSV testing',
        'Educate parents on symptoms'
      ]
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Disease Forecasting</h1>
          <p className="mt-2 text-gray-600">AI-powered predictions for disease outbreaks and patient load</p>
        </div>

        {/* Current Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Predicted Outbreaks</h2>
            <div className="space-y-4">
              {forecasts.map((forecast, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{forecast.disease}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(forecast.riskLevel)}`}>
                        {forecast.riskLevel} Risk
                      </span>
                      <span className={`text-xs font-medium ${getConfidenceColor(forecast.confidence)}`}>
                        {forecast.confidence} Confidence
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>Predicted Cases: <span className="font-medium">{forecast.predictedCases}</span></div>
                    <div>Timeframe: <span className="font-medium">{forecast.timeframe}</span></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Preventive Measures:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {forecast.preventiveMeasures.map((measure, idx) => (
                        <li key={idx}>{measure}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Forecast Accuracy</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Accuracy</span>
                <span className="text-lg font-bold text-green-600">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-gray-600">Influenza</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                  <p className="text-sm text-gray-600">COVID-19</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">78%</p>
                  <p className="text-sm text-gray-600">RSV</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">91%</p>
                  <p className="text-sm text-gray-600">Emergency Cases</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
              <p className="text-sm text-gray-600">January 15, 2024 - 2:30 PM</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                Refresh Forecast
              </button>
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Disease Trends</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <p className="text-gray-500">Interactive trend chart would be displayed here</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Respiratory Infections</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">+15%</p>
              <p className="text-sm text-gray-600">vs last month</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Gastrointestinal</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">-8%</p>
              <p className="text-sm text-gray-600">vs last month</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Cardiovascular</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">+3%</p>
              <p className="text-sm text-gray-600">vs last month</p>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Immediate Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Increase influenza vaccine stock</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Prepare additional isolation rooms</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Update triage protocols</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Train staff on RSV symptoms</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Long-term Planning</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Review seasonal staffing needs</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Update emergency response plans</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Coordinate with public health agencies</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm">Plan community education campaigns</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Generate Action Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseForecast;
