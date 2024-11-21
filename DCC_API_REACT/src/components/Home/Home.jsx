
// import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import Masonry from 'react-masonry-css';
// import ParallaxBanner from './ParallaxBanner';
// import './Home.css';

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center py-10">
//     <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
//     <span className="ml-3 text-orange-600 font-semibold">Loading Home...</span>
//   </div>
// );

// const ErrorMessage = ({ message, onRetry }) => (
//   <div className="text-center text-red-500 my-6">
//     <p className="mb-2 font-medium">{message}</p>
//     {onRetry && (
//       <button
//         onClick={onRetry}
//         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
//       >
//         Retry
//       </button>
//     )}
//   </div>
// );

// ErrorMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   onRetry: PropTypes.func,
// };

// const PostsHeader = () => (
//   <div className="posts-header">
//     <h2 className="posts-header-title">User Post-block</h2>
//     <p className="posts-header-subtitle">Join our cycling community and share your thoughts!</p>
//   </div>
// );

// const PostCard = ({ post }) => (
//   <div className="post-card">
//     <div className="image-container">
//       <img
//         // src={`data:image/jpeg;base64,${post.imageBase64}`}
//        src={`https://localhost:7157${post.imagePath}`}

//         alt={post.description || 'Post Image'}
//         className="post-image"
//       />
//       <div className="overlay" />
//       <div className="info-container">
//         <h3 className="post-name">{post.user?.name || 'Unknown'}</h3>
//         <p className="post-description">{post.description || 'No description available'}</p>
//       </div>
//     </div>
//   </div>
// );

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://localhost:7157/api/Post/GetAllPosts');
//       if (!response.ok) throw new Error('Failed to fetch posts');
//       const data = await response.json();
//       console.log(data);
      
//       if (!Array.isArray(data)) throw new Error('Unexpected response format');
//       setPosts(data);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleRetry = () => fetchPosts();

//   const handleVideoToggle = () => {
//     if (videoRef.current) {
//       videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;
//   if (posts.length === 0) return <ErrorMessage message="No posts available" />;

//   const breakpointColumnsObj = {
//     default: 3,
//     1100: 2,
//     700: 1,
//   };

//   return (
//     <>
//       {/* Video background section */}
//       <div className="relative h-screen overflow-hidden" onClick={handleVideoToggle}>
//         <video
//           ref={videoRef}
//           className="absolute inset-0 w-full h-full object-cover z-0"
//           src="/RIDE_cinematic.mp4"
//           autoPlay
//           loop
//           muted
//         ></video>
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
//            <h1 className="text-5xl font-bold mb-4">Welcome to Davangere Cycling Club</h1>
//            <p className="text-lg">Join us and be part of an amazing cycling community.</p>
//         </div>
//         <div className="video-fade-out"></div>
//       </div>

//       <ParallaxBanner />

//       <div className="p-6 min-h-screen bg-black">
//         <PostsHeader />
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="my-masonry-grid"
//           columnClassName="my-masonry-grid_column"
//         >
//           {posts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}
//           {/* Conditionally show placeholder for incomplete rows */}
//           {posts.length % breakpointColumnsObj.default !== 0 && (
//             <div className="post-placeholder">
//               More posts coming soon! Stay tuned!
//             </div>
//           )}
//         </Masonry>
//       </div>
//     </>
//   );
// };

// export default Home;

//-----------------------------------------------------------------------------------------------



import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import ParallaxBanner from './ParallaxBanner';
import './Home.css';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
    <span className="ml-3 text-orange-600 font-semibold">Loading Home...</span>
  </div>
);

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

const PostsHeader = () => (
  <div className="posts-header bg-black">
    <h2 className="posts-header-title text-white text-4xl font-extrabold mb-4">User Post-block</h2>
    <p className="posts-header-subtitle text-gray-200">Join our cycling community and share your thoughts!</p>
  </div>
);

const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="image-container">
      <img
        src={`https://localhost:7157${post.imagePath}`}
        alt={post.description || 'Post Image'}
        className="post-image"
      />
      <div className="overlay" />
      <div className="info-container">
        <h3 className="post-name">{post.user?.name || 'Unknown'}</h3>
        <p className="post-description">{post.description || 'No description available'}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // To track if the video has loaded
  const videoRef = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7157/api/Post/GetAllPosts');
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

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true); // Set video as loaded
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;
  if (posts.length === 0) return <ErrorMessage message="No posts available" />;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      {/* Video background section */}
      <div
        className={`relative h-screen overflow-hidden ${isVideoLoaded ? 'bg-transparent' : 'bg-black'}`} // Black background until video starts
        onClick={handleVideoToggle}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/RIDE_cinematic.mp4"
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoaded} // Trigger when video data is loaded
        ></video>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center ${isVideoLoaded ? '' : 'bg-black bg-opacity-50'}`}
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Davangere Cycling Club</h1>
          <p className="text-lg">Join us and be part of an amazing cycling community.</p>
        </div>
        <div className="video-fade-out"></div>
      </div>

      <ParallaxBanner />

      <div className="p-6 min-h-screen bg-black text-gray-100">
        <PostsHeader />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {/* Conditionally show placeholder for incomplete rows */}
          {posts.length % breakpointColumnsObj.default !== 0 && (
            <div className="post-placeholder text-center text-gray-200 p-4 mt-6 bg-black border-t border-orange-500">
              More posts coming soon! Stay tuned!
            </div>
          )}
        </Masonry>
      </div>
    </>
  );
};

export default Home;

