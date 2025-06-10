import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CakeCutting.css';
import MakeAWish from '../components/MakeAWish';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '../context/MusicContext';

const CakeCutting = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [blownCandles, setBlownCandles] = useState([false, false, false]);
  const [showWishPopup, setShowWishPopup] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const navigate = useNavigate();
  const { pauseSong, playSong } = useMusic();
  useEffect(() => {
    // Play birthday song when component mounts
    playSong('/happy-birthday-334876.mp3', 1.0);
  }, [playSong]);

  // Create sparkles around the scene
  const createSparkles = useCallback(() => {
    const sparkleColors = ['#ffeb3b', '#FF0080', '#00ff00', '#00ffff', '#ff00ff', '#7928CA'];
    for (let i = 0; i < 40; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 3}s`;
      sparkle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; // Random sizes
      sparkle.style.setProperty('--sparkle-color', sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
      document.body.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 3000);
    }
  }, []);

  // Create confetti explosion
  const createConfetti = useCallback((x, y) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = x + 'px';
      confetti.style.top = y + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(confetti);

      // Animate confetti
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 100 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      let opacity = 1;
      let x_pos = x;
      let y_pos = y;
      let rotation = 0;

      const animateConfetti = () => {
        x_pos += vx * 0.02;
        y_pos += vy * 0.02 + 2; // gravity
        rotation += 5;
        opacity -= 0.01;

        confetti.style.left = x_pos + 'px';
        confetti.style.top = y_pos + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = opacity;

        if (opacity > 0 && y_pos < window.innerHeight) {
          requestAnimationFrame(animateConfetti);
        } else {
          confetti.remove();
        }
      };

      requestAnimationFrame(animateConfetti);
    }
  }, []);

  // Create firework with ground effect
  const createFirework = useCallback((side, offset = 0) => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = side === 'left' ? '25%' : '75%';
    document.querySelector('.firework-container').appendChild(firework);

    // Shoot up animation with offset
    const randomOffset = (Math.random() - 0.5) * 5;
    firework.style.left = `calc(${side === 'left' ? '25%' : '75%'} + ${offset + randomOffset}px)`;
    firework.style.animation = 'shootUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';

    // Create explosion particles immediately
    setTimeout(() => {
      // Create explosion particles in a more natural pattern
      const colors = ['#FF3CAC', '#784BA0', '#2CD3E1', '#FBAB7E', '#FFD700', '#FF6B6B'];
      
      // Create more particles for a fuller effect
      for (let i = 0; i < 48; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const angle = (i / 48) * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const distance = Math.random() * 120 + 60; // Increased spread
        
        // Enhanced glow effect
        particle.style.background = color;
        particle.style.boxShadow = `0 0 15px ${color}, 0 0 25px ${color}`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        
        // Add slight randomness to the particle paths
        const randomAngleOffset = (Math.random() - 0.5) * 10;
        const finalAngle = angle + randomAngleOffset;
        
        particle.style.setProperty('--travel-distance', 
          `translate(${Math.cos(finalAngle * Math.PI / 180) * distance}px, 
                    ${Math.sin(finalAngle * Math.PI / 180) * distance}px)`
        );
        
        firework.appendChild(particle);
      }
    }, 800); // Reduced timing for quicker explosion

    setTimeout(() => {
      if (firework.parentNode) {
        firework.remove();
      }
    }, 2300);
  }, []);
  // Initialize launch pads
  useEffect(() => {
    const launchPads = document.createElement('div');
    launchPads.innerHTML = `
      <div class="launch-pad left"></div>
      <div class="launch-pad right"></div>
    `;
    document.querySelector('.firework-container').appendChild(launchPads);

    return () => {
      if (launchPads.parentNode) {
        launchPads.remove();
      }
    };
  }, []);

  // Create rising balloon
  const createRisingBalloon = useCallback(() => {
    const balloon = document.createElement('div');
    const colors = ['pink', 'purple', 'cyan', 'gold'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    balloon.className = `celebration-balloon ${color}`;
    balloon.style.left = `${Math.random() * 80 + 10}%`;
    balloon.innerHTML = `
      <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50 C38.8071 50 50 38.8071 50 25 C50 11.1929 38.8071 0 25 0 C11.1929 0 0 11.1929 0 25 C0 38.8071 11.1929 50 25 50 Z" fill="currentColor" />
      </svg>
    `;
    
    document.querySelector('.scene-container').appendChild(balloon);
    
    // Start floating animation after a small delay
    setTimeout(() => {
      balloon.style.animation = `floatUpBalloon ${Math.random() * 3 + 8}s linear forwards`;
    }, 50);

    // Remove balloon after animation
    setTimeout(() => {
      if (balloon.parentNode) {
        balloon.remove();
      }
    }, 11000);
  }, []);

  // Main animation sequence
  const startCelebration = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);    // Hide instruction
    const instruction = document.getElementById('instruction');
    if (instruction) instruction.style.opacity = '0';

    // Start with showing knife
    const knife = document.getElementById('knife');
    if (knife) {
      knife.style.opacity = '1';
      knife.style.left = '50px';
      knife.style.transform = 'translateY(-50%) rotate(-10deg)';
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 2: Cut the cake
    if (knife) {
      knife.style.left = '150px';
      knife.style.transform = 'translateY(-50%) rotate(-45deg)';
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: Show cake slice and start balloon celebration
    const cakeSlice = document.getElementById('cakeSlice');
    if (cakeSlice) {
      cakeSlice.style.opacity = '1';
      cakeSlice.style.transform = 'translateX(120px) translateY(-20px) rotate(25deg)';
      cakeSlice.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      
      // Create multiple fireworks at once for a dramatic effect
      const positions = [
        { side: 'left', offset: -10 },
        { side: 'left', offset: 10 },
        { side: 'right', offset: -10 },
        { side: 'right', offset: 10 },
        { side: 'left', offset: 0 },
        { side: 'right', offset: 0 }
      ];
      
      // Launch all fireworks with slight timing variations
      positions.forEach(({ side, offset }, index) => {
        setTimeout(() => {
          createFirework(side, offset);
        }, index * 100); // Small delay between each for better visual
      });

      // Show text immediately after fireworks
      setTimeout(() => {
        const happyText = document.querySelector('.happy-text');
        const birthdayText = document.querySelector('.birthday-text');
        if (happyText) happyText.classList.add('visible');
        if (birthdayText) birthdayText.classList.add('visible');
      }, 600);

      // Launch celebration balloons
      const balloonInterval = setInterval(createRisingBalloon, 300);
      setTimeout(() => clearInterval(balloonInterval), 8000);

      // Show wish popup after 5 seconds
      setTimeout(() => {
        setShowWishPopup(true);
      }, 5000);
    }

    // Step 4: Party bomb explosions
    setTimeout(() => {
      const bombLeft = document.getElementById('bombLeft');
      const bombRight = document.getElementById('bombRight');
      
      if (bombLeft && bombRight) {
        bombLeft.style.opacity = '1';
        bombLeft.style.transform = 'scale(1)';
        bombRight.style.opacity = '1';
        bombRight.style.transform = 'scale(1)';

        setTimeout(() => {
          // Explosion effect
          const leftRect = bombLeft.getBoundingClientRect();
          const rightRect = bombRight.getBoundingClientRect();
          
          createConfetti(leftRect.left + leftRect.width/2, leftRect.top + leftRect.height/2);
          createConfetti(rightRect.left + rightRect.width/2, rightRect.top + rightRect.height/2);

          bombLeft.style.transform = 'scale(3)';
          bombLeft.style.opacity = '0';
          bombRight.style.transform = 'scale(3)';
          bombRight.style.opacity = '0';
        }, 500);
      }
    }, 1800);

    // Create sparkles
    createSparkles();

    // Continuous confetti for celebration
    const confettiInterval = setInterval(() => {
      createConfetti(Math.random() * window.innerWidth, -20);
    }, 300);

    setTimeout(() => {
      clearInterval(confettiInterval);
      setIsAnimating(false);
      setShowNextButton(true); // Show the Next button after animations
    }, 8000);
  }, [isAnimating, createConfetti, createSparkles, createFirework, createRisingBalloon, playSong]);

  // Initialize sparkles
  useEffect(() => {
    // Create initial sparkles
    createSparkles();
    // Create new sparkles more frequently
    const sparkleInterval = setInterval(createSparkles, 1500);
    return () => clearInterval(sparkleInterval);
  }, [createSparkles]);

  // Handle individual candle click
  const handleCandleClick = useCallback((index) => {
    if (isAnimating || blownCandles[index]) return;
    
    const newBlownCandles = [...blownCandles];
    newBlownCandles[index] = true;
    setBlownCandles(newBlownCandles);

    // Get the specific flame
    const flames = document.querySelectorAll('.flame');
    const flame = flames[index];
    if (flame) {
      flame.style.transform = 'scale(0)';
      flame.style.opacity = '0';
    }

    // Check if all candles are blown
    if (newBlownCandles.every(blown => blown)) {
      startCelebration();
    }
  }, [isAnimating, blownCandles, startCelebration]);  
    const handleNextClick = () => {
    // Navigate to the final page using React Router
    navigate('/final');
  };

  return (    
    <div className="scene-container">
      <div className="firework-container"></div>
      <div className="happy-birthday-text">
        <span className="happy-text">Happy</span>
        <span className="birthday-text">Birthday</span>
      </div>
      <div className="cake-container" id="cakeContainer">
        <div className="cake" id="cake">
          <div className="cake-layer layer-1">
            {[15, 45, 75, 105, 135, 165].map((left) => (
              <div key={left} className="frosting" style={{ left: `${left}px` }}></div>
            ))}
          </div>
          <div className="cake-layer layer-2">
            {[15, 45, 75, 105, 135].map((left) => (
              <div key={left} className="frosting" style={{ left: `${left}px` }}></div>
            ))}
          </div>
          <div className="cake-layer layer-3">
            {[12, 40, 68, 96].map((left) => (
              <div key={left} className="frosting" style={{ left: `${left}px` }}></div>
            ))}
            
            <div className="candles-container" id="candlesContainer">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="candle"
                  onClick={() => handleCandleClick(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flame"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="knife" id="knife">
          <div className="knife-handle"></div>
          <div className="knife-blade"></div>
        </div>

        <div className="cake-slice" id="cakeSlice"></div>
      </div>

      <div className="party-bomb party-bomb-left" id="bombLeft"></div>      
      <div className="party-bomb party-bomb-right" id="bombRight"></div>
      <div className="instruction" id="instruction">
        Blow out the candles one by one by clicking them!
      </div>

      {/* Glowing Balloons */}
      <div className="balloon balloon-1">
        <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50 C38.8071 50 50 38.8071 50 25 C50 11.1929 38.8071 0 25 0 C11.1929 0 0 11.1929 0 25 C0 38.8071 11.1929 50 25 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="balloon balloon-2">
        <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50 C38.8071 50 50 38.8071 50 25 C50 11.1929 38.8071 0 25 0 C11.1929 0 0 11.1929 0 25 C0 38.8071 11.1929 50 25 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="balloon balloon-3">        <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50 C38.8071 50 50 38.8071 50 25 C50 11.1929 38.8071 0 25 0 C11.1929 0 0 11.1929 0 25 C0 38.8071 11.1929 50 25 50 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="balloon balloon-4">
        <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50 C38.8071 50 50 38.8071 50 25 C50 11.1929 38.8071 0 25 0 C11.1929 0 0 11.1929 0 25 C0 38.8071 11.1929 50 25 50 Z" fill="currentColor" />
        </svg>
      </div>      {/* Add MakeAWish popup */}
      <MakeAWish 
        isOpen={showWishPopup} 
        onClose={() => setShowWishPopup(false)}
        onNext={handleNextClick}
        onWishSubmitted={(submitted) => setWishSubmitted(submitted)}
      />

      {/* Bottom-right next button that appears after making a wish */}
      <AnimatePresence>
        {showNextButton && wishSubmitted && (
          <motion.button
            className="fixed bottom-8 right-8 px-8 py-3 bg-gradient-to-br from-pink-100 via-white to-purple-100 text-pink-600 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all z-50 flex items-center gap-2 border border-pink-200"
            onClick={handleNextClick}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Memory Line
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default CakeCutting;