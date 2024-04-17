'use client'
import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/Maincontent";


const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("user");

  return (
    <div className="flex">
      <Sidebar setActiveItem={setActiveItem} />
      <MainContent activeItem={activeItem} />
    </div>
  );
};

export default Dashboard;
