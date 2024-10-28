import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactRequests = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contact requests from the API
  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await axios.get('https://localhost:7157/api/Contact/GetAllContactRequests');
        setContactRequests(response.data);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactRequests();
  }, []);

  // Function to mark a contact request as reviewed
  const markAsReviewed = async (id) => {
    try {
      await axios.put(`https://localhost:7157/api/Contact/ReviewRequest/${id}`);
      setContactRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, isReviewed: true, reviewedDate: new Date() } : req
        )
      );
    } catch (error) {
      console.error("Error marking request as reviewed:", error);
    }
  };

  // Function to delete a contact request with confirmation
  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7157/api/Contact/DeleteRequest/${id}`);
      setContactRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  if (loading) {
    return <p>Loading contact requests...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Contact Requests</h2>
      <ul>
        {contactRequests.map(({ id, firstName, lastName, email, message, isReviewed, reviewedDate }) => (
          <li key={id} className="p-4 border-b border-gray-200">
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong> {message}</p>
            <p><strong>Status:</strong> {isReviewed ? "Reviewed" : "Pending"}</p>
            {isReviewed && (
              <p><strong>Reviewed On:</strong> {new Date(reviewedDate).toLocaleDateString()}</p>
            )}
            <div className="mt-4 flex space-x-2">
              {!isReviewed && (
                <button
                  onClick={() => markAsReviewed(id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Mark as Reviewed"
                >
                  Mark as Reviewed
                </button>
              )}
              <button
                onClick={() => deleteRequest(id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Delete Request"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactRequests;
