import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper";
import { offersArray } from "../../../data/home";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offerSwiper"
      >
        {offersArray.map((offer, i) => (
          <SwiperSlide key={i}>
            <Link href="#">
              <img src={offer.image} alt="offer image" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
