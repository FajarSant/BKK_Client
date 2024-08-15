"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUserCircle,
  FaUser,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

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
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_nama");
    setShowModal(false);
    toast.success("Logout berhasil!");
  };

  const closeModal = () => {
    setShowModal(false);
    toast.error("Logout dibatalkan!");
  };

  return (
    <div className="bg-white shadow-md py-2 px-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <Image
          src="https://res.cloudinary.com/dr01rjws7/image/upload/v1723718668/c61br9rk7ksuzqhsmyxy.png"
          alt="BKK SMKN Ngargoyoso Logo"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span className="text-lg font-medium">BKK SMKN <br /> NGARGOYOSO</span>
    </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            {user && user.gambar ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-gray-300">
                {user.gambar ? (
                  <Image
                    src={user.gambar}
                    alt={user.nama}
                    width={40} // Sesuaikan dengan ukuran yang Anda inginkan
                    height={40} // Sesuaikan dengan ukuran yang Anda inginkan
                    className="object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </div>
            ) : (
              <FaUserCircle className="text-2xl text-gray-600 rounded-full" />
            )}
            <span className="ml-2 text-gray-900 font-medium">
              {user ? user.nama : "Login"}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-10">
              {user ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium">{user.nama}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <Link href="/Profile">
                      <span className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <FaUser className="mr-2" />
                        Profile
                      </span>
                    </Link>
                    {user.peran === "ADMIN" && (
                      <Link href="/Admin/Dashboard">
                        <span className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          <FaTachometerAlt className="mr-2" />
                          Dashboard
                        </span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link href="/Login">
                  <span className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <FaUser className="mr-2" />
                    Login
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4">Konfirmasi Logout</h2>
            <p className="text-sm text-gray-700 mb-4">
              {`Apakah Anda yakin ingin keluar, ${
                user ? user.nama : "Pengguna"
              }?`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Topbar;
