"use client";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { axiosInstance } from "@/lib/axios";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";

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

interface Application {
  id: string;
  pekerjaanId: string;
  status: string;
  tanggalDibuat: string;
  pengguna: {
    nama: string;
  };
  pekerjaan: {
    judul: string;
  };
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [saveJobs, setSaveJobs] = useState<Application[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Application[]>([]);

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

    const fetchSaveJobs = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axiosInstance.get("/savejobs", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSaveJobs(response.data);
        } catch (error) {
          console.error("Failed to fetch saved jobs data", error);
        }
      }
    };

    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axiosInstance.get("/application", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAppliedJobs(response.data);
        } catch (error) {
          console.error("Failed to fetch applied jobs data", error);
        }
      }
    };

    fetchUser();
    fetchSaveJobs();
    fetchAppliedJobs();
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
              <img
                src={user.gambar}
                alt={user.nama}
                className="w-32 h-32 object-cover"
              />
            ) : (
              "No Image"
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
          <button className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">
            LAMARAN TERSIMPAN
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {saveJobs.map((item) => (
              <NextLink
                key={item.id}
                href={`/Postingan/${item.pekerjaanId}`}
                passHref
              >
                <div className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.judul}
                  </h3>
                  <p className="text-gray-600">Ditambahkan oleh: {user.nama}</p>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">
            LAMARAN DIDAFTRAKAN
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appliedJobs.map((item) => (
              <NextLink
                key={item.id}
                href={`/Postingan/${item.pekerjaanId}`}
                passHref
              >
                <div className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.judul}
                  </h3>
                  <p className="text-gray-600">
                    Ditambahkan oleh: {item.pengguna.nama}
                  </p>
                  <p className="text-gray-600">Status: {item.status}</p>
                  <p className="text-gray-600">
                    Tanggal Didaftarkan:{" "}
                    {new Date(item.tanggalDibuat).toLocaleDateString()}
                  </p>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
