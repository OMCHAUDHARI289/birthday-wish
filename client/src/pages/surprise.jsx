import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TypeWriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const SurprisePage = () => {
  const navigate = useNavigate();
  const [showSurprise, setShowSurprise] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Add entrance animation effect
    setShowSurprise(true);
  }, []);

  const handleBackClick = () => {
    navigate('/memory-lane');
  };

  const handleMoreClick = () => {
    navigate('/cake'); // This will redirect to the cake page
  };

  const handleCakeClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      setShowHiddenMessage(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              backgroundColor: 'white',
              opacity: Math.random(),
              animationDuration: `${Math.random() * 3 + 1}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div 
        className={`transform transition-all duration-1000 ${
          showSurprise ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto text-center shadow-2xl border border-white/20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce">
            🎉 Special Surprise! 🎉
          </h1>
          
          <div className="text-xl text-white/90 mb-8">
            <TypeWriter text="On this special day, we celebrate the amazing person you are..." delay={80} />
          </div>

          <div className="flex justify-center space-x-4 mb-8 text-5xl animate-bounce">
            🎂 🎈 🎁 🌟 ✨
          </div>

          <button
            onClick={handleCakeClick}
            className="text-6xl transform transition-transform hover:scale-125 active:scale-90 cursor-pointer mb-8"
            title="Click the cake!"
          >
            🎂
          </button>

          {showHiddenMessage && (
            <div className="bg-white/20 p-4 rounded-lg mb-8 animate-fade-in">
              <p className="text-white text-lg">
                <TypeWriter text="Here's a special wish just for you: May your day be filled with endless joy, sweet surprises, and beautiful memories! 💖" delay={50} />
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleBackClick}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all transform hover:scale-105 active:scale-95"
                >
                  Return to Memory Lane
                </button>
                <button
                  onClick={handleMoreClick}
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  More Surprises →
                </button>
              </div>
            </div>
          )}

          {!showHiddenMessage && (
            <p className="text-white/70 text-sm mb-8">
              (Psst... try clicking the cake a few times!)
            </p>
          )}
        </div>
      </div>

      {/* Floating action button for navigation */}
      <button
        onClick={handleBackClick}
        className="fixed bottom-6 left-6 p-4 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 backdrop-blur-lg"
      >
        ←
      </button>
    </div>
  );
};

export default SurprisePage;
