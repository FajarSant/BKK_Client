import React from "react";
import Link from "next/link";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const SavedPage = () => {
  return (
    <div className="container ">
      <Link href="/">
        <span className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer mb-4">
          <MdOutlineArrowBackIosNew className="mr-2" /> Kembali
        </span>
      </Link>
      <div className="">

      <h1 className="text-3xl font-semibold mb-4 text-center">Lamaran Yang Tersimpan</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        {/* Tambahkan konten lamaran yang tersimpan di sini */}
      </div>
      </div>
    </div>
  );
};

export default SavedPage;
