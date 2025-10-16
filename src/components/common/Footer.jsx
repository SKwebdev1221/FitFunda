import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../../config';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hospital Readiness Platform</h3>
            <p className="text-gray-300 text-sm">
              AI-driven platform for hospital management and emergency response coordination.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={CONFIG.ROUTES.HOME} className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to={CONFIG.ROUTES.ABOUT} className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to={CONFIG.ROUTES.CONTACT} className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Roles</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Management</li>
              <li className="text-gray-300">Doctors</li>
              <li className="text-gray-300">Nurses</li>
              <li className="text-gray-300">Inventory</li>
              <li className="text-gray-300">Emergency</li>
              <li className="text-gray-300">Patients</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@hospitalreadiness.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Healthcare Ave</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 AI-Driven Hospital Readiness Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
