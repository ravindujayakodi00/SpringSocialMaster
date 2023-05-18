import image1 from "../assets/image1.jpg";
import maneesha from "../assets/Maneesha.jpeg";
import prashan from "../assets/prashan.jpeg";
import thithira from "../assets/thithira.jpeg";
import danuja from "../assets/danuja.jpg";
import od from "../assets/od.jpg";
import hirusha from "../assets/hirusha.jpg";
import { useState } from "react";

const Followers = () => {

  return (
    <div>
      <div className="bg-slate-400 dark:bg-slate-800 dark:text-white mr-6 mt-6 rounded-xl text-center mb-72 followers fixed">
        <h1 className="">Followers</h1>

        {/* start */}
        <div className="flex mt-4 justify-between text-sm">
          <div className="flex">
            <img
              className="rounded-full h-12 w-12 mt-2 ml-2"
              src={maneesha}
              alt=""
            />
            <h1 className="ml-4 mt-4">Maneesha Perera</h1>
          </div>

          <div>
            <button className="mt-4 mr-4 ml-4 text-purple-400 hover:text-purple-700">
              Unfollow
            </button>
          </div>
        </div>
        {/* end */}

        {/* start */}
        <div className="flex mt-4 justify-between text-sm">
          <div className="flex">
            <img
              className="rounded-full h-12 w-12 mt-2 ml-2"
              src={prashan}
              alt=""
            />
            <h1 className="ml-4 mt-4">Manjula Prashan</h1>
          </div>

          <div>
            <button className="mt-4 mr-4 ml-4 text-purple-400 hover:text-purple-700">
              Unfollow
            </button>
          </div>
        </div>
        {/* end */}

        {/* start */}
        <div className="flex mt-4 justify-between text-sm">
          <div className="flex">
            <img
              className="rounded-full h-12 w-12 mt-2 ml-2"
              src={danuja}
              alt=""
            />
            <h1 className="ml-4 mt-4">Danuja Jayasuriya</h1>
          </div>

          <div>
            <button className="mt-4 mr-4 ml-4 text-purple-400 hover:text-purple-700">
              Unfollow
            </button>
          </div>
        </div>
        {/* end */}

        {/* start */}
        <div className="flex mt-4 justify-between text-sm">
          <div className="flex">
            <img
              className="rounded-full h-12 w-12 mt-2 ml-2"
              src={hirusha}
              alt=""
            />
            <h1 className="ml-4 mt-4">Hirusha Pananwala</h1>
          </div>

          <div>
            <button className="mt-4 mr-4 ml-4 text-purple-400 hover:text-purple-700">
              Unfollow
            </button>
          </div>
        </div>
        {/* end */}


       
      </div>
    </div>
  );
};

export default Followers;
