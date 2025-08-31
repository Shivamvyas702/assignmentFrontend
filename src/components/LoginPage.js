import { useLocation, Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form'; 
import API from '../api/api'; 
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../auth/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('verified') === 'true') {
      alert('Email verified! You can now log in.');
    } else if (params.get('verified') === 'failed') {
      alert('Invalid or expired verification link.');
    }
  }, [location]);

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data);
      login(res.data.accessToken);
      alert(res.data.message || 'Login successful');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        <input {...register('email', { required: true })} placeholder="Email" className="w-full p-2 mb-2 border rounded"/>
        <input type="password" {...register('password', { required: true })} placeholder="Password" className="w-full p-2 mb-4 border rounded"/>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        
        {/* Register link */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
