import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

// Confetti Component
const Confetti = () => {
  useEffect(() => {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = [
      [255, 192, 203], // pink
      [255, 182, 193], // light pink
      [255, 105, 180], // hot pink
      [59, 130, 246],  // blue
      [139, 92, 246]   // purple
    ];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confettiPieces.forEach((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;
        
        // Reset piece when it falls off screen
        if (piece.y > canvas.height + 10) {
          piece.y = -10;
          piece.x = Math.random() * canvas.width;
        }
        
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = `rgb(${piece.color[0]}, ${piece.color[1]}, ${piece.color[2]})`;
        
        if (piece.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (piece.shape === 'square') {
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        } else { // triangle
          ctx.beginPath();
          ctx.moveTo(0, -piece.size / 2);
          ctx.lineTo(-piece.size / 2, piece.size / 2);
          ctx.lineTo(piece.size / 2, piece.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="confetti-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const BirthdayWelcomePage = () => {  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();

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
  
  const handleGiftClick = () => {
    navigate('/cake-cutting');
  };
  
  return (    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Canvas Confetti Background */}
      <Confetti />
      
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-600/20 to-pink-600/20 animate-pulse z-10"></div>
      
      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-20">
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
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center w-full h-full p-8 overflow-auto">
        {/* Countdown Timer */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6 animate-bounce drop-shadow-lg">
            ⏰ Countdown to Midnight
          </h2>
          <div className="flex space-x-4 justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-yellow-200 drop-shadow-md">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/90 font-medium">Seconds</div>
            </div>
          </div>
        </div>
        
        {/* Birthday Container */}
        <div className="relative transform hover:scale-105 transition-all duration-300 animate-pulse">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
          
          {/* Main Container */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-2xl mx-auto">            {/* Birthday Text */}
            <div className="text-center mb-8">
              <h1 className="birthday-heading text-4xl md:text-6xl bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 animate-bounce">
                🎉 Happy Birthday 🎂
              </h1>
              <p className="cursive-text text-xl md:text-2xl text-yellow-100 font-light drop-shadow-lg">
                to My ....Name! ✨
              </p>
            </div>
            
            {/* Journey Text */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-yellow-200 font-medium mb-6 drop-shadow-md">
                🌟 A Beautiful Journey Starts Now 🌟
              </p>
                {/* Gift Button */}
              <button
                onClick={() => window.location.href = '/MemoryLine.html'}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🎁 Click to Unwrap Your Gift</span>
                  <span className="group-hover:animate-spin">🎀</span>
                </span>
                
                {/* Button Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </button>
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