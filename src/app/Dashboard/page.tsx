"use client"
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/Maincontent';
import Topbar from '../Components/TopBar';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  return (
    <div>
      {/* Top Bar */}
     {/* <Topbar/> */}
      {/* Main Content */}
      <div className="flex h-screen bg-slate-400">
        <div className="w-1/6 bg-gray-100">
          <Sidebar setActiveItem={setActiveItem} />
        </div>
        <div className="w-5/6 bg-white">
          <MainContent activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
