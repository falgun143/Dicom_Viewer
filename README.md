<a name="top"></a>

# Medical DICOM Viewer 🏥

## Table of Contents 📑

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Demo Video](#-demo-video)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Core Components](#-core-components)
- [Technical Implementation](#-technical-implementation)
- [Development Challenges](#-development-challenges)
- [Acknowledgments](#-acknowledgments)

## 📋 Overview 

A specialized web application for viewing and manipulating DICOM (Digital Imaging and Communications in Medicine) files, built with React, TypeScript, and Konva.js.

## Tech Stack 🛠️

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://vitejs.dev/">
          <img src="https://vitejs.dev/logo.svg" width="50" alt="Vite"/>
          <br />
          <b>Vite + React</b>
        </a>
      </td>
      <td align="center">
        <a href="https://www.cornerstonejs.org/">
          <img src="https://www.cornerstonejs.org/img/cornerstone-logo-badge.png" width="50" alt="Cornerstone.js"/>
          <br />
          <b>Cornerstone.js</b>
        </a>
      </td>
      <td align="center">
        <a href="https://konvajs.org/">
          <img src="https://konvajs.org/apple-touch-icon.png" width="50" alt="Konva.js"/>
          <br />
          <b>Konva.js</b>
        </a>
      </td>
    </tr>
  </table>
</div>

## Demo Video 🎬

https://github.com/user-attachments/assets/ee52063e-4bbd-44d5-89e8-c42e1ebc2e2e

## Quick Start 🚀

### Development Setup
```bash
# Clone repository
git clone https://github.com/falgun143/Dicom_Viewer.git

# Install dependencies
npm install

# Start development server
npm run dev
```
### Docker Setup 🐳
```bash
# Build Docker image
docker build -t dicom_viewer .

# Run container
docker run -p 5173:5173 dicom_viewer
```

### Create production build
```bash
npm run build
```
### Serve production build
```bash
npm run start
```

## Project Structure 🏗️

[View Project Structure](public/project_structure.png)

## Core Components 🧩

### 1. Appbar

### 2. Homepage
- Main entry point
- User interface inspired by [Vzy.co](https://vzy.co/)

### 3. UploadButtonPage

### 4. ImageCanvas
- [Konva.js](https://konvajs.org/) integration
- Canvas stage management
- Cropping area implementation
- Measurement tools

### 5. MetaDataPage

## Technical Implementation 💡

### DICOM Processing
- Utilizes [cornerstone.js](https://www.cornerstonejs.org/) for DICOM parsing
- Implements dicom-parser and dicom-image-loader
- Local storage integration for image persistence

### Canvas Management
- Konva.js for interactive canvas elements
- Custom stage management for optimal performance
- Event handling for mouse/touch interactions

### State Management
- React Context API for global state
- Custom hooks for DICOM operations
- Local storage integration for persistence

### Image Processing Pipeline
1. Store base64 string in localStorage
2. Extract and validate image type
3. For standard images: direct base64 rendering
4. For DICOM:
   - Convert base64 to Blob
   - Process through cornerstone
   - Generate Image ID
   - Render using Konva.js

## Development Challenges 🔧

### 1. DICOM Understanding

- Required research into DICOM format
- Studied existing viewers for inspiration
- Analyzed medical imaging requirements

### 2. Library Selection

- Initially attempted ohif/core
- TypeScript compatibility issues
- Switched to cornerstone.js for better integration

### 3. Image Persistence

- Implemented base64 storage solution
- Developed custom loading pipeline
- Handled different image format types

## Acknowledgments 🙏

- Origin Medical team
- Cornerstone.js community
- Konva.js developers
