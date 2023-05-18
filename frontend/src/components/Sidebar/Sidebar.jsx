import React from "react";
import { useState } from "react";
import SidebarData from "./SidebarData";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import user from "../../assets/user.jpg";

const Sidebar = ({ setDarkMode, darkMode }) => {
  return (
    <div
      className={` "w-[5.8rem]" : "" sidebar-container dark:bg-slate-800 dark:text-white`}
    >
      <Link className="flex mt-4">
        <img className="w-16 mb-4 ml-2 mt-2" src={logo} alt="" />
        <h1 className="text-4xl text-gray-700 font-semibold font-mono mt-3 ml-4 dark:text-white">
          TasteGram
        </h1>
      </Link>
      <div
        className={`flex gap-5 items-center ${"rounded-xl p-2 mt-6 "}`}
      >
        <div className="min-w-[3.5rem] h-[3.5rem]">
          <img
            src={user}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <Link>
          <h3 className="text-xl">Ravindu Jayakodi</h3>
          <span className="text-[0.75rem] opacity-60">
            ravindujayakodi00@gmail.com
          </span>
        </Link>
      </div>

      <SidebarData />

      <div className="flex w-full mb-12 ml-3 mt-5">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              onClick={() => setDarkMode(!darkMode)}
              type="checkbox"
              id="toggleB"
              className="sr-only"
            />
            <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium dark:text-white">
            Dark Mode
          </div>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
