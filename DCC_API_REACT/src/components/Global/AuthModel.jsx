// Auth.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Global/UserContext";

const Auth = ({ isSignUp, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = isSignUp
        ? "https://localhost:7157/api/User/signup"
        : "https://localhost:7157/api/User/signin";

      const response = await axios.post(url, formData);

      if (response.status === 200) {
        if (isSignUp) {
          setMessage("Successfully signed up! Redirecting to login...");
          setShowModal(true);

          setTimeout(() => {
            setShowModal(false);
            onClose();
            navigate("/signin");
          }, 2000);
        } else {
          const user = response.data.user;
          login(user);
          setMessage(`Successfully logged in as ${user.role}.`);
          setShowModal(true);

          setTimeout(() => {
            setShowModal(false);
            onClose();
            navigate(user.role === "Admin" ? "/admin-dashboard" : "/");
          }, 2000);
        }
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      setMessage(isSignUp ? "Signup failed. Please try again." : "Login failed. Invalid credentials or server error.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isSignUp ? "Create Your Account" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (isSignUp ? "Signing Up..." : "Logging In...") : isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
