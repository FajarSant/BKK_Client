"use client"
import React, { useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';

const HeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleGetStartedClick = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="bg-cover ob bg-center relative"
      style={{
        backgroundImage: 'url("/image/background.jpg")',
        minHeight: '100vh',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto flex flex-col items-center justify-center py-20 relative h-full">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SMKN NGARGOYOSO</h1>
          <p className="text-lg md:text-2xl mb-8">
            Tempat mencari pekerjaan yang tepat untukmu.
          </p>
          <button
            className="bg-white text-blue-500 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition duration-300"
            onClick={handleGetStartedClick}
          >
            Get Started <FaArrowDown className="ml-2" />
          </button>
        </div>
      </div>

      {/* Placeholder for content after scroll */}
      <div ref={contentRef}></div>
    </div>
  );
};

export default HeroSection;
