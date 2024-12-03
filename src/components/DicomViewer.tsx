import React, { useEffect, useState, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import cornerstone from "cornerstone-core";
import Configure_Loader from "../services/Configure";
import getImageId from "../services/GetImageId";
import Loader from "../services/Loader";
import { PuffLoader } from "react-spinners";
import {
  ImageSize,
  Position,
  Measurement,
  DicomMetadata,
} from "../types/interface";
import { isRegularImage } from "../services/IsRegularImage";
import ImageCanvas from "./ImageCanvas";
import Metadata from "./MetaData";
import ToolBar from "./ToolBar";

const DicomViewer: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<DicomMetadata>({});
  const [selectedTool, setSelectedTool] = useState<string>("pan");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isCropping, setIsCropping] = useState(false);
  const [cropStart, setCropStart] = useState<Position | null>(null);
  const [cropEnd, setCropEnd] = useState<Position | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState<Position | null>(
    null
  );
  const [magnifierScale] = useState(2);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurement, setMeasurement] = useState<Measurement>({
    startPoint: null,
    endPoint: null,
    distance: 0,
    realWorldDistance: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const base64Image = localStorage.getItem("dicomImageBase64");
  const isDarkMode = document.documentElement.classList.contains("dark");
  const imageRef = useRef<Konva.Stage>(null);
  const cropLayerRef = useRef<Konva.Layer>(null);

  const loaderColor = isDarkMode ? "#4A90E2" : "#111";
  const magnifierColor = isDarkMode ? "#ffffff" : "#000000";

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!base64Image) throw new Error("No image data found");

        // Handle regular images (PNG/JPEG)
        if (isRegularImage(base64Image)) {
          const img = new Image();
          img.src = base64Image;
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          setImage(img);
          setOriginalImage(img);
          setImageSize({ width: img.width, height: img.height });
          setScale(calculateInitialScale(img.width, img.height));
          return;
        }

        // Handle DICOM images (existing code)
        const base64Data = base64Image.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays[i] = byteCharacters.charCodeAt(i);
        }

        const dicomBlob = new Blob([byteArrays], { type: "application/dicom" });
        const dicomFile = new File([dicomBlob], "dicomFile.dcm");

        Configure_Loader();
        const imageId = getImageId(dicomFile);
        const dicomImage = await Loader(imageId);

        const studyDate = dicomImage.data?.string("x00080020") || "";
        const year = studyDate.substring(0, 4);
        const month = studyDate.substring(4, 6);
        const day = studyDate.substring(6, 8);
        const date = `${year}-${month}-${day}`;

        setMetadata({
          patientName: dicomImage.data?.string("x00100010"),
          patientId: dicomImage.data?.string("x00100020"),
          studyDate: date,
          modality: dicomImage.data?.string("x00080060"),
          studyDescription: dicomImage.data?.string("x00081030"),
          pixelSpacing: dicomImage.data?.string("x00280030"),
        });

        const canvas = document.createElement("canvas");
        canvas.width = dicomImage.width;
        canvas.height = dicomImage.height;
        cornerstone.renderToCanvas(canvas, dicomImage);

        const img = new Image();
        img.src = canvas.toDataURL();
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        setImage(img);
        setOriginalImage(img);
        setImageSize({ width: img.width, height: img.height });
        setScale(calculateInitialScale(img.width, img.height));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load image");
        console.error("Error loading image:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [base64Image]);

  const getContainerSize = () => {
    if (containerRef.current) {
      return {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
    }
    return { width: 0, height: 0 };
  };

  const calculateInitialScale = (
    imgWidth: number,
    imgHeight: number
  ): number => {
    const { width, height } = getContainerSize();
    const scaleX = (width * 0.75) / imgWidth;
    const scaleY = (height * 0.75) / imgHeight;
    return Math.min(scaleX, scaleY);
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "measure") {
      handleMeasureStart(e);
    } else if (selectedTool === "crop") {
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        setCropStart({ x: pos.x, y: pos.y });
        setIsCropping(true);
      }
    } else if (selectedTool === "pan") {
      setIsDragging(true);
      setInitialMousePosition({
        x: e.evt.clientX,
        y: e.evt.clientY,
      });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    if (selectedTool === "measure" && isMeasuring) {
      handleMeasureMove(e);
    } else if (selectedTool === "crop" && isCropping) {
      setCropEnd({ x: pos.x, y: pos.y });
    } else if (selectedTool === "pan" && isDragging) {
      const dx = e.evt.clientX - initialMousePosition.x;
      const dy = e.evt.clientY - initialMousePosition.y;
      setPosition({
        x: position.x + dx,
        y: position.y + dy,
      });
      setInitialMousePosition({
        x: e.evt.clientX,
        y: e.evt.clientY,
      });
    } else if (selectedTool === "magnify") {
      setMagnifierPosition({ x: pos.x, y: pos.y });
    }
  };

  const handleMouseUp = () => {
    if (selectedTool === "crop" && isCropping) {
      handleCropImage();
    }
    setIsDragging(false);
    setIsCropping(false);
    if (selectedTool !== "magnify") {
      setIsMagnifying(false);
    }
    setIsMeasuring(false);
  };

  const resetView = () => {
    if (originalImage) {
      setImage(originalImage);
      setImageSize({
        width: originalImage.width,
        height: originalImage.height,
      });
      setBrightness(100);
      setContrast(100);
      setPosition({ x: 50, y: 50 });
      setScale(
        calculateInitialScale(originalImage.width, originalImage.height)
      );
    }
  };

  const applyImageChanges = (canvas: HTMLCanvasElement) => {
    const adjustedImage = new Image();
    adjustedImage.src = canvas.toDataURL();
    return new Promise<HTMLImageElement>((resolve) => {
      adjustedImage.onload = () => resolve(adjustedImage);
    });
  };

  const handleBrightnessChange = async (value: number) => {
    setBrightness(value);
    if (originalImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      ctx.filter = `brightness(${value}%) contrast(${contrast}%)`;
      ctx.drawImage(originalImage, 0, 0);

      const newImage = await applyImageChanges(canvas);
      setImage(newImage);
    }
  };

  const handleContrastChange = async (value: number) => {
    setContrast(value);
    if (originalImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      ctx.filter = `brightness(${brightness}%) contrast(${value}%)`;
      ctx.drawImage(originalImage, 0, 0);

      const newImage = await applyImageChanges(canvas);
      setImage(newImage);
    }
  };

  const handleCropImage = async () => {
    if (!cropStart || !cropEnd || !imageRef.current || !image) return;

    const stage = imageRef.current.getStage();
    if (!stage) return;

    const cropX = Math.min(cropStart.x, cropEnd.x);
    const cropY = Math.min(cropStart.y, cropEnd.y);
    const cropWidth = Math.abs(cropEnd.x - cropStart.x);
    const cropHeight = Math.abs(cropEnd.y - cropStart.y);

    const imagePos = {
      x: position.x,
      y: position.y,
    };

    const actualCropX = (cropX - imagePos.x) / scale;
    const actualCropY = (cropY - imagePos.y) / scale;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      image,
      actualCropX,
      actualCropY,
      cropWidth / scale,
      cropHeight / scale,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const croppedImage = await applyImageChanges(canvas);

    setImage(croppedImage);
    setImageSize({
      width: cropWidth,
      height: cropHeight,
    });

    setCropStart(null);
    setCropEnd(null);
    setIsCropping(false);

    const containerSize = getContainerSize();
    setPosition({
      x: (containerSize.width - cropWidth) / 2,
      y: (containerSize.height - cropHeight) / 2,
    });

    setScale(scale);
  };

  const downloadImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(image, 0, 0);

      const currentImageType = image.src.startsWith("data:image/")
        ? image.src.split(";")[0].split("/")[1]
        : "png";

      const link = document.createElement("a");
      link.href = canvas.toDataURL(`image/${currentImageType}`);
      link.download = `image.${currentImageType}`;
      link.click();
    }
  };

  const handleMagnify = () => {
    handleToolSelect("magnify");
  };

  const handleMeasure = () => {
    if (selectedTool === "measure") {
      // If measure is already active, deactivate it
      setSelectedTool("pan");
      setIsMeasuring(false);
      setMeasurement({
        startPoint: null,
        endPoint: null,
        distance: 0,
        realWorldDistance: 0,
      });
    } else {
      // Activate measure tool
      setSelectedTool("measure");
      setIsMagnifying(false);
      setIsCropping(false);
    }
  };

  const handleResize = () => {
    if (originalImage) {
      setScale(
        calculateInitialScale(originalImage.width, originalImage.height)
      );
    }
  };

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    if (selectedTool === "magnify" || selectedTool === "adjust") {
      setSelectedTool("pan");
      setIsMagnifying(false);
    }
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      selectedTool === "adjust" &&
      !target.closest(".adjustment-sliders") &&
      !target.closest('button[data-tool="adjust"]')
    ) {
      setSelectedTool("pan");
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev * 1.1, 10));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev / 1.1, 0.1));
  };

  const handleMeasureStart = (e: KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "measure") {
      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition();
      if (point) {
        setIsMeasuring(true);
        setMeasurement({
          startPoint: point,
          endPoint: point, // Initialize with start point
          distance: 0,
          realWorldDistance: 0,
        });
      }
    }
  };

  const handleMeasureMove = (e: KonvaEventObject<MouseEvent>) => {
    if (isMeasuring && measurement.startPoint) {
      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition();
      if (point) {
        // Calculate pixel distance
        const dx = (point.x - measurement.startPoint.x) / scale;
        const dy = (point.y - measurement.startPoint.y) / scale;
        const pixelDistance = Math.sqrt(dx * dx + dy * dy);

        // Calculate real-world distance using pixel spacing
        const pixelSpacing = metadata.pixelSpacing
          ? parseFloat(metadata.pixelSpacing.toString())
          : 0.2;
        const realDistance = pixelDistance * pixelSpacing;

        setMeasurement({
          startPoint: measurement.startPoint,
          endPoint: point,
          distance: Math.round(pixelDistance * 100) / 100,
          realWorldDistance: Math.round(realDistance * 100) / 100,
        });
      }
    }
  };

  const handleToolSelect = (tool: string) => {
    if (tool === selectedTool) {
      // If clicking the same tool again, turn it off
      setSelectedTool("pan");
      setIsMagnifying(false);
    } else {
      setSelectedTool(tool);
      if (tool === "magnify") {
        setIsMagnifying(true);
      } else {
        setIsMagnifying(false);
      }
      if (tool === "adjust") {
        setIsCropping(false);
        setIsDragging(false);
        setIsMeasuring(false);
      }
    }
  };

  const clearMeasurement = () => {
    setMeasurement({
      startPoint: null,
      endPoint: null,
      distance: 0,
      realWorldDistance: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleRightClick);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTool, originalImage]);

  return (
    <>
      <ToolBar
        selectedTool={selectedTool}
        setSelectedTool={handleToolSelect}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleMagnify={handleMagnify}
        handleMeasure={handleMeasure}
        resetView={resetView}
        downloadImage={downloadImage}
        brightness={brightness}
        contrast={contrast}
        handleBrightnessChange={handleBrightnessChange}
        handleContrastChange={handleContrastChange}
        clearMeasurement={clearMeasurement}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            <PuffLoader color={loaderColor} size={70} />
            <p className="text-white text-lg mt-4">Loading DICOM image...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-20 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
          {error}
        </div>
      )}

      <div className="dark:text-white w-full h-auto flex justify-between items-center sm:mt-32 mt-60 overflow-hidden">
        <div
          ref={containerRef}
          className="Dicom_Viewer flex flex-col justify-between w-[65%] sm:w-[75%] lg:w-[80%] h-[calc(100vh-112px)]"
        >
          <ImageCanvas
            image={image}
            imageSize={imageSize}
            position={position}
            scale={scale}
            isDragging={isDragging}
            initialMousePosition={initialMousePosition}
            isCropping={isCropping}
            cropStart={cropStart}
            cropEnd={cropEnd}
            isMagnifying={isMagnifying}
            magnifierPosition={magnifierPosition}
            magnifierScale={magnifierScale}
            isMeasuring={isMeasuring}
            measurement={measurement}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            imageRef={imageRef}
            cropLayerRef={cropLayerRef}
            setPosition={setPosition}
            setCropStart={setCropStart}
            setCropEnd={setCropEnd}
            setIsCropping={setIsCropping}
            setIsMagnifying={setIsMagnifying}
            setIsMeasuring={setIsMeasuring}
            setMeasurement={setMeasurement}
            magnifierColor={magnifierColor}
          />
        </div>

        <Metadata metadata={metadata} scale={scale} />
      </div>
    </>
  );
};

export default DicomViewer;
