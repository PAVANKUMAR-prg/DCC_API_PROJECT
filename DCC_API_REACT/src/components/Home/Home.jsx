import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    <span className="ml-3 text-blue-600 font-semibold">Loading posts...</span>
  </div>
);

// Error message component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center text-red-500 my-6">
    <p className="mb-2 font-medium">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
      >
        Retry
      </button>
    )}
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

// Post card component
const PostCard = ({ post }) => (
  <div className="border rounded-lg p-4 shadow-lg bg-white mb-6 max-w-lg mx-auto">
    {post.imageBase64 ? (
      <div className="w-full flex justify-center mb-4">
        <img
          src={`data:image/jpeg;base64,${post.imageBase64}`}
          alt={post.description || 'Post Image'}
          className="w-full h-64 rounded-lg object-cover shadow-md"
        />
      </div>
    ) : (
      <p className="text-center text-gray-500 mb-4">No image available</p>
    )}
    <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
      {post.description || 'No description available'}
    </h2>
    <p className="text-center text-gray-600">Posted by: {post.user?.name || 'Unknown'}</p>
    <p className="text-center text-gray-500">
      Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
    </p>
    <p className="text-center text-gray-500">
      Last updated: {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'N/A'}
    </p>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    imageBase64: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7157/api/Post/get-all-posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Unexpected response format');
      setPosts(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRetry = () => fetchPosts();
  const handleLoadMore = () => setVisiblePosts((prev) => prev + 5);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;
  if (posts.length === 0) return <ErrorMessage message="No posts available" />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Welcome to Davangere Cycling Club</h1>
      <p className="text-center mb-8 text-gray-700">Join us and be part of an amazing cycling community.</p>

      {/* Single-column display for all posts */}
      <div className="flex flex-col gap-6 mt-6 max-w-lg mx-auto">
        {posts.slice(0, visiblePosts).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-colors duration-200 shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
