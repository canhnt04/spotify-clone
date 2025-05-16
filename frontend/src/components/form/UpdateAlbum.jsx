import Button from "../ui/Button/Button";
import { Pencil, X } from "lucide-react";
import useImagePreview from "../hooks/useImagePreview";
import { useContext, useState } from "react";
import { updateAlbum } from "../../apis/albumService";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContext } from "../../contexts/ToastContext";

const UpdateAlbum = ({ data, setVisibleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useContext(ToastContext);
  const { imageURL, file, handleImageChange, resetImage } = useImagePreview();

  const [formData, setFormData] = useState({
    name: data?.name || "",
    description: data?.description || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);

      if (file) {
        form.append("thumbnail_url", file);
      }

      const res = await updateAlbum(data?.id, form);
      if (res.data && res.status === 200) {
        toast.success(res.data.message);
        setVisibleModal((prev) => ({ ...prev, visible: false }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-max mx-auto bg-[#282828] p-4 m-2 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Chi tiết album</h1>
        <button
          onClick={() =>
            setVisibleModal((prev) => ({ ...prev, visible: false }))
          }
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Avatar */}
        <div className="relative group w-[200px] h-[200px] p-2 m-2 flex items-center justify-center rounded-full overflow-hidden">
          <img
            src={imageURL || data?.thumbnail_url}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex flex-col items-center justify-center gap-2 text-white text-center">
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
            <Pencil strokeWidth={1} size={32} />
            <span
              onClick={resetImage}
              className="text-sm font-bold hover:underline cursor-pointer"
            >
              Xóa ảnh
            </span>
          </div>
        </div>

        {/* Thông tin */}
        <form className="space-y-4 w-[300px]" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tên album
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên album"
              type="text"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Nhập mô tả"
              type="text"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
            />
          </div>

          <Button className="py-3 px-10 w-full flex justify-center">
            {!isLoading ? (
              <span>CẬP NHẬT</span>
            ) : (
              <ScaleLoader
                color="#000"
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
  );
};

export default UpdateAlbum;
