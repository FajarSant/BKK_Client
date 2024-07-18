import React from "react";
import Header from "./Components/Header";
import CardPost from "./Components/Cardpost";
import Topbar from "./Components/TopBar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";

const page = () => {
  return (
    <div>
      <Topbar/>
      <div className=" bg-white mb-10"> 
        {/* <SearchBar /> */}
        <Header />
        <HeroSection/>
        <CardPost />
        <Footer/>
      </div>
    </div>
  );
};

export default page;
