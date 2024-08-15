"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/image/background1.jpg", text: "Selamat Datang di Website BKK SMKN Ngargoyoso" },
    { src: "/image/background2.jpg", text: "Temukan Peluang Karir Terbaik" },
    { src: "/image/background3.jpg", text: "Fitur Unggulan untuk Mendukung Karir Anda" },
    { src: "/image/background4.jpeg", text: "Harapan Kami untuk Masa Depan Anda" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // Ganti slide setiap 5 detik

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="carousel w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full transition-transform duration-1000 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.text}</h1>
                <p className="text-lg md:text-2xl">
                  {index === 0 && " Kami di sini untuk membantu Anda menemukan peluang karir yang sesuai dengan keahlian dan minat Anda."}
                  {index === 1 && "Jelajahi berbagai lowongan pekerjaan dan magang yang telah kami kurasi untuk mendukung perkembangan karir Anda dan mencapai tujuan profesional."}
                  {index === 2 && "Fitur unggulan kami meliputi pencarian pekerjaan yang efisien, akses ke pelatihan dan sumber daya, serta dukungan untuk persiapan wawancara dan penulisan CV."}
                  {index === 3 && "Kami berharap website ini dapat menjadi alat yang berguna untuk mendukung perjalanan karir Anda dan membuka peluang baru untuk masa depan yang sukses."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
