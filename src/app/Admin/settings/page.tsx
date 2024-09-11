"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import DashboardLayout from "@/app/Admin/layouts";

// Tipe data untuk pekerjaan dan pengguna
interface Job {
  id: number;
  gambar: string | null;
  namaPT: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
  tanggal: string;
}

interface User {
  nis: string;
  id: string;
  gambar: string | null;
  nama: string;
  email: string;
  alamat: string;
  peran: string;
  jurusan: string;
}

const Settings = () => {
  const [view, setView] = useState<string>(""); // Untuk melacak tampilan
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"jobs" | "users">("jobs");

  // Mengambil data pekerjaan dari API menggunakan axios
  useEffect(() => {
    if (view === "pekerjaan") {
      axiosInstance
        .get("/jobs")
        .then((response) => setJobs(response.data))
        .catch((error) => console.error("Error fetching jobs:", error));
    }
  }, [view]);

  // Mengambil data pengguna dari API menggunakan axios
  useEffect(() => {
    if (view === "pengguna") {
      axiosInstance
        .get("/users")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [view]);

  // Fungsi untuk menangani ceklist pekerjaan
  const handleJobSelect = (id: number) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Fungsi untuk menangani ceklist pengguna
  const handleUserSelect = (nis: string) => {
    setSelectedUsers((prev) =>
      prev.includes(nis)
        ? prev.filter((userNis) => userNis !== nis)
        : [...prev, nis]
    );
  };

  // Fungsi untuk menghapus pekerjaan yang dipilih
  const deleteSelectedJobs = () => {
    Promise.all(
      selectedJobs.map((id) =>
        axiosInstance
          .delete(`/jobs/${id}`)
          .then(() => {
            // Hapus job dari state lokal
            setJobs((prev) => prev.filter((job) => job.id !== id));
          })
          .catch((error) => console.error("Error deleting job:", error))
      )
    ).then(() => {
      setSelectedJobs([]); // Reset pilihan setelah dihapus
      setShowConfirmModal(false); // Tutup modal
    });
  };

  // Fungsi untuk menghapus pengguna yang dipilih
  const deleteSelectedUsers = () => {
    Promise.all(
      selectedUsers.map((id) =>
        axiosInstance
          .delete(`/users/${id}`)
          .then(() => {
            // Hapus user dari state lokal
            setUsers((prev) => prev.filter((user) => user.id !== id));
          })
          .catch((error) => console.error("Error deleting user:", error))
      )
    ).then(() => {
      setSelectedUsers([]); // Reset pilihan setelah dihapus
      setShowConfirmModal(false); // Tutup modal
    });
  };

  // Tabel Pekerjaan
  const renderJobsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Gambar</th>
            <th className="px-4 py-2 text-left">Nama PT</th>
            <th className="px-4 py-2 text-left">Alamat</th>
            <th className="px-4 py-2 text-left">Nomor Telepon</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job, index) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {job.gambar ? (
                  <Image
                    src={job.gambar}
                    alt={job.namaPT}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-4 py-2">{job.namaPT}</td>
              <td className="px-4 py-2">{job.alamat}</td>
              <td className="px-4 py-2">{job.nomorTelepon}</td>
              <td className="px-4 py-2">{job.email}</td>
              <td className="px-4 py-2">{job.tanggal}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => handleJobSelect(job.id)}
                  className="form-checkbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Tabel Pengguna
  const renderUsersTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">NIS</th>
            <th className="px-4 py-2 text-left">Gambar</th>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Alamat</th>
            <th className="px-4 py-2 text-left">Peran</th>
            <th className="px-4 py-2 text-left">Jurusan</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.nis} className="hover:bg-gray-50">
              <td className="px-4 py-2">{user.nis}</td>
              <td className="px-4 py-2">
                {user.gambar ? (
                  <Image
                    src={user.gambar}
                    alt={user.nama}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-4 py-2">{user.nama}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.alamat}</td>
              <td className="px-4 py-2">{user.peran}</td>
              <td className="px-4 py-2">{user.jurusan}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelect(user.id)}
                  className="form-checkbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <DashboardLayout>
    <div className="p-4 w-full ">
      <div className="bg-white p-4 rounded-lg shadow-lg mb-5">
        <h1 className="text-2xl text-center font-bold mb-4">Pengaturan</h1>
        <div className="mb-4 flex">
          <button
            onClick={() => setView("pekerjaan")}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Data Pekerjaan
          </button>
          <button
            onClick={() => setView("pengguna")}
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
          >
            Data Pengguna
          </button>
        </div>
      </div>

      {view === "pekerjaan" && (
        <>
          {renderJobsTable()}
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            onClick={() => {
              setDeleteType("jobs");
              setShowConfirmModal(true);
            }}
            disabled={selectedJobs.length === 0}
          >
            Hapus Terpilih
          </button>
        </>
      )}

      {view === "pengguna" && (
        <>
          {renderUsersTable()}
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            onClick={() => {
              setDeleteType("users");
              setShowConfirmModal(true);
            }}
            disabled={selectedUsers.length === 0}
          >
            Hapus Terpilih
          </button>
        </>
      )}

      {/* Modal Konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white  modal-box p-6 rounded shadow-md w-1/3">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">
              Apakah Anda yakin ingin menghapus data yang dipilih?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  deleteType === "jobs"
                    ? deleteSelectedJobs()
                    : deleteSelectedUsers();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
              >
                Hapus
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default Settings;