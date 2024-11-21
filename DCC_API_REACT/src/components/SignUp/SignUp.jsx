// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useUser } from "../Global/UserContext";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     photo: null, // Add photo field
//   });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const { login } = useUser();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, photo: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(""); // Clear previous messages

//     // Prepare form data to include the image file and other user details
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("phone", formData.phone);
//     data.append("address", formData.address);
//     data.append("password", formData.password);
//     if (formData.photo) {
//       data.append("photo", formData.photo); // Append file if selected
//     }

//     try {
//       const response = await axios.post("https://localhost:7157/api/User/signup", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200) {
//         setMessage("Successfully signed up! Redirecting to login...");
//         setShowModal(true);
//         setTimeout(() => {
//           setShowModal(false);
//           navigate("/signin");
//         }, 2000);
//       } else {
//         throw new Error(response.data.message || "Signup failed");
//       }
//     } catch (error) {
//       setMessage("Signup failed. Please try again.");
//       setShowModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//       }}
//     >
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Your Account</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleInputChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="file"
//             name="photo"
//             onChange={handleFileChange}
//             className="w-full mb-4"
//           />
//           {message && <p className="text-red-500 text-center mb-4">{message}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-gray-500 mt-4">
//           Already a user?{" "}
//           <Link to="/signin" className="text-blue-500 hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{message}</h3>
//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Global/UserContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    photo: null, // Add photo field
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    // Prepare form data to include the image file and other user details
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("password", formData.password);
    if (formData.photo) {
      data.append("photo", formData.photo); // Append file if selected
    }

    try {
      const response = await axios.post("https://localhost:7157/api/User/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setMessage("Successfully signed up! Redirecting to login...");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/signin");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Signup failed. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
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
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
                  <label className="block mb-2 text-gray-700">Choose a Profile Picture:</label>

          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full mb-4"
          />
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already a user?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Modal */}
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

export default SignUp;
