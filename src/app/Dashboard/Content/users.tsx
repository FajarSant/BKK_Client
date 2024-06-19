import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Define the users interface
interface Users {
  id: string;
  nama: string;
  peran: string;
  gambar: string;
  jurusan: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<Users[]>('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    alert(`Edit user dengan ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    alert(`Hapus user dengan ID: ${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex justify-between items-center border-b pb-2">
        <h1 className="text-2xl font-bold">Users Information</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add User
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300 text-left">Nama</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Peran</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Email</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Gambar</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Jurusan</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-300">{user.nama}</td>
                <td className="py-2 px-4 border border-gray-300">{user.peran}</td>
                <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border border-gray-300">{user.gambar}</td>
                <td className="py-2 px-4 border border-gray-300">{user.jurusan}</td>
                <td className="py-2 px-4 border border-gray-300 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleEdit(user.id)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
