"use client"
import React, { useState } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';
import { axiosInstance } from '@/lib/axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null); // Gunakan any untuk user karena dapat bernilai null
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        kataSandi: password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      const userResponse = await axiosInstance.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);
      setIsLoggedIn(true); // Setelah login berhasil, atur isLoggedIn menjadi true
      alert('Login successful');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    // Hapus data pengguna dari state dan atur ulang token
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      ) : (
        <UserDetail user={user} onLogout={handleLogout} /> // Tampilkan UserDetail setelah login berhasil
      )}
    </div>
  );
};

export default LoginForm;
