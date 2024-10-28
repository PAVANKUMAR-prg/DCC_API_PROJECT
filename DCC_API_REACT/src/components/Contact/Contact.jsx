import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the payload with the additional fields
    const payload = {
      ...form,
      isReviewed: false,
      reviewedDate: new Date().toISOString(), // Current date and time in ISO format
      reviewedBy: "", // Assuming initially empty
    };
  
    try {
      const response = await fetch('https://localhost:7157/api/Contact/PostContactDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setSuccessMessage('Form submitted successfully!');
        setErrorMessage('');
        setForm({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to submit: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    }
  };
  

  return (
    <div className="flex justify-between items-center min-h-screen bg-gray-50 p-10">
      {/* Left Side Text */}
      <div className="w-1/2 pr-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Need to get in touch with us? Either fill out the form with your inquiry or find the department email you'd like to contact below.
        </p>

        {/* Social Media Links */}
        <div className="mt-4">
          <h2 className="text-gray-600 font-semibold mb-4">Follow us on</h2>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-1/3 bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="firstName">
                First name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="lastName">
                Last name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="message">
              What can we help you with?
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Contact;
