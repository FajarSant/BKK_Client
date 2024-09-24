import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";

interface User {
  gambar: string;
  nama: string;
  email: string;
  nomortelepon: string;
  jurusan: string;
  peran: string;
}

const SkeletonLoader: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 animate-pulse ">
    <div className="flex items-center mb-4">
      <div className="w-24 h-24 bg-gray-200 rounded-full mr-6"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="w-24 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const Pelayanan: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        const filteredUsers = response.data.filter(
          (user: User) => user.peran === "ADMIN"
        );
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
    return (
      <section className="py-16 bg-gray-100 border-b-4">
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
              SMKN Ngargoyoso dalam mencari pekerjaan dan peluang magang.
              Temukan informasi terbaru mengenai lowongan kerja, magang, dan
              dukungan karir di sini. Hubungi kami untuk bantuan lebih lanjut.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 border-b-4 mb-12 mx-4">
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
                <Image
                  className="rounded-md mr-6 object-cover"
                  src={user.gambar || "/fallback-image.png"} // Fallback image if gambar is null
                  alt={`${user.nama}'s photo`}
                  width={96}
                  height={96}
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
