import { useEffect, useState } from "react";

export default function useImagePreview() {
  const [imageURL, setImageURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const resetImage = () => {
    if (imageURL) {
      URL.revokeObjectURL(imageURL);
    }
    setImageURL(null);
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
    handleImageChange,
    resetImage,
  };
}
