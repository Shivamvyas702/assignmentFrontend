import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const fetchUsers = async () => {
        const res = await API.get(`/users?page=${page}&limit=${limit}&search=${search}`);
        setUsers(res.data.users);
        setTotal(res.data.total);
    };

    useEffect(() => { fetchUsers(); }, [page, search]);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="mb-4 p-2 border rounded w-full"/>
            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{u.name}</td>
                            <td className="py-2 px-4">{u.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button disabled={page===1} onClick={()=>setPage(page-1)} className="bg-gray-300 p-2 rounded hover:bg-gray-400">Prev</button>
                <button disabled={page*limit >= total} onClick={()=>setPage(page+1)} className="bg-gray-300 p-2 rounded hover:bg-gray-400">Next</button>
            </div>
        </div>
    );
}
