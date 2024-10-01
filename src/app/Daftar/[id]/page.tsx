"use client";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaClipboardList,
  FaBuilding,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Jobs {
  id: string;
  judul: string;
  deskripsi: string[];
  persyaratan: string[];
  openrekrutmen: string[];
  gambar?: string;
  alamat?: string;
  nomorTelepon?: string;
  email?: string;
  namaPT?: string;
  Link?: string;
}

const DaftarPage = () => {
  const [jobs, setJobs] = useState<Jobs | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter(); // Hook untuk navigasi

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];
        const jobResponse = await axiosInstance.get<Jobs>(`/jobs/${id}`);
        const jobData = jobResponse.data;
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching job data:", error);
        router.push('/404'); // Arahkan ke halaman not-found jika terjadi kesalahan
      }
    };

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const userResponse = await axiosInstance.get<{ id: string }>("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = userResponse.data;
        setUserId(userData.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push('/login'); // Arahkan ke halaman not-found jika terjadi kesalahan
      }
    };

    fetchJobData();
    fetchUserData();
  }, [router]);

  if (!jobs) {
    return <div>Loading...</div>;
  }

  const handleDaftarClick = async () => {
    const confirmed = window.confirm("Anda yakin ingin mendaftar?");
    if (confirmed && jobs.Link && userId) {
      window.open(jobs.Link, "_blank");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const applicationResponse = await axiosInstance.post("/application", {
          pekerjaanId: jobs.id,
          penggunaId: userId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Application post response:", applicationResponse.data);
        toast.success("Berhasil mendaftar!");

      } catch (error) {
        console.error("Error posting application data:", error);
        toast.error("Gagal mendaftar. Silakan coba lagi.");
      }
    } else if (!jobs.Link) {
      toast.error("Link pendaftaran tidak tersedia.");
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-xl rounded-lg p-6">
        <div className="text-xl text-red-600 text-center mb-4">
          APAKAH ANDA YAKIN MENDAFTAR LOWONGAN INI?
        </div>
        <div className="text-sm text-center mb-8">
          Jika anda mendaftar maka anda dihubungkan ke halaman google form untuk melakukan pengisian formulir.
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{jobs.judul}</h2>
        </div>
        {jobs.namaPT && (
          <p className="text-lg text-gray-600 mb-2 flex items-center">
            <FaBuilding className="mr-2 text-lg text-blue-500" />
            Nama PT: {jobs.namaPT}
          </p>
        )}
        {jobs.alamat && (
          <p className="text-lg text-gray-600 mb-2 flex items-center">
            <TiLocationOutline className="mr-2 text-lg text-blue-500" />
            Alamat: {jobs.alamat}
          </p>
        )}
        {jobs.email && (
          <p className="text-lg text-gray-600 mb-2 flex items-center">
            <FaEnvelope className="mr-2 text-lg text-blue-500" />
            Email: {jobs.email}
          </p>
        )}
        {jobs.nomorTelepon && (
          <p className="text-lg text-gray-600 mb-2 flex items-center">
            <FaPhone className="mr-2 text-lg text-blue-500" />
            Nomor Telepon: {jobs.nomorTelepon}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {jobs.persyaratan && jobs.persyaratan.length > 0 && (
            <div>
              <div className="border-t-2 border-gray-300 my-4"></div>
              <div className="flex items-center mb-2">
                <FaUser className="mr-2 text-lg text-gray-600" />
                <h2 className="text-lg font-bold">Persyaratan</h2>
              </div>
              <ul className="list-disc ml-6">
                {jobs.persyaratan.map((item, index) => (
                  <li key={index} className="text-lg text-gray-600 mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {jobs.openrekrutmen && jobs.openrekrutmen.length > 0 && (
            <div>
              <div className="border-t-2 border-gray-300 my-4"></div>
              <div className="flex items-center mb-2">
                <FaClipboardList className="mr-2 text-lg text-gray-600" />
                <h2 className="text-lg font-bold">Open Recruitment</h2>
              </div>
              <ul className="list-disc ml-6">
                {jobs.openrekrutmen.map((item, index) => (
                  <li key={index} className="text-lg text-gray-600 mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBackClick}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Kembali
          </button>
          <button
            onClick={handleDaftarClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaftarPage;
