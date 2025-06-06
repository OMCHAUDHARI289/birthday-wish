import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import GiftReveal from './pages/GiftReveal';
import MusicPlayer from './components/MusicPlayer';

import romanticSong from './assets/song.mp3';

function App() {
  const [showGift, setShowGift] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-8 text-center min-h-screen">
      <Routes>
        <Route
          path="/"
          element={<Welcome onUnwrapGift={() => setShowGift(true)} />}
        />
        {/* Add other routes like /memoryline or /cakecutting when needed */}
      </Routes>

      {/* Show GiftReveal when user unwraps the gift */}
      {showGift && <GiftReveal />}

      {/* Persistent music player */}
      <MusicPlayer src={romanticSong} />
    </div>
  );
}

export default App;
