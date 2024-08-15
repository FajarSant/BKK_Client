import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHospitalAlt, FaUserMd, FaCog, FaUserCircle } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import Image from 'next/image';
import { axiosInstance } from '@/lib/axios';

interface SidebarProps {
  setActiveMenu: (menu: string) => void;
  activeMenu: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface User {
  id: string;
  email: string;
  nama: string;
  alamat: string;
  nomortelepon: string;
  gambar: string | null;
  NIS: string;
  peran: string;
  jurusan: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveMenu, activeMenu, isSidebarOpen, toggleSidebar }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
          const response = await axiosInstance.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          });

          // Log the response data to check if the API is returning user data
          console.log('API Response Data:', response.data);

          setUser(response.data); // Adjust based on actual API response structure
        } else {
          console.warn('No token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      setActiveMenu(storedMenu);
    }
  }, [setActiveMenu]);

  useEffect(() => {
    if (activeMenu) {
      localStorage.setItem('activeMenu', activeMenu);
    }
  }, [activeMenu]);

  return (
    <div
      className={`fixed top-0 left-0 bg-white w-64 h-screen flex flex-col shadow-lg border-r transition-transform transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex items-center border-b">
        {user?.gambar ? (
          <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-gray-300">
            <Image
              src={user.gambar}
              alt={user.nama}
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

      <nav className="flex-1 p-6">
        <ul>
          <li className="mb-6">
            <Link href="#">
              <span
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeMenu === 'Home' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
                onClick={() => setActiveMenu('Home')}
              >
                <LuLayoutDashboard className="text-xl mr-3" />
                <span className="text-lg">Dashboard</span>
              </span>
            </Link>
          </li>
          <li className="mb-6">
            <Link href="#">
              <span
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeMenu === 'Jobs' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
                onClick={() => setActiveMenu('Jobs')}
              >
                <FaHospitalAlt className="text-xl mr-3" />
                <span className="text-lg">Data Pekerjaan</span>
              </span>
            </Link>
          </li>
          <li className="mb-6">
            <Link href="#">
              <span
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeMenu === 'Users' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
                onClick={() => setActiveMenu('Users')}
              >
                <FaUserMd className="text-xl mr-3" />
                <span className="text-lg">Data Pengguna</span>
              </span>
            </Link>
          </li>
          <li className='mb-6'>
            <Link href="#">
              <span
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeMenu === 'settings' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
                onClick={() => setActiveMenu('settings')}
              >
                <FaCog className="text-xl mr-3" />
                <span className="text-lg">Settings</span>
              </span>
            </Link>
          </li>
          <li className='mb-6'>
            <Link href="/">
              <span
                className={`flex items-center p-2 rounded-xl w-full text-left transition-colors ${
                  activeMenu === 'kembali' ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
                }`}
              >
                <FaCog className="text-xl mr-3" />
                <span className="text-lg">Kembali</span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
