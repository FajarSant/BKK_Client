import React from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSave: () => void; // Function to handle save operation
}

interface Job {
  judul: string;
  gambar?: string;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, job, onSave }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
        <form>
          <input type="text" defaultValue={job.judul} className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
          {/* Other fields populated with job data for editing */}
          {/* Example: */}
          <input type="text" defaultValue={job.namaPT} className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
          {/* Other fields populated with job data go here */}
          <button type="button" onClick={onSave} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
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
