"use client";
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/Maincontent';
import Topbar from '../Components/TopBar';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  return (
    <div className="flex h-screen bg-slate-400">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-100 fixed h-full top-0 left-0 z-10">
        <Sidebar setActiveItem={setActiveItem} />
      </div>
      
      {/* Main Content */}
      <div className="w-5/6 ml-auto bg-white overflow-y-auto h-screen">
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default Dashboard;
