"use client"
import React, { useState } from "react";
import CardPekerjaan from "./Components/CardPekerjaan";
import Topbar from "./Components/TopBar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Pelayanan from "./Components/Pelayanan";
import PartnershipList from "./Components/Partnership";

const Page: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'pekerjaan' | 'pelatihan'>('pekerjaan');

  return (
    <div>
      <Topbar />
      <div className="bg-white mb-10">
        <HeroSection />
        <PartnershipList/>
        <CardPekerjaan/>
        <Pelayanan/>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
