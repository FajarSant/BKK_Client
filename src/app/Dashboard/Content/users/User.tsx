import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaHotel,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdEngineering } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import AddUserModal from "./AddModal";
import EditUserModal from "./EditModal";
import DeleteConfirmModal from "./DeleteConfirmasiModal";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

interface User {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  peran: string;
  jurusan: string;
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

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

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
    toast("Penghapusan pengguna " + deleteUserName + " dibatalkan",{position:"top-center"});
    setDeleteUserId(null);
    setDeleteUserName("");
  };

  const handleDeleteUser = async () => {
    if (deleteUserId !== null) {
      try {
        await axiosInstance.delete(`/users/${deleteUserId}`);
        toast.success("Pengguna " + deleteUserName + " berhasil dihapus",{position:"top-center"});
        fetchUsers();
        setDeleteUserId(null);
        setDeleteUserName("");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Gagal menghapus pengguna " + deleteUserName,{position:"top-center"});
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
        await axiosInstance.post("/users/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("File berhasil diupload dan pengguna berhasil diimpor.",{position:"top-center"});
        fetchUsers();
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Gagal mengupload file.",{position:"top-center"});
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

  // URL or path to the file to be downloaded
  const downloadFileUrl = "https://docs.google.com/spreadsheets/d/1fSQh5jT1651ruXcPxOiM3Q77aYt2P_cb/edit?usp=sharing&ouid=102677950529644945883&rtpof=true&sd=true";

  return (
    <div className="container mx-auto p-4">

      <header className="mb-4 flex justify-between items-center border-b pb-2">
        <h1 className="text-2xl font-bold text-center w-full">
          Manajemen Pengguna
        </h1>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded shadow flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Pengguna</h2>
            <p className="text-2xl">{users.length}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow flex items-center">
          <FaUserShield className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Admin</h2>
            <p className="text-2xl">
              {users.filter((user) => user.peran === "ADMIN").length}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow flex items-center">
          <FaUser className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Pengguna</h2>
            <p className="text-2xl">
              {users.filter((user) => user.peran === "PENGGUNA").length}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow flex items-center">
          <TbEngine className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Jurusan TBSM</h2>
            <p className="text-2xl">
              {users.filter((user) => user.jurusan === "TBSM").length}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow flex items-center">
          <MdEngineering className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Jurusan TKR</h2>
            <p className="text-2xl">
              {users.filter((user) => user.jurusan === "TKR").length}
            </p>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow flex items-center">
          <FaHotel className="text-purple-500 text-3xl mr-4" />
          <div>
            <h2 className=" text-base font-semibold">Jurusan Perhotelan</h2>
            <p className="text-2xl">
              {users.filter((user) => user.jurusan === "PERHOTELAN").length}
            </p>
          </div>
        </div>
      </div>
      <div className="relative bg-slate-400 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="container p-4">
          <h2 className="text-xl text-red-500 font-sans mb-4">
            Tambahkan Users dengan menambahkan Excel dibawah ini !!!
          </h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-success w-full max-w-xs mb-4"
            accept=".xlsx, .xls"
          />
          <button
            type="button"
            onClick={handleFileUpload}
            className="btn btn-success ml-2"
          >
            Upload
          </button>
          <a
            href={downloadFileUrl}
            download
            className="btn btn-primary mx-2"
          >
            Download Template
          </a>
        </div>
        <button
          className="btn btn-success mb-4 mx-4"
          onClick={handleShowAddModal}
        >
          <FaPlus className="mr-2" /> Tambah Users
        </button>

        <table className="w-full table-xs text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-slate-500 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                NIS
              </th>
              <th scope="col" className="px-6 py-3">
                Gambar
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Peran
              </th>
              <th scope="col" className="px-6 py-3">
                Jurusan
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <td className="px-6 py-4">{user.NIS}</td>
                <td className="px-6 py-4">
                  {user.gambar ? (
                    <img
                      src={user.gambar}
                      alt="User Avatar"
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  ) : (
                    <span className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full">
                      <FaUser className="text-gray-500 text-2xl" />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{user.nama}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.alamat}</td>
                <td className="px-6 py-4">{user.peran}</td>
                <td className="px-6 py-4">{user.jurusan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      {showAddModal && <AddUserModal onClose={handleCloseAddModal} />}
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
  );
};

export default UserManagementTable;
