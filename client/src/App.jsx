import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Welcome from "./pages/Welcome";
import CakeCutting from "./pages/CakeCutting";
import Final from "./pages/Final";
import FeedbackForm from "./components/FeedbackForm";
import MusicPlayer from "./components/music";
import { MusicProvider } from './context/MusicContext';
import './index.css';

function App() {
  return (
    <MusicProvider>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/cake-cutting" element={<CakeCutting />} />
        <Route path="/final" element={<Final />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </MusicProvider>
  );
}

export default App;
