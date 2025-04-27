import Button from "../ui/Button/Button";
import { Pencil, X } from "lucide-react";
import useImagePreview from "../hooks/useImagePreview";
const UpdateProfileForm = ({
  handleSubmit,
  data,
  defaultAvatar,
  setVisibleModal,
}) => {
  const { imageURL, handleImageChange, resetImage } = useImagePreview();
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
            <Pencil size={40} />
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
              <label class="block text-sm font-semibold mb-1">Họ và tên</label>
              <input
                placeholder={data?.fullname}
                type="text"
                class="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
            <Button className={"py-3 px-10"}>Lưu</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
