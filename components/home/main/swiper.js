import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwiper() {
  return (
    <div className={`${styles.swiper}`}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(10).keys()].map((i) => (
          <SwiperSlide key={i}>
            <div className={styles.imgGradient}>
              <img src={`../../../images/swiper/${i + 1}.jpg`} alt="swiper" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
