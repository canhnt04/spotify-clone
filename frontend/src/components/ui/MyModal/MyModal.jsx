import { Box, Modal } from "@mui/material";
import { X } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  maxHeight: "80vh",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
  outline: "none",

  // 👉 Loại bỏ outline khi focus bằng chuột (vẫn giữ cho bàn phím)
  "&:focus:not(:focus-visible)": {
    outline: "none",
  },
};

const MyModal = ({
  open,
  setOpen,
  onClose,
  children,
  data,
  setComments,
  isLoading,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} {...(!isLoading && { tabIndex: -1 })}>
        {isLoading ? (
          <></>
        ) : (
          <div className="relative max-h-[calc(80vh-64px)] overflow-y-auto px-4 pt-4 pb-2">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
            </button>
          </div>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default MyModal;
