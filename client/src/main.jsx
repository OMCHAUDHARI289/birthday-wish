import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Welcome from './pages/Welcome.jsx'; // Adjust path if needed
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome onStart={() => {}} />} />
        <Route path="/memory-lane" element={<div>Memory Lane Page</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
