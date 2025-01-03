import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="dark:text-white w-[40%] h-auto flex flex-col justify-center  items-center mx-auto gap-28 mt-48">
      <div className="flex flex-col gap-7 items-center text-center">
        <h1 className="text-6xl  font-bold mx-auto">Online Dicom Viewer</h1>
        <p className="text-xl text-[#999999]">
          Powerful, user-friendly DICOM Viewer designed for seamless medical
          imaging . Access, view, and analyze DICOM files with clarity and
          precision using advanced tools like zoom, pan, and measurements.
          Perfect for healthcare professionals 👨‍⚕️ seeking efficient and accurate
          diagnostics.
        </p>
        <Link to="/upload">
          <button className="dark:bg-white bg-black px-4 py-3 rounded-md dark:text-black text-white w-44 dark:hover:bg-[#D0D0D0]  hover:bg-[#252525]">
            View Dicom Images
          </button>
        </Link>
      </div>

      <div className="w-full  h-auto flex flex-col gap-10">
        <hr className="border-gray-300 dark:border-[#232323]" />

        <hr className="border-gray-300 dark:border-[#232323]" />
        <hr className="border-gray-300 dark:border-[#232323]" />
      </div>
    </div>
  );
};

export default Home;
