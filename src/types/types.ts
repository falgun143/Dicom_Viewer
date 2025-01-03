import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

export type ImageSize = {
  width: number;
  height: number;
}

export type Position = {
  x: number;
  y: number;
}

export type Measurement = {
  startPoint: Position | null;
  endPoint: Position | null;
  distance: number;
  realWorldDistance: number;
}

export type DicomMetadata = {
  patientName?: string;
  patientId?: string;
  studyDate?: string;
  modality?: string;
  studyDescription?: string;
  pixelSpacing?: number;
}

export type ImageCanvasProps = {
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
  imageRef: React.RefObject<Konva.Image>;
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

export type DicomImageType = {
  data?: {
    string: (tag: string) => string | undefined;
  };
  width: number;
  height: number;
}
