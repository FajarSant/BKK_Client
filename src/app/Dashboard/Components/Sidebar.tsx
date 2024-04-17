import Link from "next/link";
import React from "react";
import { RiFileUserLine, RiBarChart2Line, RiLogoutBoxRLine } from "react-icons/ri";

interface SidebarProps {
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem }) => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <ul>
          <li className="flex items-center mb-4">
            <RiFileUserLine className="mr-2" />
            <a onClick={() => setActiveItem("user")} className="cursor-pointer">Lamaran User</a>
          </li>
          <li className="flex items-center  mb-4">
            <RiBarChart2Line className="mr-2" />
            <a onClick={() => setActiveItem("analysis")} className="cursor-pointer">Analisis</a>
          </li>
          <li className="flex items-center  mb-4">
            <RiLogoutBoxRLine className="mr-2" />
            <Link href="/">
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
