"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

interface User {
  gambar?: string;
  // Tambahkan properti lain sesuai kebutuhan
}

interface TopbarProps {
  user: User | null; // Mengizinkan user untuk null
  onLogout: () => Promise<void>; // Fungsi logout harus mengembalikan Promise
}

const Topbar: React.FC<TopbarProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await onLogout(); // Pastikan onLogout adalah fungsi async
      router.push("/"); // Redirect setelah logout
    } catch (error) {
      console.error("Error logging out:", error); // Tangani error jika terjadi
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  alt="User Avatar"
                  src={
                    user.gambar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ) : (
              <FaUser className="text-3xl" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
