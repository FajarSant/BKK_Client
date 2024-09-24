import Image from 'next/image';
import React from 'react';

interface Company {
  name: string;
  image: string;
}

const PartnershipList: React.FC = () => {
  // Data perusahaan: Nama dan gambar
  const companies: Company[] = [
    { name: 'Astra Honda Motor', image: '/image/astra-honda-motor.png' },
    { name: 'Hotel Alana', image: '/image/alana.png' },
    { name: 'Hotel Horison', image: '/image/logo_horison_aziza_square.jpg' },
    { name: 'Nava Hotel Tawangmangu', image: '/image/nava-hotel.png' },
    { name: 'PT Kias Indo Auto Systems Karanganyar', image: '/image/PT-KIAS-PT-Karanganyar-Indo-Auto-Systems.jpg' },
  ];

  return (
    <div className="text-center p-6 mb-20 border-b-4  mx-4 mt-10 bg-slate-200 rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">BKK SMKN Ngargoyoso Juga Berkerja Sama Dengan Beberapa Mitra Seperti</h2>
      <div className="flex md:justify-center space-x-6 overflow-x-scroll py-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="flex-none snap-center bg-white shadow-lg border border-gray-300 rounded-lg p-6 w-40 md:w-52 text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={company.image}
                alt={`${company.name} logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="font-semibold text-sm md:text-base">{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnershipList;
