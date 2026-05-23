import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Blog } from './pages/Blog';
import { PostDetails } from './pages/PostDetails';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetails />} />
          
          {/* Hidden Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Payment Status Routes (Placeholder) */}
          <Route path="/payment-success" element={<Home />} />
          <Route path="/payment-failed" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </HelmetProvider>
  );
};

export default App;
