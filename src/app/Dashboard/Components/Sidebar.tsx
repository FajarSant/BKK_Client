import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaHome, FaUsers, FaSuitcase, FaChartBar } from 'react-icons/fa'; // Import ikon yang ingin digunakan

interface SidebarProps {
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem }) => {
  const [activeMenu, setActiveMenu] = useState<string>('Home');

  const handleMenuClick = (item: string) => {
    setActiveItem(item);
    setActiveMenu(item);
  };

  return (
    <div className="flex flex-col h-full p-2">
      <div className="p-4 border-b-2">
        <h2 className="text-xl font-semibold">DASHBOARD</h2>
      </div>
      <ul className="flex-1">
        <li className={`p-4 mb-2 border-b-2 cursor-pointer flex items-center justify-center md:justify-start ${activeMenu === 'Home' ? 'bg-blue-100 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-xl' : 'hover:bg-blue-200 hover:border-blue-300 rounded-xl'}`} onClick={() => handleMenuClick('Home')}>
          <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
            <FaHome />
          </IconContext.Provider>
          <span className="hidden md:block text-sm ml-2">Home</span>
        </li>
        <li className={`p-4 mb-2 border-b-2 cursor-pointer flex items-center justify-center md:justify-start ${activeMenu === 'Users' ? 'bg-blue-100 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-xl' : 'hover:bg-blue-100 hover:border-blue-300 rounded-xl'}`} onClick={() => handleMenuClick('Users')}>
          <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
            <FaUsers />
          </IconContext.Provider>
          <span className="hidden md:block text-sm ml-2">Users</span>
        </li>
        <li className={`p-4 mb-2 border-b-2 cursor-pointer flex items-center justify-center md:justify-start ${activeMenu === 'Lowongan' ? 'bg-blue-100 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-xl' : 'hover:bg-blue-100 hover:border-blue-300 rounded-xl'}`} onClick={() => handleMenuClick('Lowongan')}>
          <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
            <FaSuitcase />
          </IconContext.Provider>
          <span className="hidden md:block text-sm ml-2">Lowongan</span>
        </li>
        <li className={`p-4 mb-2 border-b-2 cursor-pointer flex items-center justify-center md:justify-start ${activeMenu === 'Analisis' ? 'bg-blue-100 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-xl' : 'hover:bg-blue-100 hover:border-blue-300 rounded-xl'}`} onClick={() => handleMenuClick('Analisis')}>
          <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
            <FaChartBar />
          </IconContext.Provider>
          <span className="hidden md:block text-sm ml-2">Analisis</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
