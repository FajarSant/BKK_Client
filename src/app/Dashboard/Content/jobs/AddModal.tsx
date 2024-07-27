import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newJob, setNewJob] = useState({
    berkas: "",
    namaPT: "",
    deskripsi: "",
    persyaratan: [] as string[],
    openrekrutmen: [] as string[],
    gambar: null as File | null,
    alamat: "",
    jenis: "",
    email: "",
    nomorTelepon: "",
    Link: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewJob((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewJob((prevState) => ({ ...prevState, gambar: file }));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: "persyaratan" | "openrekrutmen"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;
      if (value) {
        setNewJob((prevState) => ({
          ...prevState,
          [key]: [...prevState[key], value],
        }));
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleDelete = (
    key: "persyaratan" | "openrekrutmen",
    index: number
  ) => {
    const updatedList = [...newJob[key]];
    updatedList.splice(index, 1);
    setNewJob((prevState) => ({ ...prevState, [key]: updatedList }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("namaPT", newJob.namaPT);
    formData.append("deskripsi", newJob.deskripsi);
    formData.append("berkas", newJob.berkas);
    formData.append("alamat", newJob.alamat);
    formData.append("jenis", newJob.jenis);
    formData.append("email", newJob.email);
    formData.append("nomorTelepon", newJob.nomorTelepon);
    formData.append("Link", newJob.Link);

    // Serialize arrays to JSON strings
    formData.append("persyaratan", JSON.stringify(newJob.persyaratan));
    formData.append("openrekrutmen", JSON.stringify(newJob.openrekrutmen));

    if (newJob.gambar) formData.append("gambar", newJob.gambar);

    try {
      await axiosInstance.post("/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Job added successfully!");
      onAdd(); // Refresh job list
      onClose(); // Close modal
      setNewJob({
        berkas: "",
        namaPT: "",
        deskripsi: "",
        persyaratan: [],
        openrekrutmen: [],
        gambar: null,
        alamat: "",
        jenis: "",
        email: "",
        nomorTelepon: "",
        Link: "",
      }); // Clear inputs
    } catch (error) {
      toast.error("Failed to add job.");
      setError("Failed to add job.");
      console.error("Error adding job:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white modal-box p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Tambahkan Job</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="namaPT"
            placeholder="Nama PT"
            value={newJob.namaPT}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="deskripsi"
            placeholder="Deskripsi"
            value={newJob.deskripsi}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="berkas"
            placeholder="Berkas"
            value={newJob.berkas}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <label className="block mb-2">
            Persyaratan:
            <input
              type="text"
              placeholder="Tambahkan persyaratan"
              onKeyDown={(e) => handleKeyDown(e, "persyaratan")}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <ul>
              {newJob.persyaratan.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDelete("persyaratan", index)}
                    className="ml-2 text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label className="block mb-2">
            Open Rekrutmen:
            <input
              type="text"
              placeholder="Tambahkan open rekrutmen"
              onKeyDown={(e) => handleKeyDown(e, "openrekrutmen")}
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <ul>
              {newJob.openrekrutmen.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDelete("openrekrutmen", index)}
                    className="ml-2 text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label className="block mb-2">
            Gambar:
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="mb-2"
            />
            {newJob.gambar && (
              <div
                className="w-32 h-32 mx-5 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(newJob.gambar)})`,
                }}
                aria-label="Preview"
              />
            )}
          </label>
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={newJob.alamat}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="jenis"
            placeholder="jenis"
            value={newJob.jenis}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newJob.email}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="nomorTelepon"
            placeholder="Nomor Telepon"
            value={newJob.nomorTelepon}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <input
            type="text"
            name="Link"
            placeholder="Link"
            value={newJob.Link}
            onChange={handleInputChange}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Tambahkan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-gray-500 hover:bg-gray-600 mt-2 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
