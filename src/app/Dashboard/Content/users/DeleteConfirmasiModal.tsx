import React from 'react';

interface DeleteConfirmModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ userName, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <p className="text-xl mb-4">Apakah Anda yakin ingin menghapus pengguna {userName}?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            onClick={onConfirm}
          >
            Ya
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
