import React from 'react';
import toast from 'react-hot-toast';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onDelete: () => void; // Function to handle delete operation
  onCancel: () => void; // Function to handle cancellation
}

interface Job {
  id: string;
  gambar?: string;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, job, onDelete, onCancel }) => {
  if (!isOpen || !job) return null;

  const handleDelete = () => {
    if (!job.id) {
      console.error('Job ID is missing for delete operation');
      return;
    }

    onDelete(); // Call onDelete function passed from parent component
    toast.success(`Job "${job.namaPT}" berhasil dihapus`,{position:"top-center"});
    onClose(); // Close the modal after successful deletion
  };

  const handleCancel = () => {
    onCancel(); // Call onCancel function passed from parent component
    toast.error(`Penghapusan job "${job.namaPT}" dibatalkan`,{position:"top-center"});
    onClose(); // Close the modal after cancellation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus Job</h2>
        <div className="mb-4">
          <p>Anda yakin ingin menghapus job ini?</p>
          <p>{job.namaPT}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-error"
          >
            Hapus
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-info"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
