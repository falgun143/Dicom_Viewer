import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const Configure_Loader = () => {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    webWorkerPath: "/path-to-worker/cornerstoneWADOImageLoaderWebWorker.min.js",
    taskConfiguration: {
      decodeTask: {
        useWebWorkers: true,
      },
    },
  });
};

export default Configure_Loader;