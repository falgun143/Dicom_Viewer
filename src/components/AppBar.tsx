import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <div className="w-full fixed top-0 z-50 bg-white dark:bg-[#121212]">
        <div className="w-full h-16 flex justify-between items-center gap-2 px-8">
          <div className="font-bold text-[18px] cursor-pointer flex items-center gap-2 dark:text-white">
            <div className="w-7 h-9 transition-colors duration-300">
              <object
                data="/origin_Medical.svg"
                type="image/svg+xml"
                className="w-full h-full dark:fill-white fill-black transition-colors duration-300"
              ></object>
            </div>
            <h1 className="text-[17px] font-bold text-gray-800 dark:text-gray-100 cursor-pointer">
              <Link
                to="/"
              >
                DCV
              </Link>
            </h1>
          </div>

          <div className="flex items-center justify-center transition-transform duration-200">
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
            />
          </div>
        </div>

        <hr className="border-slate-300 dark:border-[#434343]" />
      </div>

      {children}
    </>
  );
};

export default Appbar;
