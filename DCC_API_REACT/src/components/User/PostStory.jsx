// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../Global/UserContext"; // Import the useUser hook

// function PostStory() {
//   const { user } = useUser(); // Access user context
//   const [storyData, setStoryData] = useState({
//     description: "",
//     image: null,
//     userId: user ? user.id : "", // Set userId from context or empty if not logged in
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStoryData({ ...storyData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setStoryData({ ...storyData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

//     // Validate required fields
//     if (!storyData.description || !storyData.userId) {
//       setMessage("Description and user ID are required.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("description", storyData.description);
//     formData.append("userId", storyData.userId);
//     if (storyData.image) {
//       formData.append("image", storyData.image);
//     }

//     try {
//       // Replace with your actual API endpoint
//       // const response = await axios.post(
//       //   "https://localhost:7157/api/Post/get-all-posts"
//       //     ,
//       //   formData,
//       //   {
//       //     headers: { "Content-Type": "multipart/form-data" },
//       //   }
//       // );
//       const response = await axios.post(
//         "https://localhost:7157/api/Post/create-post",  // Corrected endpoint for creating a post
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessage("Post created successfully!");
//       setStoryData({
//         description: "",
//         image: null,
//         userId: user ? user.id : "", // Reset userId based on context
//       });
//     } catch (error) {
//       setMessage("Failed to create post. Please try again.");
//       console.error("Error creating post:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
//           Share Your Story
//         </h2>

//         {message && (
//           <div
//             className={`text-center mb-4 ${
//               message.includes("successfully") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Description Textarea */}
//           <textarea
//             name="description"
//             placeholder="Write your description..."
//             value={storyData.description}
//             onChange={handleInputChange}
//             required
//             rows="4"
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           {/* User ID Input - Optional, can be hidden since it's taken from context */}
//           <input
//             type="number"
//             name="userId"
//             placeholder="User ID"
//             value={storyData.userId}
//             readOnly // Make it read-only since it's derived from the context
//             className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-2">Upload Image (Optional)</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-blue-500 text-white font-bold py-3 rounded ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//             } transition duration-200`}
//           >
//             {isSubmitting ? "Posting..." : "Post Story"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostStory;


//---------------------------------------------------------------------------

// import React, { useState } from "react";
// import axios from "axios";
// import { useUser } from "../Global/UserContext";

// function PostStory() {
//   const { user } = useUser();
//   const [storyData, setStoryData] = useState({
//     description: "",
//     image: null,
//     userId: user ? user.id : "", // Set userId from context or empty if not logged in
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStoryData({ ...storyData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setStoryData({ ...storyData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

//     if (!storyData.description || !storyData.userId) {
//       setMessage("Description and user ID are required.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("description", storyData.description);
//     formData.append("userId", storyData.userId);
//     if (storyData.image) {
//       formData.append("image", storyData.image);
//     }

//     try {
//       const response = await axios.post(
//         "https://localhost:7157/api/Post/create-post",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessage("Post created successfully!");
//       setStoryData({
//         description: "",
//         image: null,
//         userId: user ? user.id : "",
//       });
//     } catch (error) {
//       setMessage("Failed to create post. Please try again.");
//       console.error("Error creating post:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
//       <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
//         <h2 className="text-3xl font-semibold text-white text-center mb-6">
//           Share Your Story
//         </h2>

//         {message && (
//           <div
//             className={`text-center mb-4 text-lg ${
//               message.includes("successfully") ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Description Textarea */}
//           <textarea
//             name="description"
//             placeholder="Write your description..."
//             value={storyData.description}
//             onChange={handleInputChange}
//             required
//             rows="4"
//             className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-2">Upload Post Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-400"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-blue-600 text-white font-bold py-3 rounded ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//             } transition duration-300 transform hover:scale-105`}
//           >
//             {isSubmitting ? "Posting..." : "Post Story"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostStory;

//---------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import axios from "axios";
// import { useUser } from "../Global/UserContext";

// function PostStory() {
//   const { user } = useUser();
//   const [storyData, setStoryData] = useState({
//     description: "",
//     image: null,
//     userId: user ? user.id : "", // Ensures userId is set only if user is logged in
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStoryData({ ...storyData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setStoryData({ ...storyData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

//     if (!storyData.description || !storyData.userId) {
//       setMessage("Description and user ID are required.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("description", storyData.description);
//     formData.append("userId", parseInt(storyData.userId, 10)); // Ensure userId is a number
//     if (storyData.image) {
//       formData.append("image", storyData.image);
//     }

//     try {
//       const response = await axios.post(
//         "https://localhost:7157/api/Post/CreatePostFile",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessage("Post created successfully!");
//       notify("")

//       setStoryData({
//         description: "",
//         image: null,
//         userId: user ? user.id : "",
//       });
//     } catch (error) {
//       setMessage("Failed to create post. Please try again.");
//       console.error("Error creating post:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
//       <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
//         <h2 className="text-3xl font-semibold text-white text-center mb-6">
//           Share Your Story
//         </h2>

//         {message && (
//           <div
//             className={`text-center mb-4 text-lg ${
//               message.includes("successfully") ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Description Textarea */}
//           <textarea
//             name="description"
//             placeholder="Write your description..."
//             value={storyData.description}
//             onChange={handleInputChange}
//             required
//             rows="4"
//             className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-2">Upload Post Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-400"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-blue-600 text-white font-bold py-3 rounded ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//             } transition duration-300 transform hover:scale-105`}
//           >
//             {isSubmitting ? "Posting..." : "Post Story"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostStory;

//above is done-design wise---------------------------------------changing


import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../Global/UserContext";
import { toast } from "react-toastify";
import "../User/custom-toast.css";


function PostStory() {
  const { user } = useUser();
  const [storyData, setStoryData] = useState({
    description: "",
    image: null,
    userId: user ? user.id : "", // Ensures userId is set only if user is logged in
  });
  const [imagePreview, setImagePreview] = useState(null); // To hold the image preview
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setStoryData({ ...storyData, image: file });

    // Generate image preview
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!storyData.description || !storyData.userId) {
      toast.error("Description and user ID are required.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("description", storyData.description);
    formData.append("userId", parseInt(storyData.userId, 10)); // Ensure userId is a number
    if (storyData.image) {
      formData.append("image", storyData.image);
    }

    try {
      const response = await axios.post(
        "https://localhost:7157/api/Post/CreatePostFile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Post created successfully!");

      setStoryData({
        description: "",
        image: null,
        userId: user ? user.id : "",
      });
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-orange-500 text-center mb-6">
          Share Your Story
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Description Textarea */}
          <textarea
            name="description"
            placeholder="Write your description..."
            value={storyData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Upload Post Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-400"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <p className="text-gray-400 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-500 text-black font-bold py-3 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            } transition duration-300 transform hover:scale-105`}
          >
            {isSubmitting ? "Posting..." : "Post Story"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostStory;
