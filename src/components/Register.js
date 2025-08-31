import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.profileImage[0]) formData.append('profileImage', data.profileImage[0]);

        try {
            const res = await API.post('/auth/register', formData);
            alert(res.data?.message || 'Registration successful. Check your email to verify.');
            navigate('/login'); // redirect to login after registration
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                
                <input {...register('name', { required: true })} placeholder="Name" className="w-full p-2 mb-2 border rounded"/>
                {errors.name && <span className="text-red-500">Name is required</span>}

                <input {...register('email', { required: true })} placeholder="Email" className="w-full p-2 mb-2 border rounded"/>
                {errors.email && <span className="text-red-500">Email is required</span>}

                <input type="password" {...register('password', { required: true })} placeholder="Password" className="w-full p-2 mb-2 border rounded"/>
                {errors.password && <span className="text-red-500">Password is required</span>}

                <input type="file" {...register('profileImage')} onChange={e => setPreview(URL.createObjectURL(e.target.files[0]))} className="mb-2"/>
                {preview && <img src={preview} alt="preview" width="100" className="mb-2 rounded"/>}

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
            </form>
        </div>
    );
}
