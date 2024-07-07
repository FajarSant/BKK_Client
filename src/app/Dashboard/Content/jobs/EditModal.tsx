import React, { useState, useEffect } from 'react';
import { Job } from './type'; // Pastikan untuk mengimpor dari lokasi yang benar
import { axiosInstance } from '@/lib/axios';
import { toast } from 'react-hot-toast';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  job: Job | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onEdit, job }) => {
  const initialEditedJob: Partial<Job> = {
    judul: '',
    namaPT: '',
    deskripsi: '',
    persyaratan: [], // Inisialisasi sebagai array kosong
    openrekrutmen: [], // Inisialisasi sebagai array kosong
    gambar: '',
    alamat: '',
    email: '',
    nomorTelepon: ''
  };

  const [editedJob, setEditedJob] = useState<Partial<Job>>(initialEditedJob);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (job) {
      setEditedJob({
        judul: job.judul,
        namaPT: job.namaPT,
        deskripsi: job.deskripsi || '',
        persyaratan: job.persyaratan || [], // Pastikan untuk menangani nilai undefined dengan default []
        openrekrutmen: job.openrekrutmen || [], // Pastikan untuk menangani nilai undefined dengan default []
        gambar: job.gambar || '',
        alamat: job.alamat,
        email: job.email,
        nomorTelepon: job.nomorTelepon
      });
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedJob(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (field: 'persyaratan' | 'openrekrutmen', index: number, value: string) => {
    const newArray = [...(editedJob[field] || [])];
    newArray[index] = value;
    setEditedJob(prevState => ({
      ...prevState,
      [field]: newArray
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosInstance.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditedJob(prevState => ({
        ...prevState,
        gambar: response.data.imageUrl // Ganti dengan property yang sesuai pada response
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!job) return;
      await axiosInstance.put(`/jobs/${job.id}`, editedJob as Job);
      onEdit();
      toast.success('Job updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Error updating job. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-10 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="judul" className="block text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={editedJob.judul}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="namaPT" className="block text-sm font-medium text-gray-700">
              Nama PT
            </label>
            <input
              type="text"
              id="namaPT"
              name="namaPT"
              value={editedJob.namaPT}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={editedJob.deskripsi}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="persyaratan" className="block text-sm font-medium text-gray-700">
              Persyaratan
            </label>
            {editedJob.persyaratan && editedJob.persyaratan.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('persyaratan', index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ))}
            <button
              type="button"
              onClick={() => setEditedJob(prevState => ({ ...prevState, persyaratan: [...(prevState.persyaratan || []), ''] }))}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tambah Persyaratan
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="openrekrutmen" className="block text-sm font-medium text-gray-700">
              Open Rekrutmen
            </label>
            {editedJob.openrekrutmen && editedJob.openrekrutmen.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('openrekrutmen', index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ))}
            <button
              type="button"
              onClick={() => setEditedJob(prevState => ({ ...prevState, openrekrutmen: [...(prevState.openrekrutmen || []), ''] }))}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tambah Open Rekrutmen
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">
              Gambar
            </label>
            <input
              type="file"
              id="gambar"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={editedJob.alamat}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedJob.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Simpan
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="absolute top-0 right-0 mt-3 mr-3 text-gray-400 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditModal;
