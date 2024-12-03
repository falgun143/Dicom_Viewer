export interface ImageSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Measurement {
  startPoint: Position | null;
  endPoint: Position | null;
  distance: number;
  realWorldDistance: number;
}

export interface DicomMetadata {
  patientName?: string;
  patientId?: string;
  studyDate?: string;
  modality?: string;
  studyDescription?: string;
  pixelSpacing?: number;
}
