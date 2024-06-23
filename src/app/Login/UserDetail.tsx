import React from 'react';

interface UserDetailProps {
  user: {
    id: number;
    email: string;
    nama: string;
    alamat?: string;
    nomortelepon?: string;
    gambar?: string;
    peran?: string;
    jurusan?: string;
  } | null; // user bisa bernilai null
  onLogout: () => void; // Prop untuk menangani logout
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal dan panggil fungsi logout dari prop
    localStorage.removeItem('token');
    onLogout();
  };

  if (!user) {
    return null; // Jika user null, tampilkan null atau pesan lain
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nama:</strong> {user.nama}</p>
      {user.alamat && <p><strong>Alamat:</strong> {user.alamat}</p>}
      {user.nomortelepon && <p><strong>Nomor Telepon:</strong> {user.nomortelepon}</p>}
      {user.gambar && <p><strong>Gambar:</strong> <img src={user.gambar} alt="User" /></p>}
      {user.peran && <p><strong>Peran:</strong> {user.peran}</p>}
      {user.jurusan && <p><strong>Jurusan:</strong> {user.jurusan}</p>}
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDetail;
