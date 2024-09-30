"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaBookmark } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import defaultImage from "@/app/public/assets/image.png";
import Topbar from "../Components/TopBar";

interface Jobs {
  id: number;
  namaPT: string;
  deskripsi: string;
  openrekrutmen: string[];
  gambar?: string;
  deadline?: string;
  tanggalDibuat: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Jobs[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("date");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Jobs[]>("/jobs");
        const jobsData = response.data;

        // Extract unique categories from openrekrutmen
        const allCategories = new Set<string>();
        jobsData.forEach((job) => {
          job.openrekrutmen.forEach((cat) => allCategories.add(cat));
        });
        const categoriesArray = Array.from(allCategories);
        setCategories(categoriesArray);
        setJobs(jobsData);
        setFilteredJobs(jobsData); // Initially show all jobs
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let sortedJobs = [...jobs];
  
    // Filter by search term
    if (searchTerm) {
      sortedJobs = sortedJobs.filter((job) =>
        job.namaPT.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Remove jobs with expired deadlines
    sortedJobs = sortedJobs.filter((job) => {
      const deadlineDate = new Date(job.deadline || "");
      const now = new Date();
      return deadlineDate.getTime() > now.getTime();
    });
  
    // Sorting logic
    if (selectedSortOption === "date") {
      sortedJobs.sort(
        (a, b) =>
          new Date(b.tanggalDibuat).getTime() - new Date(a.tanggalDibuat).getTime()
      );
    } else if (selectedSortOption === "name") {
      sortedJobs.sort((a, b) => a.namaPT.localeCompare(b.namaPT));
    } else if (selectedSortOption === "deadline") {
      sortedJobs.sort((a, b) => {
        const deadlineA = new Date(a.deadline || "").getTime();
        const deadlineB = new Date(b.deadline || "").getTime();
        return deadlineA - deadlineB; // Ascending order
      });
    }
  
    if (selectedCategory === "all") {
      setFilteredJobs(sortedJobs);
    } else {
      setFilteredJobs(
        sortedJobs.filter((job) => job.openrekrutmen.includes(selectedCategory))
      );
    }
  }, [selectedCategory, selectedSortOption, searchTerm, jobs]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSortOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const calculateDaysRemaining = (deadline?: string) => {
    if (!deadline) return "N/A";
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? `${daysRemaining} hari lagi` : "Expired";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds: number = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    const diffInDays: number = Math.floor(diffInHours / 24);
    const diffInWeeks: number = Math.floor(diffInDays / 7);
    const diffInMonths: number = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) {
      return "Baru Saja";
    } else if (diffInMinutes === 1) {
      return "1 menit yang lalu";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours === 1) {
      return "1 jam yang lalu";
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else if (diffInDays === 1) {
      return "1 hari yang lalu";
    } else if (diffInDays < 7) {
      return `${diffInDays} hari yang lalu`;
    } else if (diffInWeeks === 1) {
      return "1 minggu yang lalu";
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} minggu yang lalu`;
    } else if (diffInMonths === 1) {
      return "1 bulan yang lalu";
    } else {
      return `${diffInMonths} bulan yang lalu`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Topbar />
      {/* Search Input */}
      <div className="relative w-full max-w-md mb-5">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Temukan Pekerjaan Disini.. "
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      {/* Category and Sorting Dropdowns */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
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
        {categories.map((cat, index) => (
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

        {/* Sort Dropdown */}
      </div>
      <select
        value={selectedSortOption}
        onChange={handleSortChange}
        className="px-4 py-2 mb-5 rounded-lg bg-gray-200 text-gray-800 border border-gray-300"
      >
        <option value="date">Tanggal</option>
        <option value="name">Nama</option>
        <option value="name">deadline</option>
      </select>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Skeleton Loader */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-64 rounded-lg shadow-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredJobs.map((job) => (
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
              <p className="mt-4 mx-4 text-sm text-gray-500">
                Dibuat: {formatDate(job.tanggalDibuat)}
              </p>

              <div className="p-5">
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                  {job.openrekrutmen &&
                    job.openrekrutmen.map((item, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mr-2"
                      >
                        #{item}
                      </span>
                    ))}
                </p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {job.namaPT}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {truncateDescription(job.deskripsi)}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Daftar
                  </Link>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  {" "}
                  Berakhir :{calculateDaysRemaining(job.deadline)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
