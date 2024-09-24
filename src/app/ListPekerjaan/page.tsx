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
  tanggalDibuat: string; // Ensure this field is available for sorting
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

    // Sorting logic
    if (selectedSortOption === "date") {
      sortedJobs.sort(
        (a, b) =>
          new Date(b.tanggalDibuat).getTime() - new Date(a.tanggalDibuat).getTime()
      );
    } else if (selectedSortOption === "name") {
      sortedJobs.sort((a, b) => a.namaPT.localeCompare(b.namaPT));
    }

    if (selectedCategory === "all") {
      setFilteredJobs(sortedJobs);
    } else {
      setFilteredJobs(
        sortedJobs.filter((job) =>
          job.openrekrutmen.includes(selectedCategory)
        )
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Topbar/>
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
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
