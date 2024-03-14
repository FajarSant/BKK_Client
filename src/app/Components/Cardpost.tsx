"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

interface Post {
  id: number;
  nama: string;
  deskripsipanjang: string;
  image: string;
  hashtag: string[];
  author: string;
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

  return (
    <div className="grid grid-cols-4 gap-4 grid-rows-auto mx-3 ">
      {posts.map((post) => (
        <div key={post.id} className="border rounded overflow-hidden shadow-xl">
          <img
            src={post.image}
            alt={post.nama}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3>
              {post.hashtag.map((tag, index) => (
                <span key={index}>#{tag} </span>
              ))}
            </h3>
            <h2 className="text-lg font-semibold">{post.nama}</h2>
            <p className="text-sm">
              {truncateDescription(post.deskripsipanjang, 100)}
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mx-4">
            Lihat Lebih Banyak
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardPost;
