import React, { useEffect } from 'react';

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

export default Confetti;