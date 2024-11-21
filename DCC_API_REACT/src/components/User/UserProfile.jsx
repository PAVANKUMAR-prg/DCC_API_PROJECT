// // import React, { useEffect, useState } from 'react';
// // import { useUser } from '../Global/UserContext'; // Adjust the import path as necessary

// // function UserProfile() {
// //   const { user } = useUser(); // Get user from context
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [userData, setUserData] = useState(null);

// //   // Fetch user data from the API using the ID from context
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       if (!user) {
// //         setError('No user logged in');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(`https://localhost:7157/api/User/GetUserById/${user.id}`); // Ensure the user object has an id property
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch user data');
// //         }
// //         const data = await response.json();
// //         setUserData(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUser();
// //   }, [user]);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
// //       {userData ? (
// //         <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
// //           <h2 className="text-xl font-semibold">{userData.name}</h2>
// //           <p className="text-gray-600">Email: {userData.email}</p>
// //           <p className="text-gray-600">Phone: {userData.phone}</p>
// //           <p className="text-gray-600">Address: {userData.address}</p>
// //           <p className="text-gray-600">Role: {userData.role}</p>
// //           <p className="text-gray-600">ImageUrl: {userData.PhotoPath}</p>

// //         </div>
// //       ) : (
// //         <p>No user data available</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default UserProfile;

// import React, { useEffect, useState } from 'react';
// import { useUser } from '../Global/UserContext'; // Adjust the import path as necessary

// function UserProfile() {
//   const { user } = useUser(); // Get user from context
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);

