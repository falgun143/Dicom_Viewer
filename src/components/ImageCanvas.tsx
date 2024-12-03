import React from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Line, Circle, Text } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ImageSize, Position, Measurement } from "../types/interface";

interface ImageCanvasProps {
  image: HTMLImageElement | null;
  imageSize: ImageSize;
  position: Position;
  scale: number;
  isDragging: boolean;
  initialMousePosition: Position;
  isCropping: boolean;
  cropStart: Position | null;
  cropEnd: Position | null;
  isMagnifying: boolean;
  magnifierPosition: Position | null;
  magnifierScale: number;
  isMeasuring: boolean;
  measurement: Measurement;
  handleMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  handleMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
  handleMouseUp: () => void;
  imageRef: React.RefObject<KonvaImage>;
  cropLayerRef: React.RefObject<Konva.Layer>;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setCropStart: React.Dispatch<React.SetStateAction<Position | null>>;
  setCropEnd: React.Dispatch<React.SetStateAction<Position | null>>;
  setIsCropping: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMagnifying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMeasuring: React.Dispatch<React.SetStateAction<boolean>>;
  setMeasurement: React.Dispatch<React.SetStateAction<Measurement>>;
  magnifierColor: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  image,
  imageSize,
  position,
  scale,
  isDragging,
  initialMousePosition,
  isCropping,
  cropStart,
  cropEnd,
  isMagnifying,
  magnifierPosition,
  magnifierScale,
  isMeasuring,
  measurement,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  imageRef,
  cropLayerRef,
  setPosition,
  setCropStart,
  setCropEnd,
  setIsCropping,
  setIsMagnifying,
  setIsMeasuring,
  setMeasurement,
  magnifierColor,
}) => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <KonvaImage
          image={image}
          x={position.x}
          y={position.y}
          width={imageSize.width * scale}
          height={imageSize.height * scale}
          ref={imageRef}
        />
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
        <Layer>
          <Rect
            x={magnifierPosition.x - 50}
            y={magnifierPosition.y - 50}
            width={100}
            height={100}
            stroke="white"
            strokeWidth={2}
            dash={[5, 5]}
            cornerRadius={150}
          />
          <KonvaImage
            image={image || undefined}
            x={magnifierPosition.x - 50}
            y={magnifierPosition.y - 50}
            width={100}
            height={100}
            scaleX={magnifierScale}
            scaleY={magnifierScale}
            crop={{
              x: magnifierPosition.x - 50,
              y: magnifierPosition.y - 50,
              width: 100,
              height: 100,
            }}
          />
        </Layer>
      )}
    </Stage>
  );
};

export default ImageCanvas;