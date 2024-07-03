import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void; // Tambahkan prop onAdd untuk menangani penambahan data
}

interface JobData {
  judul: string;
  namaPT: string;
  deskripsi: string;
  persyaratan: string[];
  openrekrutmen: string[];
  gambar?: string | null;
  alamat: string;
  email: string;
  nomorTelepon: string;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newJob, setNewJob] = useState<JobData>({
    judul: '',
    namaPT: '',
    deskripsi: '',
    persyaratan: [],
    openrekrutmen: [],
    gambar: null,
    alamat: '',
    email: '',
    nomorTelepon: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Reset form fields when modal opens
    if (isOpen) {
      setNewJob({
        judul: '',
        namaPT: '',
        deskripsi: '',
        persyaratan: [],
        openrekrutmen: [],
        gambar: null,
        alamat: '',
        email: '',
        nomorTelepon: '',
      });
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
  };

  const handlePersyaratanChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.trim() !== '' && e.key === 'Enter') {
      setNewJob({
        ...newJob,
        persyaratan: [...newJob.persyaratan, value.trim()],
      });
      e.currentTarget.value = ''; // Clear input after adding
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  const handleOpenrekrutmenChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.trim() !== '' && e.key === 'Enter') {
      setNewJob({
        ...newJob,
        openrekrutmen: [...newJob.openrekrutmen, value.trim()],
      });
      e.currentTarget.value = ''; // Clear input after adding
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewJob({
          ...newJob,
          gambar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!newJob.judul || !newJob.namaPT || !newJob.deskripsi || !newJob.alamat || !newJob.email || !newJob.nomorTelepon) {
      setError('Semua bidang harus diisi!');
      return;
    }

    try {
      // Send data to API using Axios (adjust URL and headers as needed)
      const response = await axiosInstance.post('/jobs', newJob);
      console.log('Job added successfully:', response.data);
      // Close modal after successful submission
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error adding job:', error);
      // Handle error state or display error message
      setError('Gagal menambahkan job. Silakan coba lagi.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tambahkan Job</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="judul"
            placeholder="Judul"
            value={newJob.judul}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="namaPT"
            placeholder="Nama PT"
            value={newJob.namaPT}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={newJob.deskripsi}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={newJob.alamat}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newJob.email}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="nomorTelepon"
            placeholder="Nomor Telepon"
            value={newJob.nomorTelepon}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2">
            Persyaratan:
            <input
              type="text"
              placeholder="Tambahkan persyaratan"
              onKeyDown={handlePersyaratanChange}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ul>
              {newJob.persyaratan.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedPersyaratan = [...newJob.persyaratan];
                      updatedPersyaratan.splice(index, 1);
                      setNewJob({ ...newJob, persyaratan: updatedPersyaratan });
                    }}
                    className="ml-2 text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label className="block mb-2">
            Open Rekrutmen:
            <input
              type="text"
              placeholder="Tambahkan open rekrutmen"
              onKeyDown={handleOpenrekrutmenChange}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ul>
              {newJob.openrekrutmen.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedOpenrekrutmen = [...newJob.openrekrutmen];
                      updatedOpenrekrutmen.splice(index, 1);
                      setNewJob({ ...newJob, openrekrutmen: updatedOpenrekrutmen });
                    }}
                    className="ml-2 text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label className="block mb-2">
            Gambar:
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="mb-2"
            />
            {newJob.gambar && (
              <img
                src={newJob.gambar}
                alt="Preview"
                className="w-16 h-16 object-cover"
              />
            )}
          </label>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Tambahkan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-gray-500 hover:bg-gray-600 mt-2 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
