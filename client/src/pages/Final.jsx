import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from '../components/confetti';
import { useMusic } from '../context/MusicContext';

const BirthdayWish = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const { playSong } = useMusic();

  const heartfeltMessage = "messages for you on your special day! May your birthday be filled with love, laughter, and unforgettable moments. You deserve all the happiness in the world!";

  useEffect(() => {
    // Start playing background music when component mounts
    playSong('/Song.mp3', 0.5); // Lower volume for background music
  }, [playSong]);

  useEffect(() => {
    setTimeout(() => {
      setIsEnvelopeOpen(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isEnvelopeOpen && currentIndex < heartfeltMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + heartfeltMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= heartfeltMessage.length) {
      setTimeout(() => {
        setShowCursor(false);
        setShowButton(true);
      }, 1000);
    }
  }, [currentIndex, heartfeltMessage, isEnvelopeOpen]);  const handleContinue = () => {
    window.location.href = '/MemoryLine.html';
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Permanent Confetti */}
      <Confetti />

      <div className="flex flex-col gap-8 w-full max-w-4xl mx-4">
        {/* First Greeting Card */}
        <motion.div 
          className="relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Envelope Flap */}
          <motion.div
            className="absolute inset-x-0 -top-24 h-32 bg-white border-2 border-purple-200 origin-bottom z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isEnvelopeOpen ? -180 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              transformStyle: 'preserve-3d',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Main Content Area */}
          <div className="bg-white rounded-xl p-8 shadow-2xl relative z-10 border-2 border-purple-200">
            {/* Letter Content */}
            <div className="text-center">
              <div className="text-xl md:text-2xl leading-relaxed min-h-[200px] flex items-center justify-center">
                <p className="max-w-3xl text-gray-800" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.8rem', lineHeight: '1.6' }}>
                  {displayedText}
                  {showCursor && (
                    <span className="inline-block w-1 h-8 bg-white ml-1 animate-pulse"></span>
                  )}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="mt-8 flex justify-center space-x-6">
                <div className="text-2xl animate-pulse">💝</div>
                <div className="text-2xl animate-bounce delay-200">🌸</div>
                <div className="text-2xl animate-pulse delay-400">💖</div>
              </div>
            </div>
          </div>

          {/* Envelope Bottom */}
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 -z-10 rounded-xl transform -skew-y-1 shadow-lg" />
        </motion.div>

        {/* Second Greeting Card - How was the surprise? */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="bg-white rounded-xl p-8 shadow-2xl relative border-2 border-purple-200">
              <div className="text-center">
                <h3 className="text-2xl font-dancing text-purple-600 mb-4">How was the surprise?</h3>
                <motion.button
                  onClick={() => navigate('/feedback')}
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-dancing text-xl text-white bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg transition-all duration-300 ease-out hover:from-purple-500 hover:to-pink-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative flex items-center gap-2">
                    Express Your Feelings
                    <span className="inline-flex text-2xl">✨</span>
                  </span>
                </motion.button>
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 -z-10 rounded-xl transform -skew-y-1 shadow-lg" />
          </motion.div>
        )}
      </div>

      {/* Load Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" 
        rel="stylesheet"
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 4s both;
        }
      `}</style>
    </div>
  );
};

export default BirthdayWish;