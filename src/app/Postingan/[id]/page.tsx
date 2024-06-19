"use client";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaArrowLeft, FaUser } from "react-icons/fa";

interface Jobs {
  id: string;
  judul: string;
  deskripsi: string;
  persyaratan?: string;
  openrekrutmen: string[];
  gambar: string;
  alamat?: string;
  email?: string;
  nomortelepon: string;
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

  const handleBack = () => {
    window.history.back(); // Fungsi untuk tombol kembali
  };

  const toggleDropdown = () => {
    // Fungsi untuk menampilkan atau menyembunyikan dropdown avatar (jika diperlukan)
  };

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className=" flex justify-between items-center mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center" onClick={handleBack}>
          <FaArrowLeft/> Kembali
        </button>
        {/* <div>
          <Avatar onClick={toggleDropdown}>
            <AvatarImage src="https://github.com/shdcn.png"/>
            <AvatarFallback>
              <FaUser/>
            </AvatarFallback>
          </Avatar>
        </div> */}
      </div>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <Image
          src={jobs.gambar}
          alt={jobs.judul}
          width={480}
          height={240}
          className="rounded-lg"
          style={{objectFit: "cover"}}
          />
          <div className="border-t-2 border-gray-300 my-">
            <h1 className="text-2xl font-bold mb-2">{jobs.judul}</h1>
            <p className="text-lg text-gray-700 mb-4 text-justify">{jobs.deskripsi}</p>
            <div className="border-t-2 border-gray-300 my-6"></div>
            <div className="text-2xl font-bold mb-2">Informasi Perusahaan</div>
            {jobs.alamat&& <p className="text-lg text-gray-600 mb-2"> Alamat: {jobs.alamat}</p>}
            {jobs.email&& <p className="text-lg text-gray-600 mb-2"> Email: {jobs.email}</p>}
            {jobs.nomortelepon&& <p className="text-lg text-gray-600 mb-2"> Nomor Telepon: {jobs.nomortelepon}</p>}

            {jobs.persyaratan &&(
              <>
              <div className="border-t-2 border-gray-300 my-6">
                <h2 className="text-xl font-bold mb-2">Persyarataan</h2>
                <p className="text-lg text-gray-700 text-justify mb-2">{jobs.persyaratan}</p>
              </div>
              </>
            )}
            {jobs.openrekrutmen.length > 0 &&(
              <>
              <div className="border-t-2 border-gray-300 my-">
                <h2 className="text-lg font-bold mb-2">Open Recuitmen</h2>
                <ul>{jobs.openrekrutmen.map((item, index) =>(
                  <li key={index} className="text-lg text-gray-700 mb-2">{item}</li>
                ))}</ul>
              </div>
              </>
            )}
            <div className="border-t-2 border-gray-300 my-"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostinganDetail;
