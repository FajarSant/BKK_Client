"use client"
import React, { useState } from "react";
import Header from "./Components/Header";
import CardPekerjaan from "./Components/CardPekerjaan";
import Topbar from "./Components/TopBar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Pelayanan from "./Components/Pelayanan";

const Page: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'pekerjaan' | 'pelatihan'>('pekerjaan');

  return (
    <div>
      <Topbar />
      <div className="bg-white mb-10">
        <Header />
        <HeroSection />
        <CardPekerjaan/>
        <Pelayanan/>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
