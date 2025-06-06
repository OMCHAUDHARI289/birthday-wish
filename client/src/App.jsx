import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/welcome'
import SurprisePage from './pages/surprise'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route 
        path="/memory-lane" 
        element={
          <div 
            style={{ 
              width: '100vw', 
              height: '100vh', 
              position: 'fixed',
              top: 0,
              left: 0,
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ 
              __html: '<iframe src="/memoryline.html" style="width:100%; height:100%; border:none; display:block;"></iframe>' 
            }} 
          />
        } 
      />
      <Route path="/surprise" element={<SurprisePage />} />
      <Route path="/cake" element={<Navigate to="/" replace />} /> {/* Temporary redirect until you create the cake page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App