import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DicomViewer from "./components/DicomViewer";
import UploadButtons from "./components/UploadButtons";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload_export" element={<UploadButtons />} />
      <Route path="/dicom" element={<DicomViewer />} />
    </Routes>
  );
};

export default App;
