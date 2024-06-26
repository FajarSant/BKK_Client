"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import Topbar from "../Components/TopBar";

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

const UserProfile: React.FC = () => {
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

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <Topbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            {user.gambar ? (
              <Image
                src={`http://localhost:2000/${user.gambar.replace(
                  "uploads\\",
                  "uploads/"
                )}`}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/default-profile.jpg"
                alt="Default Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1 ml-6 md:ml-12">
            <div className="flex flex-col md:flex-row items-center md:items-baseline">
              <h2 className="text-2xl font-semibold text-gray-700">
                {user.nama}
              </h2>
              <p className="text-sm text-gray-500">{user.peran}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-4">
              <p className="mr-4">
                <span className="font-semibold">Address:</span> {user.alamat}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Department:</span>{" "}
                {user.jurusan}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Phone:</span>{" "}
                {user.nomortelepon}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="font-bold text-center">LAMARAN</div>
            <div className="bg-gray-200 aspect-w-1 aspect-h-1">1</div>
            <div className="bg-gray-200 aspect-w-1 aspect-h-1">2</div>
            <div className="bg-gray-200 aspect-w-1 aspect-h-1">3</div>
            <div className="bg-gray-200 aspect-w-1 aspect-h-1">4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
