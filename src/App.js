import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LoginPage';
import Profile from './components/Profile';
import UsersList from './components/UserList';
import Navbar from './components/Navbar';
import VerifyEmail from './components/VerifyEmail';
import { AuthContext, AuthProvider } from './auth/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Show alert after email verification
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('verified')) {
      alert('Email verified! You can now login.');
    }
  }, [location]);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <Register /> : <Navigate to="/profile" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <UsersList /> : <Navigate to="/login" />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
