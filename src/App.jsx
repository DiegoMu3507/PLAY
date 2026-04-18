import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Info from './pages/Info';
import Juegos from './pages/Juegos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="juegos" element={<Juegos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
