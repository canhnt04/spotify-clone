import Button from "../ui/Button/Button";
import { Pencil, X } from "lucide-react";
import useImagePreview from "../hooks/useImagePreview";
import { useContext, useEffect, useState } from "react";
import { update } from "../../apis/userService";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContext } from "../../contexts/ToastContext";
const UpdateProfileForm = ({ data, defaultAvatar, setVisibleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useContext(ToastContext);
  const { imageURL, file, handleImageChange, resetImage } = useImagePreview();
  const [formData, setFormData] = useState({
    first_name: data?.first_name,
    last_name: data?.last_name,
    avatar: null,
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
      const res = await update(form);
      if (res.data && res.status == 200) {
        toast.success(res.data.message);
        setIsLoading(false);
        setVisibleModal(false);
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      avatar: file ?? null,
    }));
  }, [file, imageURL]);
  return (
    <div className="w-max mx-auto bg-[#282828] p-4 m-2 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chi tiết hồ sơ</h1>
        <button onClick={() => setVisibleModal(false)}>
          <X size={20} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        {/* Avatar */}
        <div className="relative group w-[200px] h-[200px] p-2 m-2 flex items-center justify-center rounded-full overflow-hidden img">
          <img
            src={imageURL ? imageURL : data?.avatar || defaultAvatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex flex-col items-center justify-center gap-4 text-white text-center">
            <label
              htmlFor="image-file"
              className="text-sm font-bold hover:underline cursor-pointer"
            >
              Chọn ảnh
            </label>
            <input
              id="image-file"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Pencil strokeWidth={1} size={40} />
            <span
              onClick={resetImage}
              className="text-sm font-bold hover:underline cursor-pointer"
            >
              Xóa ảnh
            </span>
          </div>
        </div>
        {/* Infomation */}
        <div className="">
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label class="block text-sm font-semibold mb-1">Họ</label>
              <input
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                placeholder={data?.last_name}
                type="text"
                class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Tên</label>
              <input
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                placeholder={data?.first_name}
                type="text"
                class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
            <Button className={"py-3 px-10"}>
              {!isLoading ? (
                <span>LƯU</span>
              ) : (
                <>
                  <ScaleLoader
                    color={"#000"}
                    loading={true}
                    height={12}
                    radius={20}
                    width={2}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
