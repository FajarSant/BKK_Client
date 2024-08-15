import React, { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; // Import the calendar icon from react-icons

interface EditUserModalProps {
  user: {
    id: number;
    nama: string;
    email: string;
    alamat: string;
    peran: string;
    jurusan: string;
    nomortelepon: string;
    NIS: string;
    tanggallahir?: string;
    katasandi?: string;
    gambar?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    nama: user.nama,
    email: user.email,
    alamat: user.alamat,
    peran: user.peran,
    jurusan: user.jurusan,
    nomortelepon: user.nomortelepon,
    NIS: user.NIS,
    tanggallahir: user.tanggallahir ? new Date(user.tanggallahir) : null,
    katasandi: user.katasandi || "",
    gambar: user.gambar || "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tanggallahir: date,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type.split("/")[1];
      const renamedFile = new File(
        [selectedFile],
        `${formData.NIS}.${fileType}`,
        { type: selectedFile.type }
      );
      setFile(renamedFile);
      setFormData((prevFormData) => ({
        ...prevFormData,
        gambar: URL.createObjectURL(renamedFile),
      }));
    }
  };

  const handleSave = () => {
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (key !== "gambar" && (key !== "katasandi" || value)) {
        if (key === "tanggallahir" && value) {
          updatedData.append(key, (value as Date).toISOString()); // Convert Date to ISO string
        } else if (typeof value === "string") {
          updatedData.append(key, value);
        }
      }
    });

    if (file) {
      updatedData.append("gambar", file);
    }

    axiosInstance
      .put(`/users/${user.id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Pengguna berhasil diperbarui", {
          position: "top-center",
        });
        onSave();
        onClose();
      })
      .catch((error) => {
        toast.error("Gagal memperbarui pengguna", { position: "top-center" });
        console.error("Error updating user:", error);
      });
  };

  const handleClose = () => {
    toast("Modal ditutup tanpa menyimpan perubahan", {
      icon: "👋",
      position: "top-center",
    });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white modal-box p-4 rounded shadow-lg w-1/2 max-w-lg">
        <h2 className="text-xl mb-4">Edit Pengguna</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NIS</label>
          <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2">
            {formData.NIS}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan nama"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan alamat"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Peran</label>
          <select
            name="peran"
            value={formData.peran}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
          >
            <option value="ADMIN">Admin</option>
            <option value="PENGGUNA">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jurusan</label>
          <input
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan jurusan"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="text"
            name="nomortelepon"
            value={formData.nomortelepon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan nomor telepon"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <div className="relative">
            <DatePicker
              selected={formData.tanggallahir}
              onChange={handleDateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white pl-10"
              dateFormat="yyyy-MM-dd"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="katasandi"
            value={formData.katasandi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
            placeholder="Masukkan password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gambar</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
          />
          {formData.gambar && (
            <Image
              src={formData.gambar}
              alt="Gambar Pengguna"
              width={128}
              height={128}
              className="mt-2 object-cover"
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button className="btn btn-success" onClick={handleSave}>
            Simpan
          </button>
          <button className="btn btn-error" onClick={handleClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
