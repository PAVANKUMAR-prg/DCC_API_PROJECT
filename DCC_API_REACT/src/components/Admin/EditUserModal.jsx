// import React, { useState } from 'react';
// import styles from './EditUserModal.module.css'; // Import the CSS module

// const EditUserModal = ({ user, onClose, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         address: user.address,
//         role: user.role,
//         password: user.password, // Reset password for security
//         photo: null,
//     });
//     const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'photo') {
//             setFormData({ ...formData, photo: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('id', formData.id);
//         data.append('name', formData.name);
//         data.append('email', formData.email);
//         data.append('phone', formData.phone);
//         data.append('address', formData.address);
//         data.append('password', formData.password); // Include password
//         data.append('role', formData.role);
//         data.append('photoPath', '');
//         if (formData.photo) {
//             data.append('imageFile', formData.photo);
//         }

//         onUpdate(data);
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//             <div className={`${styles.modal} w-full max-w-md`}>
//                 <h2 className="text-2xl font-semibold mb-4 text-white">Edit User</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh]">
//                     {/* Form Fields */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Phone</label>
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Address</label>
//                         <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? 'text' : 'password'} // Toggle between text and password
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)} // Toggle visibility
//                                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
//                             >
//                                 {showPassword ? 'Hide' : 'Show'} {/* Toggle button text */}
//                             </button>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Role</label>
//                         <select
//                             name="role"
//                             value={formData.role}
//                             onChange={handleChange}
//                             className="w-full border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         >
//                             <option value="user">User</option>
//                             <option value="admin">Admin</option>

//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300">Profile Photo</label>
//                         <input
//                             type="file"
//                             name="photo"
//                             onChange={handleChange}
//                             accept="image/*"
//                             className="border border-gray-700 bg-gray-900 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                 </form>
//                 <div className="flex justify-end mt-4">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 mr-2"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         onClick={handleSubmit}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditUserModal;


//------------------------------------------------------------------------------------------------------------------------------------------------------------
import React, { useState } from "react";

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
    password: user.password,
    photo: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.photo) {
      data.append("imageFile", formData.photo);
    }

    onUpdate(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-lg md:max-w-2xl h-[90vh] rounded-lg shadow-lg">
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
            Edit User
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Photo
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                accept="image/*"
                className="mt-1 w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
        {/* Buttons */}
        <div className="flex justify-end p-4 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
