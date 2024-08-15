"use client";

import { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Home from './Content/home/home';
import Jobs from './Content/jobs/jobs';
import Users from './Content/users/User';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { axiosInstance } from '@/lib/axios';

// Function to get token from localStorage
const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const Page: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('Home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = getTokenFromLocalStorage();

        if (!token) {
          console.log("No token found, redirecting to login.");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userRole = response.data.peran;
        console.log("User role:", userRole); // Debugging log

        if (userRole === "ADMIN") {
          setRole("ADMIN");
        } else {
          setRole("USER"); // Or any other role if applicable
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole(null);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    // Access localStorage only in the browser
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      setActiveMenu(storedMenu);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever activeMenu changes
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'Home':
        return <Home />;
      case 'Jobs':
        return <Jobs />;
      case 'Users':
        return <Users />;
      case 'settings':
        return <h1 className="text-3xl font-bold">Settings Content</h1>;
      default:
        return <h1 className="text-3xl font-bold">Default Content</h1>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Loading...
      </div>
    ); 
  }

  if (role === null) {
    return (
      <div className="h-screen w-screen bg-gray-50 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-green-500 font-bold mb-8">
              401
              <p className="text-sm">Pengguna Tidak Ditemukan.</p>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Akses di tolak. Silakan Login.
            </p>
            <Link
              href="/Login"
              className="px-5 py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <Image
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              alt="Description of image"
              width={700}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  if (role !== 'ADMIN') {
    return (
      <div className="h-screen w-screen bg-gray-50 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
              401
              <p className="text-sm">Akses ditolak ❌</p>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Halaman ini hanya untuk admin
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
            >
              Back to homepage
            </button>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <Image
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              alt="Description of image"
              width={700}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        setActiveMenu={setActiveMenu} 
        activeMenu={activeMenu} 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`flex-1 flex flex-col bg-gray-200 min-h-screen overflow-auto transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6 relative">
          <button 
            onClick={toggleSidebar} 
            className={`absolute top-4 left-4 z-10 p-2 text-xl ${isSidebarOpen ? 'md:hidden' : ''}`}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
