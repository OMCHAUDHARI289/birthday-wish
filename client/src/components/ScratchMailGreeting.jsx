import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Mail } from 'lucide-react';

const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  // Use memory line theme colors
  confetti.style.backgroundColor = [
    '#FF0080', '#7928CA', '#ffd1f9', '#fff', '#ffeb3b'
  ][Math.floor(Math.random() * 5)];
  return confetti;
};

const ScratchMailGreeting = ({ onContinue }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    // Create confetti animation
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    const addConfetti = () => {
      const confetti = createConfetti();
      confettiContainer.appendChild(confetti);
      
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
      
      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    };

    // Add confetti periodically
    const confettiInterval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(addConfetti, i * 100);
      }
    }, 500);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with higher pixel density for better scratch quality
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = 400 * pixelRatio;
    canvas.height = 250 * pixelRatio;
    canvas.style.width = '400px';
    canvas.style.height = '250px';
    ctx.scale(pixelRatio, pixelRatio);
    
    // Create scratch surface with memory line theme gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 250);
    gradient.addColorStop(0, '#7928CA');
    gradient.addColorStop(1, '#FF0080');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 250);

    // Add sparkle pattern
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 400;
      const y = Math.random() * 250;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add scratch instruction text with improved styling
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = 'bold 22px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch to Reveal ✨', 200, 110);
    ctx.font = '16px "Poppins", sans-serif';
    ctx.fillText('Your Special Message Awaits!', 200, 140);
    
    ctx.globalCompositeOperation = 'destination-out';

    // Clean up confetti
    return () => {
      clearInterval(confettiInterval);
      if (document.body.contains(confettiContainer)) {
        confettiContainer.remove();
      }
    };
  }, []);

  const createSparkle = (x, y) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'scratch-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty('--sparkle-color', ['#FFD700', '#FF3CAC', '#784BA0', '#2CD3E1'][Math.floor(Math.random() * 4)]);
    return sparkle;
  };

  const addSparkleEffect = (x, y) => {
    const container = document.querySelector('.scratch-area-container');
    if (!container) return;

    const sparkle = createSparkle(x, y);
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  };

  const handleInteraction = (x, y) => {
    if (!isScratching) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;
    
    const canvasX = (x - rect.left) * pixelRatio;
    const canvasY = (y - rect.top) * pixelRatio;
    
    // Create scratch effect
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 25 * pixelRatio, 0, Math.PI * 2);
    ctx.fill();

    // Add sparkle effect
    addSparkleEffect(x - rect.left, y - rect.top);
    
    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    
    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);
    
    if (percentage > 50 && !isRevealed) {
      setIsRevealed(true);
      setTimeout(() => setShowContinueButton(true), 1000);
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleMouseMove = (e) => {
    handleInteraction(e.clientX, e.clientY);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsScratching(true);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsScratching(false);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Mail Envelope Design */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-200">
        {/* Envelope Header */}
        <div className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] p-4 text-white">
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-6 h-6" />
            <h2 className="text-xl font-bold font-['Dancing Script']">Special Delivery</h2>
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-center text-purple-100 mt-1">For Someone Very Special</p>
        </div>

        {/* Scratch Area Container */}
        <div className="relative p-6 scratch-area-container">
          {/* Hidden Message */}
          <div className="absolute inset-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-purple-800 mb-3">
                🎉 Surprise! 🎉
              </h3>
              <p className="text-purple-700 text-lg leading-relaxed">
                This special moment was created just for you! Every scratch reveals how much you mean to us.
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="text-purple-600 font-semibold">Made with Love</span>
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
            </motion.div>
          </div>

          {/* Scratch Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-xl cursor-pointer select-none"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        </div>

        {/* Progress Indicator */}
        {scratchPercentage > 0 && !isRevealed && (
          <div className="px-6 pb-4">
            <div className="bg-purple-100 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scratchPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-center text-purple-600 text-sm mt-2">
              {scratchPercentage.toFixed(0)}% revealed
            </p>
          </div>
        )}

        {/* Continue Button */}
        {showContinueButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 pt-0"
          >
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ✨ How was the surprise? ✨
            </button>
          </motion.div>
        )
        }
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    </motion.div>
  );
};

export default ScratchMailGreeting;