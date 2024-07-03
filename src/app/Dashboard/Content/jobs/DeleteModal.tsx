import React from 'react';
import axios from 'axios';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSave: () => void; // Function to handle save operation
}

interface Job {
  id: number; // Tambahkan properti ID untuk identifikasi data yang akan dihapus
  judul: string;
  gambar?: string;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, job, onSave }) => {
  if (!isOpen || !job) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`/jobs/${job.id}`);
      onSave(); // Panggil onSave untuk meng-update data setelah penghapusan
      onClose(); // Tutup modal setelah berhasil menghapus
    } catch (error) {
      console.error('Error deleting job:', error);
      // Tambahkan penanganan error sesuai kebutuhan Anda
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
        <form>
          <input type="text" defaultValue={job.judul} className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
          {/* Form fields for editing job details */}
          <input type="text" defaultValue={job.namaPT} className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
          {/* Add other fields for editing job data */}
          <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300">
            Hapus Job
          </button>
          <button type="button" onClick={onSave} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Simpan Perubahan
          </button>
        </form>
        <button
          type="button"
          onClick={onClose}
          className="text-white bg-gray-500 hover:bg-gray-600 mt-2 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
