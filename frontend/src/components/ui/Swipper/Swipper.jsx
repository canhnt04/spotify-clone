import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Styles cho navigation
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Swipper = ({ data, itemPerPage = 6, children }) => {
  return (
    <div className="relative">
      {/* Swiper component */}
      <h1 className="m-2 font-bold text-2xl ">Album của bạn</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={itemPerPage}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>{children(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
