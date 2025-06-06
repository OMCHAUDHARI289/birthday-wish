import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Confetti from '../components/Confetti';
import GiftReveal from './GiftReveal';

const BirthdayWelcomePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time until 12 AM
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const difference = tomorrow - now;
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
    const [showGift, setShowGift] = useState(false);

  const handleGiftClick = () => {
    setShowGift(true);
  };

  const handleCloseGift = () => {
    setShowGift(false);
  };
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Confetti />
      
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-pink-600/20 animate-pulse z-10"></div>
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-2xl animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            💖
          </div>
        ))}
      </div>
      
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-8">
        {/* Countdown Timer */}
        <div className="w-full max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6 animate-bounce drop-shadow-lg">
            ⏰ Countdown to Midnight
          </h2>
          <div className="flex space-x-4 justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg w-24 md:w-32">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg w-24 md:w-32">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg w-24 md:w-32">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Seconds</div>
            </div>
          </div>
        </div>
        
        {/* Birthday Container */}
        <div className="w-full max-w-3xl mx-auto relative transform hover:scale-105 transition-all duration-300 animate-pulse">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
          
          {/* Main Container */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {/* Birthday Text */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-bounce drop-shadow-xl">
                🎉 Happy Birthday 🎂
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 font-light italic drop-shadow-lg">
                to My Amazing Friend! ✨
              </p>
            </div>
            
            {/* Journey Text */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-yellow-200 font-medium mb-6 drop-shadow-md">
                🌟 A Beautiful Journey Starts Now 🌟
              </p>
              
              {/* Gift Button */}              <button
                onClick={handleGiftClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>🎁 Click to Unwrap Your Gift</span>
                  <span className="group-hover:animate-spin">🎀</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </button>
              
              {/* Gift Reveal Modal */}
              <AnimatePresence>
                {showGift && <GiftReveal onClose={handleCloseGift} />}
              </AnimatePresence>
            </div>
            
            {/* Decorative Elements */}
            <div className="flex justify-center space-x-4 text-2xl animate-bounce">
              <span style={{ animationDelay: '0s' }}>🎈</span>
              <span style={{ animationDelay: '0.2s' }}>🎊</span>
              <span style={{ animationDelay: '0.4s' }}>🌟</span>
              <span style={{ animationDelay: '0.6s' }}>🎁</span>
              <span style={{ animationDelay: '0.8s' }}>🎂</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Message */}
        <div className="mt-8 text-center">
          <p className="text-yellow-200 text-sm md:text-base italic drop-shadow-md">
            May this special day bring you endless joy and wonderful memories! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWelcomePage;