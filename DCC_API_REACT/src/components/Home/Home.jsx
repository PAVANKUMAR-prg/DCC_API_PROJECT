import React, { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://localhost:7157/api/post/get-all-posts'); // Your API URL
        const data = await response.json();
        setPosts(data); // Set the posts data
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Davangere Cycling Club</h1>
      <p className="text-center mb-6">Join us and be part of an amazing cycling community.</p>
      
      <div className="grid grid-cols-1 gap-6 mt-6 max-w-lg mx-auto">
        {/* Loop through posts and display each post */}
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-lg">
            {/* Post Image */}
            <div className="w-full flex justify-center">
              <img
                src={`data:image/jpeg;base64,${post.imageBase64}`} // Convert Base64 to image
                alt="Post Image"
                className="max-w-full h-auto rounded-lg object-contain" // Limit width and maintain aspect ratio
                style={{ maxHeight: '400px', width: '100%', maxWidth: '500px' }} // Example size limit
              />
            </div>

            {/* Post Description */}
            <h2 className="text-xl font-bold mt-4 mb-2 text-center">{post.description}</h2>

            {/* User Information */}
            <p className="text-center text-gray-600">Posted by: {post.user.name}</p>

            {/* Created/Updated Dates */}
            <p className="text-center text-gray-500">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="text-center text-gray-500">Last updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
