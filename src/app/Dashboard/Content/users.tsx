import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Define the Job interface
interface Job {
  id: string;
  judul: string;
  perusahaan: {
    id: string;
    nama: string;
    deskripsi: string;
    alamat: string;
    email: string;
  };
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get<Job[]>('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (jobId: string) => {
    alert(`Edit job dengan ID: ${jobId}`);
  };

  const handleDelete = (jobId: string) => {
    alert(`Hapus job dengan ID: ${jobId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="container mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Information</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Job
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Job Title</th>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Company Description</th>
              <th className="py-2 px-4 border-b">Company Address</th>
              <th className="py-2 px-4 border-b">Company Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{job.judul}</td>
                <td className="py-2 px-4">{job.perusahaan.nama}</td>
                <td className="py-2 px-4">{job.perusahaan.deskripsi}</td>
                <td className="py-2 px-4">{job.perusahaan.alamat}</td>
                <td className="py-2 px-4">{job.perusahaan.email}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleEdit(job.id)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                    onClick={() => handleDelete(job.id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
