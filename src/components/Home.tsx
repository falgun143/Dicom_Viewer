import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="dark:text-white w-[40%] h-auto flex flex-col   items-center mx-auto gap-28 mt-28">
      <div className="flex flex-col gap-7 items-center">
        <h1 className="text-6xl text-center font-bold mx-auto">
          Online Dicom Viewer
        </h1>
        <p className="text-xl text-[#999999]">
          Powerful, user-friendly DICOM Viewer designed for seamless medical
          imaging . Access, view, and analyze DICOM files with clarity and
          precision using advanced tools like zoom, pan, and measurements.
          Perfect for healthcare professionals 👨‍⚕️ seeking efficient and accurate
          diagnostics.
        </p>
        <Link to="/dicom">
          <button className="dark:bg-white bg-black px-4 py-3 rounded-md dark:text-black text-white w-44 dark:hover:bg-[#D0D0D0]  hover:bg-[#252525]">
            View Dicom Images
          </button>
        </Link>
      </div>

      <div className="w-full  h-auto flex flex-col gap-10">
        <hr className="border-slate-200 dark:border-[#1f1f1f]" />

        <hr className="border-slate-200 dark:border-[#1f1f1f]" />
        <hr className="border-slate-200 dark:border-[#1f1f1f]" />
      </div>
    </div>
  );
};

export default Home;
