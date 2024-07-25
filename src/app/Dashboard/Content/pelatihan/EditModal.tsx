import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

interface Pelatihan {
  id: string;
  namapelatihan: string;
  gambar?: string;
  alamat: string;
  deskripsi: string;
  administrasi: string[];
  skills: string[];
  fasilitas: string[];
  nomortelepon: string;
  email: string;
  Link: string;
  tanggalDibuat: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  pelatihan: Pelatihan;
  onEdit: (id: string, updatedData: Pelatihan) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, pelatihan, onEdit }) => {
  const [updatedPelatihan, setUpdatedPelatihan] = useState<Pelatihan>({ ...pelatihan });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(pelatihan.gambar || null);

  useEffect(() => {
    setUpdatedPelatihan({ ...pelatihan });
    setImagePreview(pelatihan.gambar || null);
  }, [pelatihan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedPelatihan((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUpdatedPelatihan((prev) => ({ ...prev, gambar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/pelatihan/${pelatihan.id}`, updatedPelatihan);
      onEdit(pelatihan.id, updatedPelatihan);
      toast.success('Pelatihan berhasil diperbarui!',{position:"top-center"});
      onClose();
    } catch (error) {
      console.error("Error updating pelatihan:", error);
      toast.error('Gagal memperbarui pelatihan.,{position:"top-center"}');
    }
  };

  const convertToArray = (data: string | string[]): string[] => {
    return typeof data === "string" ? [data] : data;
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="relative bg-white modal-box p-6 rounded-md shadow-md w-1/2">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <FaTimes size={18} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Pelatihan</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="namapelatihan"
            value={updatedPelatihan.namapelatihan}
            onChange={handleChange}
            placeholder="Nama Pelatihan"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          {imagePreview && (
            <img src={imagePreview as string} alt="Preview" className="w-32 h-32 object-cover mb-4" />
          )}
          <textarea
            name="alamat"
            value={updatedPelatihan.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <textarea
            name="deskripsi"
            value={updatedPelatihan.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <textarea
            name="administrasi"
            value={convertToArray(updatedPelatihan.administrasi).join(", ")}
            onChange={handleChange}
            placeholder="Administrasi"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <textarea
            name="skills"
            value={convertToArray(updatedPelatihan.skills).join(", ")}
            onChange={handleChange}
            placeholder="Skills"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <textarea
            name="fasilitas"
            value={convertToArray(updatedPelatihan.fasilitas).join(", ")}
            onChange={handleChange}
            placeholder="Fasilitas"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="nomortelepon"
            value={updatedPelatihan.nomortelepon}
            onChange={handleChange}
            placeholder="Nomor Telepon"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="email"
            value={updatedPelatihan.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="Link"
            value={updatedPelatihan.Link}
            onChange={handleChange}
            placeholder="Link"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan Perubahan
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 mt-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
