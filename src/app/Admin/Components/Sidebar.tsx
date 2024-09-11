import React from 'react';
import Image from 'next/image'; // Adjust import as needed
import { FaUserCircle, FaHospitalAlt, FaUserMd, FaCog, FaArrowLeft } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';

interface User {
  gambar?: string;
  nama?: string;
  peran?: string;
}

interface SidebarProps {
  user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="fixed top-0 left-0 bg-white w-64 h-screen flex flex-col shadow-lg border-r">
      <div className="p-4 flex items-center border-b">
        {user?.gambar ? (
          <div className="w-14 h-14 rounded-full  border-4 border-gray-300">
            <Image
              src={user.gambar}
              alt={user.nama || 'User Avatar'}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
        ) : (
          <FaUserCircle className="text-2xl text-gray-600 rounded-full" />
        )}
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{user?.nama || 'Admin Name'}</h2>
          <p className="text-sm text-gray-600">{user?.peran || 'Role'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul>
          {/* Navigation items here */}
          <li className="mb-6">
            <a href="#">
              <span className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <LuLayoutDashboard className="text-xl mr-3" />
                <span className="text-lg">Dashboard</span>
              </span>
            </a>
          </li>
          <li className="mb-6">
            <a href="#">
              <span className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <FaHospitalAlt className="text-xl mr-3" />
                <span className="text-lg">Data Pekerjaan</span>
              </span>
            </a>
          </li>
          <li className="mb-6">
            <a href="#">
              <span className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <FaUserMd className="text-xl mr-3" />
                <span className="text-lg">Data Pengguna</span>
              </span>
            </a>
          </li>
          <li className="mb-6">
            <a href="#">
              <span className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <FaCog className="text-xl mr-3" />
                <span className="text-lg">Settings</span>
              </span>
            </a>
          </li>
          <li className="mb-6">
            <a href="/">
              <span className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <FaArrowLeft className="text-xl mr-3" />
                <span className="text-lg">Kembali</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
