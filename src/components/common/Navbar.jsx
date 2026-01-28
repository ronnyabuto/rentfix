// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardList, FaCog, FaUser } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const isTenant = state.userType === 'tenant';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Rentix</h1>
              <span className="ml-2 text-sm text-gray-500">
                {isTenant ? 'Tenant Portal' : 'Landlord Overview'}
              </span>
            </div>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {isTenant ? (
                <>
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-blue-600"
                  >
                    <FaHome className="mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/reports"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <FaClipboardList className="mr-2" />
                    My Reports
                  </Link>
                  <Link
                    to="/settings"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <FaCog className="mr-2" />
                    Settings
                  </Link>
                </>
              ) : (
                <span className="px-1 pt-1 text-sm font-medium text-gray-700">
                  Real-time status of your property portfolio and maintenance requests
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_USER_TYPE' })}
              className="btn-secondary flex items-center mr-4"
            >
              <FaUser className="mr-2" />
              Switch to {isTenant ? 'Landlord' : 'Tenant'}
            </button>
            
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {state.currentUser.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {state.currentUser.name}
                </p>
                {!isTenant && (
                  <p className="text-xs text-gray-500">Premium Admin</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;