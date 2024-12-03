import cornerstone from "cornerstone-core";

const Loader =  (imageId: string) => {
  return cornerstone.loadImage(imageId);
};

export default Loader;
