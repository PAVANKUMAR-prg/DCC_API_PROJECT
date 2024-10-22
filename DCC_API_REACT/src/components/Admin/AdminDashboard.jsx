import React, { useState } from 'react';
import UserList from '../Admin/UserList'; // Assuming you have a UserList component
import EventRides from '../Admin/EventRides'; // Placeholder for future functionality
import HandlePost from '../User/HandlePost'; // Correct import for HandlePost component

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current view

  // Function to render the correct component based on current view
  const renderView = () => {
    switch (currentView) {
      case 'user':
        return <UserList />;
      case 'event-rides':
        return <EventRides />;
      case 'handle-post':
        return <HandlePost isAdmin={true} />; // Corrected component name
      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <div className="mt-4">
              <button
                onClick={() => setCurrentView('user')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                Handle User
              </button>
              <button
                onClick={() => setCurrentView('event-rides')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                Event Rides
              </button>
              <button
                onClick={() => setCurrentView('handle-post')} // Ensure it's "handle-post" here to match the switch case
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                Manage Posts
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {currentView !== 'dashboard' && (
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
        >
          Back to Admin Dashboard
        </button>
      )}
      {renderView()}
    </div>
  );
};

export default AdminDashboard;
