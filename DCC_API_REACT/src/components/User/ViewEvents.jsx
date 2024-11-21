// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useUser } from '../Global/UserContext';

// const ViewEvents = () => {
//   const { userRole, user } = useUser();
//   const userId = user.id;

//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     maxParticipants: '',
//     currentParticipants: '',
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   const baseUrl = "https://localhost:7157";

//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseUrl}/api/RidingEvents/GetAllRideEventDetails`);
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setMessage("Error fetching events.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleCardClick = (event) => {
//     setSelectedEvent(event);
//     setFormData({
//       title: event.title,
//       description: event.description,
//       location: event.location,
//       startDate: event.startDate,
//       endDate: event.endDate,
//       maxParticipants: event.maxParticipants,
//       currentParticipants: event.currentParticipants,
//     });
//     setImageFile(null);
//     setMessage("");
//   };

//   const handleBackClick = () => {
//     setSelectedEvent(null);
//     setIsEditing(false);
//     setMessage("");
//   };

//   const handleEditClick = () => {
//     if (userRole === 'Admin') setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key.charAt(0).toUpperCase() + key.slice(1), value);
//     });
//     if (imageFile) formDataToSend.append('imageFile', imageFile);

//     setUpdating(true);
//     try {
//       await axios.put(`${baseUrl}/api/RidingEvents/${selectedEvent.id}`, formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage("Event updated successfully!");
//       fetchEvents();
//       handleBackClick();
//     } catch (error) {
//       console.error("Error updating event:", error.response || error);
//       setMessage("An error occurred while updating the event.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRegister = async (eventId) => {
//     const registrationData = {
//       UserId: userId,
//       EventId: eventId,
//     };

//     try {
//       const response = await fetch(`${baseUrl}/api/RidingEvents/RegisterForEvent`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(registrationData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         setMessage(errorMessage.includes("already registered")
//           ? "You are already registered for this event."
//           : "Registration failed: " + errorMessage);
//       } else {
//         setMessage("Registered successfully!");
//         fetchEvents(); // Reload events to update participant count
//       }
//     } catch (error) {
//       setMessage("Registration failed: " + error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       {loading && <p className="text-blue-500 mb-4">Loading events...</p>}

//       {isEditing ? (
//         <form onSubmit={handleUpdateSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
//           <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
//           {['title', 'description', 'location'].map((field) => (
//             <input
//               key={field}
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleInputChange}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               required
//               className="mb-2 p-2 border rounded w-full"
//             />
//           ))}
//           {['startDate', 'endDate', 'maxParticipants', 'currentParticipants'].map((field) => (
//             <input
//               key={field}
//               type={field.includes('Date') ? 'datetime-local' : 'number'}
//               name={field}
//               value={formData[field]}
//               onChange={handleInputChange}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               required
//               className="mb-2 p-2 border rounded w-full"
//             />
//           ))}
//           <input type="file" onChange={handleImageChange} className="mb-4 p-2 border rounded w-full" />
//           <div className="flex justify-between">
//             <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2" disabled={updating}>Save Changes</button>
//             <button type="button" onClick={handleBackClick} className="text-blue-500 underline">Cancel</button>
//           </div>
//         </form>
//       ) : selectedEvent ? (
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
//           <button onClick={handleBackClick} className="mb-4 text-blue-500 underline">Back to Events</button>
//           <h1 className="text-2xl font-bold mb-4">{selectedEvent.title}</h1>
//           {selectedEvent.imageUrl && (
//             <img src={`${baseUrl}${selectedEvent.imageUrl}`} alt={selectedEvent.title} className="rounded-lg w-full h-48 object-cover mb-4" />
//           )}
//           <p><span className="font-semibold">Description:</span> {selectedEvent.description}</p>
//           <p><span className="font-semibold">Location:</span> {selectedEvent.location}</p>
//           <p><span className="font-semibold">Start Date:</span> {new Date(selectedEvent.startDate).toLocaleString()}</p>
//           <p><span className="font-semibold">End Date:</span> {new Date(selectedEvent.endDate).toLocaleString()}</p>
//           <p><span className="font-semibold">Max Participants:</span> {selectedEvent.maxParticipants}</p>
//           <p><span className="font-semibold">Current Participants:</span> {selectedEvent.currentParticipants}</p>
//           {userRole === 'User' && selectedEvent.currentParticipants < selectedEvent.maxParticipants && (
//             <button onClick={() => handleRegister(selectedEvent.id)} className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4">
//               Register
//             </button>
//           )}
//           {userRole === 'Admin' && (
//             <button onClick={handleEditClick} className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4">Edit Event</button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
//           {events.length > 0 ? events.map(event => (
//             <div key={event.id} onClick={() => handleCardClick(event)} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl cursor-pointer transition duration-300">
//               {event.imageUrl && (
//                 <img src={`${baseUrl}${event.imageUrl}`} alt={event.title} className="rounded-lg w-full h-32 object-cover mb-4" />
//               )}
//               <h2 className="text-xl font-semibold">{event.title}</h2>
//               <p className="text-gray-600">{event.description}</p>
//               <p className="text-gray-500 mt-1">Location: {event.location}</p>
//               <p className="text-gray-500 mt-1">Start Date: {new Date(event.startDate).toLocaleString()}</p>
//             </div>
//           )) : (
//             <p>No events available</p>
//           )}
//         </div>
//       )}

