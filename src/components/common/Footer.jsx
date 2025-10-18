import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../../config';

const Footer = () => {
  return (
    <footer className="mt-3 bg-gray-800 text-white relative overflow-hidden">
      {/* subtle top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-50">Hospital Readiness Platform</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-driven platform for hospital management and emergency response coordination.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-50">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={CONFIG.ROUTES.HOME}
                  className="transition-colors duration-300"
                  style={{ color: '#f9fafb' }}
                  onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                  onMouseLeave={(e) => (e.target.style.color = '#f9fafb')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={CONFIG.ROUTES.ABOUT}
                  className="transition-colors duration-300"
                  style={{ color: '#f9fafb' }}
                  onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                  onMouseLeave={(e) => (e.target.style.color = '#f9fafb')}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={CONFIG.ROUTES.CONTACT}
                  className="transition-colors duration-300"
                  style={{ color: '#f9fafb' }}
                  onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                  onMouseLeave={(e) => (e.target.style.color = '#f9fafb')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Roles Section */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-50">Roles</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Management</li>
              <li>Doctors</li>
              <li>Nurses</li>
              <li>Inventory</li>
              <li>Emergency</li>
              <li>Patients</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-50">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@hospitalreadiness.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Healthcare Ave</li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; 2025 <span className="text-blue-400 font-semibold">AI-Driven Hospital Readiness Platform</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
