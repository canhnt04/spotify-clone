import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Swipper = ({ data, itemPerPage = 6, children, title }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative">
      <h1 className="m-2 font-bold text-2xl">{title}</h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={itemPerPage}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>{children(item)}</SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

export default Swipper;
