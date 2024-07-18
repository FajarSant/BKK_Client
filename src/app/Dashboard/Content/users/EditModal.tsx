import React, { useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

interface EditUserModalProps {
  user: {
    id: number;
    nama: string;
    email: string;
    alamat: string;
    peran: string;
    jurusan: string;
    nomorTelepon: string;
    password?: string;
    gambar?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nama: user.nama,
    email: user.email,
    alamat: user.alamat,
    peran: user.peran,
    jurusan: user.jurusan,
    nomorTelepon: user.nomorTelepon,
    password: user.password || '',
    gambar: user.gambar || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        gambar: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSave = () => {
    const updatedData = { ...formData };

    axiosInstance.put(`/users/${user.id}`, updatedData)
      .then(response => {
        toast.success('Pengguna berhasil diperbarui');
        onSave();
        onClose();
      })
      .catch(error => {
        toast.error('Gagal memperbarui pengguna');
        console.error('Error updating user:', error);
      });
  };

  const handleClose = () => {
    toast('Modal ditutup tanpa menyimpan perubahan', { icon: '👋' });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white modal-box p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Edit Pengguna</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Peran</label>
          <select
            name="peran"
            value={formData.peran}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="ADMIN">Admin</option>
            <option value="PENGGUNA">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jurusan</label>
          <input
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="text"
            name="nomorTelepon"
            value={formData.nomorTelepon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gambar</label>
          <input
            type="file"
            name="gambar"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {formData.gambar && (
            <img src={formData.gambar} alt="Gambar Pengguna" className="mt-2 w-32 h-32 object-cover" />
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mr-2"
            onClick={handleClose} // Mengubah onClose menjadi handleClose
          >
            Batal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
