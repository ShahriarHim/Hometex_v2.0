import React, { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Icon for image upload

const ReviewSection = () => {
  // Dummy Reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      profilePic: "https://via.placeholder.com/40", // Dummy profile pic
      rating: 4,
      comment: "Great product! Really satisfied with the quality.",
      images: [
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100",
      ],
    },
    {
      id: 2,
      user: "Sarah Smith",
      profilePic: "https://via.placeholder.com/40",
      rating: 5,
      comment: "Amazing product! Totally worth the price.",
      images: [],
    },
    {
      id: 3,
      user: "Michael Lee",
      profilePic: "https://via.placeholder.com/40",
      rating: 3,
      comment: "It's okay, but I expected better quality.",
      images: ["https://via.placeholder.com/100"],
    },
  ]);

  // Review Input State
  const [newReview, setNewReview] = useState({
    user: "Anonymous",
    profilePic: "https://via.placeholder.com/40",
    rating: 0,
    comment: "",
    images: [],
  });

  // Collapsibility state for reviews
  const [reviewsVisible, setReviewsVisible] = useState(true);

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return; // Prevent empty reviews

    setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
    setNewReview({
      user: "Anonymous",
      profilePic: "https://via.placeholder.com/40",
      rating: 0,
      comment: "",
      images: [],
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i])); // Create preview URL for the uploaded image
    }
    setNewReview((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages], // Add uploaded images to the images array
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setNewReview((prevState) => ({
      ...prevState,
      rating,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h2>

      {/* Review Posting Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Write a Review</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        ></textarea>

        {/* Rating and Image Upload Section */}
        <div className="flex items-center space-x-6 mb-4">
          {/* Image Upload */}
          <label htmlFor="file-upload" className="cursor-pointer">
            <FaCamera size={24} color="#4A90E2" />
          </label>
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />

          {/* Rating Stars */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 cursor-pointer ${
                  star <= newReview.rating ? "text-yellow-500" : "text-gray-300"
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
                onClick={() => handleRatingChange(star)}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2l2.4 7.2H22l-6 4.8L17.6 22 12 17.2 6.4 22l2.4-7.2-6-4.8h7.6z"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Preview Uploaded Images */}
        <div className="flex space-x-2 mb-4">
          {newReview.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`preview-${index}`}
              className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>

      {/* Toggle Reviews Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Reviews</h3>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setReviewsVisible(!reviewsVisible)}
        >
          {reviewsVisible ? "Hide Reviews" : "Show Reviews"}
        </button>
      </div>

      {/* Collapsible Review Section */}
      {reviewsVisible && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={review.profilePic}
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{review.user}</h4>
                <p className="text-sm text-gray-500">Rating: {review.rating} ⭐</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>

            {/* Display review images */}
            {review.images.length > 0 && (
              <div className="flex space-x-2 mt-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : null}
    </div>
  );
};

export default ReviewSection;