//   // Fetch user data from the API using the ID from context
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!user) {
//         setError('No user logged in');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`https://localhost:7157/api/User/GetUserById/${user.id}`); // Ensure the user object has an id property
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   console.log(userData); // Confirm the entire object is as expected

//   console.log(userData.photoPath); // Check if the URL or path is correct

//   const baseUrl = "https://localhost:7157";


//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       {userData ? (
        
//         <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center">
//           {userData.photoPath && (
//             <img
//               src={`https://localhost:7157${userData.photoPath}`} // Assumes PhotoPath is relative to the API base URL
//               alt="User Profile"
//               className="w-24 h-24 rounded-full mr-4 object-cover"
//             />
            
//           )}
//           <div>
//             <h2 className="text-xl font-semibold">{userData.name}</h2>
//             <p className="text-gray-600">Email: {userData.email}</p>
//             <p className="text-gray-600">Phone: {userData.phone}</p>
//             <p className="text-gray-600">Address: {userData.address}</p>
//             <p className="text-gray-600">Role: {userData.role}</p>
//           </div>
//         </div>
//       ) : (
//         <p>No user data available</p>
//       )}
//     </div>
//   );
// }

// export default UserProfile;



// import React, { useEffect, useState } from 'react';
// import { useUser } from '../Global/UserContext';

// function UserProfile() {
//   const { user } = useUser();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!user) {
//         setError('No user logged in');
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(`https://localhost:7157/api/User/GetUserById/${user.id}`);
//         if (!response.ok) throw new Error('Failed to fetch user data');
//         const data = await response.json();
//         setUserData(data);
//         setUpdatedUser(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [user]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setSuccessMessage("");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setUpdateLoading(true);
//     setError(null);
//     setSuccessMessage("");
//     const formData = new FormData();
//     Object.keys(updatedUser).forEach((key) => formData.append(key, updatedUser[key]));
//     if (imageFile) formData.append('imageFile', imageFile);

//     try {
//       const response = await fetch(`https://localhost:7157/api/User/UpdateUsers/${user.id}`, {
//         method: 'PUT',
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Failed to update user data');
//       const updatedData = await response.json();
//       setUserData(updatedData.user);
//       setIsEditing(false);
//       setImageFile(null);
//       setSuccessMessage("User profile updated successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   if (loading) return <div>Loading...</div>;
//   if (error && !isEditing) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-3xl">
//       <h1 className="text-3xl font-semibold text-center text-gray-100 mb-6">User Profile</h1>
      
//       {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
//       {isEditing ? (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <form onSubmit={handleUpdate} className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
//             <h2 className="text-xl font-semibold text-center text-gray-100 mb-4">Edit Profile</h2>
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//             {['name', 'email', 'phone', 'address'].map((field) => (
//               <div key={field} className="mb-4">
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   value={updatedUser[field] || ""}
//                   onChange={handleChange}
//                   required
//                   className="bg-gray-800 border border-gray-600 rounded w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 />
//               </div>
//             ))}
//             <div className="mb-4">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={updatedUser.password || ""}
//                 onChange={handleChange}
//                 required
//                 className="bg-gray-800 border border-gray-600 rounded w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
//                 placeholder="Password"
//               />
//               <label className="flex items-center mt-2 text-sm text-gray-400">
//                 <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} />
//                 <span className="ml-2">Show Password</span>
//               </label>
//             </div>
//             <div className="mb-4">
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="bg-gray-800 border border-gray-600 rounded w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
//               />
//             </div>
//             <div className="flex justify-between">
//               <button type="submit" className="bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600 transition" disabled={updateLoading}>
//                 {updateLoading ? 'Updating...' : 'Update'}
//               </button>
//               <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-700 text-gray-200 rounded px-4 py-2 hover:bg-gray-600 transition">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="border rounded-lg p-6 shadow-lg bg-gray-800 flex items-center space-x-4">
//           {userData.photoPath && (
//             <img
//               src={`https://localhost:7157${userData.photoPath}`}
//               alt="User Profile"
//               className="w-24 h-24 rounded-full object-cover border-2 border-white"
//             />
//           )}
//           <div className="text-gray-200 space-y-1">
//             <h2 className="text-2xl font-semibold">{userData.name}</h2>
//             <p>Email: <span className="text-gray-400">{userData.email}</span></p>
//             <p>Phone: <span className="text-gray-400">{userData.phone}</span></p>
//             <p>Address: <span className="text-gray-400">{userData.address}</span></p>
//             <p>Role: <span className="text-gray-400">{userData.role}</span></p>
//             <button onClick={handleEditClick} className="mt-4 bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600 transition">
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserProfile;




import React, { useEffect, useState } from 'react';
import { useUser } from '../Global/UserContext';
import { toast } from 'react-toastify';
import '../User/custom-toast.css';

function UserProfile() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});   

  const [imageFile, setImageFile] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        toast.error('No user is logged in!')
        setError('No user logged in');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://localhost:7157/api/User/GetUserById/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
        setUpdatedUser(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);
    setSuccessMessage("");
    const formData = new FormData();
    Object.keys(updatedUser).forEach((key) => formData.append(key, updatedUser[key]));
    if (imageFile) formData.append('imageFile', imageFile);

    try {
      const response = await fetch(`https://localhost:7157/api/User/UpdateUsers/${user.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update user data');
      const updatedData = await response.json();
      setUserData(updatedData.user);
      setIsEditing(false);
      setImageFile(null);
      toast.success('User profile updated successfully!');
      setSuccessMessage("User profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error && !isEditing) return <div className="text-center text-white text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">User Profile</h1>

      {successMessage && <p className="text-center text-green-500 mb-4">{successMessage}</p>}

      {isEditing ? (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-4">Edit Profile</h2>
            {error && <p className="text-center text-white text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"   

                value={updatedUser.name   
 || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Similar input fields for email, phone, address, and password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={updatedUser.password || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
              <label className="flex items-center mt-2 text-sm text-gray-400">
                <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} />
                <span className="ml-2">Show Password</span>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-300">
                Profile Picture
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" disabled={updateLoading}>
                {updateLoading ? 'Updating...' : 'Update'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="border rounded-lg p-6 shadow-lg bg-gray-800 flex items-center space-x-4">
          {userData.photoPath && (
            <img
              src={`https://localhost:7157${userData.photoPath}`}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          )}
          <div className="text-white space-y-1">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p>Email: <span className="text-gray-400">{userData.email}</span></p>
            <p>Phone: <span className="text-gray-400">{userData.phone}</span></p>
            <p>Address: <span className="text-gray-400">{userData.address}</span></p>
            <p>Role: <span className="text-gray-400">{userData.role}</span></p>
            <button onClick={handleEditClick} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
