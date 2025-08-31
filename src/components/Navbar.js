import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const logout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-indigo-600 font-bold text-white p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-2 md:mb-0">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">My Profile</Link>
                <Link to="/users" className="hover:underline">Users</Link>
            </div>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        </nav>
    );
}
