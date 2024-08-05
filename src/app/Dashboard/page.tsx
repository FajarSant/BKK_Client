"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/Maincontent";
import Topbar from "../Components/TopBar";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

// Helper function to get token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Loading...
      </div>
    ); // Optionally, show a loading spinner
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
              width={700} // Ganti dengan lebar gambar yang sesuai
              height={300} // Ganti dengan tinggi gambar yang sesuai
            />
          </div>
        </div>
      </div>
    );
  }

  if (role !== "ADMIN") {
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
              onClick={() => (window.location.href = "/")}
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
            >
              Back to homepage
            </button>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <Image
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              alt="Description of image"
              width={700} // Ganti dengan lebar gambar yang sesuai
              height={300} // Ganti dengan tinggi gambar yang sesuai
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-400">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-100 fixed h-full top-0 left-0 z-10">
        <Sidebar setActiveItem={() => {}} />
      </div>

      {/* Main Content */}
      <div className="w-5/6 ml-auto bg-slate-200 overflow-y-auto h-screen">
        <Topbar />
        <MainContent activeItem="Home" />
      </div>
    </div>
  );
};

export default Dashboard;
