import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserIconWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk menentukan apakah dropdown terbuka

  // Menangani toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Membalikkan nilai state isOpen
  };

  // Contoh data user
  const userData = {
    user: {
      nama: 'John Doe',
      email: 'johndoe@example.com',
    },
  };

  // Menangani logout
  const handleLogout = () => {
    // Implementasikan logika logout di sini
    console.log('Logout');
  };

  // Menentukan apakah pengguna adalah admin
  const isAdmin = true; // Ganti dengan logika yang sesuai

  return (
    <div className="flex justify-between bg-gray-800 text-white py-4 px-6">
        <div></div>
      <div>
        {/* Komponen Avatar */}
        <Avatar onClick={toggleDropdown}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback />
        </Avatar>
      </div>
      {/* Dropdown */}
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
              {isAdmin && <a href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>}
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

export default UserIconWithDropdown;
