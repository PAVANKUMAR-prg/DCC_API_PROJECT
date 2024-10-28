import React, { useState } from 'react';
import UserList from '../Admin/UserList';
import EventRides from '../Admin/EventRides';
import HandlePost from '../User/HandlePost';
import ContactRequests from '../Admin/ContactRequests';
import { FaUsers, FaBiking, FaClipboard, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'user':
        return <UserList />;
      case 'event-rides':
        return <EventRides />;
      case 'handle-post':
        return <HandlePost isAdmin={true} />;
      case 'contact-requests':
        return <ContactRequests />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Welcome to the Admin Dashboard</h2>
            <p className="text-gray-500 mt-2">Please select an option from the sidebar to manage different sections.</p>
          </div>
        );
    }
  };

  const menuItems = [
    { label: 'Handle User', view: 'user', icon: <FaUsers /> },
    { label: 'Event Rides', view: 'event-rides', icon: <FaBiking /> },
    { label: 'Manage Posts', view: 'handle-post', icon: <FaClipboard /> },
    { label: 'Manage Contact Requests', view: 'contact-requests', icon: <FaEnvelope /> },
  ];

  const handleMenuClick = (view) => {
    setCurrentView(view);
    setSidebarOpen(false); // Collapse the sidebar on menu item click
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out w-64 bg-blue-600 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none md:hidden"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map(({ label, view, icon }) => (
            <button
              key={view}
              onClick={() => handleMenuClick(view)} // Use the handler
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 transform hover:bg-blue-500 focus:outline-none ${currentView === view ? 'bg-blue-500' : 'bg-blue-600'
                }`}
            >
              <span className="mr-3">{icon}</span>
              <span className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-600 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6 transition-all duration-200">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderView()}
          </div>
        </main>

        {/* Toggle Sidebar Button for when sidebar is hidden */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed z-30 bottom-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-lg transition-transform duration-200 hover:bg-blue-500 focus:outline-none"
          >
            <FaBars />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
