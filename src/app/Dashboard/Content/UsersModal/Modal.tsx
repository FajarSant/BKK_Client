import React, { useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '@/lib/axios';

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
    peran: user ? user.peran : 'PENGGUNA',
    jurusan: user ? user.jurusan : '',
  };

  const [formData, setFormData] = useState<User>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          gambar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        await axiosInstance.post('/users', formData);
      } else if (mode === 'edit') {
        await axiosInstance.put(`/users/${formData.id}`, formData);
      } else if (mode === 'delete') {
        await axiosInstance.delete(`/users/${formData.id}`);
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="authentication-modal" className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="absolute bg-gray-500 opacity-75 inset-0"></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 md:mx-0">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add User' : mode === 'edit' ? 'Edit User' : 'Delete User'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="kataSandi" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                id="kataSandi"
                name="kataSandi"
                value={formData.kataSandi}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter address"
                required
              />
            </div>
            <div>
              <label htmlFor="nomortelepon" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
              <input
                type="text"
                id="nomortelepon"
                name="nomortelepon"
                value={formData.nomortelepon}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
              <input
                type="file"
                id="gambar"
                name="gambar"
                onChange={handleFileChange}
                accept="image/*"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="peran" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
              <select
                id="peran"
                name="peran"
                value={formData.peran}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="PENGGUNA">PENGGUNA</option>
                <option value="ADMIN">ADMIN</option>
                {/* Add other roles as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="jurusan" className="block mb-2 text-sm font-medium text-gray-900">Jurusan</label>
              <input
                type="text"
                id="jurusan"
                name="jurusan"
                value={formData.jurusan}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter department"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {mode === 'add' ? 'Add User' : mode === 'edit' ? 'Update User' : 'Delete User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
