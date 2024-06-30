import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaUserShield,
  FaHotel,
} from "react-icons/fa";
import UserModal from "./Modal"; // Sesuaikan path sesuai dengan struktur proyek Anda

interface User {
  id: string;
  nama: string;
  email: string;
  kataSandi: string;
  alamat: string;
  nomortelepon: string;
  gambar: string | undefined;
  peran: string;
  jurusan: string;
}

const Maincontent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Sesuaikan dengan tipe data User Anda
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const userCount = users.length;
  const adminCount = users.filter((user) => user.peran === "ADMIN").length;
  const perhotelanCount = users.filter(
    (user) => user.jurusan === "PERHOTELAN"
  ).length;

  const openModal = (mode: "add" | "edit" | "delete", user?: User) => {
    setModalMode(mode);
    setSelectedUser(user || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setModalMode("add"); // Reset modal mode to 'add' after closing
    setError(null); // Clear any previous errors
  };

  const handleEdit = (user: User) => {
    openModal("edit", user);
  };

  const handleDelete = (user: User) => {
    openModal("delete", user);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`/users/${selectedUser.id}`);
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      closeModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  const handleSubmitModal = async (formData: User) => {
    try {
      if (modalMode === "add") {
        await axios.post("/users", formData);
      } else if (modalMode === "edit") {
        await axios.put(`/users/${formData.id}`, formData);
      }

      // Refresh user list after add or edit
      const response = await axios.get<User[]>("/users");
      setUsers(response.data);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save changes.");
    }
  };

  return (
    <div className="main-content">
      <header className="mb-4 flex justify-between items-center border-b pb-2">
        <h1 className="text-2xl font-bold text-center w-full">
          Users Information
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded shadow flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl">{userCount}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded shadow flex items-center">
          <FaUserShield className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Admins</h2>
            <p className="text-2xl">{adminCount}</p>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow flex items-center">
          <FaHotel className="text-purple-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Users Perhotelan</h2>
            <p className="text-2xl">{perhotelanCount}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition duration-300"
          onClick={() => openModal("add")}
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300 text-left">
                Nama
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Peran
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Email
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Gambar
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Jurusan
              </th>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-2 px-4 border border-gray-300">
                  {user.nama}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {user.peran}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {user.email}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {user.gambar ? (
                    <div className="relative w-10 h-10">
                      <Image
                        src={`http://localhost:2000/${user.gambar.replace(
                          "uploads\\",
                          "uploads/"
                        )}`}
                        alt={user.nama}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {user.jurusan}
                </td>
                <td className="py-2 px-4 border border-gray-300 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(user)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        user={selectedUser}
        onSubmit={handleSubmitModal}
        onDelete={handleConfirmDelete}
        error={error}
      />
    </div>
  );
};

export default Maincontent;
