import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(() => {
        setUpdatedUser(user); // Set the initial state to the passed user prop
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedUser); // Call the update function with updated user data
        onClose(); // Close the modal after updating
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input 
                            id="name"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input 
                            id="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                        <input 
                            id="phone"
                            name="phone"
                            value={updatedUser.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
                        <input 
                            id="role"
                            name="role"
                            value={updatedUser.role}
                            onChange={handleChange}
                            placeholder="Role"
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update User
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main User List Component
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // To manage the user being edited

    // Fetch user data from API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7157/api/User/GetAllUsers'); // Adjust the URL if needed
            setUsers(response.data);
        } catch (err) {
            setError(err.response.data.message || 'Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    // Handle user deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`https://localhost:7157/api/User/DeleteUsers?id=${id}`);
                setUsers(users.filter(user => user.id !== id)); // Update the user list
            } catch (err) {
                setError(err.response.data.message || 'Error deleting user');
            }
        }
    };

    // Handle user update
    const handleUpdate = async (user) => {
        const userData = {
            id: user.id,
            userName: "", // Manually set the unnecessary fields
            normalizedUserName: "", // Example normalization
            normalizedEmail: "", // Example normalization
            emailConfirmed: true,
            passwordHash: "string", // Replace with actual hash if needed
            securityStamp: "string",
            concurrencyStamp: "string",
            phoneNumber: "",
            phoneNumberConfirmed: true,
            twoFactorEnabled: false,
            lockoutEnd: null, // Example: No lockout
            lockoutEnabled: true,
            accessFailedCount: 0,
            name: user.name,
            phone: user.phone,
            address: user.address, // Set static or dynamic value if needed
            email: user.email,
            password: user.password, // Set default or provided value
            role: user.role,
        };
        console.log(user);
        
    
        try {
            // Update the URL to include the correct endpoint
            const response = await axios.put(`https://localhost:7157/api/User/UpdateUsers?id=${user.id}`, userData);
            console.log('User updated successfully:', response.data);
            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };
    
    

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.phone}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                                    onClick={() => setSelectedUser(user)}>Edit</button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit User Modal */}
            {selectedUser && (
                <EditUserModal 
                    user={selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                    onUpdate={handleUpdate} 
                />
            )}
        </div>
    );
};

export default UserList;
