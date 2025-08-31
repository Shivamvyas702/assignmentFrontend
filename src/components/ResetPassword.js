import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const user = localStorage.getItem("accessToken")


  // For submitting email to get reset link
  const sendResetEmail = async (data) => {
    try {
      const res = await API.post('/auth/forgot-password', data);
      setEmailSent(true);
      alert(res.data.message);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong');
    }
  };

  // For submitting new password
  const changePassword = async (data) => {
    try {
      const res = await API.post('/auth/reset-password', { token, password: data.password });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired token');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {!token ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit(sendResetEmail)}>
              <input
                {...register('email', { required: true })}
                placeholder="Your Email"
                className="w-full p-2 mb-2 border rounded"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit(changePassword)}>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                placeholder="New Password"
                className="w-full p-2 mb-2 border rounded"
              />
              {errors.password && <span className="text-red-500">Password must be at least 6 characters</span>}
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Reset Password
              </button>
            </form>
          </>
        )}
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
}
