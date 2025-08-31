import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-indigo-600 font-bold text-white p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-2 md:mb-0">
                <Link to="/profile" className="hover:underline">My Profile</Link>
                <Link to="/users" className="hover:underline">Users</Link>
            </div>

            <div className="relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className="bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-700"
                >
                    Account ▼
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-10">
                        <Link 
                            to="/reset-password" 
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                        >
                            Update Password
                        </Link>
                        <button 
                            onClick={logout} 
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
