import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaHome, FaUsers, FaSuitcase, FaChartBar, FaSignOutAlt, FaChalkboardTeacher } from 'react-icons/fa';

interface SidebarProps {
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem }) => {
  const [activeMenu, setActiveMenu] = useState<string>('Home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItem = localStorage.getItem('activeItem');
      if (storedItem) setActiveMenu(storedItem);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeItem', activeMenu);
    }
  }, [activeMenu]);

  const handleMenuClick = (item: string) => {
    setActiveItem(item);
    setActiveMenu(item);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('activeItem');
    }
    window.location.href = '/';
  };

  const menuItems = [
    { label: 'Home', icon: FaHome },
    { label: 'Pengguna', icon: FaUsers },
    { label: 'Lamaran', icon: FaSuitcase },
    { label: 'Analisis', icon: FaChartBar },
    { label: 'Pelatihan', icon: FaChalkboardTeacher },
  ];

  return (
    <div className="flex flex-col h-full p-2 mt-44">
      <ul className="flex-1 space-y-2 mt-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`p-4 cursor-pointer flex items-center rounded-xl border-b-2 ${activeMenu === item.label ? 'bg-blue-100 border-gray-300' : 'hover:bg-blue-200 hover:border-blue-300'}`}
            onClick={() => handleMenuClick(item.label)}
          >
            <IconContext.Provider value={{ className: 'text-gray-600 text-lg md:text-xl' }}>
              <item.icon />
            </IconContext.Provider>
            <span className="ml-2 text-sm hidden md:inline">{item.label}</span>
          </li>
        ))}
        <li
          className="p-4 cursor-pointer flex items-center rounded-xl border-b-2 hover:bg-blue-200 hover:border-blue-300"
          onClick={handleLogout}
        >
          <IconContext.Provider value={{ className: 'text-gray-600 text-lg md:text-xl' }}>
            <FaSignOutAlt />
          </IconContext.Provider>
          <span className="ml-2 text-sm hidden md:inline">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
