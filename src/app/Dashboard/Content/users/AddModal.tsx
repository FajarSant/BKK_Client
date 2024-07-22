import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddUserModalProps {
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [NIS, setNIS] = useState('');
  const [alamat, setAlamat] = useState('');
  const [peran, setPeran] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState<Date | null>(null);
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = () => {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('NIS', NIS);
    formData.append('alamat', alamat);
    formData.append('peran', peran);
    formData.append('jurusan', jurusan);
    formData.append('kataSandi', kataSandi);
    formData.append('tanggalLahir', tanggalLahir ? tanggalLahir.toISOString() : '');
    formData.append('nomorTelepon', nomorTelepon);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    axiosInstance.post('/users', formData)
      .then(response => {
        toast.success('Pengguna berhasil ditambahkan',{position: 'top-center'});
        onClose();
      })
      .catch(error => {
        setError('Gagal menambahkan pengguna');
        toast.error('Gagal menambahkan pengguna',{position: 'top-center'});
      });
  };

  const handleModalClose = () => {
    onClose();
    toast('Operasi pembatalan menambahkan data berhasil', { icon: '👋',position: 'top-center'});
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white modal-box rounded-xl">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="NIS" className="block text-sm font-medium text-gray-700">NIS</label>
            <input
              type="text"
              id="NIS"
              value={NIS}
              onChange={(e) => setNIS(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="peran" className="block text-sm font-medium text-gray-700">Peran</label>
            <select
              id="peran"
              value={peran}
              onChange={(e) => setPeran(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <DatePicker
              id="tanggalLahir"
              selected={tanggalLahir}
              onChange={(date: Date | null) => setTanggalLahir(date)}
              dateFormat="yyyy-MM-dd"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholderText="yyyy-mm-dd"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="tel"
              id="nomorTelepon"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">Gambar</label>
            <input
              type="file"
              id="gambar"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleModalClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batal
            </button>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
