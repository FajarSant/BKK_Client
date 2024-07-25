import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import DeleteConfirmModal from "./DeleteModal";
import { toast } from "react-hot-toast";

interface Pelatihan {
  id: string;
  namapelatihan: string;
  gambar?: string;
  alamat: string;
  deskripsi: string;
  administrasi: string[];
  skills: string[];
  fasilitas: string[];
  nomortelepon: string;
  email: string;
  Link: string;
  tanggalDibuat: string;
}

const PelatihanTable: React.FC = () => {
  const [pelatihanList, setPelatihanList] = useState<Pelatihan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState<boolean>(false);
  const [currentPelatihan, setCurrentPelatihan] = useState<Pelatihan | null>(null);
  const [pelatihanToDelete, setPelatihanToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchPelatihan = async () => {
      try {
        const response = await axiosInstance.get("/pelatihan");
        setPelatihanList(response.data);
      } catch (error) {
        console.error("Error fetching pelatihan data:", error);
      }
    };

    fetchPelatihan();
  }, []);

  const handleEdit = (pelatihan: Pelatihan) => {
    setCurrentPelatihan(pelatihan);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/pelatihan/${id}`);
      setPelatihanList(pelatihanList.filter((pelatihan) => pelatihan.id !== id));
      toast.success('Pelatihan berhasil dihapus!',{position:"top-center"});
    } catch (error) {
      console.error("Error deleting pelatihan:", error);
      toast.error('Gagal menghapus pelatihan.',{position:"top-center"});
    }
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSuccess = (newPelatihan: Pelatihan) => {
    setPelatihanList((prevList) => [newPelatihan, ...prevList]);
    toast.success('Pelatihan berhasil ditambahkan!',{position:"top-center"});
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setCurrentPelatihan(null);
  };

  const handleEditSuccess = (id: string, updatedData: Pelatihan) => {
    setPelatihanList((prevList) =>
      prevList.map((pelatihan) => (pelatihan.id === id ? updatedData : pelatihan))
    );
    toast.success('Pelatihan berhasil diperbarui!',{position:"top-center"});
  };

  const handleDeleteClick = (id: string) => {
    setPelatihanToDelete(id);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (pelatihanToDelete) {
      handleDelete(pelatihanToDelete);
    }
    setIsDeleteConfirmModalOpen(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPelatihan = pelatihanList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pelatihanList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-50 mt-20">
      <div className="mb-6 flex justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">Daftar Pelatihan</h2>
      </div>
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FaPlus className="mr-2" size={16} />
          Tambah
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">No</th>
              <th className="py-3 px-4 text-left text-gray-600">Gambar</th>
              <th className="py-3 px-4 text-left text-gray-600">Nama Pelatihan</th>
              <th className="py-3 px-4 text-left text-gray-600">Alamat</th>
              <th className="py-3 px-4 text-left text-gray-600">Nomor Telepon</th>
              <th className="py-3 px-4 text-left text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-gray-600">Link</th>
              <th className="py-3 px-4 text-left text-gray-600">Tanggal Dibuat</th>
              <th className="py-3 px-4 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPelatihan.map((pelatihan, index) => (
              <tr key={pelatihan.id} className="border-b border-gray-300">
                <td className="py-4 px-4 text-gray-700">{startIndex + index + 1}</td>
                <td className="py-4 px-4 text-gray-700">
                  {pelatihan.gambar ? (
                    <img
                      src={pelatihan.gambar}
                      alt={pelatihan.namapelatihan}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">Tidak ada gambar</span>
                  )}
                </td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.namapelatihan}</td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.alamat}</td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.nomortelepon}</td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.email}</td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.Link}</td>
                <td className="py-4 px-4 text-gray-700">{pelatihan.tanggalDibuat}</td>
                <td className="py-4 px-4 text-gray-700">
                  <button
                    onClick={() => handleEdit(pelatihan)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(pelatihan.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
      {currentPelatihan && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          pelatihan={currentPelatihan}
          onEdit={handleEditSuccess}
        />
      )}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onAdd={handleAddSuccess}
      />
      <DeleteConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default PelatihanTable;
