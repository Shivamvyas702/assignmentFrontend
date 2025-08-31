import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import UsersList from './components/UserList';
import Navbar from './components/Navbar';
import Login from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
