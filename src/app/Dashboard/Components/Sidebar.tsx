// Sidebar.tsx

import React from 'react';

interface SidebarProps {
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveItem }) => {
  const menuItems = ['Dashboard', 'Profile', 'Settings'];

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 rounded p-2"
            onClick={() => setActiveItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
