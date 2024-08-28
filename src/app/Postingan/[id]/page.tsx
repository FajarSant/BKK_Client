"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { TbMapSearch } from "react-icons/tb";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import defaultImage from "@/app/public/assets/image.png";
import { Button } from "@/components/ui/button";
import Topbar from "@/app/Components/TopBar";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import toast from "react-hot-toast";

interface Jobs {
  id: string;
  namaPT: string;
  deskripsi: string;
  persyaratan: string[];
  openrekrutmen: string[];
  gambar?: string;
  alamat?: string;
  berkas: string;
  nomorTelepon?: string;
  email?: string;
}

const PostinganDetail = () => {
  const [jobs, setJobs] = useState<Jobs | null>(null);
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
        console.error("Error fetching data:", error);
      }
    };

    fetchJobData();
  }, []);

  const handleSave = async () => {
    if (jobs) {
      try {
        await axiosInstance.post("/savejobs", { jobId: jobs.id });
        toast.success("Lowongan Tersimpan");
      } catch (error) {
        console.error("Error saving job:", error);
        toast.error("Gagal menyimpan lowongan");
      }
    }
  };

  const handleApply = () => {
    if (jobs) {
      router.push(`/Daftar/${jobs.id}`); // Navigasi ke halaman /Daftar dengan ID pekerjaan
    }
  };

  if (!jobs) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      </div>
    );
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(`Lowongan Pekerjaan di ${jobs.namaPT}`);
  const shareDescription = encodeURIComponent(`
Mencari Kandidat Di Bagian ${jobs.openrekrutmen.join(", ")}.
Alamat : ${jobs.alamat} 
Untuk Informasi Selanjutnya anda bisa Lihat DI halaman dibawah Ini
`);

  // Gunakan URL gambar dari Cloudinary jika tersedia, atau fallback ke defaultImage
  const shareImage = encodeURIComponent(
    jobs.gambar ? jobs.gambar : defaultImage.src
  );

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle} - ${shareDescription}&picture=${shareImage}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle} - ${shareDescription}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}&summary=${shareDescription}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareTitle} - ${shareDescription} ${shareUrl}`;

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <Topbar />
        <div className="lg:w-4/5 mx-auto flex flex-wrap mt-4 shadow-xl mb-5">
          <Image
            src={jobs.gambar ? jobs.gambar : defaultImage.src}
            alt={jobs.namaPT}
            width={480}
            height={240}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 p-2">
            <h2 className="badge badge-primary badge-outline">
              {jobs.openrekrutmen}
            </h2>
            <h1 className="text-gray-900 text-3xl text-center title-font font-medium mb-4 mt-4">
              {jobs.namaPT}
            </h1>
            <div className=" border-b-2 mb-2"></div>
            <p className="leading-relaxed text-justify mb-4">
              {jobs.deskripsi}
            </p>
            <div className=" border-b-2 mb-2"></div>
            <div className="flex font-bold items-center mb-4">
              <FiFileText className="mr-2" />
              <span className="text-gray-600">
                Berkas Yang Diperlukan : {jobs.berkas}
              </span>
            </div>
            <div className=" border-b-2 mb-2"></div>
            <div className="space-y-4 mb-4">
              <div className="flex items-center">
                <FaBuilding className="mr-2" />
                <span className="text-gray-600">
                  Nama Perusahaan: {jobs.namaPT}
                </span>
              </div>
              {jobs.alamat && (
                <div className="flex items-center">
                  <TbMapSearch className="mr-2" />
                  <span className="text-gray-600">Alamat: {jobs.alamat}</span>
                </div>
              )}
              {jobs.email && (
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <span className="text-gray-600">Email: {jobs.email}</span>
                </div>
              )}
              {jobs.nomorTelepon && (
                <div className="flex items-center">
                  <FaPhone className="mr-2" />
                  <span className="text-gray-600">
                    Nomor Telepon: {jobs.nomorTelepon}
                  </span>
                </div>
              )}
            </div>
            {jobs.persyaratan && (
              <>
                <h2 className="text-gray-900 text-2xl title-font font-medium mb-4">
                  Persyaratan
                </h2>
                <ul className="leading-relaxed mb-4 list-disc pl-6">
                  {jobs.persyaratan.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-base md:text-lg"
                onClick={handleApply}
              >
                Daftar
              </Button>
              <Button
                className="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-base md:text-lg"
                onClick={handleSave}
              >
                Simpan
              </Button>
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="justify-center mt-5">
                <h1 className="text-center mb-2">Bagikan Lamaran ini</h1>
                <div className="flex justify-center space-x-4">
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon size={32} round />
                  </a>
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon size={32} round />
                  </a>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon size={32} round />
                  </a>
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon size={32} round />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostinganDetail;
