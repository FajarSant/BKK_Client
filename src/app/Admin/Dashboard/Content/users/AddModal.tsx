import React, { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface AddUserModalProps {
  onClose: () => void;
  onSave: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSave }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [NIS, setNIS] = useState("");
  const [katasandi, setKatasandi] = useState("");
  const [tanggallahir, setTanggallahir] = useState<Date | null>(null);
  const [alamat, setAlamat] = useState("");
  const [nomortelepon, setNomorTelepon] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [peran, setPeran] = useState("PENGGUNA");
  const [jurusan, setJurusan] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("NIS", NIS);
    formData.append("katasandi", katasandi);
    if (tanggallahir) {
      formData.append("tanggallahir", tanggallahir.toISOString());
    }
    formData.append("alamat", alamat);
    formData.append("nomortelepon", nomortelepon);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    formData.append("peran", peran);
    formData.append("jurusan", jurusan);

    try {
      await axiosInstance.post("/users", formData);
      toast.success("User successfully added!");
      onSave(); // Call the onSave function to handle post-save actions
      onClose(); // Close the modal after successful save
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setGambar(event.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white modal-box w-1/2 max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIS
            </label>
            <input
              type="text"
              value={NIS}
              onChange={(e) => setNIS(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Katasandi
            </label>
            <input
              type="password"
              value={katasandi}
              onChange={(e) => setKatasandi(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Lahir
            </label>
            <DatePicker
              selected={tanggallahir}
              onChange={(date) => setTanggallahir(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              customInput={<input />}
            />
            <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="text"
              value={nomortelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peran
            </label>
            <select
              value={peran}
              onChange={(e) => setPeran(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="PENGGUNA">PENGGUNA</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurusan
            </label>
            <select
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              required
            >
              <option value="">Select Jurusan</option>
              <option value="PERHOTELAN">PERHOTELAN</option>
              <option value="TBSM">TBSM</option>
              <option value="TKR">TKR</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
