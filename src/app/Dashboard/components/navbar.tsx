"use client"
import { FaBell, FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side: Logo or branding */}
      <div className="flex items-center">
        <Link href="/admin/dashboard">
          <span className="text-2xl font-bold cursor-pointer text-blue-700">Admin</span>
        </Link>
      </div>

      {/* Middle: Notification and Search */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer text-gray-600" />
          {/* Optionally, add a notification count */}
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full" />
        </div>
      </div>

      {/* Right side: User profile */}
      <div className="relative">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={toggleProfileDropdown}>
          <FaUserCircle className="text-3xl text-gray-600" />
          <span className="text-gray-800 font-semibold">Admin</span>
        </div>

        {/* Profile dropdown */}
        {isProfileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            <Link href="/admin/profile">
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</span>
            </Link>
            <Link href="/admin/settings">
              <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</span>
            </Link>
            <Link href="/logout">
              <span className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">Logout</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
