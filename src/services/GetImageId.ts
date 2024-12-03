import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

interface DicomFile {
    name: string;
}

const getImageId = (dicomFile: DicomFile): string => {
    const imageId= cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
    return imageId;

}

export default getImageId