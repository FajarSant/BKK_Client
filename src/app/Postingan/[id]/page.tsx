"use client";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Jobs {
  id: string;
  judul: string;
  deskripsi: string;
  persyaratan?: string;
  openrekrutmen: string[];
  gambar: string;
  alamat?: string;
  email?: string;
  nomorTelepon?: string;
}

const PostinganDetail = () => {
  const [jobs, setJobs] = useState<Jobs | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        // Mengambil id dari path URL (misal: /Postingan/666eafbf53c65b15aaccf267)
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];

        // Memanggil API untuk mendapatkan detail pekerjaan berdasarkan id
        const jobResponse = await axiosInstance.get<Jobs>(`/jobs/${id}`);
        const jobData = jobResponse.data;
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobData();
  }, []);

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={jobs.gambar}
            alt={jobs.judul}
            width={480}
            height={270}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">{jobs.judul}</h1>
        <p className="text-lg text-gray-700 mb-4">{jobs.deskripsi}</p>

        <div className="border-t border-gray-300 my-6"></div>

        <h2 className="text-xl font-bold mb-2">Informasi Perusahaan</h2>
        {jobs.alamat && <p className="text-lg text-gray-700 mb-2">Alamat: {jobs.alamat}</p>}
        {jobs.email && <p className="text-lg text-gray-700 mb-2">Email: {jobs.email}</p>}

        {jobs.persyaratan && (
          <>
            <div className="border-t border-gray-300 my-6"></div>
            <h2 className="text-xl font-bold mb-2">Persyaratan</h2>
            <p className="text-lg text-gray-700 mb-2">{jobs.persyaratan}</p>
          </>
        )}

        {jobs.openrekrutmen.length > 0 && (
          <>
            <div className="border-t border-gray-300 my-6"></div>
            <h2 className="text-xl font-bold mb-2">Open Rekrutmen</h2>
            <ul className="list-disc list-inside">
              {jobs.openrekrutmen.map((item, index) => (
                <li key={index} className="text-lg text-gray-700 mb-2">{item}</li>
              ))}
            </ul>
          </>
        )}

        <div className="border-t border-gray-300 my-6"></div>
      </div>
    </div>
  );
};

export default PostinganDetail;
