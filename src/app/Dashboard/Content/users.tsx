import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

// Mendefinisikan tipe UserData
interface UserData {
  id: number;
  nama: string;
  email: string;
  jurusan: string;
}

// Styling untuk modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [formState, setFormState] = useState({ nama: '', email: '', jurusan: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<any[]>("/jobs");
      setUsers(response.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (user: UserData) => {
    setCurrentUser(user);
    setFormState({ nama: user.nama, email: user.email, jurusan: user.jurusan });
    setModalIsOpen(true);
  };

  const handleDelete = (user: UserData) => {
    setCurrentUser(user);
    setModalIsOpen(true);
  };

  const handleAdd = () => {
    setCurrentUser(null);
    setFormState({ nama: '', email: '', jurusan: '' });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentUser) {
      try {
        await axiosInstance.put(`/jobs/${currentUser.id}`, formState);
        fetchData();
      } catch (error: any) {
        console.error('Error updating user:', error);
      }
    } else {
      try {
        await axiosInstance.post('/jobs', formState);
        fetchData();
      } catch (error: any) {
        console.error('Error adding user:', error);
      }
    }
    closeModal();
  };

  const handleDeleteConfirm = async () => {
    if (currentUser) {
      try {
        await axiosInstance.delete(`/jobs/${currentUser.id}`);
        fetchData();
        closeModal();
      } catch (error: any) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <button
          onClick={handleAdd}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Tambah
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-b">
          <tr>
            <th className="py-3 px-6 text-left border-r">ID</th>
            <th className="py-3 px-6 text-left border-r">Nama</th>
            <th className="py-3 px-6 text-left border-r">Email</th>
            <th className="py-3 px-6 text-left border-r">Jurusan</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap border-r">{user.id}</td>
              <td className="py-3 px-6 text-left border-r">{user.nama}</td>
              <td className="py-3 px-6 text-left border-r">{user.email}</td>
              <td className="py-3 px-6 text-left border-r">{user.jurusan}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:text-blue-700 mx-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <h2 className="text-2xl mb-4">{currentUser ? 'Edit User' : 'Tambah User'}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              value={formState.nama}
              onChange={(e) => setFormState({ ...formState, nama: e.target.value })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jurusan</label>
            <input
              type="text"
              value={formState.jurusan}
              onChange={(e) => setFormState({ ...formState, jurusan: e.target.value })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-gray-900"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
            {currentUser ? (
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Hapus
              </button>
            ) : null}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {currentUser ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
