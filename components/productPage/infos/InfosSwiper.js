import React from "react";
import { Navigation } from "swiper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { simillar_products } from "../../../data/products";

const InfosSwiper = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={5}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="swiper infos_swiper products__swiper"
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 5,
        },
      }}
    >
      {simillar_products.map((product, i) => (
        <SwiperSlide key={i}>
          <Link href="">
            <img src={product} alt="" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InfosSwiper;
