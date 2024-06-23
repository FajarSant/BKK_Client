"use client";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaClipboardList,
  FaBuilding,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { TbMapSearch } from "react-icons/tb";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import defaultImage from "@/app/public/assets/image.png";
import { Button } from "@/components/ui/button";

interface Jobs {
  id: string;
  judul: string;
  deskripsi: string;
  persyaratan: string[];
  openrekrutmen: string[];
  gambar?: string;
  alamat?: string;
  nomorTelepon?: string;
  email?: string;
  namaPT?: string;
}

const PostinganDetail = () => {
  const [jobs, setJobs] = useState<Jobs | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];
        const jobResponse = await axiosInstance.get<Jobs>(`/jobs/${id}`);
        const jobData = jobResponse.data;
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobData();
  }, []);

  const handleback = () => {
    window.location.href = "/"; // Navigate to root path
  };

  const handleSave = () => {
    alert("Lowongan Tersimpan");
  };

  const handleApplay = () => {
    alert("Daftar Lowongan");
  };

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleback}
        >
          <FaArrowLeft />
          Kembali
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center underline mb-6">
          {jobs.judul}
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="border-t-2 border-gray-300 my-6"></div>
          <Image
            src={jobs.gambar || defaultImage}
            alt={jobs.judul}
            width={480}
            height={240}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
          <div>
            <p className="text-lg text-gray-700 mb-4 text-justify">
              {jobs.deskripsi}
            </p>
            <div className="border-t-2 border-gray-300"></div>
            <div className="text-2xl font-bold mb-2 flex items-center">
              Informasi Perusahaan
            </div>
            {jobs.namaPT && (
              <p className="text-lg text-gray-600 mb-2 flex items-center">
                <FaBuilding /> NamaPT: {jobs.namaPT}
              </p>
            )}
            {jobs.alamat && (
              <p className="text-lg text-gray-600 mb-2 flex items-center">
                <TbMapSearch /> Alamat: {jobs.alamat}
              </p>
            )}
            {jobs.email && (
              <p className="text-lg text-gray-600 mb-2 flex items-center">
                <FaEnvelope /> Email: {jobs.email}
              </p>
            )}
            {jobs.nomorTelepon && (
              <p className="text-lg text-gray-600 mb-2 flex items-center">
                <FaPhone /> Nomor Telepon: {jobs.nomorTelepon}
              </p>
            )}
            {jobs.persyaratan && (
              <>
                <div className="border-t-2 border-gray-300 my-6"></div>
                <div className="flex items-center mb-2">
                  <FaUser className="mr-2 text-gray-600 text-lg" />
                  <h2 className="text-lg font-bold">Persyaratan</h2>
                </div>
                <ul>
                  {jobs.persyaratan.map((item, index) => (
                    <li
                      key={index}
                      className="text-lg list-disc mx-6 text-gray-600 mb-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {jobs.openrekrutmen && (
              <>
                <div className="border-t-2 border-gray-300 my-6"></div>
                <div className="flex items-center mb-2">
                  <FaClipboardList className="mr-2 text-gray-600 text-lg" />
                  <h2 className="text-lg font-bold">Open Recruitment</h2>
                </div>
                <ul>
                  {jobs.openrekrutmen.map((item, index) => (
                    <li
                      key={index}
                      className="text-lg list-disc mx-6 text-gray-600 mb-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="border-t-2 border-gray-300 my-6"></div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center">
        <Button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleApplay}
        >
          Daftar
        </Button>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default PostinganDetail;
