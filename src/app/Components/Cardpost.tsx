"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";

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
    <div className="container mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 grid-rows-auto  ">
      {posts.map((post) => (
        <div key={post.id} className=" border rounded overflow-hidden shadow-xl">
          <img
            src={post.image}
            alt={post.nama}
            className="w-full h-auto sm:h-48 object-cover"
          />
          <div className="text-justify p-2">
            <h3>
              {post.hashtag.map((tag, index) => (
                <span key={index} className="hidden  text-xs text-opacity-50 ">#{tag} </span>
              ))}
            </h3>
            <h2 className="text-xs text-justify font-semibold mb-2">
              {post.nama}
            </h2>
            <p className=" text-xs text-justify mb-2">
              {truncateDescription(post.deskripsipanjang, 30)}
            </p>
          </div>
          <div className="flex justify-center ">
          <Link href={`/Postingan/${post.id}`}>
              <span className="bg-gray-500 text-white rounded p-1 sm:p-2 ">
                Detail
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPost;
