import React from "react";
import user from "../../assets/user.jpg";
import { Link } from "react-router-dom";

const UserProfile = ({  }) => {
  return (
    <div
      className={`flex gap-5 items-center ${
         "bg-white rounded-xl p-2 mt-6 dark:bg-slate-800" 
      }`}
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
        <span className="text-[0.75rem] opacity-60">ravindujayakodi00@gmail.com</span>
      </Link>
    </div>
  );
};

export default UserProfile;
