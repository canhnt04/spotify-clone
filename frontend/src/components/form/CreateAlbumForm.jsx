import { Image, ImageUp, Trash, Upload, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import useImagePreview from "../hooks/useImagePreview";
import Button from "../ui/Button/Button";
import { postAlbum } from "../../apis/albumService";
import { ToastContext } from "../../contexts/ToastContext";
import ScaleLoader from "react-spinners/ScaleLoader";

const CreateAlbumForm = ({ setVisibleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { imageURL, file, handleImageChange, resetImage } = useImagePreview();
  const { toast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail_url: file,
  });

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

      console.log("form :", formData);

      const res = await postAlbum(form);
      if (res.data && res.status == 201) {
        toast.success(res.data.message);
        setVisibleModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Create album fail: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      thumbnail_url: file ?? null,
    }));
  }, [file, imageURL]);

  return (
    <div className="w-max mx-auto bg-[#282828] p-4 m-2 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tạo album</h1>
        <button onClick={() => setVisibleModal(false)}>
          <X size={20} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        {/* Avatar */}
        <div className="relative group w-[200px] h-[200px] p-2 m-2 flex items-center justify-center rounded-full overflow-hidden img">
          {imageURL ? (
            <>
              <img
                src={imageURL}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <button
                onClick={resetImage}
                className="absolute hidden group-hover:block cursor-pointer border p-2 rounded-full hover:bg-[#3a3a3a] transition"
              >
                <Trash size={26} />
              </button>
            </>
          ) : (
            <label
              htmlFor="image-file"
              className="w-full h-full rounded-full object-cover border group flex flex-col items-center justify-center mx-auto cursor-pointer"
            >
              <ImageUp strokeWidth={1} size={80} />
              <p className="text-xs font-bold mt-2 group-hover:underline">
                Tải ảnh album
              </p>
            </label>
          )}

          <input
            id="image-file"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {/* Infomation */}
        <div className="">
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label class="block text-sm font-semibold mb-1">Tên album</label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Tên album"
                type="text"
                class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Mô tả</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Mô tả album của bạn"
                type="text"
                class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
            <Button className={"py-3 px-10"}>
              {!isLoading ? (
                <span>TẠO</span>
              ) : (
                <ScaleLoader
                  color={"#000"}
                  loading={true}
                  height={12}
                  radius={20}
                  width={2}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbumForm;
