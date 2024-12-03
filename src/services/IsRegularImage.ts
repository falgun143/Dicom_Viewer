export const isRegularImage = (base64String: string): boolean => {
    return base64String.startsWith("data:image/");
  };