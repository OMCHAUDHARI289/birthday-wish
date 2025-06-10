import React from 'react';
import styled from 'styled-components';
import { useMusic } from '../context/MusicContext';

const MusicPlayer = () => {
  const { isPlaying, playSong, pauseSong } = useMusic();

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong('/Song.mp3');
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="top">
          <div className="pfp">
            <div className="playing">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`greenline line-${i + 1}`} 
                  style={{ 
                    animationPlayState: isPlaying ? 'running' : 'paused' 
                  }} 
                />
              ))}
            </div>
          </div>
          <div className="texts">
            <p className="title-1">Birthday Melody</p>
            <p className="title-2">Special Birthday Mix</p>
          </div>
        </div>
        <div className="controls">
          <button 
            className="play-button" 
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={24} width={24}>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={24} width={24}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="sparkles">✨</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  .card {
    background: rgba(255, 255, 255, 0.9);
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }

  .top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .pfp {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #ff8585);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playing {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .greenline {
    width: 2px;
    height: 12px;
    background: white;
    animation: bounce 0.5s infinite alternate;
    
    &.line-1 { animation-delay: 0.2s; }
    &.line-2 { animation-delay: 0.3s; }
    &.line-3 { animation-delay: 0.4s; }
    &.line-4 { animation-delay: 0.5s; }
    &.line-5 { animation-delay: 0.6s; }
  }

  .texts {
    flex: 1;
  }

  .title-1 {
    font-weight: bold;
    font-size: 14px;
    color: #333;
  }

  .title-2 {
    font-size: 12px;
    color: #666;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .play-button {
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .sparkles {
    font-size: 20px;
    animation: sparkle 1.5s infinite;
  }

  @keyframes bounce {
    from { transform: scaleY(0.8); }
    to { transform: scaleY(1.2); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }
`;

export default MusicPlayer;
