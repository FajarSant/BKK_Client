"use client";
import React, { ReactNode } from 'react';
import Sidebar from './Components/Sidebar'; // Adjust the path as needed

interface LayoutProps {
  children: ReactNode; // Define children as a ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 h-full"> {/* Adjust ml-64 to match sidebar width */}
        <main className="flex-1 p-6 bg-gray-100 overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
