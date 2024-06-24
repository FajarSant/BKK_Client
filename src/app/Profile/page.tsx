"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            {user.gambar ? (
              <Image
                src={`http://localhost:2000/${user.gambar.replace("uploads\\", "uploads/")}`}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/default-profile.jpg"
                alt="Default Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{user.nama}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <p>
            <strong>Address:</strong> {user.alamat}
          </p>
          <p className="mt-2">
            <strong>Phone Number:</strong> {user.nomortelepon}
          </p>
          <p className="mt-2">
            <strong>Role:</strong> {user.peran}
          </p>
          <p className="mt-2">
            <strong>Department:</strong> {user.jurusan}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
