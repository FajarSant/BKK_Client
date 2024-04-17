"use client"
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserData {
  nama: string;
  email: string;
  user: {
    nama: string;
    email: string;
    // properti lainnya sesuai kebutuhan
  }
}

const UserActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUserData(null);
          return;
        }
        const response = await fetch('http://localhost:2000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData: UserData = await response.json();
        console.log('User data:', userData);
        console.log('Nama pengguna:', userData && userData.user ? userData.user.nama : 'No user data');
        
        
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <Avatar onClick={toggleDropdown}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
          </AvatarFallback>
        </Avatar>
      </div>
      {isOpen && (
        <div
          id="dropdownInformation"
          className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
        >
          {userData ? (
  <div className="px-4 py-3 text-sm text-gray-900">
    <div>Welcome {userData.user.nama}</div>
    <div className="font-medium truncate">{userData.user.email}</div>
  </div>
) : null}

          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownInformationButton">
            <li>
              <a href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            </li>
            <li>
              <a href="/Profile" className="block px-4 py-2 hover:bg-gray-100">Profil</a>
            </li>
            <li>
              <a href="/LamaranTersimpan" className="block px-4 py-2 hover:bg-gray-100">Lamaran Tersimpan</a>
            </li>
          </ul>
          <div className="py-2">
            {userData ? (
              <a href="/#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Keluar</a>
            ) : (
              <a href="/Login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
