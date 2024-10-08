"use client";
import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { axiosInstance } from "@/lib/axios";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";
import { Job } from "./type";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/app/Admin/layouts";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [sortBy, setSortBy] = useState<"namaPT" | "tanggalDibuat">("namaPT");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get<Job[]>("/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const handleEditSave = () => {
    setEditModalOpen(false);
    fetchData();
  };

  const handleDeleteConfirm = () => {
    if (!selectedJob) return;

    axiosInstance
      .delete(`/jobs/${selectedJob.id}`)
      .then((response) => {
        console.log("Job deleted successfully:", response);
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== selectedJob.id)
        );
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      })
      .finally(() => {
        fetchData();
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(false);
    fetchData();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Sort jobs based on the selected sort criteria and order
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "namaPT") {
      return sortOrder === "asc"
        ? a.namaPT.localeCompare(b.namaPT)
        : b.namaPT.localeCompare(a.namaPT);
    } else {
      return sortOrder === "asc"
        ? new Date(a.tanggalDibuat).getTime() -
            new Date(b.tanggalDibuat).getTime()
        : new Date(b.tanggalDibuat).getTime() -
            new Date(a.tanggalDibuat).getTime();
    }
  });

  const currentRows = sortedJobs.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(jobs.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <DashboardLayout>
      <div className="container p-4 w-full h-full">
        <Toaster></Toaster>
        <h1 className="text-center mb-4 font-bold text-2xl">INFORMASI JOB</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:bg-gray-800">
              Daftar Job
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Telusuri daftar pekerjaan yang tersedia beserta detailnya.
              </p>
              <div className="flex justify-between items-center mb-4">
                <button
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={openAddModal}
                >
                  <div className="flex items-center">
                    <FaPlus /> <p className="ml-1">Tambahkan</p>
                  </div>
                </button>
                <div>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4"
                    onClick={() => {
                      setSortBy("tanggalDibuat");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Tanggal
                    {sortBy === "tanggalDibuat" &&
                      (sortOrder === "asc" ? (
                        <FaSortAmountDown className="ml-2" />
                      ) : (
                        <FaSortAmountUp className="ml-2" />
                      ))}
                  </button>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      setSortBy("namaPT");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Nama
                    {sortBy === "namaPT" &&
                      (sortOrder === "asc" ? (
                        <FaSortAlphaDown className="ml-2" />
                      ) : (
                        <FaSortAlphaUp className="ml-2" />
                      ))}
                  </button>
                </div>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 p-6 text-center uppercase bg-white  border border-r-0 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
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
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((job, index) => {
                // Determine row color based on index
                const rowColor = index % 2 === 0 ? "bg-white" : "bg-gray-100";

                return (
                  <tr
                    key={index}
                    className={`${rowColor} border-b dark:border-gray-700`}
                  >
                    <td className="px-6 py-4">{indexOfFirstRow + index + 1}</td>
                    <td className="px-6 py-4">
                      {job.gambar ? (
                        <Image
                          src={job.gambar}
                          alt={job.namaPT}
                          width={48} // Set width
                          height={48} // Set height
                          className="object-cover rounded-sm"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </td>
                    <td className="px-6 py-4">{job.namaPT}</td>
                    <td className="px-6 py-4">{job.alamat}</td>
                    <td className="px-6 py-4">{job.nomorTelepon}</td>
                    <td className="px-6 py-4">{job.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2 text-right text-sm font-medium">
                      {new Date(job.tanggalDibuat).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2 text-right text-sm font-medium">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => openEditModal(job)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-white mt-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => openDeleteModal(job)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex bg-white justify-between items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Edit Modal */}
          <EditModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onEdit={handleEditSave}
            job={selectedJob}
          />

          {/* Delete Modal */}
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            job={selectedJob}
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />

          {/* Add Modal */}
          <AddModal
            isOpen={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobList;
