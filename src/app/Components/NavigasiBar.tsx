"use client";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import UserActions from "./UserActions";

const NavigasiBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-slate-50 bg-opacity-90 backdrop-blur-sm text-black flex justify-between items-center p-4 z-10 shadow-xl border-b-2">
      {/* Logo dan judul */}
      <div className="flex flex-col items-center justify-center text-center">
        <Link href="/">
        <div className="text-lg font-semibold">BKK SMKN</div>
        <div className="text-sm">NGARGOYOSO</div>
        </Link>
      </div>
      {/* Menu items */}
      <div className="hidden sm:flex items-center space-x-4">
        <Link href="/about">
          <span>About Page</span>
        </Link>
        <Link href="/about">
          <span>About Page</span>
        </Link>
        <Link href="/about">
          <span>About Page</span>
        </Link>
      </div>
      {/* User Avatar */}
      <div className=" flex items-center space-x-4">
        <div className="hidden sm:flex text-xl">
          <UserActions/>
        </div>
        <div className="flex sm:hidden text-center ">
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Drawer */}

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "" : "-translate-x-full"
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto flex flex-col">
          <ul className="space-y-2 font-medium">
            <Link href="/about">
              <span>About Page</span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigasiBar;
