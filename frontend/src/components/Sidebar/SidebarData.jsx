import React from "react";
import { Link } from "react-router-dom";
import { datas } from "./Data";

const SidebarData = () => {
  return (
    <div >
      <div className="dark:text-white">
        <div className={`sidebar dark:text-white`} key={datas[0].id}>
          <Link to="/" className="flex items-center dark:text-white">
            <div className="mr-8 text-[1.7rem] text-brown dark:text-white">{datas[0].icon}</div>
            <div className={` text-[1rem] text-brown whitespace-pre dark:text-white`}>
              {datas[0].text}
            </div>
          </Link>
        </div>
        <div className={`sidebar`} key={datas[1].id}>
          <Link to="/" className="flex items-center">
            <div className="mr-8 text-[1.7rem] text-brown dark:text-white">{datas[1].icon}</div>
            <div className={` text-[1rem] text-brown whitespace-pre dark:text-white`}>
              {datas[1].text}
            </div>
          </Link>
        </div>
        <div className={`sidebar`} key={datas[2].id}>
          <Link to="/" className="flex items-center">
            <div className="mr-8 text-[1.7rem] dark:text-white text-black">{datas[2].icon}</div>
            <div className={` text-[1rem] text-brown whitespace-pre dark:text-white`}>
              {datas[2].text}
            </div>
          </Link>
        </div>
        <div className={`sidebar`} key={datas[3].id}>
          <Link to="/" className="flex items-center">
            <div className="mr-8 text-[1.7rem] text-brown dark:text-white">{datas[3].icon}</div>
            <div className={` text-[1rem] text-brown whitespace-pre dark:text-white`}>
              {datas[3].text}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarData;
