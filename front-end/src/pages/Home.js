import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Banner } from "../styles/HomeEmotion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Banner>
            <div className="banner1">Slide 1</div>
          </Banner>
        </SwiperSlide>
        <SwiperSlide>
          <Banner>
            <div className="banner2">Slide 2</div>
          </Banner>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
