const FileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject("Failed to read file");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default FileToBase64;
