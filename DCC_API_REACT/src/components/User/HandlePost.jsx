// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function HandlePost({ isAdmin, userId }) {
//   const [posts, setPosts] = useState([]);
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [postId, setPostId] = useState('');
//   const [message, setMessage] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(5);

//   // Fetch posts from the API
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('https://localhost:7157/api/post/get-all-posts');
//         const allPosts = response.data;
//         const displayedPosts = isAdmin ? allPosts : allPosts.filter(post => post.userId === userId);
//         setPosts(displayedPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setMessage('Error fetching posts');
//       }
//     };
//     fetchPosts();
//   }, [isAdmin, userId]);

//   // Open the edit modal and populate the form with the selected post's details
//   const handleEdit = (post) => {
//     setPostId(post.id);
//     setDescription(post.description);
//     setImage(null);
//     setIsModalOpen(true);
//   };

//   // Handle form submission for updating the post
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!description) {
//       setMessage('Description is required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('userId', userId);
//     if (image) formData.append('image', image);

//     try {
//       const response = await axios.put(`https://localhost:7157/api/Post/update-post/${postId}`, formData);
//       setMessage(response.data.message);

//       // Update the post locally without re-fetching all posts
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId ? { ...post, description, imageBase64: image ? URL.createObjectURL(image) : post.imageBase64 } : post
//         )
//       );
//     } catch (error) {
//       setMessage('Error updating the post: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsModalOpen(false);
//     }

//     // Clear message after 3 seconds
//     setTimeout(() => setMessage(''), 3000);
//   };

//   // Handle image file selection with validation
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const validTypes = ['image/jpeg', 'image/png'];
//     const maxSize = 2 * 1024 * 1024; // 2MB

//     if (file && !validTypes.includes(file.type)) {
//       setMessage('Invalid image format. Only JPEG and PNG are allowed.');
//       return;
//     }

//     if (file && file.size > maxSize) {
//       setMessage('File size exceeds 2MB.');
//       return;
//     }

//     setImage(file);
//   };

//   // Delete post function
//   const handleDelete = async (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       try {
//         await axios.delete(`https://localhost:7157/api/post/delete-post/${postId}`);
//         setMessage('Post deleted successfully');
//         fetchPosts()
//         // Refetch posts after deletion
//         const response = await axios.get('https://localhost:7157/api/post/get-all-posts');
//         const allPosts = response.data;
//         const displayedPosts = isAdmin ? allPosts : allPosts.filter(post => post.userId === userId);
//         setPosts(displayedPosts);
//       } catch (error) {
//         setMessage('Error deleting post: ' + (error.response?.data?.message || error.message));
//       }
//     }

//     // Clear message after 3 seconds
//     setTimeout(() => setMessage(''), 3000);
//   };

//   // Pagination logic
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Confirmation before updating post
//   const handleConfirmUpdate = (e) => {
//     if (window.confirm('Are you sure you want to update this post?')) {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Manage Posts</h2>

//       {/* Display Message */}
//       {message && (
//         <div className="mb-4 text-center">
//           <p className="text-indigo-600">{message}</p>
//         </div>
//       )}

//       {/* Display posts */}
//       <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
//         {currentPosts.length === 0 ? (
//           <p className="text-center text-gray-600">No posts available.</p>
//         ) : (
//           currentPosts.map((post) => (
//             <div key={post.id} className="border p-4 bg-white shadow rounded-lg">
//               <h3 className="text-xl font-semibold">{post.description}</h3>
//               <p className="text-gray-600">Posted by: User {post.userId}</p>
//               {post.imageBase64 && (
//                 <img
//                   src={`data:image/jpeg;base64,${post.imageBase64}`}
//                   alt="Post"
//                   className="w-full h-48 object-cover mt-4"
//                 />
//               )}
//               <div className="flex justify-around mt-4">
//                 <button
//                   onClick={() => handleEdit(post)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
//           <button
//             key={number + 1}
//             onClick={() => paginate(number + 1)}
//             className={`mx-1 px-3 py-1 ${currentPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>

//       {/* Edit Post Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Post</h2>

//             <form onSubmit={handleConfirmUpdate}>
//               <div className="mb-4">
//                 <label className="block text-gray-600 font-medium mb-2">Description</label>
//                 <textarea
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Enter Description"
//                   rows="4"
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-600 font-medium mb-2">Upload Image</label>
//                 <input
//                   type="file"
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//                   onChange={handleImageChange}
//                   accept="image/jpeg,image/png"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
//               >
//                 Update Post
//               </button>
//             </form>

//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-4 text-gray-600 underline"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HandlePost;



//--------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function HandlePost({ isAdmin, userId, token }) {
//   const [posts, setPosts] = useState([]);
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [postId, setPostId] = useState('');
//   const [message, setMessage] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6); // Six posts per page
//   const [loading, setLoading] = useState(false);

//   // Fetch posts from the API
//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://localhost:7157/api/post/GetAllPosts');
//         const allPosts = response.data;
//         const displayedPosts = isAdmin ? allPosts : allPosts.filter(post => post.userId === userId);
//         setPosts(displayedPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setMessage('Error fetching posts');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, [isAdmin, userId]);

//   // Open the edit modal and populate the form with the selected post's details
//   const handleEdit = (post) => {
//     setPostId(post.id);
//     setDescription(post.description);
//     setImage(null);
//     setIsModalOpen(true);
//   };

//   // Handle form submission for updating the post
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!description) {
//       setMessage('Description is required');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('userId', userId);
//     if (image) formData.append('image', image);

//     try {
//       const response = await axios.put(
//         `https://localhost:7157/api/Post/update-post/${postId}`,
//         formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Ensure the token is passed for authorization
//           }
//         }
//       );
//       setMessage(response.data.message);

//       // Update the post locally without re-fetching all posts
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? { ...post, description, imagePath: response.data.post.imagePath }
//             : post
//         )
//       );
//     } catch (error) {
//       setMessage('Error updating the post: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsModalOpen(false);
//     }

//     // Clear message after 3 seconds
//     setTimeout(() => setMessage(''), 3000);
//   };

//   // Handle image file selection with validation
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     const maxSize = 2 * 1024 * 1024; // 2MB

//     if (file && !validTypes.includes(file.type)) {
//       setMessage('Invalid image format. Only JPEG, PNG, and WebP are allowed.');
//       return;
//     }

//     if (file && file.size > maxSize) {
//       setMessage('File size exceeds 2MB.');
//       return;
//     }

//     setImage(file);
//   };

//   // Delete post function
//   const handleDelete = async (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       try {
//         await axios.delete(`https://localhost:7157/api/post/delete-post/${postId}`);
//         setMessage('Post deleted successfully');

//         // Update posts without re-fetching all posts
//         setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//       } catch (error) {
//         setMessage('Error deleting post: ' + (error.response?.data?.message || error.message));
//       }
//     }

//     // Clear message after 3 seconds
//     setTimeout(() => setMessage(''), 3000);
//   };

//   // Pagination logic
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Confirmation before updating post
//   const handleConfirmUpdate = (e) => {
//     if (window.confirm('Are you sure you want to update this post?')) {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-900 text-white">
//       <h2 className="text-3xl font-semibold text-center mb-6">Manage Posts</h2>

//       {/* Display Message */}
//       {message && (
//         <div className="mb-4 text-center">
//           <p className="text-green-500">{message}</p>
//         </div>
//       )}

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="flex justify-center my-4">
//           <div className="loader border-t-4 border-indigo-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
//           Loading posts...
//         </div>
//       )}

//       {/* Display posts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//         {!loading && currentPosts.length === 0 ? (
//           <p className="text-center text-gray-400">No posts available.</p>
//         ) : (
//           currentPosts.map((post) => (
//             <div key={post.id} className="border p-4 bg-gray-800 shadow rounded-lg">
//               <h3 className="text-xl font-semibold">{post.description}</h3>
//               <p className="text-gray-400">Posted by: User {post.userId}</p>
//               <div className="h-48 w-full flex justify-center items-center overflow-hidden mt-4 bg-gray-900">
//                 {post.imagePath ? (
//                   <img
//                     src={`https://localhost:7157${post.imagePath}`}
//                     alt="Post"
//                     className="object-cover h-full w-full"
//                   />
//                 ) : (
//                   <p className="text-gray-400">No Image Available</p>
//                 )}
//               </div>
//               <div className="flex justify-around mt-4">
//                 <button
//                   onClick={() => handleEdit(post)}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => paginate(number + 1)}
//             className={`mx-1 px-3 py-1 ${currentPage === number + 1 ? 'bg-indigo-600' : 'bg-gray-700'} rounded-full`}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>

//       {/* Edit Post Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
//             <h2 className="text-2xl font-semibold mb-4">Update Post</h2>

//             <form onSubmit={handleConfirmUpdate}>
//               <div className="mb-4">
//                 <label className="block font-medium mb-2">Description</label>
//                 <textarea
//                   className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Enter Description"
//                   rows="4"
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-4">
//                 <label className="block font-medium mb-2">Post Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900"
//                 />
//               </div>

//               <div className="flex justify-between items-center">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
//                 >
//                   Update Post
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HandlePost;

//fine but altering-------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import './custom-toast.css'; // Adjust path if necessary

function HandlePost({ isAdmin, userId, token }) {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [postId, setPostId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Six posts per page
  const [loading, setLoading] = useState(false);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7157/api/post/GetAllPosts');
        const allPosts = response.data;
        const displayedPosts = isAdmin ? allPosts : allPosts.filter(post => post.userId === userId);
        setPosts(displayedPosts);
      } catch (error) {
        toast.error('Error fetching posts'); // Show error message with toast
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [isAdmin, userId]);

  // Open the edit modal and populate the form with the selected post's details
  const handleEdit = (post) => {
    setPostId(post.id);
    setDescription(post.description);
    setImage(null);
    setIsModalOpen(true);
  };

  // Handle form submission for updating the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) {
      toast.error('Description is required'); // Error if description is empty
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('userId', userId);
    if (image) formData.append('image', image);

    try {
      const response = await axios.put(
        `https://localhost:7157/api/Post/update-post/${postId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Ensure the token is passed for authorization
          }
        }
      );
      toast.success('Post updated successfully'); // Success notification

      // Update the post locally without re-fetching all posts
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, description, imagePath: response.data.post.imagePath }
            : post
        )
      );
    } catch (error) {
      toast.error('Error updating the post: ' + (error.response?.data?.message || error.message)); // Error handling
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle image file selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file && !validTypes.includes(file.type)) {
      toast.error('Invalid image format. Only JPEG, PNG, and WebP are allowed.'); // Image type error
      return;
    }

    if (file && file.size > maxSize) {
      toast.error('File size exceeds 2MB.'); // Image size error
      return;
    }

    setImage(file);
  };

  // Delete post function
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`https://localhost:7157/api/post/DeletePost/${postId}`);

        toast.success('Post deleted successfully'); // Success notification for deletion

        // Update posts without re-fetching all posts
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        toast.error('Error deleting post: ' + (error.response?.data?.message || error.message)); // Error for deletion
      }
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Confirmation before updating post
  const handleConfirmUpdate = (e) => {
    if (window.confirm('Are you sure you want to update this post?')) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h2 className="text-4xl font-semibold text-center mb-6 text-white">Manage Posts</h2>

      {/* Display Loading */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
          Loading posts...
        </div>
      )}

      {/* Display posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {!loading && currentPosts.length === 0 ? (
          <p className="text-center text-gray-400">No posts available.</p>
        ) : (
          currentPosts.map((post) => (
            <div key={post.id} className="border p-4 bg-gray-800 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-orange-500">{post.description}</h3>
              <p className="text-gray-400">Posted by: User {post.userId}</p>
              <div className="h-48 w-full flex justify-center items-center overflow-hidden mt-4 bg-black">
                {post.imagePath ? (
                  <img
                    src={`https://localhost:7157${post.imagePath}`}
                    alt="Post"
                    className="object-cover h-48 w-full" // Fixed size for images
                  />
                ) : (
                  <p className="text-gray-400">No Image Available</p>
                )}
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 ${currentPage === number + 1 ? 'bg-orange-500' : 'bg-gray-700'} rounded-full`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {/* Edit Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">Update Post</h2>

            <form onSubmit={handleConfirmUpdate}>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 bg-black text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 bg-black text-white"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 w-full"
              >
                Update Post
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-400 hover:text-white transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HandlePost;
