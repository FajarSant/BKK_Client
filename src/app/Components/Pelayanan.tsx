import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { axiosInstance } from "@/lib/axios";

interface User {
  gambar: string;
  nama: string;
  email: string;
  nomortelepon: string;
  jurusan: string;
  peran: string; // Add role field
}

const Pelayanan: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        const filteredUsers = response.data.filter((user: User) => user.peran === "ADMIN"); // Filter by ADMIN role
        setUsers(filteredUsers);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-4xl text-gray-800 font-bold block mb-2">
            PELAYANAN BKK
          </span>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-10">
            SMKN Ngargoyoso
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-justify md:text-center">
            Kami menyediakan berbagai layanan untuk membantu siswa dan alumni
            SMKN Ngargoyoso dalam mencari pekerjaan dan peluang magang. Temukan
            informasi terbaru mengenai lowongan kerja, magang, dan dukungan
            karir di sini. Hubungi kami untuk bantuan lebih lanjut.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="flex items-center p-6">
                <img
                  className="rounded-md h-20 w-20 md:h-24 md:w-24 mr-6 object-cover"
                  src={user.gambar}
                  alt={`${user.nama}'s photo`}
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h5 className="text-gray-900 font-bold text-xl flex items-center">
                      {user.nama}
                      <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded-full">
                        {user.jurusan}
                      </span>
                    </h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    {user.nomortelepon}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{user.email}</p>
                  <button
                    onClick={() => handleWhatsAppClick(user.nomortelepon)}
                    className="flex items-center text-white bg-green-500 hover:bg-green-600 font-medium py-2 px-5 rounded-lg shadow-md transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-xl mr-2" />
                    <span>Hubungi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pelayanan;
