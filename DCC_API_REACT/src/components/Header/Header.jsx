
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useUser } from '../Global/UserContext'; // Import useUser hook

// const Header = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useUser(); // Correctly destructure user
//   const userRole = user?.role; // Derive role from user object
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

//   const handleLogout = () => {
//     logout();
//     navigate('/signin');
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev); // Toggle the menu state
//   };

//   return (
//     <header className="shadow-md sticky top-0 z-50 bg-white">
//       <nav className="bg-black p-4 text-black">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Logo */}
//           <div className="text-orange-600 font-bold text-xl">
//             Davanagere Cycling Club
//           </div>

//           {/* Navigation Links and Buttons */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
//               }
//             >
//               About
//             </NavLink>
//             {userRole === 'Admin' && (
//               <NavLink
//                 to="/admin-dashboard"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
//                 }
//               >
//                 Admin Dashboard
//               </NavLink>
//             )}
//             {userRole === 'User' && (
//               <NavLink
//                 to="/user-dashboard"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
//                 }
//               >
//                 User Dashboard
//               </NavLink>
//             )}
//             <NavLink
//               to="/contact"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
//               }
//             >
//               Contact
//             </NavLink>

//             {/* Login and Signup Buttons */}
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-black bg-white hover:bg-orange-300 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <NavLink
//                   to="/signin"
//                   className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
//                 >
//                   Log in
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="text-black bg-white hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
//                 >
//                   Get started
//                 </NavLink>
//               </>
//             )}
//           </div>

//           {/* Hamburger Icon for Mobile Menu */}
//           <button
//             onClick={toggleMenu}
//             className="lg:hidden text-white focus:outline-none"
//             aria-label="Toggle Navigation"
//           >
//             <svg
//               className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//             <svg
//               className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden flex flex-col mt-2 space-y-2">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-300`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-300`
//               }
//             >
//               About
//             </NavLink>
//             {userRole === 'Admin' && (
//               <NavLink
//                 to="/admin-dashboard"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-300`
//                 }
//               >
//                 Admin Dashboard
//               </NavLink>
//             )}
//             {userRole === 'User' && (
//               <NavLink
//                 to="/user-dashboard"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-300`
//                 }
//               >
//                 User Dashboard
//               </NavLink>
//             )}
//             <NavLink
//               to="/contact"
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-300`
//               }
//             >
//               Contact
//             </NavLink>

//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-black bg-white hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <NavLink
//                   to="/signin"
//                   className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
//                 >
//                   Log in
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="text-black bg-white hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
//                 >
//                   Get started
//                 </NavLink>
//               </>
//             )}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;


//----------------------------------------------------------------------------------------------


import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../Global/UserContext'; // Import useUser hook

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Correctly destructure user
  const userRole = user?.role; // Derive role from user object
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu state
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-black">
      <nav className="bg-black p-4 text-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-gradient font-extrabold text-3xl lg:text-4xl text-transparent bg-clip-text bg-orange-600 flex items-center space-x-2">
            {/* You can also add an icon here if you have one */}
            <span>Davanagere Cycling Club</span>
          </div>

          {/* Navigation Links and Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              About
            </NavLink>
            {userRole === 'Admin' && (
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
                }
              >
                Admin Dashboard
              </NavLink>
            )}
            {userRole === 'User' && (
              <NavLink
                to="/user-dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
                }
              >
                User Dashboard
              </NavLink>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              Contact
            </NavLink>

            {/* Login and Signup Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-black bg-white hover:bg-orange-400 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-black bg-white hover:bg-orange-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
                >
                  Get started
                </NavLink>
              </>
            )}
          </div>

          {/* Hamburger Icon for Mobile Menu */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg
              className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg
              className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col mt-2 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              About
            </NavLink>
            {userRole === 'Admin' && (
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
                }
              >
                Admin Dashboard
              </NavLink>
            )}
            {userRole === 'User' && (
              <NavLink
                to="/user-dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
                }
              >
                User Dashboard
              </NavLink>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-orange-400' : 'text-white'} hover:text-orange-300`
              }
            >
              Contact
            </NavLink>

            {user ? (
              <button
                onClick={handleLogout}
                className="text-black bg-white hover:bg-orange-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-black bg-white hover:bg-orange-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 py-2"
                >
                  Get started
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
