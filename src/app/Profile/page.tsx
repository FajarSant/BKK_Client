"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('http://localhost:2000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user); // Menggunakan response.data.user karena user berada dalam properti user di dalam response
        console.log('User data:', response.data.user); // Console log data user
      } catch (error: any) {
        setError(error.message || 'Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Welcome, {user?.nama}</h2>
      <p>Email: {user?.email}</p>
      <p>Alamat: {user?.alamat}</p>
      <p>Jenis Kelamin: {user?.jeniskelamin}</p>
      <p>Tanggal Lahir: {user?.tanggalLahir}</p>
      <p>Tempat: {user?.tempat}</p>
      <p>User: {user?.user}</p>
    </div>
  );
};

export default UserProfile;
