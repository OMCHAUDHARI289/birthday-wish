// components/MakeAWish.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function MakeAWish({ isOpen, onClose, onNext, onWishSubmitted }) {
  const [wishText, setWishText] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");

  // Handle sparkle animation on input hover
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };  const handleWishSubmit = async () => {
    if (!wishText.trim()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/wishes`, {
        message: wishText
      });

      if (res.data.success) {
        setWishSubmitted(true);
        onWishSubmitted?.(true);
        setError("");
      }
    } catch (error) {
      console.error("Error sending wish:", error);
      setError("Failed to save your wish. But don't worry, it will still come true! ✨");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 rounded-2xl shadow-2xl p-8 w-[600px] text-center"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            {/* Close button - Only way to close the window */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors text-xl font-bold"
            >
              ×
            </button>

            {/* Decorative elements */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="text-4xl">🎂</span>
            </div>

            {/* Animated border effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-50"></div>
            </div>

            <motion.h2 
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              ✨ Make a Birthday Wish ✨
            </motion.h2>

            {wishSubmitted ? (
              <motion.div 
                className="text-lg py-8 space-y-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <div className="text-pink-600 font-semibold">
                  <span className="text-2xl mb-4 block">🎉</span>
                  Your wish has been cast into the stars!
                  <span className="text-2xl mt-4 block">✨</span>
                </div>

                <div className="flex justify-center gap-4">
                  <motion.button                    onClick={() => {
                      setWishSubmitted(false);
                      setWishText("");
                      onWishSubmitted?.(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Make Another Wish 🌠
                  </motion.button>

                  <motion.button
                    onClick={onNext}
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div 
                  className="relative"
                  onMouseMove={handleMouseMove}
                >
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    className="w-full h-32 border-2 border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-lg resize-none"
                    placeholder="Close your eyes and make a wish..."
                    style={{ textAlign: 'center' }}
                  />
                  <motion.div
                    className="pointer-events-none absolute w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-overlay opacity-50 blur-xl"
                    animate={{
                      x: sparklePosition.x - 20,
                      y: sparklePosition.y - 20
                    }}
                    transition={{ type: "spring", damping: 10 }}
                  />
                </div>                <div className="space-y-4">
                  <motion.button
                    onClick={handleWishSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!wishText.trim()}
                  >
                    ⭐ Make It Come True ⭐
                  </motion.button>
                  
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-pink-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pink-400 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-400 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-400 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-xl"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
