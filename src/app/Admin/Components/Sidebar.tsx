import React from 'react';
import Image from 'next/image'; // Adjust import as needed
import { FaUserCircle, FaHospitalAlt, FaUserMd, FaCog, FaArrowLeft } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import Link from 'next/link'; // Import Link from next/link

interface User {
  gambar?: string;
  nama?: string;
  peran?: string;
}

interface SidebarProps {
  user?: User;
  activeRoute: string; // Add activeRoute prop
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeRoute }) => {
  return (
    <div className="fixed top-0 left-0 bg-white w-64 h-screen flex flex-col shadow-lg border-r">
      <div className="p-4 flex items-center border-b">
        {user?.gambar ? (
          <div className="w-14 h-14 rounded-full border-4 border-gray-300">
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
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link href="/Admin/Dashboard">
              <div
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeRoute === '/Admin/Dashboard' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <LuLayoutDashboard className="text-xl mr-3" />
                <span className="text-lg">Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/Admin/jobs">
              <div
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeRoute === '/Admin/jobs' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <FaHospitalAlt className="text-xl mr-3" />
                <span className="text-lg">Data Pekerjaan</span>
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/Admin/users">
              <div
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeRoute === '/Admin/users' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <FaUserMd className="text-xl mr-3" />
                <span className="text-lg">Data Pengguna</span>
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/Admin/settings">
              <div
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeRoute === '/Admin/settings' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <FaCog className="text-xl mr-3" />
                <span className="text-lg">Settings</span>
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/">
              <div className="flex items-center p-2 rounded-xl w-full text-left hover:bg-blue-200">
                <FaArrowLeft className="text-xl mr-3" />
                <span className="text-lg">Kembali</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
