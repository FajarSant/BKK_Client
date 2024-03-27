"use client"
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Clicked on:", event.currentTarget.textContent);
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center p-2 bg-slate-600 rounded-xl">
        <div className="relative mr-2">
          <button
            onClick={toggleDropdown}
            className="py-2 px-4 sm:px-6 text-xs sm:text-base bg-blue-500 text-white rounded-xl shadow-md focus:outline-none"
          >
            Dropdown
          </button>
          {isOpen && (
            <div className="absolute z-10 top-full mt-1 w-32 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    onClick={handleItemClick}
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    onClick={handleItemClick}
                  >
                    Option 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    onClick={handleItemClick}
                  >
                    Option 3
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* <div className="relative flex items-center flex-1">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2 sm:p-3 w-full text-xs sm:text-base text-gray-900 bg-gray-50 rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Cari Lowongan"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 justify-center text-center text-sm sm:text-xl font-medium text-blue-700 rounded-lg"
          >
            <IoIosSearch />
            <span className="sr-only">Search</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBar;
