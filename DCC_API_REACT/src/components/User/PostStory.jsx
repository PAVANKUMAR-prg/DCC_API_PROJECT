import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../Global/UserContext"; // Import the useUser hook

function PostStory() {
  const { user } = useUser(); // Access user context
  const [storyData, setStoryData] = useState({
    description: "",
    image: null,
    userId: user ? user.id : "", // Set userId from context or empty if not logged in
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setStoryData({ ...storyData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Validate required fields
    if (!storyData.description || !storyData.userId) {
      setMessage("Description and user ID are required.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("description", storyData.description);
    formData.append("userId", storyData.userId);
    if (storyData.image) {
      formData.append("image", storyData.image);
    }

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post(
      //   "https://localhost:7157/api/Post/get-all-posts"
      //     ,
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      const response = await axios.post(
        "https://localhost:7157/api/Post/create-post",  // Corrected endpoint for creating a post
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Post created successfully!");
      setStoryData({
        description: "",
        image: null,
        userId: user ? user.id : "", // Reset userId based on context
      });
    } catch (error) {
      setMessage("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Share Your Story
        </h2>

        {message && (
          <div
            className={`text-center mb-4 ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Description Textarea */}
          <textarea
            name="description"
            placeholder="Write your description..."
            value={storyData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* User ID Input - Optional, can be hidden since it's taken from context */}
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={storyData.userId}
            readOnly // Make it read-only since it's derived from the context
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Upload Image (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white font-bold py-3 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            } transition duration-200`}
          >
            {isSubmitting ? "Posting..." : "Post Story"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostStory;
