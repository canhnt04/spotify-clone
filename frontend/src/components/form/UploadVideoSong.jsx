import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../contexts/StoreProvider";
import useImagePreview from "../hooks/useImagePreview";
import Button from "../ui/Button/Button";
import { upload } from "../../apis/songService";
import { ToastContext } from "../../contexts/ToastContext";
import useVideoPreview from "../hooks/useVideoPreview";
import ScaleLoader from "react-spinners/ScaleLoader";

const UploadVideoSong = ({ setVisibleModal }) => {
  const { userInfo } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);

  const videoRef = useRef();

  const { imageURL, file, handleImageChange, resetImage } = useImagePreview();
  const { videoURL, fileVideo, handleVideoChange, resetVideo } =
    useVideoPreview();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: userInfo.full_name,
    genre: "",
    thumbnail_url: file,
    audio_url: null,
    video_url: fileVideo,
    duration: null,
    download_count: 0,
  });

  const handleMetadataLoaded = () => {
    if (videoRef.current?.duration) {
      setFormData((prev) => ({
        ...prev,
        duration: Math.floor(videoRef.current.duration),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Nếu là file thì append luôn, nếu là primitive thì convert sang string
        if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      });

      const res = await upload(form);
      if (res?.data) {
        console.log(res?.data.data);
        toast.success("Upload video thành công.");
        setFormData((prev) => ({
          ...prev,
          title: "",
          artist: "",
          genre: "",
          thumbnail_url: null,
          audio_url: null,
          video_url: null,
          duration: null,
          download_count: 0,
        }));

        setIsLoading(false);
        setVisibleModal({ visible: false, form: null });
      }
    } catch (error) {
      toast.error("Upload video thất bại. Vui lòng thử lại.");
      setIsLoading(false);
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, video_url: fileVideo }));
    setFormData((prev) => ({ ...prev, thumbnail_url: file }));
  }, [file, fileVideo]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-primary rounded-2xl shadow-md flex gap-6">
      {/* Left Side */}
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2">Thông tin video của bạn</h3>

        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          placeholder="Tên video"
          className="w-full px-4 py-2 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring"
        />

        <input
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          type="text"
          placeholder="Thể loại nhạc"
          className="w-full px-4 py-2 mb-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring"
        />

        {imageURL ? (
          <div className="w-full px-4 py-2 mb-6 text-sm border border-gray-300 rounded-md text-center">
            <span>Tải ảnh thành công</span>
          </div>
        ) : (
          <>
            <label
              htmlFor="imgURL"
              className="w-full px-4 py-2 mb-6 text-sm border border-gray-300 rounded-md cursor-pointer"
            >
              <input
                id="imgURL"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              Tải ảnh lên
            </label>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="w-full h-40 mt-9 rounded-lg overflow-hidden flex items-center justify-center relative border border-dashed border-gray-400">
          {videoURL ? (
            <video
              ref={videoRef}
              src={videoURL}
              onLoadedMetadata={handleMetadataLoaded}
              controls={false}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <label className="w-full h-full flex items-center justify-center cursor-pointer text-gray-500">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
              Tải video lên
            </label>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          themes="bg-transparent"
          className={"hover:bg-transparent my-4 w-full border text-white"}
        >
          {!isLoading ? (
            <span>ĐĂNG VIDEO</span>
          ) : (
            <ScaleLoader
              color={"#fff"}
              loading={true}
              height={10}
              radius={10}
              width={4}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadVideoSong;
