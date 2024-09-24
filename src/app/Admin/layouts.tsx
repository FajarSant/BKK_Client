"use client";
import React, { ReactNode } from "react";
import Sidebar from "./Components/Sidebar"; // Adjust the path as needed
import { usePathname } from 'next/navigation'; // Use usePathname for getting current path

interface LayoutProps {
  children: ReactNode; // Define children as a ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get current path

  return (
    <div className="flex h-full  bg-white">
      {/* Sidebar */}
      <Sidebar activeRoute={pathname} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 "> {/* Adjust ml-64 to match sidebar width */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
