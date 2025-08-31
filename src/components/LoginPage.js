import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await API.post('/auth/login', data);
            localStorage.setItem('accessToken', res.data.accessToken);
            navigate('/profile');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input {...register('email')} placeholder="Email" className="w-full p-2 mb-2 border rounded"/>
                <input type="password" {...register('password')} placeholder="Password" className="w-full p-2 mb-4 border rounded"/>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
            </form>
        </div>
    );
}
