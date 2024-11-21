// import React, { useState } from 'react';
// import PostStory from './PostStory';
// import HandlePost from './HandlePost';
// import UserProfile from './UserProfile';
// import ViewEvents from './ViewEvents';
// import { useUser } from '../Global/UserContext'; // Import the useUser custom hook
// import { FaPlus, FaClipboard, FaUser, FaCalendar, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

// const UserDashboard = () => {
//   const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current view
//   const { user, userRole } = useUser(); // Access user and userRole from context
//   const [sidebarOpen, setSidebarOpen] = useState(true); // State for sidebar visibility

//   // Function to render the correct component based on the current view
//   const renderView = () => {
//     switch (currentView) {
//       case 'create-post':
//         return <PostStory />;
//       case 'handle-post':
//         return (
//           <HandlePost 
//             isAdmin={userRole === 'admin'} // Conditionally pass isAdmin prop based on userRole
//             userId={user ? user.id : null}  // Pass userId if user exists
//           />
//         );
//       case 'user-profile':
//         return <UserProfile />;
//       case 'view-events':
//         return <ViewEvents />;
//       default:
//         return (
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">User Dashboard</h2>
//             <p className="text-gray-500 mt-2">Please select an option from the sidebar.</p>
//           </div>
//         );
//     }
//   };

//   // Menu items for user navigation
//   const menuItems = [
//     { label: 'Create Post', view: 'create-post', icon: <FaPlus /> },
//     { label: 'Handle Posts', view: 'handle-post', icon: <FaClipboard /> },
//     { label: 'User Profile', view: 'user-profile', icon: <FaUser /> },
//     { label: 'View Events/Rides', view: 'view-events', icon: <FaCalendar /> },
//   ];

//   const handleMenuClick = (view) => {
//     setCurrentView(view);
//     setSidebarOpen(false); // Collapse the sidebar on menu item click
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       <div
//         className={`fixed z-20 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } transition-transform duration-300 ease-in-out w-64 bg-blue-600 text-white shadow-lg`}
//       >
//         <div className="flex items-center justify-between p-4">
//           <h2 className="text-xl font-bold">User Panel</h2>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-white focus:outline-none md:hidden"
//           >
//             {sidebarOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//         <nav className="mt-6">
//           {menuItems.map(({ label, view, icon }) => (
//             <button
//               key={view}
//               onClick={() => handleMenuClick(view)} // Use the handler
//               className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 transform hover:bg-blue-500 focus:outline-none ${currentView === view ? 'bg-blue-500' : 'bg-blue-600'
//                 }`}
//             >
//               <span className="mr-3">{icon}</span>
//               <span className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>{label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Content Area */}
//       <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
//         {/* Header */}
//         <header className="flex items-center justify-between bg-white shadow p-4 md:hidden">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-blue-600 focus:outline-none"
//           >
//             <FaBars size={24} />
//           </button>
//           <h2 className="text-xl font-semibold">User Dashboard</h2>
//         </header>

//         {/* Main Content */}
//         <main className="flex-grow p-6 transition-all duration-200">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             {renderView()}
//           </div>
//         </main>

//         {/* Toggle Sidebar Button for when sidebar is hidden */}
//         {!sidebarOpen && (
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="fixed z-30 bottom-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-lg transition-transform duration-200 hover:bg-blue-500 focus:outline-none"
//           >
//             <FaBars />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



//000000000000000000000000000000000000000000000000000000000000000000000000000
import React, { useState } from 'react';
import PostStory from './PostStory';
import HandlePost from './HandlePost';
import UserProfile from './UserProfile';
import ViewEvents from './ViewEvents';
import { useUser } from '../Global/UserContext';
import { FaPlus, FaClipboard, FaUser, FaCalendar, FaBars, FaTimes } from 'react-icons/fa';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const { user, userRole, notify } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'create-post':
        return <PostStory />;
      case 'handle-post':
        return (
          <HandlePost
            isAdmin={userRole === 'admin'}
            userId={user ? user.id : null}
          />
        );
      case 'user-profile':
        return <UserProfile notify={notify} />;
      case 'view-events':
        return <ViewEvents />;
      default:
        return (
          <div className="text-center p-4">
            <h2 className="text-2xl font-semibold break-words max-w-full">
              Welcome to the User Dashboard
            </h2>
            <p className="text-gray-400 mt-2 break-words max-w-full">
              Please select an option from the sidebar to explore.
            </p>
          </div>
        );
    }
  };

  const menuItems = [
    { label: 'Create Post', view: 'create-post', icon: <FaPlus /> },
    { label: 'Handle Posts', view: 'handle-post', icon: <FaClipboard /> },
    { label: 'User Profile', view: 'user-profile', icon: <FaUser /> },
    { label: 'View Events/Rides', view: 'view-events', icon: <FaCalendar /> },
  ];

  const handleMenuClick = (view) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="relative flex min-h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-64 bg-gray-950 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 pt-20">
          <h2 className="text-xl font-bold text-gray-100">User Panel</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map(({ label, view, icon }) => (
            <button
              key={view}
              onClick={() => handleMenuClick(view)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 transform hover:bg-orange-500 focus:outline-none ${
                currentView === view ? 'bg-gray-600' : 'bg-gray-950'
              }`}
            >
              <span className="mr-3">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          sidebarOpen ? 'sm:ml-64' : 'ml-0'
        } transition-all duration-700 overflow-hidden`}
      >
        <header className="sticky top-0 flex items-center justify-between p-4 text-white shadow-md z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-black bg-white rounded-md hover:bg-orange-300"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-xl font-semibold">User Dashboard</h1>
        </header>

        <main className="flex-grow p-6 overflow-auto">
          <div className="rounded-lg shadow-lg text-white p-6">{renderView()}</div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

