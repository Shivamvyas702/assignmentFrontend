import React, { useState, useEffect, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../auth/AuthContext';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const { user } = useContext(AuthContext);

    const fetchUsers = async () => {
        const res = await API.get(`/users?page=${page}&limit=${limit}&search=${search}`);
        setUsers(res.data.users);
        setTotal(res.data.total);
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        await API.delete(`/users/${id}`);
        fetchUsers(); // refresh
    };

    useEffect(() => { fetchUsers(); }, [page, search]);

    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (u) => {
        setEditingUser(u);
    };

  const saveEdit = async () => {
  try {
    const res = await API.put(`/users/${editingUser.id}`, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
    });

    alert(res.data.message);

    
    setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)));

    setEditingUser(null);
  } catch (err) {
    alert(err.response?.data?.message || 'Update failed');
  }
};




    return (
        <div className="max-w-4xl mx-auto mt-10">
            <input
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        {user?.role === 'admin' && <th className="py-2 px-4">Actions</th>}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {users.map(u => (
                        editingUser?.id === u.id ? (
                            // Editable row
                            <tr key={u.id} className="border-b bg-gray-100">
                                <td className="py-2 px-4">
                                    <input
                                        value={editingUser.name}
                                        onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="py-2 px-4">
                                    <input
                                        value={editingUser.email}
                                        onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="py-2 px-4 space-x-2">
                                    <select
                                        value={editingUser.role}
                                        onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                                        className="border p-1 rounded"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button
                                        onClick={saveEdit}
                                        className="bg-green-500 px-2 py-1 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingUser(null)}
                                        className="bg-gray-400 px-2 py-1 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            // Normal row
                            <tr key={u.id} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{u.name}</td>
                                <td className="py-2 px-4">{u.email}</td>
                                {user?.role === 'admin' && user.id !== u.id && (
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            onClick={() => handleEdit(u)}
                                            className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteUser(u.id)}
                                            className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )
                    ))}
                </tbody>



            </table>
            <div className="flex justify-between mt-4">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-300 p-2 rounded hover:bg-gray-400">Prev</button>
                <button disabled={page * limit >= total} onClick={() => setPage(page + 1)} className="bg-gray-300 p-2 rounded hover:bg-gray-400">Next</button>
            </div>
        </div>
    );
}