//       {/* Display message below the card */}
//       {message && (
//         <p className="text-center text-green-500 font-semibold mt-4 mb-6">
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ViewEvent

//=========================================================================================

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useUser } from '../Global/UserContext';

// const ViewEvents = () => {
//   const { userRole, user } = useUser();
//   const userId = user.id;

//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     maxParticipants: '',
//     currentParticipants: '',
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   const baseUrl = "https://localhost:7157";

//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseUrl}/api/RidingEvents/GetAllRideEventDetails`);
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setMessage("Error fetching events.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleCardClick = (event) => {
//     setSelectedEvent(event);
//     setFormData({
//       title: event.title,
//       description: event.description,
//       location: event.location,
//       startDate: event.startDate,
//       endDate: event.endDate,
//       maxParticipants: event.maxParticipants,
//       currentParticipants: event.currentParticipants,
//     });
//     setImageFile(null);
//     setMessage("");
//   };

//   const handleBackClick = () => {
//     setSelectedEvent(null);
//     setIsEditing(false);
//     setMessage("");
//   };

//   const handleEditClick = () => {
//     if (userRole === 'Admin') setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key.charAt(0).toUpperCase() + key.slice(1), value);
//     });
//     if (imageFile) formDataToSend.append('imageFile', imageFile);

//     setUpdating(true);
//     try {
//       await axios.put(`${baseUrl}/api/RidingEvents/${selectedEvent.id}`, formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage("Event updated successfully!");
//       fetchEvents();
//       handleBackClick();
//     } catch (error) {
//       console.error("Error updating event:", error.response || error);
//       setMessage("An error occurred while updating the event.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRegister = async (eventId) => {
//     const registrationData = {
//       UserId: userId,
//       EventId: eventId,
//     };

//     try {
//       const response = await fetch(`${baseUrl}/api/RidingEvents/RegisterForEvent`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(registrationData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         setMessage(errorMessage.includes("already registered")
//           ? "You are already registered for this event."
//           : "Registration failed: " + errorMessage);
//       } else {
//         setMessage("Registered successfully!");
//         fetchEvents(); // Reload events to update participant count
//       }
//     } catch (error) {
//       setMessage("Registration failed: " + error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen space-y-6">
//       {loading && <p className="text-blue-500">Loading events...</p>}

//       {isEditing ? (
//         <form onSubmit={handleUpdateSubmit} className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full space-y-4">
//           <h1 className="text-3xl font-bold text-center text-green-500">Edit Event</h1>
//           {['title', 'description', 'location'].map((field) => (
//             <input
//               key={field}
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleInputChange}
//               placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
//               required
//               className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white"
//             />
//           ))}
//           {['startDate', 'endDate', 'maxParticipants', 'currentParticipants'].map((field) => (
//             <input
//               key={field}
//               type={field.includes('Date') ? 'datetime-local' : 'number'}
//               name={field}
//               value={formData[field]}
//               onChange={handleInputChange}
//               required
//               className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white"
//             />
//           ))}
//           <input type="file" onChange={handleImageChange} className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
//           <div className="flex justify-between">
//             <button type="submit" className="bg-green-500 text-white rounded px-6 py-2" disabled={updating}>Save Changes</button>
//             <button type="button" onClick={handleBackClick} className="text-gray-400 underline">Cancel</button>
//           </div>
//         </form>
//       ) : selectedEvent ? (
//         <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full">
//           <button onClick={handleBackClick} className="text-blue-400 underline mb-4">Back to Events</button>
//           <h1 className="text-3xl font-semibold text-center text-green-500">{selectedEvent.title}</h1>
//           {selectedEvent.imageUrl && (
//             <img src={`${baseUrl}${selectedEvent.imageUrl}`} alt={selectedEvent.title} className="rounded-lg w-full h-56 object-cover my-4" />
//           )}
//           <p><span className="font-semibold">Description:</span> {selectedEvent.description}</p>
//           <p><span className="font-semibold">Location:</span> {selectedEvent.location}</p>
//           <p><span className="font-semibold">Start Date:</span> {new Date(selectedEvent.startDate).toLocaleString()}</p>
//           <p><span className="font-semibold">End Date:</span> {new Date(selectedEvent.endDate).toLocaleString()}</p>
//           <p><span className="font-semibold">Max Participants:</span> {selectedEvent.maxParticipants}</p>
//           <p><span className="font-semibold">Current Participants:</span> {selectedEvent.currentParticipants}</p>
//           {userRole === 'User' && selectedEvent.currentParticipants < selectedEvent.maxParticipants && (
//             <button onClick={() => handleRegister(selectedEvent.id)} className="bg-green-500 text-white rounded px-6 py-2 mt-4 w-full">
//               Register for Event
//             </button>
//           )}
//           {userRole === 'Admin' && (
//             <button onClick={handleEditClick} className="bg-yellow-500 text-white rounded px-6 py-2 mt-4 w-full">
//               Edit Event
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.length > 0 ? events.map(event => (
//             <div
//               key={event.id}
//               className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-200"
//               onClick={() => handleCardClick(event)}
//             >
//               <h2 className="text-xl font-semibold text-green-500">{event.title}</h2>
//               {event.imageUrl && (
//                 <img src={`${baseUrl}${event.imageUrl}`} alt={event.title} className="rounded-lg w-full h-40 object-cover my-2" />
//               )}
//               <p className="text-gray-400 text-sm">{event.location}</p>
//               <p className="text-gray-500 text-xs">Starts: {new Date(event.startDate).toLocaleString()}</p>
//             </div>
//           )) : (
//             <p>No events found.</p>
//           )}
//         </div>
//       )}
//       {message && <p className="text-yellow-400">{message}</p>}
//     </div>
//   );
// };

// export default ViewEvents;

//-----------------------------------------------------------------

//enhanced ui-------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../Global/UserContext";
import { toast } from "react-toastify";

const ViewEvents = () => {
  const { userRole, user } = useUser();
  const userId = user.id;

  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventParticipants, setEventParticipants] = useState({});
  const [showParticipants, setShowParticipants] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [editingEvent, setEditingEvent] = useState(null); // For tracking the event being edited
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    maxParticipants: "",
    currentParticipants: "",
    photo: null,

  });

  const baseUrl = "https://localhost:7157";

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/RidingEvents/GetAllRideEventDetails`
      );
      setEvents(response.data);

      const participantsData = {};
      for (const event of response.data) {
        const participantsResponse = await axios.get(
          `${baseUrl}/api/RidingEvents/GetEventParticipants/${event.id}`
        );
        participantsData[event.id] = participantsResponse.data;
      }
      setEventParticipants(participantsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setMessage("Error fetching events.");
      toast.error("Error fetching events!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    const registrationData = {
      UserId: userId,
      EventId: eventId,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/RidingEvents/RegisterForEvent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationData),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        setMessage(errorMessage);
        toast.error(
          errorMessage.includes("already registered")
            ? "You are already registered for this event."
            : "Registration failed."
        );
      } else {
        setMessage("Registered successfully!");
        toast.success("Registered successfully!");
        fetchEvents();
      }
    } catch (error) {
      setMessage("Registration failed: " + error.message);
      toast.error("Registration failed!");
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: new Date(event.startDate).toISOString().slice(0, 16), // For datetime-local input
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      maxParticipants: event.maxParticipants,
      currentParticipants: event.currentParticipants,
      photo:null
    });
    setEditingEvent(event.id); // Keep track of the event being edited
  };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "photo" ? files[0] : value,
    }));
  };
  
  // Submit updated event
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Title', eventData.title); // Ensure eventData.title is correctly set
    formData.append('Description', eventData.description); // Ensure eventData.description is correctly set
    formData.append('StartDate', eventData.startDate); // Ensure eventData.startDate is in correct format
    formData.append('EndDate', eventData.endDate); // Ensure eventData.endDate is in correct format
    formData.append('Location', eventData.location); // Ensure eventData.location is correctly set
    formData.append('MaxParticipants', eventData.maxParticipants); // Ensure eventData.maxParticipants is correctly set
    formData.append('CurrentParticipants', eventData.currentParticipants); // Ensure eventData.currentParticipants is correctly set
    formData.append('OrganizerId', eventData.organizerId); // Ensure eventData.organizerId is correctly set

    // Optional fields
    if (eventData.createdBy) formData.append('CreatedBy', eventData.createdBy);
    if (eventData.updatedBy) formData.append('UpdatedBy', eventData.updatedBy);

    // Handle Image upload if it exists
    if (eventData.imageFile) {
        formData.append('ImageFile', eventData.imageFile);
    }

    // Log the formData to see the contents
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await axios.put(
            `https://localhost:7157/api/RidingEvents/${eventData.id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify that the request contains form data
                },
            }
        );
        console.log('Event updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating event:', error.response?.data || error.message);
    }
};


  

  const toggleParticipantsVisibility = (eventId) => {
    setShowParticipants((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const getEventStatus = (startDate, endDate) => {
    const currentDate = new Date();
    if (currentDate < new Date(startDate)) return "Upcoming";
    if (currentDate > new Date(endDate)) return "Completed";
    return "Ongoing";
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-black text-white min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Cycling Events
      </h1>
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}
      {!loading && events.length === 0 && (
        <p className="text-center text-lg text-gray-400">
          No events available at the moment.
        </p>
      )}
      <div className="space-y-10">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row items-start gap-8 bg-black border-t p-6 rounded-xl shadow-lg"
          >
            {event.imageUrl && (
              <img
                src={`${baseUrl}${event.imageUrl}`}
                alt={event.title}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
              />
            )}

            <div className="flex flex-col items-start space-y-4 md:w-1/2">
              <h2 className="text-3xl font-bold text-orange-500">
                {event.title}
              </h2>
              <p className="font-semibold text-white">
                Description: {event.description}
              </p>
              <p className="font-semibold text-white">
                Location: {event.location}
              </p>
              <p className="font-semibold text-white">
                Start Date: {new Date(event.startDate).toLocaleString()}
              </p>
              <p className="font-semibold text-white">
                End Date: {new Date(event.endDate).toLocaleString()}
              </p>
              <p className="font-semibold text-white">
                Max Participants: {event.maxParticipants}
              </p>
              <p className="font-semibold text-white">
                Current Participants: {event.currentParticipants}
              </p>
              <p className="font-semibold text-green-500">
                Status: {getEventStatus(event.startDate, event.endDate)}
              </p>

              <div className="flex gap-4 mt-4">
                {userRole === "User" &&
                  event.currentParticipants < event.maxParticipants && (
                    <button
                      onClick={() => handleRegister(event.id)}
                      className="bg-orange-500 text-white font-semibold rounded px-6 py-2 hover:bg-orange-600 transition-colors"
                    >
                      Register for Event
                    </button>
                  )}
                {userRole === "Admin" && (
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-orange-500 text-white font-semibold rounded px-6 py-2 hover:bg-orange-600 transition-colors"
                  >
                    Edit Event
                  </button>
                )}
                {eventParticipants[event.id] && (
                  <button
                    onClick={() => toggleParticipantsVisibility(event.id)}
                    className="bg-orange-500 text-white font-semibold rounded px-6 py-2 hover:bg-orange-600 transition-colors"
                  >
                    {showParticipants[event.id] ? "Hide Users" : "See Users"}
                  </button>
                )}
              </div>

              {showParticipants[event.id] && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-orange-500">
                    Registered Participants:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {eventParticipants[event.id]?.map((participant) => (
                      <div
                        key={participant.UserId}
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={`https://localhost:7157${participant.photoPath}`}
                          alt={participant.Name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <p className="text-white">{participant.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form>
              <label className="block mb-2 font-semibold">
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Start Date:
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                End Date:
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Max Participants:
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <label className="block mb-2 font-semibold">
                Current Participants:
                <input
                  type="number"
                  name="currentParticipants"
                  value={formData.currentParticipants}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded p-2"
                />
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleInputChange}
                accept="image/*"
                className="mt-1 w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="bg-gray-400 text-white font-semibold rounded px-4 py-2 hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="bg-orange-500 text-white font-semibold rounded px-4 py-2 hover:bg-orange-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-10">
        {Array.from({
          length: Math.ceil(events.length / eventsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewEvents;
