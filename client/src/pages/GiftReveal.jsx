import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftReveal = ({ onClose }) => {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [showCapsule, setShowCapsule] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleBoxClick = () => {
    setIsBoxOpened(true);
    setTimeout(() => setShowCapsule(true), 1000);
    setTimeout(() => setShowMessage(true), 2000);
  };

  useEffect(() => {
    const confetti = {
      start: () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        for (let i = 0; i < 100; i++) {
          createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }
      }
    };

    const createConfetti = (color) => {
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.zIndex = '100000';
      div.style.width = '10px';
      div.style.height = '10px';
      div.style.backgroundColor = color;
      div.style.borderRadius = '50%';
      div.style.left = Math.random() * window.innerWidth + 'px';
      div.style.top = '-10px';
      div.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(div);

      const animation = div.animate(
        [
          { transform: 'translate3d(0, 0, 0)', opacity: 1 },
          { transform: 'translate3d(' + (Math.random() * 200 - 100) + 'px, ' + window.innerHeight + 'px, 0)', opacity: 0 }
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: 'cubic-bezier(0, .9, .57, 1)'
        }
      );

      animation.onfinish = () => div.remove();
    };

    if (showMessage) {
      confetti.start();
    }
  }, [showMessage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence>
          {!isBoxOpened && (
            <motion.div
              key="box"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleBoxClick}
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-2xl relative overflow-hidden group transform transition-transform hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-pink-600 to-purple-700 rounded-t-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl transform transition-transform group-hover:scale-125 group-hover:rotate-12">🎁</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-pink-600 to-purple-700 rounded-b-2xl" />
              </div>
              <p className="mt-6 text-white text-xl font-bold animate-bounce">
                Click to Open Your Special Gift! ✨
              </p>
            </motion.div>
          )}

          {showCapsule && (
            <motion.div
              key="capsule"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 360] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-28 h-28 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <span className="text-6xl animate-bounce">💝</span>
                </div>
              </div>

              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    A Special Message For You! 🌟
                  </h2>
                  <p className="text-xl text-pink-200 max-w-md mx-auto leading-relaxed">
                    On your special day, I wish you endless joy, laughter, and beautiful moments that will last a lifetime. 
                    May all your dreams come true! 🎉
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                  >
                    Thank You! 💖
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GiftReveal;
