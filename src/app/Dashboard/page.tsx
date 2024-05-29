"use client"
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/Maincontent';
import Topbar from './Components/Topbar';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  return (
    <div className="flex h-screen bg-slate-400">
      <div className="w-1/4 bg-gray-100">
        <Sidebar setActiveItem={setActiveItem} />
      </div>
      <div className="w-3/4 bg-white">
        <Topbar/>
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default Dashboard;
