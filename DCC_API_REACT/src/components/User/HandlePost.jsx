import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HandlePost({ isAdmin, userId }) {
  const [posts, setPosts] = useState([]); // State to store all posts
  const [description, setDescription] = useState(''); // For editing the description
  const [image, setImage] = useState(null); // For uploading a new image
  const [postId, setPostId] = useState(''); // Current post ID being edited
  const [message, setMessage] = useState(''); // Feedback message
  const [isModalOpen, setIsModalOpen] = useState(false); // For opening the edit modal
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [postsPerPage] = useState(5); // Number of posts per page

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://localhost:7157/api/post/get-all-posts');
        const allPosts = response.data;
        const displayedPosts = isAdmin ? allPosts : allPosts.filter(post => post.userId === userId);
        setPosts(displayedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setMessage('Error fetching posts');
      }
    };
    fetchPosts();
  }, [isAdmin, userId]);

  // Open the edit modal and populate the form with the selected post's details
  const handleEdit = (post) => {
    setPostId(post.id);
    setDescription(post.description);
    setImage(null); // Reset image in case of new upload
    setIsModalOpen(true); // Open the modal
  };

  // Handle form submission for updating the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) {
      setMessage('Description is required');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('userId', userId);
    if (image) formData.append('image', image);

    try {
      const response = await axios.put(`https://localhost:7157/api/Post/update-post/${postId}`, formData);
      setMessage(response.data.message);

      // Update the post locally without re-fetching all posts
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, description, imageBase64: image ? URL.createObjectURL(image) : post.imageBase64 } : post
        )
      );
    } catch (error) {
      setMessage('Error updating the post: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsModalOpen(false); // Close the modal after the operation
    }
  };

  // Handle image file selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file && !validTypes.includes(file.type)) {
      setMessage('Invalid image format. Only JPEG and PNG are allowed.');
      return;
    }

    if (file && file.size > maxSize) {
      setMessage('File size exceeds 2MB.');
      return;
    }

    setImage(file);
  };

  // Pagination: Get current posts to display based on currentPage
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
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Manage Posts</h2>

      {/* Display posts */}
      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available.</p>
        ) : (
          currentPosts.map((post) => (
            <div key={post.id} className="border p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">{post.description}</h3>
              <p className="text-gray-600">Posted by: User {post.userId}</p>
              {post.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${post.imageBase64}`}
                  alt="Post"
                  className="w-full h-48 object-cover mt-4"
                />
              )}
              <button
                onClick={() => handleEdit(post)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 ${currentPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {/* Edit Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Post</h2>

            <form onSubmit={handleConfirmUpdate}>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Update Post
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
              >
                Cancel
              </button>
            </form>

            {message && (
              <div className="mt-4 text-center">
                <p className="text-indigo-600">{message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HandlePost;
