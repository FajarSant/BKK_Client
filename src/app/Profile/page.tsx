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
  lamaran: {
    id: string;
    pekerjaan: {
      id: string;
      judul: string;
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
      judul: string;
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
    gambar: "",
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
      const response = await axiosInstance.put(
        `/users/${user.id}`,
        {
          nama: editFormData.nama,
          alamat: editFormData.alamat,
          email: editFormData.email,
          nomortelepon: editFormData.nomortelepon,
          gambar: editFormData.gambar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
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
              <div key={item.id} className="relative">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.judul}
                  </h3>
                  <p className="text-gray-600">Ditambahkan oleh: {user.nama}</p>
                  <div className="flex justify-end mt-2">
                    <span className="text-blue-500 hover:underline flex items-center">
                      <FaInfoCircle className="mr-1" />
                      Detail
                    </span>
                    <button
                      onClick={() =>
                        openConfirmationModal(item.id, "lowonganTersimpan")
                      }
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">LAMARAN</div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.lamaran?.map((item) => (
              <div key={item.id} className="relative">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.judul}
                  </h3>
                  <p className="text-gray-600">
                    Ditambahkan oleh: {item.pengguna?.nama}
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      className={`${
                        item.status === "DIPROSES"
                          ? "text-yellow-500"
                          : item.status === "DITERIMA"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <div className="flex justify-end mt-2">
                    <span className="text-blue-500 hover:underline flex items-center">
                      <FaInfoCircle className="mr-1" />
                      Detail
                    </span>
                    <button
                      onClick={() => openConfirmationModal(item.id, "lamaran")}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-box bg-white w-3/4 md:w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  value={editFormData.nama}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Alamat
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={editFormData.alamat}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block  text-gray-700 font-semibold mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  name="nomortelepon"
                  value={editFormData.nomortelepon}
                  onChange={handleChange}
                  className="w-full input input-bordered  px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Gambar
                </label>
                <input
              type="file"
              name="gambar"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              className="mb-2"
            />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full md:w-1/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus item ini?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeConfirmationModal}
                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
