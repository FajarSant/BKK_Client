import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast'; // Import toast dari react-hot-toast

interface AddUserModalProps {
  onClose: () => void; // Prop untuk menutup modal
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [peran, setPeran] = useState(''); // State untuk peran
  const [jurusan, setJurusan] = useState(''); // State untuk jurusan
  const [kataSandi, setKataSandi] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handler untuk mengirim data pengguna baru ke server
  const handleAddUser = () => {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('alamat', alamat);
    formData.append('peran', peran);
    formData.append('jurusan', jurusan);
    formData.append('kataSandi', kataSandi);
    formData.append('nomortelepon', nomorTelepon);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    axiosInstance.post('/users', formData)
      .then(response => {
        console.log('User added successfully:', response.data);
        toast.success('Pengguna berhasil ditambahkan'); // Tampilkan toast sukses
        onClose(); // Tutup modal setelah berhasil menambahkan pengguna
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setError('Gagal menambahkan pengguna');
        toast.error('Gagal menambahkan pengguna'); // Tampilkan toast error
      });
  };

  // Handler untuk menutup modal dan menampilkan toast
  const handleModalClose = () => {
    onClose(); // Tutup modal
    toast('Operasi pembatalan menambahkan data berhasil', { icon: '👋' }); // Tampilkan toast operasi pembatalan
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/2">
        <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
          <h2 className="text-xl font-bold">Tambah Pengguna</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleModalClose}>
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="peran" className="block text-sm font-medium text-gray-700">Peran</label>
            <select
              id="peran"
              value={peran}
              onChange={(e) => setPeran(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Peran</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PENGGUNA">PENGGUNA</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">Jurusan</label>
            <select
              id="jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Jurusan</option>
              <option value="PERHOTELAN">PERHOTELAN</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="kataSandi" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <input
              type="password"
              id="kataSandi"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="tel"
              id="nomorTelepon"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">Gambar</label>
            <input
              type="file"
              id="gambar"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddUser} // Panggil handler saat tombol diklik
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-300"
            >
              Tambahkan
            </button>
            <button
              onClick={handleModalClose} // Panggil handler saat tombol diklik
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
