import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-[250px] h-[120px] bg-[#191414] rounded-lg p-2.5">
      <audio
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      {/* Top Section */}
      <div className="relative w-full flex gap-2.5">
        <div className="relative top-[5px] left-[5px] h-10 w-10 bg-[#d2d2d2] rounded flex justify-center items-center">
          <span className="text-2xl">🎵</span>
        </div>
        <div>
          <div className="text-white text-2xl font-bold">Birthday Song</div>
          <div className="text-white text-xs font-bold">Special Track</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-[90%] bg-[#5e5e5e] h-1.5 rounded absolute left-[5%] bottom-[22px]">
        <div 
          className="bg-[#1db954] h-full rounded"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>

      {/* Controls */}
      <div className="text-white flex absolute bottom-[30px] left-0 w-full justify-center gap-4">
        <button 
          onClick={togglePlay}
          className="hover:text-[#1db954] transition-colors"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Time Text */}
      <div className="absolute bottom-[11px] left-[10px] text-white text-[8px]">
        {formatTime(currentTime)}
      </div>
      <div className="absolute bottom-[11px] right-[10px] text-white text-[8px]">
        {formatTime(duration)}
      </div>

      {/* Playing Animation */}
      {isPlaying && (
        <div className="flex absolute top-2 right-2 justify-center gap-[1px] w-[30px] h-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1db954] h-5 w-0.5 relative origin-bottom animate-playing"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;