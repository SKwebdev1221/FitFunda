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

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Doctor Testimonial */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Dr. Sarah Johnson</h3>
                <p className="text-sm text-blue-600 mb-3">Cardiologist</p>
                <p className="text-gray-600 text-sm">
                  "This platform has revolutionized how we prepare for patient surges. The AI predictions are incredibly accurate and help us allocate resources efficiently."
                </p>
              </div>

              {/* Patient Testimonial */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Michael Chen</h3>
                <p className="text-sm text-green-600 mb-3">Patient</p>
                <p className="text-gray-600 text-sm">
                  "The hospital's preparedness during the recent surge was outstanding. I received timely care and clear communication throughout my treatment."
                </p>
              </div>

              {/* Nurse Testimonial */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Emily Rodriguez</h3>
                <p className="text-sm text-purple-600 mb-3">Emergency Nurse</p>
                <p className="text-gray-600 text-sm">
                  "The shift scheduling and surge alerts keep our team informed and prepared. It's made our emergency responses much more coordinated and effective."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
