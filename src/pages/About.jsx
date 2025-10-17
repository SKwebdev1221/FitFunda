import React from 'react';
import Navbar from '../components/common/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            About Our Platform
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Mission</h2>
            <p className="text-gray-600 mb-6">
              Our AI-Driven Hospital Readiness Platform empowers healthcare institutions with
              predictive analytics and real-time monitoring to ensure optimal patient care
              during normal operations and emergency situations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Technology</h2>
            <p className="text-gray-600 mb-6">
              Built with modern web technologies including React, Vite, and TailwindCSS,
              our platform provides a responsive and scalable interface for all healthcare roles.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Real-time patient surge predictions</li>
              <li>Staff readiness and allocation management</li>
              <li>Inventory tracking and supply forecasting</li>
              <li>Emergency response coordination</li>
              <li>Role-based access control</li>
              <li>Interactive dashboards and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
