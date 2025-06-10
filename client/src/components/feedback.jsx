// src/components/feedback.jsx
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/api/feedback`, {
        message: feedback,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Couldn't send your feedback. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {submitted ? (
        <p className="text-green-600 font-semibold text-center">
          💌 Thank you for your lovely message!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 font-medium">
            How was the surprise? ✨
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows="4"
            placeholder="Write your thoughts here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⭐</span>
                  Sending...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
        </form>
      )}
    </div>  );
};

export default FeedbackForm;
