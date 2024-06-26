"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { axiosInstance } from '@/lib/axios';

interface User {
  id: string;
  email: string;
  nama: string;
  alamat: string;
  nomortelepon: string;
  gambar: string | null;
  peran: string;
  jurusan: string;
}

const Topbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axiosInstance.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Start: Logo */}
      <Link href="/" passHref>
        <div className="text-xl font-bold text-gray-700 cursor-pointer">
          BKK SMKN enter Ngargoyoso
        </div>
      </Link>

      {/* Center: Search Input */}
      <div className="flex items-center w-full max-w-md mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <FaSearch />
        </button>
      </div>

      {/* End: User Icon and Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-700 focus:outline-none"
        >
          {user?.gambar ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
              <Image
                src={`http://localhost:2000/${user.gambar.replace("uploads\\", "uploads/")}`}
                alt="User Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <FaUserCircle size={28} />
          )}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <Link href="/Profile" passHref>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </span>
            </Link>
            <Link href="/settings" passHref>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </span>
            </Link>
            <Link href="/logout" passHref>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
