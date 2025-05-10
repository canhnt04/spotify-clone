import { useState, useEffect } from "react";

export default function useVideoPreview() {
  const [videoURL, setVideoURL] = useState(null);
  const [fileVideo, setFileVideo] = useState(null);

  const handleVideoChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);
    setVideoURL(url);
    setFileVideo(selectedFile);
  };

  const resetVideo = () => {
    if (videoURL) {
      URL.revokeObjectURL(videoURL);
    }
    setVideoURL(null);
    setFileVideo(null);
  };

  useEffect(() => {
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

  return {
    videoURL,
    fileVideo,
    handleVideoChange,
    resetVideo,
  };
}
