import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaHome, FaUsers, FaSuitcase, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Import ikon yang ingin digunakan

interface SidebarProps {
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem }) => {
  const [activeMenu, setActiveMenu] = useState<string>('Home');

  const handleMenuClick = (item: string) => {
    setActiveItem(item);
    setActiveMenu(item);
  };

  const handleLogout = () => {
    // Tidak menghapus token dari localStorage, hanya mengarahkan pengguna ke halaman utama
    window.location.href = '/';
  };

  const menuItems = [
    { label: 'Home', icon: FaHome },
    { label: 'Users', icon: FaUsers },
    { label: 'Jobs', icon: FaSuitcase },
    { label: 'Analisis', icon: FaChartBar },
  ];

  return (
    <div className="flex flex-col h-full p-2">
      <div className="p-2 border-b-2 text-center">
        <h2 className="text-xl font-semibold">MENU</h2>
      </div>
      <ul className="flex-1 space-y-2 mt-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`p-4 cursor-pointer flex items-center justify-center md:justify-start rounded-xl border-b-2 ${activeMenu === item.label ? 'bg-blue-100 border-gray-300' : 'hover:bg-blue-200 hover:border-blue-300'}`}
            onClick={() => handleMenuClick(item.label)}
          >
            <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
              <item.icon />
            </IconContext.Provider>
            <span className="hidden md:block text-sm ml-2">{item.label}</span>
          </li>
        ))}
        <li
          className="p-4 cursor-pointer flex items-center justify-center md:justify-start rounded-xl border-b-2 hover:bg-blue-200 hover:border-blue-300"
          onClick={handleLogout}
        >
          <IconContext.Provider value={{ className: 'mr-2 text-gray-600 text-lg md:text-xl' }}>
            <FaSignOutAlt />
          </IconContext.Provider>
          <span className="hidden md:block text-sm ml-2">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
