import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const HealthAdvisory = () => {
  const advisories = [
    {
      id: 1,
      title: 'COVID-19 Vaccination Update',
      date: '2024-01-15',
      category: 'Vaccination',
      content: 'New booster shots are now available for eligible patients. Schedule your appointment today.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Flu Season Precautions',
      date: '2024-01-10',
      category: 'Seasonal Health',
      content: 'Flu cases are rising in the community. Get your flu shot and practice good hygiene.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Mental Health Awareness',
      date: '2024-01-05',
      category: 'Mental Health',
      content: 'January is Mental Health Awareness Month. Resources available for support and counseling.',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Health Blogs</h1>
          <p className="w c mt-2 text-gray-600">Stay informed about health updates and recommendations</p>
        </div>

        <div className="space-y-6">
          {advisories.map(advisory => (
            <div key={advisory.id} className="w bg-white rounded-lg shadow-md p-6 w-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{advisory.title}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      advisory.priority === 'high' ? 'w bg-red-100 text-red-800' :
                      advisory.priority === 'medium' ? 'w bg-yellow-100 text-yellow-800' :
                      'w bg-green-100 text-green-800'
                    }`}>
                      {advisory.priority}
                    </span>
                  </div>
                  <div className="w flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>{advisory.category}</span>
                    <span>{new Date(advisory.date).toLocaleDateString()}</span>
                  </div>
                  <p className="w text-gray-700">{advisory.content}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  Learn More
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
          <p className="w text-gray-600 mb-4">
            Subscribe to receive health advisories and important updates directly in your patient portal.
          </p>
          <div className="flex space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAdvisory;
