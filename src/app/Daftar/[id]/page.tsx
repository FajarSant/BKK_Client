"use client";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  image: string;
  nama: string;
  deskripsisingkat: string;
  deskripsipanjang: string;
  alamat: string;
  email: string;
  waktu: string;
  genre: string;
  hashtag: string[];
}

const PostinganDetail = () => {
  const [post, setpost] = useState<Post | null>(null);

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<Post>(`/posts/${id}`);
        const data = response.data;

        if (!data) {
          console.log("Data not found for ID:", id);
          return;
        }

        console.log("Data found for ID:", id);
        setpost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Error fetching data for ID:", id);
      }
    };

    fetchData();
  }, []); // id sebagai bagian dari dependency array

  // Menangani keadaan loading atau data kosong
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Image src={post.image} alt={post.nama} className="w-full rounded-lg mb-8" />
      <h1 className="text-3xl font-bold mb-4">{post.nama}</h1>
      <p className="text-lg text-gray-700 mb-4">{post.deskripsisingkat}</p>
      <p className="text-lg text-gray-700 mb-4">{post.deskripsipanjang}</p>
      <p className="text-lg text-gray-700 mb-4">Alamat: {post.alamat}</p>
      <p className="text-lg text-gray-700 mb-4">Email: <a href={`mailto:${post.email}`} className="text-blue-600 hover:underline">{post.email}</a></p>
      <p className="text-lg text-gray-700 mb-4">Waktu: {new Date(post.waktu).toLocaleDateString()}</p>
      <p className="text-lg text-gray-700 mb-4">Genre: {post.genre}</p>
      <p className="text-lg text-gray-700 mb-4">Hashtag: {post.hashtag.join(", ")}</p>
    </div> 
  );
};

export default PostinganDetail;
