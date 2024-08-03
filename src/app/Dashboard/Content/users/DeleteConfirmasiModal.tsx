import React from 'react';

interface DeleteConfirmModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ userName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg text-center font-semibold mb-4">Konfirmasi Hapus Job</h2>
        <p className="">Apakah Anda yakin ingin. <br /> menghapus pengguna {userName}?</p>
        <div className="flex justify-end space-x-2 mt-2">
          <button
            className="btn btn-error"
            onClick={onConfirm}
          >
            Ya
          </button>
          <button
            className="btn btn-info"
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
