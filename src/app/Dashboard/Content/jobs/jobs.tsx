import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { axiosInstance } from '@/lib/axios';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';

interface Job {
  id:string;
  judul: string;
  gambar?: string;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // Fetch data from /jobs endpoint using Axios
    axiosInstance.get<Job[]>('/jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setEditModalOpen(true); // Set editModalOpen to true
  };

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job);
    setDeleteModalOpen(true); // Set deleteModalOpen to true
  };

  const openAddModal = () => {
    setAddModalOpen(true); // Set addModalOpen to true
  };

  const handleEditSave = () => {
    // Logic to handle save in edit modal
    console.log('Save edit');
    setEditModalOpen(false); // Close edit modal after save
  };

  const handleDeleteConfirm = () => {
    // Logic to handle delete confirmation
    console.log('Delete confirmed');
    setDeleteModalOpen(false); // Close delete modal after confirmation
  };

  const handleDeleteCancel = () => {
    // Logic to handle delete cancellation
    console.log('Delete cancelled');
    setDeleteModalOpen(false); // Close delete modal after cancellation
  };

  const handleAdd = () => {
    // Logic to handle add operation
    console.log('Add job');
    setAddModalOpen(false); // Close add modal after adding job
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-center font-bold text-2xl">INFORMASI JOBS</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-200 dark:bg-gray-800">
          Job Listings
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse the list of available jobs along with their details.
          </p>
          <button
            className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={openAddModal}
          >
            <div className="flex items-center">
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => openEditModal(job)} // Ensure correct invocation of openEditModal
                >
                  <FaEdit />
                </button>
                <button
                  className="text-white mt-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => openDeleteModal(job)} // Ensure correct invocation of openDeleteModal
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <EditModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} job={selectedJob} onSave={handleEditSave} />

      {/* Delete Modal */}
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} job={selectedJob} onDelete={handleDeleteConfirm} />

      {/* Add Modal */}
      <AddModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
};

export default JobList;
