// Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../Global/UserContext';//Import useUser hook

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();  // Correctly destructure user
  const userRole = user?.role; // Derive role from user object

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">DCC</div>
          <div className="flex items-center lg:order-2">
            {user ? ( // Check if user exists
              <button
                onClick={handleLogout}
                className="text-black bg-white hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className="text-white hover:bg-blue-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-black bg-white hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Get started
                </NavLink>
              </>
            )}
          </div>
          <div className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-400" : "text-white"
                } hover:text-blue-300`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-400" : "text-white"
                } hover:text-blue-300`
              }
            >
              About
            </NavLink>
            {userRole === "Admin" && (
              <>
                <NavLink
                  to="/admin-dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "text-blue-400" : "text-white"
                    } hover:text-blue-300`
                  }
                >
                  Admin Dashboard
                </NavLink>
              </>
            )}
            {userRole === "User" && (
              <>
                {/* <NavLink
                  to="/poststory"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "text-blue-400" : "text-white"
                    } hover:text-blue-300`
                  }
                >
                  Creat-Post
                </NavLink> */}

                <NavLink
                  to="/user-dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "text-blue-400" : "text-white"
                    } hover:text-blue-300`
                  }
                >
                  User-Dashboard
                </NavLink>
              </>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-400" : "text-white"
                } hover:text-blue-300`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};


export default Header;
