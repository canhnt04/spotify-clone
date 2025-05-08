import { useState, useEffect } from "react";

export default function useImagePreview() {
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
    setFile(selectedFile);
  };

  const resetImage = () => {
    if (imageURL) {
      URL.revokeObjectURL(imageURL);
    }
    setImageURL(null);
    setFile(null);
  };

  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  return {
    imageURL,
    file,
    handleImageChange,
    resetImage,
  };
}
