import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

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
  
  // State for dynamic inputs
  const [administrasi, setAdministrasi] = useState<string[]>(pelatihan.administrasi);
  const [skills, setSkills] = useState<string[]>(pelatihan.skills);
  const [fasilitas, setFasilitas] = useState<string[]>(pelatihan.fasilitas);
  
  useEffect(() => {
    setUpdatedPelatihan({ ...pelatihan });
    setImagePreview(pelatihan.gambar || null);
    setAdministrasi(pelatihan.administrasi);
    setSkills(pelatihan.skills);
    setFasilitas(pelatihan.fasilitas);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, category: 'administrasi' | 'skills' | 'fasilitas') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;
      if (value) {
        if (category === 'administrasi') {
          setAdministrasi((prev) => [...prev, value]);
        } else if (category === 'skills') {
          setSkills((prev) => [...prev, value]);
        } else if (category === 'fasilitas') {
          setFasilitas((prev) => [...prev, value]);
        }
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleDelete = (category: 'administrasi' | 'skills' | 'fasilitas', index: number) => {
    if (category === 'administrasi') {
      setAdministrasi((prev) => prev.filter((_, i) => i !== index));
    } else if (category === 'skills') {
      setSkills((prev) => prev.filter((_, i) => i !== index));
    } else if (category === 'fasilitas') {
      setFasilitas((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...updatedPelatihan,
        administrasi,
        skills,
        fasilitas
      };
      await axiosInstance.put(`/pelatihan/${pelatihan.id}`, updatedData);
      onEdit(pelatihan.id, updatedData);
      toast.success('Pelatihan berhasil diperbarui!', { position: "top-center" });
      onClose();
    } catch (error) {
      console.error("Error updating pelatihan:", error);
      toast.error('Gagal memperbarui pelatihan.', { position: "top-center" });
    }
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
           <Image
           src={imagePreview as string}
           alt="Preview"
           width={128} // 32 * 4, since 1 unit in Tailwind is 4px by default
           height={128} // 32 * 4
           className="object-cover mb-4"
         />
         
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
          <div className="space-y-4">
            <label htmlFor="fasilitas" className="block text-sm font-medium text-gray-700">
              Fasilitas
            </label>
            <input
              type="text"
              placeholder="Tambahkan fasilitas"
              onKeyDown={(e) => handleKeyDown(e, 'fasilitas')}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <ul>
              {fasilitas.map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDelete('fasilitas', index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              placeholder="Tambahkan skill"
              onKeyDown={(e) => handleKeyDown(e, 'skills')}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <ul>
              {skills.map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDelete('skills', index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <label htmlFor="administrasi" className="block text-sm font-medium text-gray-700">
              Administrasi
            </label>
            <input
              type="text"
              placeholder="Tambahkan administrasi"
              onKeyDown={(e) => handleKeyDown(e, 'administrasi')}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <ul>
              {administrasi.map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDelete('administrasi', index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
