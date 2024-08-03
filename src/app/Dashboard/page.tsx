"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/Maincontent';
import Topbar from '../Components/TopBar';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Home');

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Get the stored active item from localStorage, default to 'Home' if not found
      const storedItem = localStorage.getItem('activeItem');
      if (storedItem) {
        setActiveItem(storedItem);
      }
    }
  }, []);

  useEffect(() => {
    // Check if running on the client side before setting localStorage
    if (typeof window !== 'undefined') {
      // Save the active item to localStorage whenever it changes
      localStorage.setItem('activeItem', activeItem);
    }
  }, [activeItem]);

  return (
    <div className="flex h-screen bg-slate-400">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-100 fixed h-full top-0 left-0 z-10">
        <Sidebar setActiveItem={setActiveItem} />
      </div>
      
      {/* Main Content */}
      <div className="w-5/6 ml-auto bg-slate-200 overflow-y-auto h-screen">
        <Topbar />
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
};

export default Dashboard;
