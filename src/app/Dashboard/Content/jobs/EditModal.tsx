import React, { useState, useEffect, useMemo } from 'react';
import { Job } from './type'; // Pastikan import dari lokasi yang benar
import { axiosInstance } from '@/lib/axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  job: Job | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onEdit, job }) => {
  // Mem-memo-kan initialEditedJob
  const initialEditedJob: Partial<Job> = useMemo(() => ({
    berkas: '',
    namaPT: '',
    deskripsi: '',
    persyaratan: [],
    openrekrutmen: [],
    gambar: '',
    jenis: '',
    alamat: '',
    email: '',
    nomorTelepon: '',
    Link: ''
  }), []);

  const [editedJob, setEditedJob] = useState<Partial<Job>>(initialEditedJob);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (job) {
      setEditedJob({
        berkas: job.berkas || '',
        namaPT: job.namaPT || '',
        deskripsi: job.deskripsi || '',
        persyaratan: job.persyaratan ? [...job.persyaratan] : [],
        openrekrutmen: job.openrekrutmen ? [...job.openrekrutmen] : [],
        gambar: job.gambar || '',
        alamat: job.alamat || '',
        email: job.email || '',
        jenis: job.jenis || '',
        nomorTelepon: job.nomorTelepon || '',
        Link: job.Link || ''
      });
    } else {
      setEditedJob(initialEditedJob);
    }
  }, [job, initialEditedJob]);

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

  const handleDelete = (field: 'persyaratan' | 'openrekrutmen', index: number) => {
    const newArray = [...(editedJob[field] || [])];
    newArray.splice(index, 1);
    setEditedJob(prevState => ({
      ...prevState,
      [field]: newArray
    }));
  };

  const handleAdd = (field: 'persyaratan' | 'openrekrutmen') => {
    setEditedJob(prevState => ({
      ...prevState,
      [field]: [...(prevState[field] || []), '']
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
        gambar: response.data.imageUrl // Pastikan struktur respons sesuai
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
      toast.success(`Job "${job.namaPT}" updated successfully`, { position: "top-center" });
      onClose(); // Menutup modal setelah berhasil
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Error updating job. Please try again.');
      toast.error('Failed to update job. Please try again.', { position: "top-center" }); // Toast error jika gagal
    }
  };

  const handleClose = () => {
    onClose();
    if (job) {
      toast('Edit job canceled: ' + job.namaPT, { icon: '❌', position: "top-center" }); // Toast ketika modal dibatalkan
    } else {
      toast('Edit job canceled', { icon: '❌', position: "top-center" }); // Jika job tidak tersedia, hanya tampilkan pesan umum
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-10 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="relative modal-box bg-white w-full max-w-screen-md mx-auto my-12 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="namaPT" className="block text-sm font-medium text-gray-700">Nama PT</label>
            <input
              type="text"
              id="namaPT"
              name="namaPT"
              value={editedJob.namaPT || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={editedJob.deskripsi || ''}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
            />
          </div>
          <div>
            <label htmlFor="persyaratan" className="block text-sm font-medium text-gray-700">Persyaratan</label>
            {editedJob.persyaratan?.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("persyaratan", index, e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleDelete("persyaratan", index)}
                  className="text-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAdd("persyaratan")}
              className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tambah Persyaratan
            </button>
          </div>
          <div>
            <label htmlFor="openrekrutmen" className="block text-sm font-medium text-gray-700">Open Rekrutmen</label>
            {editedJob.openrekrutmen?.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("openrekrutmen", index, e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleDelete("openrekrutmen", index)}
                  className="text-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAdd("openrekrutmen")}
              className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tambah Open Rekrutmen
            </button>
          </div>
          <div>
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              id="gambar"
              name="gambar"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {editedJob.gambar && (
              <div className="mt-2">
                <Image
                  src={editedJob.gambar}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={editedJob.alamat || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedJob.email || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              id="nomorTelepon"
              name="nomorTelepon"
              value={editedJob.nomorTelepon || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="Link" className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              id="Link"
              name="Link"
              value={editedJob.Link || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
