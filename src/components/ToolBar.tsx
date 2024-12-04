import React from "react";
import {
  FiZoomIn,
  FiZoomOut,
  FiSun,
  FiCrop,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiMove,
} from "react-icons/fi";
import { TbRulerMeasure2 } from "react-icons/tb";

interface ToolBarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleMagnify: () => void;
  resetView: () => void;
  downloadImage: () => void;
  brightness: number;
  contrast: number;
  handleBrightnessChange: (value: number) => void;
  handleContrastChange: (value: number) => void;
  handleMeasure?: () => void;
}
const tooltipStyle = `
.tooltip {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.2s ease;
}

.tool-button:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
`;

const ToolBar: React.FC<ToolBarProps> = ({
  selectedTool,
  setSelectedTool,
  handleZoomIn,
  handleZoomOut,
  handleMagnify,
  resetView,
  downloadImage,
  brightness,
  contrast,
  handleBrightnessChange,
  handleContrastChange,
}) => {
  const handleToolSelect = (tool: string) => {
    if (tool === "zoomIn") {
      setSelectedTool("zoomIn");
      handleZoomIn();
    } else if (tool === "zoomOut") {
      setSelectedTool("zoomOut");
      handleZoomOut();
    } else {
      setSelectedTool(selectedTool === tool ? "pan" : tool);
    }
  };

  return (
    <div className="Tools w-screen  fixed top-0 z-50  sm:h-16 h-32 bg-[#ececec] dark:bg-[#202020] mt-16 flex items-center justify-center px-4 gap-4 flex-wrap">
      <style>{tooltipStyle}</style>

      <button
        onClick={() => handleToolSelect("pan")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "pan" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiMove size={18} /> <span className="tooltip">Pan</span>
      </button>

      <button
        onClick={() => handleToolSelect("zoomIn")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "zoomIn" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiZoomIn size={18} />
        <span className="tooltip">Zoom In</span>
      </button>

      <button
        onClick={() => handleToolSelect("zoomOut")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "zoomOut" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiZoomOut size={18} />
        <span className="tooltip">Zoom Out</span>
      </button>

      <button
        onClick={() => handleToolSelect("crop")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "crop" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiCrop size={18} />
        <span className="tooltip">Crop</span>
      </button>

      <button
        data-tool="adjust"
        onClick={() => handleToolSelect("adjust")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "adjust" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiSun size={18} />
        <span className="tooltip">Adjust</span>
      </button>
      {selectedTool === "adjust" && (
        <div className="adjustment-sliders absolute mt-12 bg-white dark:bg-[#202020] p-4 rounded shadow-lg z-50">
          <div className="flex flex-col gap-2 dark:text-white  justify-center items-center ">
            <div className="flex justify-center items-center gap-2">
              <label>Brightness</label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-center gap-2">
              <label>Contrast</label>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => handleContrastChange(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleMagnify}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "magnify" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiSearch size={18} />
        <span className="tooltip">Magnify</span>
      </button>

      <button
        onClick={resetView}
        className="tool-button relative p-2 bg-blue-500 text-white rounded hover:bg-[#383842]"
      >
        <FiRefreshCw size={18} />
        <span className="tooltip">Reset</span>
      </button>

      <button
        onClick={downloadImage}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "download" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <FiDownload size={18} />
        <span className="tooltip">Download</span>
      </button>

      <button
        onClick={() => handleToolSelect("measure")}
        className={`tool-button relative p-2 rounded ${
          selectedTool === "measure" ? "bg-green-500" : "bg-blue-500"
        } text-white hover:bg-[#383842]`}
      >
        <TbRulerMeasure2 size={18} />

        <span className="tooltip">Measure</span>
      </button>
    </div>
  );
};

export default ToolBar;
