import { useNavigate } from "react-router";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import Lottie from "react-lottie";
import { HomeWrapper, Banner, RecommendWrapper } from "../styles/HomeEmotion";
import banner_img from "../assets/banner_img.json";
import banner_img2 from "../assets/banner_img2.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  const navigate = useNavigate();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const option1 = {
    loop: true,
    autoplay: true,
    animationData: banner_img,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const option2 = {
    loop: true,
    autoplay: true,
    animationData: banner_img2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <HomeWrapper>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Banner>
            <div className="banner1">
              <div className="text-wrapper">
                <p className="subtitle">겜마카세가 추천하는,</p>
                <p className="title">오늘의 게임 5선</p>
              </div>
            </div>
          </Banner>
        </SwiperSlide>
        <SwiperSlide>
          <Banner>
            <div className="banner2">
              <div className="lottie-wrapper">
                <div className="single-lottie">
                  <Lottie options={option2} height={300} width={300} />
                </div>

                <div className="single-lottie">
                  <Lottie options={option1} height={180} width={180} />
                </div>
              </div>
              <div className="text-wrapper">
                <p className="subtitle">잘 맞는 게임을 알고 싶다면</p>
                <p className="title">게임 성향 테스트</p>
                <div className="test-btn" onClick={() => navigate("/test")}>
                  <p className="btn-text">테스트하기</p>
                </div>
              </div>
            </div>
          </Banner>
        </SwiperSlide>
      </Swiper>
      <RecommendWrapper>
        <div className="rcm-title">나를 위한 게임</div>
        <div>게임들</div>
        <div className="rcm-title">인기 게임</div>
        <div>게임들</div>
        <div className="rcm-title">많은 게임</div>
        <div>게임들</div>
      </RecommendWrapper>
    </HomeWrapper>
  );
};

export default Home;
