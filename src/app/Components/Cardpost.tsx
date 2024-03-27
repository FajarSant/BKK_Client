"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { FaBookmark } from "react-icons/fa"; // Import ikon simpan/arsip
import Link from "next/link";

interface Post {
  id: number;
  nama: string;
  deskripsipanjang: string;
  image: string;
  hashtag: string[];
  alamat: string;
  email: string;
  waktu: string;
  genre: string;
}

const CardPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postResponse = await axiosInstance.get<Post[]>("/posts");
        setPosts(postResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  // Fungsi untuk memotong deskripsi menjadi beberapa kalimat
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  // Pastikan posts ada sebelum mencoba mengakses elemennya
  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <div key={post.id} className="bg-slate-300 p-4 rounded-xl shadow-lg">
          <div className="container">
            <div className="flex justify-between mb-4">
              <img
                src={post.image}
                alt={post.nama}
                className="w-1/4 rounded-lg"
              />
              <FaBookmark className="text-gray-400 text-2xl cursor-pointer" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl text-justify font-bold mb-2">
                {post.nama}
              </h1>
              <p className="text-lg text-justify text-gray-700 mb-4">
                {truncateDescription(post.deskripsipanjang, 50)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <a
                 href={`/Daftar/${post.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Daftar
                </a>
                <a
                  href={`/Postingan/${post.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPost;
