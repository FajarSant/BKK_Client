"use client";
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Assuming you're using Next.js

interface TopbarProps {
  user: any; // Replace `any` with your user data type
  onLogout: () => void; // Function to handle logout
}

const Topbar: React.FC<TopbarProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout function passed as a prop
      await onLogout();
      
      // Redirect to the homepage
      router.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user ? (
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.gambar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} // Default image if user.gambar is not available
                />
              </div>
            ) : (
              <FaUser className="text-3xl" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {user ? (
              <>
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li><a>Settings</a></li>
                <li><button onClick={handleLogout} className="btn btn-primary">Logout</button></li>
              </>
            ) : (
              <li><a href="/login">Login</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
