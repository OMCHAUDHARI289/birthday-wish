import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from './confetti';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [isSubmitted]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };
  if (isSubmitted) {
    return (
      <div className="relative">
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-4 border-gradient-to-r from-purple-200 to-pink-200 relative z-10"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-dancing text-purple-600 mb-4"
            >
              Thank You! 💖
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-lg leading-relaxed font-dancing"
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 flex justify-center gap-2"
            >              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-6 h-6 text-purple-400" />
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => window.location.href = '/MemoryLine.html'}
              className="mt-8 py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 font-dancing bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Memory Lane ✨
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Confetti />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300 relative z-10"
      >        <div className="p-8 space-y-6">
          {/* Feedback Input */}
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="How was the surprise? "
              rows={4}
              className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-300 resize-none text-gray-700 font-dancing text-lg"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="button"
            disabled={isSubmitting || !feedback.trim()}
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 font-dancing ${
              isSubmitting || !feedback.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending your feedback...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Share!!</span>
              </>
            )}          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;