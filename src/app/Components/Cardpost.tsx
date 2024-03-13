import React from 'react';

// Definisikan antarmuka untuk data post
interface PostData {
  imageSrc: string;
  name: string;
  hastag: string;
  description: string;
}

// Komponen CardPost dengan props postData bertipe PostData
const CardPost: React.FC<{ postData: PostData }> = ({ postData }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={postData.imageSrc} alt="Post" />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{postData.hastag}</p>
        <div className="font-bold text-xl mb-2">{postData.name}</div>
        <p className="text-gray-700 text-base">{postData.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Lihat Detail
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
          Daftar
        </button>
      </div>
    </div>
  );
};

export default CardPost;
