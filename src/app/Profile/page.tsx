"use client"
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
  const [selectedItemType, setSelectedItemType] = useState<"lamaran" | "lowonganTersimpan" | null>(null);

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
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUser();
  }, []);

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
      closeConfirmationModal( ); // Close modal after delete attempt
    }
  };

  const openConfirmationModal = (itemId: string, itemType: "lamaran" | "lowonganTersimpan") => {
    setSelectedItemId(itemId);
    setSelectedItemType(itemType);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedItemId("");
    setSelectedItemType(null);
    setIsConfirmationModalOpen(false);
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
                <span className="font-semibold">Jurusan:</span>{" "}
                {user.jurusan}
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
          <button className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">
            LAMARAN TERSIMPAN
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.lowonganTersimpan.map((item) => (
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
                      onClick={() => openConfirmationModal(item.id, "lowonganTersimpan")}
                      className="ml-2 text-red-500 hover:text-red-700 transition duration-200"
                      title="Delete"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <div className="font-bold text-center mt-4 underline">
            LAMARAN DIDAFTRAKAN
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.lamaran.map((item) => (
              <div key={item.id} className="relative">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer">
                  <h3 className="text-lg font-semibold">
                    {item.pekerjaan.judul}
                  </h3>
                  <p className="text-gray-600">Status: {item.status}</p>
                  <p className="text-gray-600">
                    Daftar Pada:{" "}
                    {new Date(item.tanggalDibuat).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end mt-2">
                    <span className="text-blue-500 hover:underline flex items-center">
                      <FaInfoCircle className="mr-1" />
                      Detail
                    </span>
                    <button
                      onClick={() => openConfirmationModal(item.id, "lamaran")}
                      className="ml-2 text-red-500 hover:text-red-700 transition duration-200"
                      title="Delete"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <p className="text-lg font-semibold mb-4">
              Apakah Anda yakin ingin menghapus{" "}
              {selectedItemType === "lowonganTersimpan" ? "lowongan" : "lamaran"}{" "}
              ini?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={closeConfirmationModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
