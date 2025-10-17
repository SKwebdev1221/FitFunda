import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../../config';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h2>
            <p className="mt-2 text-sm text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div>
            <Link
              to={CONFIG.ROUTES.HOME}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
