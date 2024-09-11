"use client"
import React, { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import AddUserModal from "./AddModal";
import EditUserModal from "./EditModal";
import DeleteConfirmModal from "./DeleteConfirmasiModal";
import toast, { Toaster } from "react-hot-toast";
import DashboardLayout from "@/app/Admin/layouts";

interface User {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  peran: string;
  jurusan: string;
  tanggallahir: string;
  nomortelepon: string;
  password?: string;
  gambar: string;
  NIS: string;
}

const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleteUserName, setDeleteUserName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get<User[]>("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchUsers();
  };

  const handleShowEditModal = (user: User) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditUser(null);
    fetchUsers();
  };

  const handleConfirmDelete = (userId: number, userName: string) => {
    setDeleteUserId(userId);
    setDeleteUserName(userName);
  };

  const handleCancelDelete = () => {
    toast("Penghapusan pengguna " + deleteUserName + " dibatalkan", {
      position: "top-center",
    });
    setDeleteUserId(null);
    setDeleteUserName("");
  };

  const handleDeleteUser = async () => {
    if (deleteUserId !== null) {
      try {
        await axiosInstance.delete(`/users/${deleteUserId}`);
        toast.success("Pengguna " + deleteUserName + " berhasil dihapus", {
          position: "top-center",
        });
        fetchUsers();
        setDeleteUserId(null);
        setDeleteUserName("");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Gagal menghapus pengguna " + deleteUserName, {
          position: "top-center",
        });
        setDeleteUserId(null);
        setDeleteUserName("");
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axiosInstance.post("/users/excel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("File berhasil diupload dan pengguna berhasil diimpor.", {
          position: "top-center",
        });
        fetchUsers();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Gagal mengupload file.", { position: "top-center" });
      }
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const downloadFileUrl =
    "https://docs.google.com/spreadsheets/d/1fSQh5jT1651ruXcPxOiM3Q77aYt2P_cb/edit?usp=sharing&ouid=102677950529644945883&rtpof=true&sd=true";

  return (
    <DashboardLayout>
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />
      <header className="flex justify-between items-center border-b pb-2 mt-10 mb-6">
        <h1 className="text-2xl font-bold text-center">Manajemen Pengguna</h1>
      </header>
      <div className="relative bg-white shadow-2xl rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 rounded-lg">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
              <div className="flex flex-wrap md:flex-nowrap space-x-4 mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-sm bg-gray-200 file-input-bordered file-input-success w-full max-w-xs mb-2 md:mb-0"
                  accept=".xlsx, .xls"
                />
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="btn btn-success btn-sm mb-2 md:mb-0"
                >
                  Upload
                </button>
                <a
                  href={downloadFileUrl}
                  download
                  className="btn btn-primary btn-sm mb-2 md:mb-0"
                >
                  Download Template
                </a>
                <button
                  className="btn btn-success btn-sm ml-auto flex items-center"
                  onClick={handleShowAddModal}
                >
                  <FaPlus className="mr-2" /> Tambah Users
                </button>
              </div>
            </caption>
            <thead className="text-xs text-black uppercase bg-blue-800 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  NIS
                </th>
                <th scope="col" className="px-4 py-3">
                  Gambar
                </th>
                <th scope="col" className="px-4 py-3">
                  Nama
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Alamat
                </th>
                <th scope="col" className="px-4 py-3">
                  Peran
                </th>
                <th scope="col" className="px-4 py-3">
                  Jurusan
                </th>
                <th scope="col" className="px-4 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="px-4 py-4">{user.NIS}</td>
                  <td className="px-4 py-4">
                    {user.gambar ? (
                      <Image
                        src={user.gambar}
                        alt="User Avatar"
                        width={48}
                        height={48}
                        className="object-cover rounded-sm"
                      />
                    ) : (
                      <span className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-sm">
                        <FaUser className="text-gray-500 text-2xl" />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">{user.nama}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.alamat}</td>
                  <td className="px-4 py-4">{user.peran}</td>
                  <td className="px-4 py-4">{user.jurusan}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 text-right text-sm font-medium">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleShowEditModal(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-white mt-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleConfirmDelete(user.id, user.nama)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={handleCloseAddModal}
          onSave={function (): void {}}
        />
      )}
      {showEditModal && editUser && (
        <EditUserModal
          user={editUser}
          onClose={handleCloseEditModal}
          onSave={fetchUsers}
        />
      )}
      {deleteUserId !== null && (
        <DeleteConfirmModal
          userName={deleteUserName}
          onConfirm={handleDeleteUser}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
    </DashboardLayout>
  );
};

export default UserManagementTable;
