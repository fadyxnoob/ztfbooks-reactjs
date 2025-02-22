import React, { useState } from "react";
import { X } from "lucide-react";
import { FaComments } from "react-icons/fa";
const BookReview = ({ ebookId, onClose, callReviews }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({}) => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and review text.");
      return;
    }

    setLoading(true);

    try {
      const userdata = JSON.parse(localStorage.getItem("userdata"));
      const token = userdata?.jwtToken;

      if (!token) {
        alert("Unauthorized: Please log in first.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://server.ztfbooks.com/client/v1/e-book/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ebookId: ebookId,
            stars: rating,
            comment: reviewText,
          }),
        }
      );
      console.log("Ebook ID:", ebookId);

      const result = await response.json();
      if (response.ok) {
        alert("Review submitted successfully!");
        setRating(0);
        setReviewText("");
        onClose();
        callReviews();
      } else {
        alert(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Failed to submit review. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-md p-6 w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">
            Review on this Book
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[1.0, 2.0, 3.0, 4.0, 5.0].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600">{rating}/5</span>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-32 border rounded-lg p-2 text-gray-700"
          placeholder="Write here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-lg w-full disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ ebookId }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <div>
      <p
        className="font-medium text-lg text-[#7C7C7C] cursor-pointer"
        onClick={() => setIsReviewOpen(true)}
      >
        Review
      </p>
      <p>
        <FaComments className="text-gray-600 text-xl mx-auto mt-1" />
      </p>

      {isReviewOpen && (
        <BookReview ebookId={ebookId} onClose={() => setIsReviewOpen(false)} />
      )}
    </div>
  );
};

export default ReviewSection;
