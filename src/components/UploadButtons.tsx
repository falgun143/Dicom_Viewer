import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import dicomParser from "dicom-parser";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import { FaUpload } from "react-icons/fa";
import FileToBase64 from "../services/FileToBase64";

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const UploadButtons = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];
      const base64Image = await FileToBase64(file);
      localStorage.setItem("dicomImageBase64", base64Image);
      navigate("/dicom");
    } catch (error) {
      console.error("Error loading file:", error);
      alert("Failed to process the file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200">
      <h1 className="mb-6 text-3xl font-bold">Upload Medical Image</h1>
      <p className="mb-4 text-center text-lg">
        Drag and drop your DICOM or image files or click the button below to
        upload.
      </p>
      <input
        type="file"
        ref={fileRef}
        accept=".dcm,image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg transition-colors duration-200"
      >
        <FaUpload className="text-xl" />
        Upload Image
      </button>
    </div>
  );
};

export default UploadButtons;
