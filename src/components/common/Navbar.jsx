import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CONFIG } from '../../config';
import '../../App.css';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    // Redirect to home page with full reload to avoid login flash
    window.location.href = '/';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    return `/${user.role}`;
  };

  return (
    <nav className="bg-white shadow-lg rounded mb-8 relative z-20">
      <div className="w-full mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg className="w-10 ms-5 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h2 className="h-font text-2xl font-bold text-gray-900 !mt-1">FitFunda AI</h2>
          {isAuthenticated && (
            <ul className="hidden md:flex space-x-8 font-light text-black ml-8">
              <li>
                <Link
                  to={getDashboardPath()}
                  className={`text-lg transition-colors duration-200 ${
                    isActive(getDashboardPath()) ? 'text-black font-semibold' : 'text-black hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={CONFIG.ROUTES.PUBLIC_ADVISORY}
                  className={`text-lg transition-colors duration-200 ${
                    isActive(CONFIG.ROUTES.PUBLIC_ADVISORY) ? 'text-black font-semibold' : 'text-black hover:text-blue-600'
                  }`}
                >
                  Public Advisory
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <span className="px-4 py-2 bg-transparent rounded transition duration-200 flex items-center space-x-1 text-xl">
                 <span className={`font-semibold ${
                   user.role === 'patient' ? 'w text-blue-600 bg-blue-100 px-2 py-1 rounded-full' :
                   user.role === 'doctor' ? 'w text-green-600 bg-green-100 px-2 py-1 rounded-full' :
                   user.role === 'nurse' ? 'w text-purple-600 bg-purple-100 px-2 py-1 rounded-full' :
                   user.role === 'emergency' ? 'w text-red-600 bg-red-100 px-2 py-1 rounded-full' :
                   user.role === 'inventory' ? 'w text-orange-600 bg-orange-100 px-2 py-1 rounded-full' :
                   user.role === 'management' ? 'w text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full' :
                   'text-gray-900'
                 }`}>
                   {user.role.charAt(0).toUpperCase() + user.role.slice(1)} User
                 </span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="bg-white border border-2 border-blue-600 hover:bg-blue-700 !text-blue-600 px-6 py-2 rounded font-semibold transition-all duration-300">Login</a>
            <a href="/register" className="bg-white hover:bg-gray-50 !text-blue-600 px-6 py-2 me-4 rounded font-semibold border-2 border-blue-600 transition-all duration-300">Register</a>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-blue-600 focus:outline-none" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
