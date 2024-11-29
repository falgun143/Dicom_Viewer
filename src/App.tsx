import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DicomViewer from "./components/DicomViewer";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dicom" element={<DicomViewer />} />
    </Routes>
  );
};

export default App;
