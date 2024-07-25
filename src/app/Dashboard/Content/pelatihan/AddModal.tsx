import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '@/lib/axios'; // Import axios instance Anda

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    namapelatihan: '',
    gambar: null as File | null,
    alamat: '',
    deskripsi: '',
    administrasi: [] as string[],
    skills: [] as string[],
    fasilitas: [] as string[],
    nomortelepon: '',
    email: '',
    Link: '',
  });

  const [gambarPreview, setGambarPreview] = useState<string | ArrayBuffer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, gambar: file }));
      
      // Generate a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setGambarPreview(null); // Reset preview if no file is selected
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'administrasi' | 'skills' | 'fasilitas') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !formData[field].includes(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: [...prevData[field], value],
        }));
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleDelete = (field: 'administrasi' | 'skills' | 'fasilitas', index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const { namapelatihan, gambar, alamat, deskripsi, administrasi, skills, fasilitas, email, nomortelepon, Link } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append('namapelatihan', namapelatihan);
      formDataToSend.append('alamat', alamat);
      formDataToSend.append('deskripsi', deskripsi);
      formDataToSend.append('email', email);
      formDataToSend.append('nomortelepon', nomortelepon);
      formDataToSend.append('Link', Link);
      formDataToSend.append('administrasi', JSON.stringify(administrasi));
      formDataToSend.append('skills', JSON.stringify(skills));
      formDataToSend.append('fasilitas', JSON.stringify(fasilitas));

      // Add the file with a custom name
      if (gambar && namapelatihan) {
        const fileName = `${namapelatihan}-${gambar.name}`;
        formDataToSend.append('gambar', gambar, fileName);
      }

      await axiosInstance.post('/pelatihan', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Pelatihan added successfully!');
      onAdd(formData);
      onClose();
    } catch (error) {
      toast.error('Failed to add pelatihan!');
      console.error('Error adding pelatihan:', error);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white modal-box p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Tambah Pelatihan</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="namapelatihan"
            value={formData.namapelatihan}
            onChange={handleChange}
            placeholder="Nama Pelatihan"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="file"
            name="gambar"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          {gambarPreview && (
            <div className="w-full mb-4">
              <img
                src={gambarPreview as string}
                alt="Preview"
                className="w-full h-auto border border-gray-300 rounded-md"
              />
            </div>
          )}
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
              {formData.administrasi.map((item, index) => (
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
              {formData.skills.map((item, index) => (
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
              {formData.fasilitas.map((item, index) => (
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
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="nomortelepon"
            value={formData.nomortelepon}
            onChange={handleChange}
            placeholder="Nomor Telepon"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="Link"
            value={formData.Link}
            onChange={handleChange}
            placeholder="Link"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Tambah Pelatihan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
