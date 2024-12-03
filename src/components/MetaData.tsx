
import React from "react";
import { DicomMetadata } from "../types/interface";

interface MetadataProps {
  metadata: DicomMetadata;
  scale: number;
}

const Metadata: React.FC<MetadataProps> = ({ metadata, scale }) => {
  return (
    <div className="Meta_Data w-[35%] sm:w-[25%] lg:w-[20%] flex">
      <div className="w-px h-[calc(100vh-112px)] bg-[#cbcbcb] dark:bg-[#383838]"></div>
      <div className="flex flex-col w-full p-5">
        <h2 className="sm:text-3xl text-xl font-bold mb-4 text-center ">
          MetaData
        </h2>
        <hr className="border-[#cbcbcb] dark:border-[#383838] mb-4" />
        <div className="space-y-2 text-[16px] sm:text-[18px] md:text-xl">
          <p>
            <span className="font-semibold">Patient ID:</span>{" "}
            {metadata.patientId || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Study Date:</span>{" "}
            {metadata.studyDate || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Modality:</span>{" "}
            {metadata.modality || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Study Description:</span>{" "}
            {metadata.studyDescription || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Scale:</span>{" "}
            {Math.round(scale * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Metadata;