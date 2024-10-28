import React, { useEffect, useState } from 'react';
import { useUser } from '../Global/UserContext'; // Adjust the import path as necessary

function UserProfile() {
  const { user } = useUser(); // Get user from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fetch user data from the API using the ID from context
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setError('No user logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://localhost:7157/api/User/GetUserById/${user.id}`); // Ensure the user object has an id property
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userData ? (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">Email: {userData.email}</p>
          <p className="text-gray-600">Phone: {userData.phone}</p>
          <p className="text-gray-600">Address: {userData.address}</p>
          <p className="text-gray-600">Role: {userData.role}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default UserProfile;
