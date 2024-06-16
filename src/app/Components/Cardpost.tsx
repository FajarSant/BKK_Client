"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaBookmark } from "react-icons/fa"; // Import icon simpan/arsip
import Link from "next/link";
import Image from "next/image";

interface Jobs {
  id: number;
  judul: string;
  deskripsi: string;
  perusahaanId: string;
  gambar?: string;
  perusahaan: {
    id: string;
    nama: string;
    alamat: string;
    email: string;
    genre: string;
  };
}

const CardPost: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Jobs[]>("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // Fungsi untuk memotong deskripsi menjadi beberapa kalimat
  const truncateDescription = (description: string | undefined, maxLength: number) => {
    if (!description) {
      return "";
    }

    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  // Pastikan jobs ada sebelum mencoba mengakses elemennya
  if (jobs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div key={job.id} className="bg-slate-300 p-4 rounded-xl shadow-lg flex flex-col">
          <div className="relative mb-4">
            {job.gambar && (
              <Image
                src={job.gambar}
                alt={job.judul}
                width={640} // Sesuaikan width
                height={360} // Sesuaikan height
                className="object-cover rounded-t-xl w-full h-64"
              />
            )}
            <FaBookmark className="text-gray-400 text-2xl cursor-pointer absolute top-2 right-2" />
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">{job.judul}</h1>
              <p className="text-lg text-gray-700 mb-4">{truncateDescription(job.deskripsi, 100)}</p>
              <p className="text-md text-gray-600">Perusahaan: {job.perusahaan.nama}</p>
            </div>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <Link href={`/Daftar/${job.id}`}>
                <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Daftar</span>
              </Link>
              <Link href={`/Postingan/${job.id}`}>
                <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Lihat Detail</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPost;
