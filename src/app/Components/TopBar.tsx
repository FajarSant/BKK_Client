"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
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
          BKK SMKN Ngargoyoso
        </div>
      </Link>

      {/* Center: Search Input */}
      <div className="flex items-center w-full max-w-lg mx-4">
        <form className="w-full">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
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
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Profile
              </span>
            </Link>
            <Link href="/settings" passHref>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Settings
              </span>
            </Link>
            <Link href="/logout" passHref>
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
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
