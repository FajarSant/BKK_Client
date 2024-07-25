import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white modal-box p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
        <p className="mb-4">Apakah Anda yakin ingin menghapus pelatihan ini?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
            Batal
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
