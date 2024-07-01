import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Job {
  judul: string;
  gambar?: string;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Job[]>("/jobs");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-center font-bold text-2xl">INFORMASI JOBS</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg- dark:text-white dark:bg-gray-800">
          Job Listings
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse the list of available jobs along with their details.
          </p>
          <button
            type="button"
            className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <div className="flex items-center ">
            <FaPlus /> <p className="ml-1">Tambahkan</p>
            </div>
          </button>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Judul
            </th>
            <th scope="col" className="px-6 py-3">
              Gambar
            </th>
            <th scope="col" className="px-6 py-3">
              Nama PT
            </th>
            <th scope="col" className="px-6 py-3">
              Alamat
            </th>
            <th scope="col" className="px-6 py-3">
              Nomor Telepon
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {job.judul}
              </td>
              <td className="px-6 py-4">
                {job.gambar ? (
                  <img
                    src={job.gambar}
                    alt={job.judul}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="px-6 py-4">{job.namaPT}</td>
              <td className="px-6 py-4">{job.alamat}</td>
              <td className="px-6 py-4">{job.nomorTelepon}</td>
              <td className="px-6 py-4">{job.email}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
