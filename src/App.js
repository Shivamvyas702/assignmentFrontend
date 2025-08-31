import React, { useContext, useEffect,useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/LoginPage';
import Profile from './components/Profile';
import UsersList from './components/UserList';
import Navbar from './components/Navbar';
import VerifyEmail from './components/VerifyEmail';
import { AuthContext, AuthProvider } from './auth/AuthContext';
import ResetPassword from './components/ResetPassword';


function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const [verifiedMsg, setVerifiedMsg] = useState('');
  const navigate = useNavigate();

 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const verified = params.get('verified');

  if (verified === 'true') {
    setVerifiedMsg('Email verified! You can now login.');
  } else if (verified === 'failed') {
    setVerifiedMsg('Invalid or expired verification link.');
  }

  // Remove query params from URL after reading
  if (verified) {
    params.delete('verified');
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }

  if (verified) {
    const timer = setTimeout(() => {
      setVerifiedMsg('');
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [location, navigate]);


  return (
    <>

      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <Register /> : <Navigate to="/profile" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route
          path="/reset-password/:token?"
          element={<ResetPassword />}
        />
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
