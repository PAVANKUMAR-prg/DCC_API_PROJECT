// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useUser } from "../Global/UserContext";

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const { login } = useUser();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://localhost:7157/api/User/signin",
//         formData
//       );
//       const user = response.data.user;

//       if (user) {
//         login(user);
//         setMessage(`Successfully logged in as ${user.role}.`);
//         setShowModal(true);

//         setTimeout(() => {
//           setShowModal(false);
//           if (user.role === "Admin") {
//             navigate("/admin-dashboard");
//           } else {
//             navigate("/");
//           }
//         }, 2000);
//       } else {
//         setMessage("Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Login failed. Invalid credentials or server error.");
//     }
//   };

//   return (
//     <div
//       className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//       }}
//     >
//       {/* Overlay with opacity */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div className="relative z-10 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
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
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center text-gray-500 mt-4">{message}</p>

//         <p className="text-center text-gray-500 mt-4">
//           New user?{" "}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               {message}
//             </h3>
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

// export default SignIn;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Global/UserContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

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
      // console.log(response);
      console.log(response.data.token);
      
      
      const { user, token } = response.data; // Assuming response includes user and token
  
      if (user && token) {
        login(user, token); // Update to pass both user and token
        setMessage(`Successfully logged in as ${user.role}.`);
        setShowModal(true);
  
        setTimeout(() => {
          setShowModal(false);
          if (user.role === "Admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }, 2000);
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Invalid credentials or server error.");
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {message}
            </h3>
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
