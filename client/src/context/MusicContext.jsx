import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const playSong = (songPath, volume = 0.7) => {
    if (songPath !== currentSong) {
      const oldVolume = audio.volume;
      // Fade out current song if playing
      if (isPlaying) {
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
          } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fadeOut);
            startNewSong(songPath, volume);
          }
        }, 50);
      } else {
        startNewSong(songPath, volume);
      }
    } else if (!isPlaying) {
      startNewSong(songPath, volume);
    }
  };

  const startNewSong = (songPath, targetVolume) => {
    audio.src = songPath;
    audio.volume = 0;
    audio.play().then(() => {
      const fadeIn = setInterval(() => {
        if (audio.volume < targetVolume - 0.05) {
          audio.volume += 0.05;
        } else {
          audio.volume = targetVolume;
          clearInterval(fadeIn);
        }
      }, 50);
      setIsPlaying(true);
      setCurrentSong(songPath);
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  };

  const pauseSong = () => {
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeOut);
      }
    }, 50);
    setIsPlaying(false);
  };

  const stopSong = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentSong('');
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      stopSong
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
