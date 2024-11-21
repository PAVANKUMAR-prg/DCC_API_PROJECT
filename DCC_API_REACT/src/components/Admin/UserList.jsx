import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../Global/API_ENDPOINTS';
import HandleError from '../Global/HandleError';

const UserList = ({ notify }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showActive, setShowActive] = useState(true); // Toggle between active/inactive users
    const usersPerPage = 6;

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // const response = await axios.get('https://localhost:7157/api/User/getAllUsers');
            const response = await axios.get(API_ENDPOINTS.getAllUsers);
            setUsers(response.data); // Load all users without filtering
        } catch (error) {
            //setError(err.response?.data?.message || 'Error fetching users');
            setError(HandleError(error,"Error fetching users"));
            //toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        // Filter based on active/inactive status and search term
        return users
            .filter(user => user.isActive === showActive)
            .filter(user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
            .sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }, [users, searchTerm, sortOrder, showActive]);

    const currentUsers = useMemo(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    }, [filteredUsers, currentPage]);

    const handleSoftDelete = async (id) => {
        if (window.confirm("Are you sure you want to deactivate this user?")) {
            try {
                // await axios.put(`https://localhost:7157/api/User/deactivateUser/${id}`);
                await axios.put(API_ENDPOINTS.deactivateUser(id));
                setUsers(users.map(user => user.id === id ? { ...user, isActive: false } : user));
                toast.success("User deactivated successfully!");
            } catch (error) {
                // const errorMessage = err.response?.data?.message || 'Error deactivating user';
                // setError(errorMessage);
                // toast.error(errorMessage);

                setError(HandleError(error,"Error deactivating user"));
            }
        }
    };

    const handleRestoreUser = async (id) => {
        if (window.confirm("Are you sure you want to activate this user?")){
            try {
                // await axios.put(`https://localhost:7157/api/User/restoreUser/${id}`);
                await axios.put(API_ENDPOINTS.restoreUser(id));

                setUsers(users.map(user => user.id === id ? { ...user, isActive: true } : user));
                toast.success('User reactivated successfully!');
            } catch (error) {
                // const errorMessage = err.response?.data?.message || 'Error reactivating user';
                // setError(errorMessage);
                // toast.error(errorMessage);
                setError(HandleError(error,"Error reactivating user"));
            }
        }
        
    };

    const handleUpdate = async (formData) => {
        try {            
            const id = formData.get("id"); 
            const response = await axios.put(API_ENDPOINTS.updateUser(id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                toast.success("User updated successfully!");
                fetchUsers();
            }
        } catch (error) {
            // const errorMessage = error.response?.data?.message || 'Error updating user';
            // toast.error(errorMessage);
            setError(HandleError(error,"Error updating user"));
        }
    };

    const handleSort = () => {
        setSortOrder(prevSortOrder => prevSortOrder === "asc" ? "desc" : "asc");
    };

    const toggleActiveView = () => {
        setShowActive(prevShowActive => !prevShowActive);
        setCurrentPage(1); // Reset to first page on toggle
    };

    return (
      <div className="bg-p-4 items-centerp-10 rounded-xl min-h-screen ">
        {/* </div><div className="flex flex-col items-center p-4 bg-gray-800 text-white min-h-screen"> */}

            <h3 className="text-center text-4xl font-semibold mb-6 text-white">User-List</h3>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search users by name or email"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    className="border  bg-black text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-white w-full md:w-1/2 lg:w-1/3"
                />
                <button
                    onClick={handleSort}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-orange-300 transition duration-200 ml-2"
                >
                    Sort by Name ({sortOrder === "asc" ? "Asc" : "Desc"})
                </button>
                <button
                    onClick={toggleActiveView}
                    className={`bg-${showActive ? 'gray' : 'orange'}-600 text-white px-4 py-2 rounded hover:bg-${showActive ? 'gray' : 'orange'}-700 transition duration-200 ml-2`}
                >
                    Show {showActive ? "Inactive" : "Active"} Users
                </button>
            </div>

            {loading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                filteredUsers.length === 0 ? (
                    <div className="text-gray-400 text-center">No users found. Please try a different search term.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentUsers.map((user) => (
                            <div key={user.id} className="bg-black rounded-lg shadow-lg p-5">
                                <img
                                    src={user.photoPath ? `https://localhost:7157${user.photoPath}` : 'default-avatar.png'}
                                    alt="User Profile"
                                    className="w-full h-40 object-cover rounded mb-4"
                                />
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-gray-300">{user.email}</p>
                                <p className="text-gray-300">{user.phone}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="bg-white text-black px-4 py-2 rounded hover:bg-orange-400 transition duration-200 w-1/2 mr-1"
                                    >
                                        Edit
                                    </button>
                                    {user.isActive ? (
                                        <button
                                            onClick={() => handleSoftDelete(user.id)}
                                            className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-orange-400 transition duration-200 w-1/2 ml-1"
                                        >
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRestoreUser(user.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 w-1/2 ml-1"
                                        >
                                            Restore
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-orange-700 transition duration-200`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

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

//--------------------------------------------------------------------------------------------------------


// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import EditUserModal from './EditUserModal';
// import { toast } from 'react-toastify';
// import { API_ENDPOINTS } from '../Global/API_ENDPOINTS';
// import HandleError from '../Global/HandleError';

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showActive, setShowActive] = useState(true);
//     const usersPerPage = 6;

//     const fetchUsers = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(API_ENDPOINTS.getAllUsers);
//             setUsers(response.data);
//         } catch (error) {
//             setError(HandleError(error, 'Error fetching users'));
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const filteredUsers = useMemo(() => {
//         return users
//             .filter(user => user.isActive === showActive)
//             .filter(user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
//             .sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
//     }, [users, searchTerm, sortOrder, showActive]);

//     const currentUsers = useMemo(() => {
//         const indexOfLastUser = currentPage * usersPerPage;
//         const indexOfFirstUser = indexOfLastUser - usersPerPage;
//         return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//     }, [filteredUsers, currentPage]);

//     const handleSoftDelete = async (id) => {
//         if (window.confirm('Are you sure you want to deactivate this user?')) {
//             try {
//                 await axios.put(API_ENDPOINTS.deactivateUser(id));
//                 setUsers(users.map(user => user.id === id ? { ...user, isActive: false } : user));
//                 toast.success('User deactivated successfully!');
//             } catch (error) {
//                 setError(HandleError(error, 'Error deactivating user'));
//             }
//         }
//     };

//     const handleRestoreUser = async (id) => {
//         if (window.confirm('Are you sure you want to activate this user?')) {
//             try {
//                 await axios.put(API_ENDPOINTS.restoreUser(id));
//                 setUsers(users.map(user => user.id === id ? { ...user, isActive: true } : user));
//                 toast.success('User reactivated successfully!');
//             } catch (error) {
//                 setError(HandleError(error, 'Error reactivating user'));
//             }
//         }
//     };

//     const handleUpdate = async (formData) => {
//         try {
//             const id = formData.get('id');
//             const response = await axios.put(API_ENDPOINTS.updateUser(id), formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             if (response.status === 200) {
//                 toast.success('User updated successfully!');
//                 fetchUsers();
//             }
//         } catch (error) {
//             setError(HandleError(error, 'Error updating user'));
//         }
//     };

//     const handleSort = () => {
//         setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
//     };

//     const toggleActiveView = () => {
//         setShowActive(prevShowActive => !prevShowActive);
//         setCurrentPage(1);
//     };

//     return (
//         <div className="p-4 min-h-screen bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 border border-orange-500 text-white rounded-xl">
//             <h1 className="text-3xl font-bold mb-4">User List</h1>
//             <div className="flex flex-wrap justify-between items-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search users by name or email"
//                     onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//                     className="border bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-gray-500 w-full md:w-1/2 lg:w-1/3"
//                 />
//                 <button
//                     onClick={handleSort}
//                     className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-orange-300 transition duration-200 ml-2"
//                 >
//                     Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
//                 </button>
//                 <button
//                     onClick={toggleActiveView}
//                     className={`bg-${showActive ? 'gray' : 'orange'}-600 text-white px-4 py-2 rounded hover:bg-${showActive ? 'gray' : 'orange'}-700 transition duration-200 ml-2`}
//                 >
//                     Show {showActive ? 'Inactive' : 'Active'} Users
//                 </button>
//             </div>

//             {loading ? (
//                 <div className="text-center">Loading...</div>
//             ) : (
//                 filteredUsers.length === 0 ? (
//                     <div className="text-center text-gray-400">No users found. Try a different search term.</div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {currentUsers.map((user) => (
//                             <div key={user.id} className="bg-gray-900 rounded-lg shadow-lg p-5">
//                                 <img
//                                     src={user.photoPath ? `https://localhost:7157${user.photoPath}` : 'default-avatar.png'}
//                                     alt="User Profile"
//                                     className="w-full h-40 object-cover rounded mb-4"
//                                 />
//                                 <h2 className="text-xl font-bold">{user.name}</h2>
//                                 <p className="text-gray-400">{user.email}</p>
//                                 <p className="text-gray-400">{user.phone}</p>
//                                 <div className="flex justify-between mt-4">
//                                     <button
//                                         onClick={() => setSelectedUser(user)}
//                                         className="bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-500 transition duration-200 w-1/2 mr-1"
//                                     >
//                                         Edit
//                                     </button>
//                                     {user.isActive ? (
//                                         <button
//                                             onClick={() => handleSoftDelete(user.id)}
//                                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 w-1/2 ml-1"
//                                         >
//                                             Deactivate
//                                         </button>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleRestoreUser(user.id)}
//                                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 w-1/2 ml-1"
//                                         >
//                                             Restore
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             )}

//             <div className="flex justify-center mt-6 space-x-2">
//                 {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-orange-700 transition duration-200`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>

//             {selectedUser && (
//                 <EditUserModal
//                     user={selectedUser}
//                     onClose={() => setSelectedUser(null)}
//                     onUpdate={handleUpdate}
//                 />
//             )}
//         </div>
//     );
// };

// export default UserList;
