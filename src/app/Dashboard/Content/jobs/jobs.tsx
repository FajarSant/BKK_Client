import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Job {
  _id: string;
  judul: string;
  namaPT: string;
  deskripsi: string;
  persyaratan: string[] | null | undefined;
  openrekrutmen: string[] | null | undefined;
  gambar?: string | null;
  alamat: string;
  email: string;
  nomorTelepon: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(10); // Ubah jumlah item per halaman sesuai kebutuhan

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Job[]>('/jobs'); // Ganti endpoint sesuai API Anda
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Logic for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = (jobId: string) => {
    alert(`Edit job with ID: ${jobId}`);
  };

  const handleDelete = (jobId: string) => {
    alert(`Delete job with ID: ${jobId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center underline">Informasi Lowongan</h1>
      <div className="bg-gray-200 p-4 rounded-t-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Tambahkan Lowongan</h2>
        <button className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300">
          ADD
        </button>
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">No</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Judul</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Nama PT</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Alamat</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Email</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Telepon</th>
              <th className="py-3 px-4 text-center border-b border-r border-t border-gray-300 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-center border-b border-r border-gray-300">{indexOfFirstJob + index + 1}</td>
                <td className="py-4 px-4 text-left border-r border-b border-gray-300">{job.judul}</td>
                <td className="py-4 px-4 text-center border-b border-r border-gray-300">{job.namaPT}</td>
                <td className="py-4 px-4 text-center border-b border-r border-gray-300">{job.alamat}</td>
                <td className="py-4 px-4 text-center border-b border-r border-gray-300">{job.email}</td>
                <td className="py-4 px-4 text-center border-b border-r border-gray-300">{job.nomorTelepon}</td>
                <td className="py-4 px-4 text-center border-b border-r border-gray-300 ">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center justify-center mb-2 hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(job._id)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center justify-center hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(job._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Menampilkan {indexOfFirstJob + 1} hingga {Math.min(indexOfLastJob, jobs.length)} dari {jobs.length} data
        </p>
        <div className="flex">
          <button
            className={`mx-1 px-4 py-2 bg-white text-black rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            {'Previous'}
          </button>
          {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 bg-white text-black rounded-md ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`mx-1 px-4 py-2 bg-white text-black rounded-md ${
              currentPage === Math.ceil(jobs.length / jobsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
          >
            {'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
