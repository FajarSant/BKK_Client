"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaBookmark } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/app/public/assets/image.png";

interface Jobs {
  id: number;
  namaPT: string;
  deskripsi: string;
  openrekrutmen: string[];
  gambar?: string;
}

const SkeletonLoader: React.FC = () => (
  <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);

const CardPekerjaan: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Jobs[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [displayedCategories, setDisplayedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [itemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Jobs[]>("/jobs");
        setJobs(response.data);

        // Extract unique categories from openrekrutmen
        const allCategories = new Set<string>();
        response.data.forEach((job) => {
          job.openrekrutmen.forEach((cat) => allCategories.add(cat));
        });
        const categoriesArray = Array.from(allCategories);
        setCategories(categoriesArray);
        setDisplayedCategories(categoriesArray.slice(0, 5));
        setFilteredJobs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(
        jobs.filter((job) => job.openrekrutmen.includes(selectedCategory))
      );
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory, jobs]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleShowMoreCategories = () => {
    const newCategories = categories.slice(
      displayedCategories.length,
      displayedCategories.length + 5
    );
    setDisplayedCategories((prev) => [...prev, ...newCategories]);
  };

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    return words.length > 10
      ? words.slice(0, 10).join(" ") + "..."
      : description;
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
          toast.error("Lamaran sudah disimpan sebelumnya.", {
            position: "top-center",
          });
        } else {
          console.error("Gagal menyimpan job:", error);
          toast.error("Gagal menyimpan job. Silakan coba lagi.", {
            position: "top-center",
          });
        }
      }
    } else {
      toast.error("Harap login terlebih dahulu.", { position: "top-center" });
    }
  };

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
      {/* Category Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === "all"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {displayedCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === cat
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Show More Categories Button */}
      {categories.length > displayedCategories.length && (
        <Link href="/ListPekerjaan">
          <span className="px-4 py-2 bg-slate-500 text-white rounded-lg flex items-center">
            Tampilkan Lainnya
            <svg
              className="w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </span>
        </Link>
      )}
    </div>
  
      {loading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <div className="relative mb-4">
                <Image
                  src={job.gambar || defaultImage}
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
                  {job.openrekrutmen &&
                    job.openrekrutmen.map((item, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mr-2"
                      >
                        {item}
                      </span>
                    ))}
                </p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {job.namaPT}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {truncateDescription(job.deskripsi)}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link href={`/Daftar/${job.id}`}>
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Daftar
                      <svg
                        className="w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </span>
                  </Link>
                  <Link href={`/Postingan/${job.id}`}>
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Detail
                    <svg
                      className="w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </span>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardPekerjaan;
