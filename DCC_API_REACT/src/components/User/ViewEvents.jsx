import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Global/UserContext';

const ViewEvents = () => {
  const { userRole } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    currentParticipants: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  const baseUrl = "https://localhost:7157";

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/RidingEvents/GetAllRideEventDetails`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setMessage("Error fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate,
      maxParticipants: event.maxParticipants,
      currentParticipants: event.currentParticipants,
    });
    setImageFile(null);
    setMessage(""); // Clear message on event selection
  };

  const handleBackClick = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setMessage(""); // Clear message on back click
  };

  const handleEditClick = () => {
    if (userRole === 'Admin') setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key.charAt(0).toUpperCase() + key.slice(1), value);
    });
    if (imageFile) formDataToSend.append('imageFile', imageFile);

    setUpdating(true);
    try {
      await axios.put(`${baseUrl}/api/RidingEvents/${selectedEvent.id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage("Event updated successfully!"); // Success message
      fetchEvents();
      handleBackClick();
    } catch (error) {
      console.error("Error updating event:", error.response || error);
      setMessage("An error occurred while updating the event.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {loading && <p className="text-blue-500 mb-4">Loading events...</p>}
      {message && <p className="text-red-500 mb-4">{message}</p>}
      {isEditing ? (
        <form onSubmit={handleUpdateSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
          {['title', 'description', 'location'].map((field) => (
            <input
              key={field}
              type={field === 'description' ? 'textarea' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              className="mb-2 p-2 border rounded w-full"
            />
          ))}
          {['startDate', 'endDate', 'maxParticipants', 'currentParticipants'].map((field) => (
            <input
              key={field}
              type={field.includes('Date') ? 'datetime-local' : 'number'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              className="mb-2 p-2 border rounded w-full"
            />
          ))}
          <input type="file" onChange={handleImageChange} className="mb-4 p-2 border rounded w-full" />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2" disabled={updating}>Save Changes</button>
            <button type="button" onClick={handleBackClick} className="text-blue-500 underline">Cancel</button>
          </div>
        </form>
      ) : selectedEvent ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <button onClick={handleBackClick} className="mb-4 text-blue-500 underline">Back to Events</button>
          <h1 className="text-2xl font-bold mb-4">{selectedEvent.title}</h1>
          {selectedEvent.imageUrl && (
            <img src={`${baseUrl}${selectedEvent.imageUrl}`} alt={selectedEvent.title} className="rounded-lg w-full h-48 object-cover mb-4" />
          )}
          <p><span className="font-semibold">Description:</span> {selectedEvent.description}</p>
          <p><span className="font-semibold">Location:</span> {selectedEvent.location}</p>
          <p><span className="font-semibold">Start Date:</span> {new Date(selectedEvent.startDate).toLocaleString()}</p>
          <p><span className="font-semibold">End Date:</span> {new Date(selectedEvent.endDate).toLocaleString()}</p>
          <p><span className="font-semibold">Max Participants:</span> {selectedEvent.maxParticipants}</p>
          <p><span className="font-semibold">Current Participants:</span> {selectedEvent.currentParticipants}</p>
          <p><span className="font-semibold">Organizer ID:</span> {selectedEvent.organizerId}</p>
          <p><span className="font-semibold">Created By:</span> {selectedEvent.createdBy || 'N/A'}</p>
          <p><span className="font-semibold">Updated By:</span> {selectedEvent.updatedBy || 'N/A'}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(selectedEvent.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">Updated At:</span> {new Date(selectedEvent.updatedAt).toLocaleString()}</p>
          {userRole === 'Admin' && (
            <button onClick={handleEditClick} className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4">Edit Event</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {events.length > 0 ? events.map(event => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg p-4 cursor-pointer" onClick={() => handleCardClick(event)}>
              {event.imageUrl && (
                <img src={`${baseUrl}${event.imageUrl}`} alt={event.title} className="rounded-lg w-full h-32 object-cover mb-4" />
              )}
              <h2 className="font-bold">{event.title}</h2>
              <p>{event.description.substring(0, 100)}...</p>
              <p><span className="font-semibold">Date:</span> {new Date(event.startDate).toLocaleString()}</p>
            </div>
          )) : <p>No events available.</p>}
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
