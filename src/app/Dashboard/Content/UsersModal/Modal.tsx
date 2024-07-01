import React, { useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  nama: string;
  email: string;
  kataSandi: string;
  alamat: string;
  nomortelepon: string;
  gambar: string | undefined;
  peran: string;
  jurusan: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'delete';
  user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, mode, user }) => {
  const initialState: User = {
    id: user ? user.id : '',
    nama: user ? user.nama : '',
    email: user ? user.email : '',
    kataSandi: user ? user.kataSandi : '',
    alamat: user ? user.alamat : '',
    nomortelepon: user ? user.nomortelepon : '',
    gambar: user ? user.gambar : '',
    peran: user ? user.peran : '',
    jurusan: user ? user.jurusan : '',
  };

  const [formData, setFormData] = useState<User>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === 'delete') {
        // Directly handle delete in App component
        onClose(); // Close modal after delete
        return;
      }

      // Handle add/update
      await axiosInstance.post('/users', formData);
      toast.success('User added/updated successfully');
      onClose(); // Close modal after add/update
    } catch (error) {
      console.error('Error adding/updating user:', error);
      toast.error('Error adding/updating user');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        open ? 'visible' : 'invisible'
      }`}
    >
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold mb-4">{mode === 'add' ? 'Add User' : 'Edit User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kataSandi" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <input
              type="password"
              id="kataSandi"
              name="kataSandi"
              value={formData.kataSandi}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="nomortelepon" className="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="nomortelepon"
              name="nomortelepon"
              value={formData.nomortelepon}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">
              Gambar
            </label>
            <input
              type="file"
              id="gambar"
              name="gambar"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="peran" className="block text-sm font-medium text-gray-700">
              Peran
            </label>
            <select
              id="peran"
              name="peran"
              value={formData.peran}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Peran</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PENGGUNA">PENGGUNA</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">
              Jurusan
            </label>
            <input
              type="text"
              id="jurusan"
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
            >
              {mode === 'add' ? 'Add' : 'Update'}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
