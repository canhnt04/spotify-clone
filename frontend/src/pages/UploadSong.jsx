import React, { useContext, useEffect, useRef, useState } from "react";
import { upload } from "../apis/songService";
import { ToastContext } from "../contexts/ToastContext";
import Button from "../components/ui/Button/Button";
import { ImageUpIcon, X } from "lucide-react";
import { StoreContext } from "../contexts/StoreProvider";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading/Loading";

const UploadSongForm = () => {
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    title: "",
    artist: userInfo?.full_name,
    genre: "",
    thumbnail_url: null,
    audio_url: null,
    video_url: null,
    duration: "",
    download_count: 0,
  });

  const thumbnailInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const [audioURL, setAudioURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setAudioURL(objectURL);
      setFormData((prev) => ({ ...prev, audio_url: file }));

      // Tạo một thẻ audio tạm để lấy duration
      const tempAudio = new Audio(objectURL);
      tempAudio.addEventListener("loadedmetadata", () => {
        setFormData((prev) => ({
          ...prev,
          duration: Math.floor(tempAudio.duration),
        }));
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail_url: file });
      setImageURL(URL.createObjectURL(file));
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
        toast.success("Upload bài hát thành công.");
        setFormData((prev) => ({
          ...prev,
          title: "",
          artist: "",
          genre: "",
          thumbnail_url: null,
          audio_url: null,
          video_url: null,
          duration: "",
          download_count: 0,
        }));

        thumbnailInputRef.current.value = null;
        audioInputRef.current.value = null;

        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Upload bài hát thất bại. Vui lòng thử lại.");
      setIsLoading(false);
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (userInfo?.fullname) {
      setFormData((prev) => ({ ...prev, artist: userInfo.fullname }));
    }
  }, [userInfo]);

  return (
    <form
      className="max-w-4xl w-full mx-auto p-6 border border-dashed shadow-xl rounded-2xl space-y-8"
      onSubmit={handleSubmit}
    >
      {/* Xử lý hiệu ứng LOADING KHI submit form */}
      <Loading isOpen={isLoading} />
      {/* Upload Image */}
      <div className="w-full">
        <label
          htmlFor="thumbnail-upload"
          className="flex items-center justify-center w-full h-96 cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:bg-[#202020] transition"
        >
          {imageURL ? (
            <img
              src={imageURL}
              alt="thumbnail"
              className="w-full h-full object-cover rounded-xl mx-auto"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <ImageUpIcon size={48} />
              <p className="mt-3 font-medium text-sm">
                Tải lên ảnh của bài nhạc
              </p>
            </div>
          )}
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/*"
            id="thumbnail-upload"
            name="thumbnail_url"
            onChange={handleImageChange}
            required
            className="hidden"
          />
        </label>
      </div>

      {/* Audio Upload */}
      <div>
        <label className="block font-semibold mb-2">File Audio</label>
        {audioURL ? (
          <div className="flex items-center gap-4">
            <audio ref={audioInputRef} controls className="w-full">
              <source src={audioURL} type={formData.audio_url?.type} />
              Trình duyệt của bạn không hỗ trợ phát audio.
            </audio>
            <button
              type="button"
              onClick={() => {
                setAudioURL(null);
                setFormData({ ...formData, audio_url: null, duration: "" });
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#202020] text-white hover:bg-[#303030] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="audio_url"
              className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-gray-600 cursor-pointer hover:bg-[#202020] transition"
            >
              Chọn file audio để tải lên
            </label>
            <input
              id="audio_url"
              type="file"
              name="audio_url"
              accept="audio/*"
              onChange={handleAudioChange}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Tên bài hát</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Nhập tên bài hát"
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Thể loại</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            placeholder="Ví dụ: Pop, Indie, Rock,..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          className="w-full py-4 text-xl rounded-xl outline-none"
          type="submit"
        >
          Gửi bài nhạc
        </Button>
      </div>
    </form>
  );
};

export default UploadSongForm;
