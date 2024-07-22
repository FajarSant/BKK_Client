import React, { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaEye, FaTrash, FaSave } from "react-icons/fa";
import toast from 'react-hot-toast';

// Definisikan tipe data untuk aplikasi
interface Application {
  id: string;
  pengguna: {
    nama: string;
  };
  pekerjaan: {
    namaPT: string;
  };
  status: string;
  tanggalDibuat: string;
}

const Home = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [statusEdit, setStatusEdit] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    dikirim: 0,
    diproses: 0,
    diterima: 0,
    ditolak: 0
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("application");
        const data: Application[] = response.data;
        setApplications(data);

        // Hitung statistik
        const total = data.length;
        const dikirim = data.filter((app: Application) => app.status === "DIKIRIM").length;
        const diproses = data.filter((app: Application) => app.status === "DIPROSES").length;
        const diterima = data.filter((app: Application) => app.status === "DITERIMA").length;
        const ditolak = data.filter((app: Application) => app.status === "DITOLAK").length;

        setStats({ total, dikirim, diproses, diterima, ditolak });
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = useCallback(
    async () => {
      if (showDeleteConfirm) {
        try {
          await axiosInstance.delete(`application/${showDeleteConfirm}`);
          setApplications((prevApplications) =>
            prevApplications.filter((app) => app.id !== showDeleteConfirm)
          );
          toast.success("Application deleted successfully!", { position: "top-center" });
        } catch (error) {
          console.error("Failed to delete application:", error);
          toast.error("Failed to delete application.", { position: "top-center" });
        }
        setShowDeleteConfirm(null);
      }
    },
    [showDeleteConfirm]
  );

  const handleOpen = (application: Application) => {
    setSelectedApplication(application);
    setStatusEdit(application.status);
  };

  const handleClose = () => {
    setSelectedApplication(null);
    setStatusEdit("");
  };

  const handleSave = async () => {
    if (selectedApplication) {
      try {
        await axiosInstance.put(`application/${selectedApplication.id}`, { status: statusEdit });
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === selectedApplication.id ? { ...app, status: statusEdit } : app
          )
        );
        toast.success("Status updated successfully!", { position: "top-center" });
        handleClose();
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update status.", { position: "top-center" });
      }
    }
  };

  return (
    <div className="container mt-20">
      <h1 className="mt-10 font-bold text-center mb-5">Validasi Data Lamaran Pengguna</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 mx-10">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg text-center font-semibold">Total Lamaran</h2>
          <p className="text-2xl text-center">{stats.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg text-center font-semibold">Dikirim</h2>
          <p className="text-2xl text-center">{stats.dikirim}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg text-center font-semibold">Diproses</h2>
          <p className="text-2xl text-center">{stats.diproses}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg text-center font-semibold">Ditolak</h2>
          <p className="text-2xl text-center">{stats.ditolak}</p>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="text-lg text-center font-semibold">Diterima</h2>
          <p className="text-2xl text-center">{stats.diterima}</p>
        </div>
      </div>
      <div className="overflow-x-auto mx-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-xs">
            <thead className="text-blue-600">
              <tr className="bg-slate-200">
                <th className="bg-slate-300">Nama Pengguna</th>
                <th className="bg-slate-300">NamaPT</th>
                <th className="bg-slate-300">Status</th>
                <th className="bg-slate-300">Tanggal</th>
                <th className="bg-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={application.id} className={index % 2 === 0 ? "bg-white" : ""}>
                    <td>{application.pengguna.nama}</td>
                    <td>{application.pekerjaan.namaPT}</td>
                    <td>{application.status}</td>
                    <td>{new Date(application.tanggalDibuat).toLocaleDateString()}</td>
                    <td className="flex space-x-2">
                      <button
                        onClick={() => handleOpen(application)}
                        className="btn btn-info btn-xs"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(application.id)}
                        className="btn btn-error btn-xs"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Detail Lamaran</h2>
            <p><strong>Nama Pengguna:</strong> {selectedApplication.pengguna.nama}</p>
            <p><strong>Nama PT:</strong> {selectedApplication.pekerjaan.namaPT}</p>
            <p><strong>Status:</strong>
              <select
                value={statusEdit}
                onChange={(e) => setStatusEdit(e.target.value)}
                className="select bg-slate-200 select-bordered select-xs w-full max-w-xs"
              >
                <option value="DIKIRIM">DIKIRIM</option>
                <option value="DIPROSES">DIPROSES</option>
                <option value="DITERIMA">DITERIMA</option>
                <option value="DITOLAK">DITOLAK</option>
              </select>
            </p>
            <p><strong>Tanggal Dibuat:</strong> {new Date(selectedApplication.tanggalDibuat).toLocaleDateString()}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleSave}
                className="btn btn-primary"
              >
                <FaSave className="mr-2" /> Simpan
              </button>
              <button
                onClick={handleClose}
                className="btn btn-error"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus lamaran ini?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleDelete}
                className="btn btn-error"
              >
                Hapus
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-warning"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
