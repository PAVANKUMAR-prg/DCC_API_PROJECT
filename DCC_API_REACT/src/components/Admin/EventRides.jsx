import React, { useState } from 'react';
import axios from 'axios';
import ViewEvents from '../User/ViewEvents'; // Import the ViewEvents component

const EventRides = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewMode, setViewMode] = useState(''); // Toggle between "create" and "view"
  const [isAdmin, setIsAdmin] = useState(true); // Assuming this is how you determine if the user is admin

  const baseUrl = "https://localhost:7157"; // Base URL of your API

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      // Create new event
      await axios.post(`${baseUrl}/api/RidingEvents/PostRideEvents`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Event created successfully!');

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        maxParticipants: '',
        imageFile: null,
      });
    } catch (error) {
      setError('Error submitting event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-lg font-semibold mb-4">Event Management</h3>
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setViewMode('view')} 
          className="bg-gray-500 text-white rounded-lg px-4 py-2"
        >
          View All Events
        </button>
        <button 
          onClick={() => setViewMode('create')} 
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Create Event
        </button>
      </div>

      {/* Display create event form if "Create Event" is clicked */}
      {viewMode === 'create' && (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Event Title" 
            required 
            className="border mb-4 p-2 w-full"
          />
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Event Description" 
            required 
            className="border mb-4 p-2 w-full"
          />
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Event Location" 
            required 
            className="border mb-4 p-2 w-full"
          />
          <input 
            type="datetime-local" 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            required 
            className="border mb-4 p-2 w-full"
          />
          <input 
            type="datetime-local" 
            name="endDate" 
            value={formData.endDate} 
            onChange={handleChange} 
            required 
            className="border mb-4 p-2 w-full"
          />
          <input 
            type="number" 
            name="maxParticipants" 
            value={formData.maxParticipants} 
            onChange={handleChange} 
            placeholder="Max Participants" 
            required 
            className="border mb-4 p-2 w-full"
          />
          <input 
            type="file" 
            name="imageFile" 
            onChange={handleFileChange} 
            accept="image/*" 
            className="border mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4">
            {loading ? 'Saving...' : 'Create Event'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
      )}

      {/* Display the ViewEvents component if "View All Events" is clicked */}
      {viewMode === 'view' && (
        <ViewEvents isAdmin={isAdmin} />
      )}
    </div>
  );
};

export default EventRides;
