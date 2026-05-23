import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, e.g., Admin, Success, etc. */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
