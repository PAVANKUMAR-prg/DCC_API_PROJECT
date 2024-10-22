import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { useUser } from "../Global/UserContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const { login } = useUser(); // Destructure login function from context
  const navigate = useNavigate(); // Get the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7157/api/User/signin",
        formData
      );
      const user = response.data.user;

      if (user) {
        // Update context with user details
        login(user);

        // Set success message and show modal
        setMessage(`Successfully logged in as ${user.role}.`);
        setShowModal(true);

        // Close the modal after 3 seconds and redirect
        setTimeout(() => {
          setShowModal(false);
          // Redirect user based on their role
          if (user.role === "Admin") {
            navigate("/admin-dashboard"); // Redirect to admin dashboard
          } else {
            navigate("/"); // Redirect to user dashboard or post story page
          }
        }, 2000);
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      setMessage("Login failed. Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">{message}</p>

        <p className="text-center text-gray-500 mt-4">
          New user?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Modal- pop up message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{message}</h3>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
