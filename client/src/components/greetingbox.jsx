// src/components/GreetingBox.jsx
import React from "react";
import { motion } from "framer-motion";

const GreetingBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-xl rounded-2xl p-8 text-center border border-pink-100"
    >      <div className="flex justify-center space-x-3 text-3xl mb-4">
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>🎉</motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>✨</motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🎂</motion.span>
      </div>
      
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        Thank You for Being Part of This Journey!
      </h1>
      
      <p className="text-gray-700 text-lg mb-6">
        Your presence and wishes have made this celebration truly magical! 💖
      </p>
      
      <motion.div 
        className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-xl font-semibold shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Memories to Treasure ❤️
      </motion.div>
    </motion.div>
  );
};

export default GreetingBox;
