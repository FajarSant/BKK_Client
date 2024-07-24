"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaBookmark } from "react-icons/fa"; // Import icon simpan/arsip
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/app/public/assets/image.png"; // Import gambar default

interface Jobs {
  id: number;
  namaPT: string;
  deskripsi: string;
  openrekrutmen: string[];
  gambar?: string;
}

const CardPost: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Jobs[]>("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading false setelah data selesai di-fetch
      }
    };

    fetchJobs();
  }, []);

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    } else {
      return description;
    }
  };

  const handleDaftarClick = async (jobId: number) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const response = await axiosInstance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const userId = response.data.id;
  
        await axiosInstance.post("/savejobs", {
          penggunaId: userId.toString(),
          pekerjaanId: jobId.toString(),
        });
  
        toast.success("Job berhasil disimpan.", { position: "top-center" });
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error("Lamaran sudah disimpan sebelumnya.", { position: "top-center" });
        } else {
          console.error("Gagal menyimpan job:", error);
          toast.error("Gagal menyimpan job. Silakan coba lagi.", { position: "top-center" });
        }
      }
    } else {
      console.log("Token tidak ditemukan. Harap login terlebih dahulu.");
      toast.error("Harap login terlebih dahulu.", { position: "top-center" });
    }
  };

  // Skeleton loader component
  const SkeletonLoader: React.FC = () => (
    <div className="flex flex-col gap-4 p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="skeleton h-32 w-full bg-gray-300 rounded-lg"></div>
      <div className="skeleton h-4 w-1/2 bg-gray-300 rounded"></div>
      <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
      <div className="skeleton h-4 w-3/4 bg-gray-300 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto mt-10 px-4 py-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <div className=" grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <div className="relative mb-4">
              <Image
                src={job.gambar || defaultImage} // Gambar default jika job.gambar tidak ada
                alt={job.namaPT}
                width={640}
                height={360}
                className="object-cover rounded-t-lg w-full h-64"
              />
              <FaBookmark
                className="text-blue-700 text-2xl cursor-pointer absolute top-2 right-2"
                onClick={() => handleDaftarClick(job.id)}
              />
            </div>
            <div className="p-5">
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                {job.openrekrutmen && job.openrekrutmen.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mr-2">
                    #{item}
                  </span>
                ))}
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{job.namaPT}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateDescription(job.deskripsi)}</p>
              <div className="flex justify-between items-center mt-4">
                <Link href={`/Daftar/${job.id}`}>
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Daftar
                    <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </span>
                </Link>
                <Link href={`/Postingan/${job.id}`}>
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Lihat Detail
                    <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPost;
