import cornerstone from "cornerstone-core";

const Loader = async (imageId: string) => {
  return await cornerstone.loadImage(imageId);
};

export default Loader;
