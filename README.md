<a name="top"></a>

# 🏥 Origin Medical DICOM Viewer

## 📋 Overview

A specialized web application for viewing and manipulating DICOM (Digital Imaging and Communications in Medicine) files, built with React, TypeScript, and Konva.js.

## Demo

https://github.com/user-attachments/assets/ee52063e-4bbd-44d5-89e8-c42e1ebc2e2e

## 📑 Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Technical Implementation](#technical-implementation)
- [Development Challenges](#development-challenges)
- [Acknowledgments](#acknowledgments)

## 🚀 Quick Start

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn

### Development Setup

# Create production build

npm run build

# Serve production build

npm run start

## 🏗 Project Structure

![Project Structure](/public/project_structure.png)

## 🧩 Core Components

### 1. Appbar

- Logo display
- Dark mode toggle functionality

### 2. Homepage

- Main entry point
- User interface inspired by vzy.co

### 3. UploadButtonPage

- DICOM file upload interface
- File validation and processing

### 4. ImageCanvas

- Konva.js integration
- Canvas stage management
- Cropping area implementation
- Measurement tools

### 5. MetaDataPage

- DICOM metadata display
- Patient information
- Study details
- Modality information

### 6. ToolBar

- Image manipulation tools
- Measurement controls

### 7. DicomViewer

- Main viewer component
- Brightness/contrast controls
- Magnification tools
- Image manipulation functions

## 💡 Technical Implementation

### DICOM Processing

- Utilizes cornerstone.js for DICOM parsing
- Implements dicom-parser and dicom-image-loader
- Local storage integration for image persistence

### Image Persistence

Image loading process:

1. Store base64 string in localStorage
2. Extract and validate image type
3. For standard images: direct base64 rendering
4. For DICOM:
   - Convert base64 to Blob
   - Process through cornerstone
   - Generate Image ID
   - Render using Konva.js

## 🔧 Development Challenges

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

## 🙏 Acknowledgments

- Origin Medical team
- Cornerstone.js community
- Konva.js developers
