"use client"
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Perusahaan {
  id: string;
  nama: string;
  deskripsi: string;
  alamat: string | null;
  email: string | null;
}

interface Jobs {
  id: string;
  gambar: string;
  judul: string;
  deskripsi: string;
  perusahaanId: string;
  waktu: string;
  genre: string;
}

const PostinganDetail = () => {
  const [jobs, setJobs] = useState<Jobs | null>(null);
  const [perusahaan, setPerusahaan] = useState<Perusahaan | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];

        const jobResponse = await axiosInstance.get<Jobs>(`/jobs/${id}`);
        const jobData = jobResponse.data;
        setJobs(jobData);

        const perusahaanId = jobData.perusahaanId;
        const companyResponse = await axiosInstance.get<Perusahaan>(`/company/${perusahaanId}`);
        const companyData = companyResponse.data;
        setPerusahaan(companyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobData();
  }, []);

  if (!jobs || !perusahaan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={jobs.gambar}
            alt={jobs.judul}
            width={480}  // Set width sesuai kebutuhan Anda
            height={270} // Set height sesuai kebutuhan Anda
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">{jobs.judul}</h1>
        <p className="text-lg text-gray-700 mb-4">{jobs.deskripsi}</p>

        <div className="border-t border-gray-300 my-6"></div>

        <h2 className="text-xl font-bold mb-2">Informasi Perusahaan</h2>
        <p className="text-lg text-gray-700 mb-2">Nama: {perusahaan.nama}</p>
        <p className="text-lg text-gray-700 mb-2">Deskripsi: {perusahaan.deskripsi}</p>
        <p className="text-lg text-gray-700 mb-2">Alamat: {perusahaan.alamat}</p>
        <p className="text-lg text-gray-700 mb-2">Email: {perusahaan.email}</p>

        <div className="border-t border-gray-300 my-6"></div>
      </div>
    </div>
  );
};

export default PostinganDetail;
