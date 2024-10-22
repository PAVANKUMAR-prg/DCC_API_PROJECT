import React, { useState } from 'react';
import PostStory from './PostStory';
import HandlePost from './HandlePost';
import UserProfile from './UserProfile';
import ViewEvents from './ViewEvents';
import { useUser } from '../Global/UserContext'; // Import the useUser custom hook

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current view
  const { user, userRole } = useUser(); // Access user and userRole from context

  // Function to render the correct component based on the current view
  const renderView = () => {
    switch (currentView) {
      case 'create-post':
        return <PostStory />;
      case 'handle-post':
        return (
          <HandlePost 
            isAdmin={userRole === 'admin'} // Conditionally pass isAdmin prop based on userRole
            userId={user ? user.id : null}  // Pass userId if user exists
          />
        );
      case 'user-profile':
        return <UserProfile />;
      case 'view-events':
        return <ViewEvents />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold">User Dashboard</h2>
            <div className="mt-4">
              <button
                onClick={() => setCurrentView('create-post')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                Create Post
              </button>
              <button
                onClick={() => setCurrentView('handle-post')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                Handle Posts
              </button>
              <button
                onClick={() => setCurrentView('user-profile')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                User Profile
              </button>
              <button
                onClick={() => setCurrentView('view-events')}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
              >
                View Events/Rides
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
          Back to User Dashboard
        </button>
      )}
      {renderView()}
    </div>
  );
};

export default UserDashboard;
