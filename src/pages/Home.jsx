import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-lg rounded-lg mx-4 mb-8 relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">FitFunda AI</h2>
          </div>
          <div className="flex space-x-4">
            <Link
              to={CONFIG.ROUTES.LOGIN}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to={CONFIG.ROUTES.SIGNUP}
              className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-2 rounded-lg font-semibold border-2 border-blue-600 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            AI-Driven Hospital Readiness Platform
          </h1>
          <p className="w text-gray-600 w-full mb-10 animate-fade-in-up animation-delay-300">
            A comprehensive system for hospitals to visualize patient surge predictions,
            manage staff readiness, monitor supplies, and coordinate emergency responses.
          </p>
          <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-600">
            <Link
              to={CONFIG.ROUTES.LOGIN}
              className="text-white px-10 py-4 rounded-xl border border-blue bg-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Login
            </Link>
            <Link
              to={CONFIG.ROUTES.SIGNUP}
              className="bg-white hover:bg-gray-50 text-blue-600 px-10 py-4 rounded-xl font-semibold border-2 border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="w-full grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Real-time Analytics</h3>
            <p className="w text-gray-600">
              Monitor patient surges, bed availability, and resource utilization with live dashboards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Staff Management</h3>
            <p className="w text-gray-600">
              Optimize staff allocation and scheduling based on AI predictions and current needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Emergency Response</h3>
            <p className="w text-gray-600">
              Coordinate rapid response during critical situations with inter-hospital communication.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Role-Based Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Management', icon: '🏥' },
              { role: 'Doctors', icon: '👨‍⚕️' },
              { role: 'Nurses', icon: '👩‍⚕️' },
              { role: 'Inventory', icon: '📦' },
              { role: 'Emergency', icon: '🚑' },
              { role: 'Patients', icon: '🏠' }
            ].map(({ role, icon }) => (
              <div key={role} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <h3 className="font-semibold text-gray-900">{role}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 AI-Driven Hospital Readiness Platform. All rights reserved.</p>
            <p className="text-sm">Empowering healthcare with intelligent solutions for better patient outcomes.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
