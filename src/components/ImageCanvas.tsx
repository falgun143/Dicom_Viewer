import React, { useEffect, useState } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Line,
  Circle,
  Text,
  Group,
} from "react-konva";
import Konva from "konva";
import { ImageCanvasProps } from "../types/interface";

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  image,
  imageSize,
  position,
  scale,
  isCropping,
  cropStart,
  cropEnd,
  isMagnifying,
  magnifierPosition,
  magnifierScale,
  measurement,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  imageRef,
}) => {
  const [color, setColor] = useState("");
  const magnifierLayerRef = React.useRef<Konva.Layer>(null);

  useEffect(() => {
    const updateColor = () => {
      setColor(
        document.documentElement.classList.contains("dark") ? "white" : "black"
      );
    };

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {image && (
          <KonvaImage
            image={image}
            x={position.x}
            y={position.y}
            width={imageSize.width * scale}
            height={imageSize.height * scale}
            ref={imageRef as React.RefObject<Konva.Image>}
          />
        )}
        {/* Update measurement rendering */}
        {measurement.startPoint && measurement.endPoint && (
          <>
            <Line
              points={[
                measurement.startPoint.x,
                measurement.startPoint.y,
                measurement.endPoint.x,
                measurement.endPoint.y,
              ]}
              stroke="#FFEB3B"
              strokeWidth={2}
              dash={[5, 5]}
            />
            <Circle
              x={measurement.startPoint.x}
              y={measurement.startPoint.y}
              radius={3}
              fill="#FFEB3B"
            />
            <Circle
              x={measurement.endPoint.x}
              y={measurement.endPoint.y}
              radius={3}
              fill="#FFEB3B"
            />
            <Text
              x={(measurement.startPoint.x + measurement.endPoint.x) / 2 + 10}
              y={(measurement.startPoint.y + measurement.endPoint.y) / 2 - 10}
              text={`${measurement.realWorldDistance.toFixed(1)} mm`}
              fill="#FFEB3B"
              fontSize={14}
              fontStyle="bold"
            />
          </>
        )}
        {isCropping && cropStart && cropEnd && (
          <Rect
            x={cropStart.x}
            y={cropStart.y}
            width={cropEnd.x - cropStart.x}
            height={cropEnd.y - cropStart.y}
            stroke="white"
            strokeWidth={2}
            dash={[5, 5]}
          />
        )}
      </Layer>
      {isMagnifying && magnifierPosition && (
        <Layer ref={magnifierLayerRef}>
          <Group
            clipFunc={(ctx) => {
              ctx.beginPath();
              ctx.arc(
                magnifierPosition.x,
                magnifierPosition.y,
                100,
                0,
                Math.PI * 2,
                false
              );
              ctx.closePath();
            }}
          >
            <KonvaImage
              image={image || undefined}
              x={magnifierPosition.x}
              y={magnifierPosition.y}
              width={imageSize.width * scale}
              height={imageSize.height * scale}
              offsetX={magnifierPosition.x - position.x}
              offsetY={magnifierPosition.y - position.y}
              scaleX={scale * magnifierScale}
              scaleY={scale * magnifierScale}
            />
          </Group>
          {/* Border circle */}
          <Circle
            x={magnifierPosition.x}
            y={magnifierPosition.y}
            radius={100}
            stroke={color}
            strokeWidth={2}
          />
          {/* Center dot */}
          <Circle
            x={magnifierPosition.x}
            y={magnifierPosition.y}
            radius={2}
            fill="#ffe600"
          />
        </Layer>
      )}
    </Stage>
  );
};

export default ImageCanvas;
