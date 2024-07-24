"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import Topbar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { axiosInstance } from "@/lib/axios";

// Define User interface
interface User {
  id: string;
  email: string;
  nama: string;
  alamat: string;
  nomortelepon: string;
  gambar: string | null;
  peran: string;
  jurusan: string;
  NIS: string; // Added NIS field
  lamaran: {
    id: string;
    pekerjaan: {
      id: string;
      namaPT: string;
    };
    status: string;
    tanggalDibuat: string;
    pengguna?: {
      nama: string;
    };
  }[];
  lowonganTersimpan: {
    id: string;
    pekerjaan: {
      id: string;
      namaPT: string;
    };
  }[];
}

// UserProfile component
const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedItemType, setSelectedItemType] = useState<
    "lamaran" | "lowonganTersimpan" | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    nomortelepon: "",
    gambar: "" as string | File, // Adjusted type
    NIS: "", // Added NIS field
  });
  const [profileUpdatedAt, setProfileUpdatedAt] = useState<number>(Date.now());

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axiosInstance.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setEditFormData({
            nama: response.data.nama,
            alamat: response.data.alamat,
            email: response.data.email,
            nomortelepon: response.data.nomortelepon,
            gambar: response.data.gambar || "",
            NIS: response.data.NIS || "", // Initialize NIS field
          });
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUser();
  }, [profileUpdatedAt]);

  const handleDelete = async () => {
    if (!selectedItemId || !selectedItemType || !user) return;

    try {
      const url =
        selectedItemType === "lowonganTersimpan"
          ? `/savejobs/${selectedItemId}`
          : `/application/${selectedItemId}`;

      await axiosInstance.delete(url);
      setUser((prevUser) => {
        if (!prevUser) return null;

        if (selectedItemType === "lowonganTersimpan") {
          return {
            ...prevUser,
            lowonganTersimpan: prevUser.lowonganTersimpan.filter(
              (item) => item.id !== selectedItemId
            ),
          };
        } else {
          return {
            ...prevUser,
            lamaran: prevUser.lamaran.filter(
              (item) => item.id !== selectedItemId
            ),
          };
        }
      });

      // Show success toast for deletion
      toast.success(
        `${
          selectedItemType === "lowonganTersimpan"
            ? "Lowongan tersimpan"
            : "Lamaran"
        } berhasil dihapus!`,
        {
          position: "top-center",
        }
      );
    } catch (error) {
      console.error("Failed to delete item", error);
      toast.error("Gagal menghapus item");
    } finally {
      closeConfirmationModal(); // Close modal after delete attempt
    }
  };

  const handleEditProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token || !user) return;

    try {
      const formData = new FormData();
      formData.append("nama", editFormData.nama);
      formData.append("alamat", editFormData.alamat);
      formData.append("email", editFormData.email);
      formData.append("nomortelepon", editFormData.nomortelepon);
      formData.append("NIS", editFormData.NIS); // Add NIS to FormData
      if (editFormData.gambar)
        formData.append("gambar", editFormData.gambar as File);

      const response = await axiosInstance.put(`/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data);
      toast.success("Profil berhasil diperbarui!", { position: "top-center" });
      closeEditModal();
      setProfileUpdatedAt(Date.now()); // Trigger profile update
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Gagal memperbarui profil");
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openConfirmationModal = (
    itemId: string,
    itemType: "lamaran" | "lowonganTersimpan"
  ) => {
    setSelectedItemId(itemId);
    setSelectedItemType(itemType);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedItemId("");
    setSelectedItemType(null);
    setIsConfirmationModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            {user.gambar ? (
              <img
                src={user.gambar}
                alt={user.nama}
                className="w-32 h-32 object-cover"
              />
            ) : (
              "No Image"
            )}
          </div>
          <div className="flex-1 ml-6 md:ml-12">
            <div className="flex flex-col md:flex-row items-center md:items-baseline">
              <h2 className="text-2xl font-semibold text-gray-700">
                {user.nama}
              </h2>
              <p className="text-sm text-gray-500">{user.peran}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-4">
              <p className="mr-4">
                <span className="font-semibold">Alamat:</span> {user.alamat}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Jurusan:</span> {user.jurusan}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Nomor Telepon:</span>{" "}
                {user.nomortelepon}
              </p>
              <p className="mr-4">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="mr-4">
                <span className="font-semibold">NIS:</span> {user.NIS}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
            onClick={openEditModal}
          >
            Edit Profile
          </button>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">
            LAMARAN TERSIMPAN
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.lowonganTersimpan?.map((item) => (
              <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  {item.pekerjaan.namaPT}
                </h3>
                <button
                  onClick={() =>
                    openConfirmationModal(item.id, "lowonganTersimpan")
                  }
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-6">
            <div className="font-bold text-center mt-4 underline">LAMARAN</div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.lamaran?.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-lg shadow"
                >
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.namaPT}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tanggal Dibuat:{" "}
                    {new Date(item.tanggalDibuat).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p
                    className={`indicator-item badge ${
                      item.status === "DIKIRIM"
                        ? "text-blue-500"
                        : item.status === "DIPROSES"
                        ? "text-yellow-500"
                        : item.status === "DITERIMA"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {item.status}
                  </p>
                  <button
                    onClick={() => openConfirmationModal(item.id, "lamaran")}
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold">Konfirmasi Hapus</h2>
            <p className="mt-2">
              Apakah Anda yakin ingin menghapus{" "}
              {selectedItemType === "lowonganTersimpan"
                ? "lowongan tersimpan"
                : "lamaran"}{" "}
              ini?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Hapus
              </button>
              <button
                className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={closeConfirmationModal}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={editFormData.nama}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={editFormData.alamat}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="nomortelepon"
                className="block text-sm font-medium text-gray-700"
              >
                Nomor Telepon
              </label>
              <input
                type="text"
                id="nomortelepon"
                name="nomortelepon"
                value={editFormData.nomortelepon}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="NIS"
                className="block text-sm font-medium text-gray-700"
              >
                NIS
              </label>
              <input
                type="text"
                id="NIS"
                name="NIS"
                value={editFormData.NIS}
                readOnly
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gambar"
                className="block text-sm font-medium text-gray-700"
              >
                Gambar
              </label>
              <input
                type="file"
                id="gambar"
                name="gambar"
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleEditProfile}
              >
                Simpan
              </button>
              <button
                className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={closeEditModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
