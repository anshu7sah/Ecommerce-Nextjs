import Countdown from "../../countdown";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import { flashDealsArray } from "../../../data/home";
import FlashCard from "./Card";
const FlashDeals = () => {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 6, 7)} />
      </div>
      <div className={styles.flashDeals__swiperlist}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="flashDeals__swiper"
          breakpoints={{
            450: {
              slidesPerView: 2,
            },
            630: {
              slidesPerView: 3,
            },
            920: {
              slidesPerView: 4,
            },
            1232: {
              slidesPerView: 5,
            },
            1520: {
              slidesPerView: 6,
            },
          }}
        >
          {flashDealsArray.map((item, i) => (
            <SwiperSlide key={i}>
              <FlashCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FlashDeals;
