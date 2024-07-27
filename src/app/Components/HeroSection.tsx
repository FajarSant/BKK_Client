"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/image/background1.jpg", text: "Selamat Datang di Slide Pertama Kami" },
    { src: "/image/background2.jpg", text: "Nikmati Slide Kedua Kami" },
    { src: "/image/background3.jpg", text: "Temukan Slide Ketiga Kami" },
    { src: "/image/background4.jpeg", text: "Jelajahi Slide Keempat Kami" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Ganti slide setiap 5 detik

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
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.text}</h1>
                <p className="text-lg md:text-2xl">
                  {index === 0 && "Selamat datang di website kami! Temukan berbagai lowongan pekerjaan dengan mudah dan cepat."}
                  {index === 1 && "Nikmati kemudahan dalam mencari informasi terkait pekerjaan dan pengembangan karir."}
                  {index === 2 && "Temukan peluang karir yang sesuai dengan minat dan bakat Anda di sini."}
                  {index === 3 && "Jelajahi informasi terbaru dan relevan untuk mempersiapkan diri menghadapi dunia kerja."}
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
