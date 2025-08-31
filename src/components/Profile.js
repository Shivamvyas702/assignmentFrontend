import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useForm } from 'react-hook-form';

export default function Profile() {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        API.get('/users/me').then(res => setUser(res.data));
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.profileImage[0]) formData.append('profileImage', data.profileImage[0]);

        const res = await API.put('/users/me', formData);
        alert(res.data.message);
        window.location.reload();
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                
                <input defaultValue={user.name} {...register('name')} className="w-full p-2 mb-2 border rounded" />

                <input type="file" {...register('profileImage')} onChange={e => setPreview(URL.createObjectURL(e.target.files[0]))} className="mb-2"/>
                
                {preview && <img src={preview} width="100" className="mb-2 rounded" />}
                {user.profileImage && !preview && <img src={`https://assignmentbackend-production-c9be.up.railway.app/uploads/${user.profileImage}`} width="100" className="mb-2 rounded"/>}

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Profile</button>
            </form>
        </div>
    );
}
